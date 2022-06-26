import nftContractAbi from "@/nftContractAbi.json";
import { PrivyClient } from "@privy-io/privy-node";
import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";
import { createScore } from "./score";

const client = new PrivyClient(
  process.env.PRIVY_API_KEY!,
  process.env.PRIVY_API_SECRET!,
);

type Request = {
  address: string;
};

/* Calculates the address' score and stores it in Privy */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as Request;

  const score = await createScore(body.address);

  try {
    const [returnedScore] = await client.put(body.address, [
      { field: "score", value: score.toString() },
    ]);
    return res.status(201).json({
      score: returnedScore,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
};
