import { Hex, getAddress } from 'viem';
import { useState, useEffect, useMemo, ReactNode } from 'react';

type Token = {
  category: string;
  scoreAdded: number;
};

type Item = {
  behavior: ReactNode;
  category: string;
  scoreAdded: number;
  tokens?: Token[];
  applies?: Boolean;
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

  const memoizedAddress = useMemo(() => address, [address]);

  const reset = () => {
    setData(null);
    setCategories([]);
    setLoading(false);
  };

  const fetchScore = async (endpoint: string) => {
    if (!memoizedAddress) {
      reset();
      return;
    }

    try {
      if (loading) return;
      setLoading(true);
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: getAddress(memoizedAddress!) }),
      });
      const resData = await res.json();

      setData(resData);
      setLoading(false);
    } catch (error: any) {
      reset();
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScore('/api/myscore');
  }, [memoizedAddress]);

  useEffect(() => {
    setCategories([]);
    const meta = data?.meta;

    if (meta) {
      const newCategoryScores: Record<string, number> = {};

      Object.keys(meta)
        // .filter((key) => key === 'tokenBalances' || !!meta[key].applies)
        .forEach((key: string) => {
          const item = meta[key] as Item;

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
              (newCategoryScores[item.category] || 0) + (item.scoreAdded || 0);
          }
        });

      setCategories(
        Object.entries(newCategoryScores).map(([category, scoreAdded]) => ({
          category,
          scoreAdded,
        })),
      );
    }
  }, [JSON.stringify(data)]);

  return {
    fetchScore,
    score: data?.score || 0,
    meta: data?.meta,
    data,
    version: data?.version || 0,
    categories,
    loading,
    error,
  };
}

export default useScore;
