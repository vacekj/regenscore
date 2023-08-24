import { Hex } from "viem";
import useSWR from "swr";

export function useScore(address: Hex | undefined) {
  const res = useSWR([address], async ([address]) => {
    const res = await fetch("/api/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address,
      }),
    });
    return res.json();
  });

  return { score: res.data?.score, debug: res.data?.debug, ...res };
}
