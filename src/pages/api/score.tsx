import nftContractAbi from "@/nftContractAbi.json";
import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as Request;

  try {
    return res.status(200).json({
      score: 1599,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
};
