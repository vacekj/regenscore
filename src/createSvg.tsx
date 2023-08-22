import { server } from "@/pages/api/claim";

export async function createSvg(
  score: number | "????????",
  addressOrEns: string,
) {
  const truncatedAddy =
    addressOrEns.length > 20
      ? `${addressOrEns.slice(0, 6)}...${addressOrEns.slice(-5)}`
      : addressOrEns;
  /* I wish JS had a match operator */

  let level = score === "????????" ? 3 : clamp(Math.floor(score / 1000), 0, 3);
  const svg = await fetch(`${server}/level${level}.svg`).then((res) =>
    res.text(),
  );
  return svg
    .replace("ADDRESS", truncatedAddy)
    .replace("SCORE", score.toString(10) + " RS");
}

function clamp(number: number, min: number, max: number) {
  return Math.min(Math.max(number, min), max);
}
