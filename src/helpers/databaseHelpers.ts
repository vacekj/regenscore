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

export async function handleReceipt(receipt: string, payer: string) {
  try {
    // Check if the receipt already exists
    const { data: usedReceipt, error: selectError } = await supabase
      .from('used_receipts')
      .select('*')
      .eq('receipt', receipt)
      .maybeSingle();
    if (selectError) throw selectError;

    if (usedReceipt) {
      // If the receipt already exists, throw an error
      throw new Error('Receipt has already been used');
    } else {
      // If the receipt does not exist, insert it into the database
      const { error: insertError } = await supabase
        .from('used_receipts')
        .insert([{ receipt, payer, used: false }]);

      if (insertError) throw insertError;
    }
  } catch (error) {
    console.error('Error with Supabase operation:', error);
    throw error;
  }
}

export async function checkPendingReceipt(payer: string) {
  try {
    const { data, error } = await supabase
      .from('used_receipts')
      .select('receipt')
      .eq('payer', payer)
      .eq('used', false)
      .maybeSingle();

    if (error) {
      console.error('Error checking for pending receipt:', error);
      throw error;
    }

    return data?.receipt;
  } catch (error) {
    console.error('Error checking for pending receipt:', error);
    throw error;
  }
}

export async function markReceiptAsUsed(receipt: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('used_receipts')
      .update({ used: true })
      .eq('receipt', receipt)
      .eq('used', false);

    if (error) {
      console.error('Error marking receipt as used:', error);
      throw error;
    }

    return data !== null;
  } catch (error) {
    console.error('Error marking receipt as used:', error);
    throw error;
  }
}
