import supabase from '@/utils/supabase-client';
import { Address } from 'viem';

// TODO: MOVE THESE TYPES SOMEWHERE ELSE
type Token = {
  category: string;
  scoreAdded: number;
};

type Item = {
  category: string;
  scoreAdded: number;
  tokens?: Token[];
  applies?: Boolean;
  behavior: string;
};

interface ScoreRecord {
  id: number;
  createdAt?: string;
  address: Address;
  score?: number;
  meta?: {
    [key: string]: Item;
  };
  version?: number;
  attestation?: string;
  eas_hash?: string;
  ipfs_hash?: string;
  receipt?: string;
}

export async function updateScoreRecord(record: ScoreRecord) {
  try {
    const { id, address, receipt, ...data } = record;
    const updatedData = { ...data, receipt };
    // Updates data on record: Needed for changing the used receipt
    const { data: existingData, error: selectError } = await supabase
      .from('scores')
      .select('*')
      .eq('id', id)
      .single();

    if (existingData) {
      // Update the existing record
      const { error: updateError } = await supabase
        .from('scores')
        .update(updatedData)
        .eq('id', id);

      if (updateError) throw updateError;
    } else {
      // Insert a new record
      const { error: insertError } = await supabase
        .from('scores')
        .insert([{ address, ...updatedData }]);

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

    if (usedReceipt && !!usedReceipt.used) {
      // If the receipt already exists, throw an error
      throw new Error('Receipt has already been used');
    } else if (!usedReceipt) {
      // If the receipt does not exist, insert it into the database
      const { error: insertError } = await supabase
        .from('used_receipts')
        .insert([{ receipt, payer, used: false }]);

      if (insertError) throw insertError;
    }
    return true;
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
    return false;
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
