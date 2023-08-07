import { useEffect, useState } from 'react';

export type DebugInfo = any; // Define the type structure for debug information here.

export function useScore(address: string) {
  const [score, setScore] = useState<number | null>(null);
  const [debug, setDebug] = useState<DebugInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const addressPattern = /^0x[a-fA-F0-9]{40}$/;

    // If the address is not provided, we don't make the request.
    if (!address || !addressPattern.test(address)) {
      setScore(null);
      setDebug(null);
      return;
    }

    setLoading(true);
    setError(null);

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
        setScore(res.score ? parseInt(res.score) : null);
        setDebug(res.debug);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch score.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [address]);

  return { score, debug, loading, error };
}
