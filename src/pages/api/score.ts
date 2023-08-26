import { NextApiRequest, NextApiResponse } from 'next';
import { getAdressesAirdroppedOP, getAddressesPaidByOpTreasury } from '@/api';
import { createScore } from '@/helpers/scoreApi';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const opAirdropAddresses = await getAdressesAirdroppedOP();
  const treasuryAddresses = await getAddressesPaidByOpTreasury();
  const body = req.body;
  const result = await createScore(
    body.address,
    opAirdropAddresses,
    treasuryAddresses
  );
  try {
    return res.status(200).json(result); // send the entire result object as JSON
  } catch (e) {
    return res.status(200).send({ score: 0, debug: {} }); // send an empty debug object on error
  }
};
