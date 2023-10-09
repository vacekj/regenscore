import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/utils/supabase-client';
import { createScore } from '@/helpers/scoreHelpers';
import { CURRENT_SCORE_VERSION } from '@/constants';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const address = req.body.address || req.query.address;
  const network = req.body.network || req.query.network;
  // const shouldUpdate = req.body.shouldUpdate;
  try {
    if (!address) {
      return res.status(400).send({ score: 0, meta: {} });
    }
    // Check if the record already exists but only consider records that have not been attested
    const { data: existingData, error: existingDataError } = await supabase
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
    console.log({ latestRecord });
    if (
      !latestRecord ||
      // shouldUpdate === true ||
      latestRecord.version === null ||
      latestRecord.version < CURRENT_SCORE_VERSION
    ) {
      const result = await createScore(address);
      if (!latestRecord) {
        // Insert a new record if it does not exist
        const { error: insertError } = await supabase.from('scores').insert([
          {
            address: address,
            score: result.score,
            meta: result.meta,
            version: CURRENT_SCORE_VERSION,
          },
        ]);

        if (insertError) {
          throw insertError;
        }
      } else {
        // Update the record if it exists and has not been attested
        const { error: updateError } = await supabase
          .from('scores')
          .update({
            score: result.score,
            meta: result.meta,
            network,
            version: CURRENT_SCORE_VERSION,
          })
          .eq('address', address);

        if (updateError) {
          throw updateError;
        }
      }
      console.log({ result });
      return res
        .status(200)
        .json({ ...result, version: CURRENT_SCORE_VERSION });
    } else {
      return res.status(200).json(latestRecord);
    }
  } catch (e) {
    return res.status(400).send({ score: 0, meta: {} });
  }
};
