import { Hex, getAddress } from 'viem';
import useSWR from 'swr';

export function useScore(address: string | Hex | undefined) {
  const res = useSWR([address], async ([address]) => {
    try {
      if (!address) return null;
      const res = await fetch('/api/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: getAddress(address!),
        }),
      });
      return res.json();
    } catch (error) {
      console.log({ error });
      return { error };
    }
  });

  return { score: res.data?.score, debug: res.data?.debug, ...res };
}
