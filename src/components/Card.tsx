import { createSvg } from "@/createSvg";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  Stack,
  Text,
  useBoolean,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConnectButton, useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import { parseTransaction } from "ethers/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAccount, useNetwork, useSendTransaction } from "wagmi";
import z from "zod";

const responseBodySchema = z.object({
  success: z.boolean(),
  serializedTransaction: z.string(),
  metadata: z.object({
    data: z.object({
      name: z.string(),
      description: z.string(),
      properties: z.object({ recipient: z.string(), message: z.string(), type: z.string() }),
    }),
    url: z.string(),
    ipnft: z.string(),
  }),
});

export default function Card() {
  const toast = useToast();

  const [svg, setSvg] = useState<string>();
  useEffect(() => {
    createSvg(500, account?.address!).then(res => setSvg(res));
  });

  const [loading, setLoading] = useState(false);
  const { data: account } = useAccount();
  const { data: activeChain } = useNetwork();

  return (
    <Center py={12} flexDirection={"column"}>
      <Box
        role={"group"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
        mb={8}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: svg!,
          }}
        />
      </Box>
      {!account && <ConnectButton label={"Reveal your RegenScore"} accountStatus={"full"} chainStatus={"full"} />}
      {account && (
        <Button
          type={"submit"}
          isLoading={loading}
          size={"lg"}
          px={8}
          mt={4}
          border={"solid 3px linear(to-r, red.400,pink.400)"}
          colorScheme={"pink"}
          bgGradient="linear(to-r, red.400,pink.400)"
          textColor={"white"}
          _hover={{
            bgGradient: "linear(to-r, red.500,pink.500)",
          }}
          onClick={() => {
            if (!account?.address) {
              return;
            }
            fetch("/api/claim", {
              method: "post",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                address: account?.address,
              }),
            });
          }}
        >
          Claim your RegenScore Card
        </Button>
      )}
    </Center>
  );
}
