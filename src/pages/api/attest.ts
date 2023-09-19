import { NextApiRequest, NextApiResponse } from 'next';
import { createAttestation } from '@/helpers/eas';
import { privateKeyToSigner } from '@/utils/eas-wagmi-utils';
import { updateScoreRecord } from '@/helpers/databaseHelpers';
import pinataSDK from '@pinata/sdk';
import { ATTESTER_PUBLIC_KEY } from '@/constants';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const attesterPvtKey = process.env.ATTESTER_PVT_KEY;
    if (!attesterPvtKey)
      return res.status(400).json({ error: 'No attester set' });
    const body = req.body;
    const { address, score, meta, network, receipt } = body;
    const { signer, provider } = privateKeyToSigner(attesterPvtKey, network);
    // check receipt
    const transaction = await provider.getTransaction(receipt);
    if (
      transaction &&
      transaction.from.toLowerCase() === address.toLowerCase() &&
      transaction.to?.toLowerCase() === ATTESTER_PUBLIC_KEY.toLowerCase() &&
      transaction.confirmations > 0
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
      console.log({ ipfs });
      if (!ipfs) return res.status(400).json({ error: 'IPFS upload failed' });
      const result = await createAttestation(
        address,
        score,
        ipfs.IpfsHash,
        signer,
      );

      await updateScoreRecord({
        address,
        meta,
        score,
        attestation: result.toString(),
        ipfs_hash: ipfs.IpfsHash,
        receipt,
      });
      return res.status(200).json(result);
    } else {
      return res.status(400).json({ error: 'Receipt not valid' });
    }
  } catch (error) {
    console.log({ error });
    return res.status(400).send({ error }); // send an empty debug object on error
  }
};
