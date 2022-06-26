import abi from "@/nftContractAbi.json";

import { useAccount, useContractRead, useNetwork } from "wagmi";

export function useTotalCards() {
  return useContractRead(
    {
      addressOrName: process.env.NEXT_PUBLIC_NFT_CONTRACT!,
      contractInterface: abi.abi,
    },
    "totalSupply",
  );
}
