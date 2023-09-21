import { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import { createAttestation } from '@/helpers/eas';
import { getEthPriceAt } from '@/helpers/ethHelpers';
import { privateKeyToSigner } from '@/utils/eas-wagmi-utils';
import {
  updateScoreRecord,
  handleReceipt,
  markReceiptAsUsed,
} from '@/helpers/databaseHelpers';
import pinataSDK from '@pinata/sdk';
import { ATTESTER_ADDRESS, ATTESTATION_FEE_USD } from '@/constants';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const attesterPvtKey = process.env.ATTESTER_PVT_KEY;
    if (!attesterPvtKey)
      return res.status(400).json({ error: 'No attester set' });
    const body = req.body;
    const { data, address, score, meta, network, receipt } = body;
    if (!data || !address || !score || !meta || !network || !receipt)
      return res.status(400).json({ error: 'Missing data' });

    // Check if the receipt has already been used
    try {
      await handleReceipt(receipt, address);
    } catch (error) {
      return res.status(400).json({ error: error });
    }

    const { signer, provider } = privateKeyToSigner(attesterPvtKey, network);
    // check receipt
    const transaction = await provider.getTransaction(receipt);

    if (transaction && transaction.blockNumber !== undefined) {
      const transactionTimestamp = (
        await provider.getBlock(transaction.blockNumber)
      ).timestamp;
      const ethPriceAtTime = await getEthPriceAt(transactionTimestamp);
      const transactionValueUSD =
        parseFloat(ethers.utils.formatEther(transaction.value)) *
        ethPriceAtTime;
      const requiredUSDValue = ATTESTATION_FEE_USD;

      // Receipt Validation: Correct from and to, enough confirmations and right amount payed
      if (
        transaction.from.toLowerCase() === address.toLowerCase() &&
        transaction.to?.toLowerCase() === ATTESTER_ADDRESS.toLowerCase() &&
        transaction.confirmations > 0 &&
        Math.abs(transactionValueUSD - requiredUSDValue) <= 0.05
      ) {
        // It's ok to attest

        // Upload to Pinata
        const pinata = new pinataSDK({
          pinataJWTKey: process.env.PINATA_JWT_KEY,
        });
        const options = {
          pinataMetadata: {
            name: `RegenScore Metadata for ${address}`,
          },
        };
        const ipfs = await pinata.pinJSONToIPFS(meta, options);
        console.log({ ipfs, receipt, data });
        if (!ipfs) return res.status(400).json({ error: 'IPFS upload failed' });
        const result = await createAttestation(
          address,
          score,
          ipfs.IpfsHash,
          signer,
          network,
        );
        // updates score
        await updateScoreRecord({
          id: data.id,
          address,
          meta,
          score,
          version: data.version,
          attestation: result.toString(),
          ipfs_hash: ipfs.IpfsHash,
          receipt,
        });

        // updates receipt
        await markReceiptAsUsed(receipt);
        return res.status(200).json(result);
      } else {
        return res.status(400).json({ error: 'Receipt not valid' });
      }
    } else {
      return res.status(400).json({ error: 'Receipt not found' });
    }
  } catch (error) {
    console.log({ error });
    return res.status(400).send({ error }); // send an empty debug object on error
  }
};
