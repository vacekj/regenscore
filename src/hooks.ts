import { useEffect, useState } from 'react';

export function useScore(address: string) {
  const [score, setScore] = useState(0);
  const [debug, setDebug] = useState(null);

  useEffect(() => {
    fetch('/api/score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setScore(parseInt(res.score));
        setDebug(res.debug);
      });
  }, [address]);

  return { score, debug };
}
