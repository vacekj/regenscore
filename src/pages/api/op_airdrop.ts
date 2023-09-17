import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/utils/supabase-client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const address = req.body.address || req.query.address;

  try {
    if (!address) {
      return res.status(400).send({ error: 'Address is required' });
    }

    // Fetch data from op_airdrop_1
    const { data: dataAirdrop1 } = await supabase
      .from('op_airdrop_1')
      .select('address, total_op_eligible_to_claim')
      .eq('address', address.toLowerCase())
      .single();

    // Fetch data from op_airdrop_2
    const { data: dataAirdrop2 } = await supabase
      .from('op_airdrop_2')
      .select('address, total_op_eligible_to_claim')
      .eq('address', address.toLowerCase())
      .single();

    return res.status(200).json({
      airdrop1: dataAirdrop1?.total_op_eligible_to_claim || 0,
      airdrop2: dataAirdrop2?.total_op_eligible_to_claim || 0,
    });
  } catch (e: any) {
    return res.status(400).send({ airdrop1: 0, airdrop2: 0, error: e.message });
  }
};
