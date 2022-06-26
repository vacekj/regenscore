import nftContractAbi from "@/nftContractAbi.json";
import { JsonRpcSigner } from "@ethersproject/providers";
import { ethers, VoidSigner, Wallet } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";
import { Blob, NFTStorage } from "nft.storage";

const API_KEY = process.env.NEXT_NFT_STORAGE_API_KEY;

const client = new NFTStorage({ token: API_KEY! });
export const isDevelopmentEnvironment = process.env.NODE_ENV !== "production";
export const server = isDevelopmentEnvironment
  ? "http://localhost:3000"
  : "https://regenscore.vercel.app";

async function storeNft(
  image: Blob,
  score: number,
  address: string,
) {
  const arrayBuffer = await image.arrayBuffer();
  const nft = {
    image: new Blob([arrayBuffer]),
    name: "RegenScore Card",
    description: "Welcome Regen. Thank you for collecting your Regen Card.",
    properties: {
      score,
      address,
    },
  };

  return await client.store(nft);
}

type Request = {
  address: string;
};

// const signer = new Wallet(process.env.MINTER_PRIVATE_KEY!);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as Request;

  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_NFT_CONTRACT!,
    nftContractAbi.abi,
  );

  /* Dynamically create the nft svg here */

  /* Return the transaction and nft id */

  try {
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
};
