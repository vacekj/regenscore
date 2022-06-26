import { useEffect, useState } from "react";

export function useScore(address: string) {
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch("/api/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address,
      }),
    }).then(res => res.text()).then(res => setScore(parseInt(res)));
  }, [address]);

  return score;
}
