import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/utils/supabase-client';
import { ScoreRecord } from '@/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const record: ScoreRecord = req.body.record;
    const id: number | undefined = req.body.id;

    const { receipt } = record;
    const updatedData = { ...record };

    let existingData = null;

    if (id) {
      const { data: fetch } = await supabase
        .from('scores')
        .select('*')
        .eq('id', id)
        .single();
      existingData = fetch;
    } else {
      const { data: fetch } = await supabase
        .from('scores')
        .select('*')
        .eq('receipt', receipt)
        .single();
      existingData = fetch;
    }

    if (existingData) {
      const { error: updateError } = await supabase
        .from('scores')
        .update(updatedData)
        .eq('id', existingData.id)
        .select();

      if (updateError) throw updateError;

      res.status(200).json({ status: 'updated', data: updatedData });
    } else {
      const { error: insertError } = await supabase
        .from('scores')
        .insert([updatedData]);

      if (insertError) throw insertError;

      res.status(201).json({ status: 'created', data: updatedData });
    }
  } catch (error) {
    console.error('Error with Supabase operation:', error);
    res.status(500).json({ error: 'Database operation failed' });
  }
}
