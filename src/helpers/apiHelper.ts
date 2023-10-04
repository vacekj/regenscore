import { Hex, getAddress } from 'viem';

type Token = {
  category: string;
  scoreAdded: number;
};

type Item = {
  behavior: React.ReactNode;
  category: string;
  scoreAdded: number;
  tokens?: Token[];
  applies?: boolean;
};

type ResponseData = {
  score?: number;
  meta?: {
    [key: string]: Item;
  };
  version?: number;
};

export async function fetchScoreData(
  address: string | Hex | undefined,
): Promise<{
  score: number;
  meta?: { [key: string]: Item };
  categories: { category: string; scoreAdded: number }[];
}> {
  if (!address) throw new Error('Address is undefined');

  try {
    const res = await fetch('/api/myscore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address: getAddress(address) }),
    });
    const resData: ResponseData = await res.json();

    const meta = resData.meta;
    let categories: any = [];

    if (meta) {
      const newCategoryScores: Record<string, number> = {};

      Object.keys(meta)
        .filter((key) => key === 'tokenBalances' || !!meta[key].applies)
        .forEach((key: string) => {
          const item = meta[key] as Item;

          if (key === 'tokenBalances' && item.tokens) {
            item.tokens.forEach((token: Token) => {
              if (token.category) {
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

      categories = Object.entries(newCategoryScores).map(
        ([category, scoreAdded]) => ({
          category,
          scoreAdded,
        }),
      );
    }

    return {
      score: resData.score || 0,
      meta: resData.meta,
      categories,
    };
  } catch (error: any) {
    console.log({ error });
    throw new Error(`Error fetching score: ${error.message}`);
  }
}
