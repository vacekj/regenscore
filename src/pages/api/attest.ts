import { NextApiRequest, NextApiResponse } from 'next';
import { createAttestation } from '@/helpers/eas';
import { privateKeyToSigner } from '@/utils/eas-wagmi-utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body = req.body;
    const signer = privateKeyToSigner(
      process.env.ATTESTER_PVT_KEY!,
      body.network,
    );
    const result = await createAttestation(
      body.address,
      body.score,
      body.meta,
      signer,
    );
    return res.status(200).json(result);
  } catch (e) {
    return res.status(200).send({ score: 0, meta: {} }); // send an empty debug object on error
  }
};
