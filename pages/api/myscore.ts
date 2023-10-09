import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/utils/supabase-client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const address = req.body.address || req.query.address;
  try {
    if (!address) {
      return res.status(400).send({ score: 0, meta: {} });
    }
    // Check if the record already exists but only consider records that have not been attested
    const { data: existingData } = await supabase
      .from('scores')
      .select('*')
      .eq('address', address)
      .is('attestation', null)
      .order('created_at', { ascending: false })
      .limit(1);

    let latestRecord = null;
    if (existingData && existingData.length > 0) {
      latestRecord = existingData[0];
    }

    return res.status(200).json(latestRecord);
  } catch (e) {
    return res.status(400).send({ score: 0, meta: {} });
  }
};
