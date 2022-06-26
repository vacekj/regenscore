import { createSvg } from "@/createSvg";
import nftContractAbi from "@/nftContractAbi.json";
import { ethers, Wallet } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";
import { Blob, NFTStorage } from "nft.storage";

import { Interface } from "@ethersproject/abi";

import abi from "../../nftContractAbi.json";
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const API_KEY = process.env.NEXT_NFT_STORAGE_API_KEY;
const PRIVATE_KEY = process.env.NEXT_MINTER_PRIVATE_KEY;

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
  const nft = {
    image,
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

  /* TODO: fetch score here */
  const score = 1283;

  const image = new Blob([await createSvg(score, body.address)], { type: "image/svg+xml" });

  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_NFT_CONTRACT!,
    nftContractAbi.abi,
  );
  const metadata = await storeNft(image, score, body.address);
  const provider = ethers.getDefaultProvider("polygon");
  const minterWallet = new Wallet(PRIVATE_KEY!, provider);
  const nftContract = new ethers.Contract(
    CONTRACT_ADDRESS!,
    new Interface(abi.abi),
    minterWallet,
  );
  const transaction = await nftContract.safeMint(
    body.address,
    metadata.ipnft,
  );

  return res.status(201).json({ metadata, hash: transaction.hash });

  try {
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
};
