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
  applies?: Boolean;
  behavior: string;
};

type ResponseData = {
  score?: number;
  meta?: {
    [key: string]: Item;
  };
  version?: number;
};

/*TODO(mateo): types, fetch from supabase first, if not in supabase, load from our api */
export function useScore(address: string | Hex | undefined) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ResponseData | null>(null);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState<
    { category: string; scoreAdded: number }[]
  >([]);

  useEffect(() => {
    let active = true;
    const fetchScore = async () => {
      setLoading(true);
      if (!address) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch('/api/score', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            address: getAddress(address!),
            // shouldUpdate: true,
          }),
        });
        if (!active) return;
        setLoading(false);
        const resData = await res.json();
        setData(resData);
      } catch (error: any) {
        if (!active) return;
        setLoading(false);
        setError(error);
        console.log({ error });
      }
    };
    fetchScore();

    return () => {
      active = false; // Prevents setting state on unmounted component
    };
  }, [address]);

  useEffect(() => {
    const meta = data?.meta;
    if (meta) {
      const newCategoryScores: Record<string, number> = {};
      Object.keys(meta)
        .filter((key) => key === 'tokenBalances' || !!meta[key].applies)
        .forEach((key: string) => {
          const item = meta[key] as Item;
          if (typeof item === 'object' && item !== null) {
            if (key === 'tokenBalances' && item.tokens) {
              item.tokens.forEach((token: any) => {
                if (token.applies) {
                  newCategoryScores[item.category] =
                    (newCategoryScores[item.category] || 0) +
                    (token.scoreAdded || 0);
                }
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
  }, [data, address]);

  return {
    score: data?.score,
    meta: data?.meta,
    version: data?.version || 0,
    categories,
    loading,
    error,
  };
}

export default useScore;
