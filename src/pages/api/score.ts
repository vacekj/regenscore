import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/utils/supabase-client';
import { createScore } from '@/helpers/scoreHelpers';
import { CURRENT_SCORE_VERSION } from '@/constants';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const address = req.body.address || req.query.address;
  const shouldUpdate = req.body.shouldUpdate;
  try {
    if (!address) {
      return res.status(400).send({ score: 0, meta: {} });
    }
    // Check if the record already exists
    const { data: existingData } = await supabase
      .from('scores')
      .select('*')
      .eq('address', address)
      .single();
    if (
      !existingData ||
      shouldUpdate === true ||
      existingData.version === null ||
      existingData.version < CURRENT_SCORE_VERSION
    ) {
      // If the record does not exist or shouldUpdate is true
      const result = await createScore(address);
      if (!existingData) {
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
        // Update the record if it exists and shouldUpdate is true
        const { error: updateError } = await supabase
          .from('scores')
          .update({
            score: result.score,
            meta: result.meta,
            version: CURRENT_SCORE_VERSION,
          })
          .eq('address', address);

        if (updateError) {
          throw updateError;
        }
      }
      return res
        .status(200)
        .json({ ...result, version: CURRENT_SCORE_VERSION });
    } else {
      return res.status(200).json(existingData);
    }
  } catch (e) {
    return res.status(400).send({ score: 0, meta: {} });
  }
};
