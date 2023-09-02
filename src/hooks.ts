import { Hex } from 'viem';
import useSWR from 'swr';

export function useScore(address: string) {
  const res = useSWR([address], async ([address]) => {
    try {
      const res = await fetch('/api/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address,
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
