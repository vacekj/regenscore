import { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import eas from '@/helpers/eas';
import ethHelpers from '@/helpers/ethHelpers';
import easUtils from '@/utils/eas-wagmi-utils';
import dbHelpers from '@/helpers/databaseHelpers';
import constants from '@/constants';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.time('Total Execution Time');

    const { ATTESTER_ADDRESS, ATTESTATION_FEE_USD } = constants;

    const attesterPvtKey = process.env.ATTESTER_PVT_KEY;
    if (!attesterPvtKey)
      return res.status(400).json({ error: 'No attester set' });

    const body = req.body;
    const { data, address, score, meta, network, receipt, ipfsHash } = body;
    if (
      !data ||
      !address ||
      !score ||
      !meta ||
      !network ||
      !receipt ||
      !ipfsHash
    )
      return res.status(400).json({ error: 'Missing data' });

    console.time('handleReceipt');
    try {
      await dbHelpers.handleReceipt(receipt, address);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
    console.timeEnd('handleReceipt');

    console.time('privateKeyToSigner');
    const { signer, provider } = easUtils.privateKeyToSigner(
      attesterPvtKey,
      network,
    );
    console.timeEnd('privateKeyToSigner');

    console.time('getTransaction');
    const transaction = await provider.getTransaction(receipt);
    console.timeEnd('getTransaction');

    if (transaction && transaction.blockNumber !== undefined) {
      console.time('getBlock');
      const transactionTimestamp = (
        await provider.getBlock(transaction.blockNumber)
      ).timestamp;
      console.timeEnd('getBlock');

      console.time('getEthPriceAt');
      const ethPriceAtTime =
        await ethHelpers.getEthPriceAt(transactionTimestamp);
      console.timeEnd('getEthPriceAt');

      const transactionValueUSD =
        parseFloat(ethers.utils.formatEther(transaction.value)) *
        ethPriceAtTime;
      const requiredUSDValue = ATTESTATION_FEE_USD;

      if (
        transaction.from.toLowerCase() === address.toLowerCase() &&
        transaction.to?.toLowerCase() === ATTESTER_ADDRESS.toLowerCase() &&
        transaction.confirmations > 0 &&
        Math.abs(transactionValueUSD - requiredUSDValue) <= 0.05
      ) {
        console.time('createAttestation');
        const result = await eas.createAttestation(
          address,
          score,
          ipfsHash,
          signer,
          network,
        );
        console.timeEnd('createAttestation');

        console.time('updateScoreRecord');
        await dbHelpers.updateScoreRecord({
          id: data.id,
          address,
          meta,
          score,
          version: data.version,
          eas_hash: result.toString(),
          ipfs_hash: ipfsHash,
          receipt,
        });
        console.timeEnd('updateScoreRecord');

        console.time('markReceiptAsUsed');
        await dbHelpers.markReceiptAsUsed(receipt);
        console.timeEnd('markReceiptAsUsed');

        console.timeEnd('Total Execution Time');
        return res.status(200).json(result);
      } else {
        return res.status(400).json({ error: 'Receipt not valid' });
      }
    } else {
      return res.status(400).json({ error: 'Receipt not found' });
    }
  } catch (error) {
    console.log({ error });
    console.timeEnd('Total Execution Time');
    return res.status(400).send({ error });
  }
};
