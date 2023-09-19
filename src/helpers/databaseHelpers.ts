import supabase from '@/utils/supabase-client';

interface ScoreRecord {
  address: string;
  score?: number;
  meta?: any;
  version?: number;
  attestation?: string;
  ipfs_hash?: string;
  receipt?: string;
}

export async function updateScoreRecord(record: ScoreRecord) {
  try {
    const { address, ...data } = record;

    // Check if a record with the given address already exists
    const { data: existingData, error: selectError } = await supabase
      .from('scores')
      .select('*')
      .eq('address', address);

    if (selectError) throw selectError;

    if (existingData && existingData.length > 0) {
      // Update the existing record
      const { error: updateError } = await supabase
        .from('scores')
        .update(data)
        .eq('address', address);

      if (updateError) throw updateError;
    } else {
      // Insert a new record
      const { error: insertError } = await supabase
        .from('scores')
        .insert([{ address, ...data }]);

      if (insertError) throw insertError;
    }
  } catch (error) {
    console.error('Error with Supabase operation:', error);
    throw new Error('Database operation failed');
  }
}
