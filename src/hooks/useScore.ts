import { Hex, getAddress } from 'viem';
import useSWR from 'swr';
import { useState, useEffect } from 'react';

type Token = {
  category: string;
  scoreAdded: number;
};

type Item = {
  category: string;
  scoreAdded: number;
  tokens?: Token[];
};

/*TODO(mateo): types */
function useScore(address: string | Hex | undefined) {
  const [loading, setLoading] = useState(true);

  const res = useSWR([address], async ([address]) => {
    try {
      if (!address) return setLoading;
      setLoading(true);
      const res = await fetch('/api/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: getAddress(address!),
        }),
      });
      setLoading(false);
      return res.json();
    } catch (error) {
      setLoading(false);
      console.log({ error });
      return { error };
    }
  });
  const [categories, setCategories] = useState<
    { category: string; scoreAdded: number }[]
  >([]);

  useEffect(() => {
    if (res.data?.meta) {
      const newCategoryScores: Record<string, number> = {};
      Object.keys(res.data.meta)
        .filter((key) => !!res.data.meta[key].applies)
        .forEach((key: string) => {
          const item = res.data.meta[key] as Item;
          if (typeof item === 'object' && item !== null) {
            if (key === 'tokenBalances' && item.tokens) {
              item.tokens.forEach((token: any) => {
                newCategoryScores[item.category] =
                  (newCategoryScores[item.category] || 0) +
                  (token.scoreAdded || 0);
              });
            } else {
              newCategoryScores[item.category] =
                (newCategoryScores[item.category] || 0) +
                (item.scoreAdded || 0);
            }
          }
        });
      setCategories(
        Object.entries(newCategoryScores).map(([category, scoreAdded]) => ({
          category,
          scoreAdded,
        })),
      );
    }
  }, [res.data?.meta]);

  return {
    score: res.data?.score,
    meta: res.data?.meta,
    categories,
    loading,
    ...res,
  };
}

export default useScore;
