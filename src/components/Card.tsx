import { createSvg } from "@/createSvg";
import { useScore } from "@/hooks";
import { Box, Button, Center, useColorModeValue, useMediaQuery, useToast } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function Card() {
  const toast = useToast();
  const [isDesktop] = useMediaQuery("(min-width: 960px)");
  const [claimed, setClaimed] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: account } = useAccount();

  const score = useScore(account?.address!);

  const [svg, setSvg] = useState<string>();
  useEffect(() => {
    createSvg(score, account?.address!).then(res => setSvg(res));
  }, [score, account?.address!]);

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
      {!claimed && account && (
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
            }).then(r => setClaimed(true)).then(r =>
              toast({
                title: "Claimed RegenScore Card",
                status: "success",
              })
            );
          }}
        >
          Claim your RegenScore Card
        </Button>
      )}
      {claimed && isDesktop && account && account.address && (
        <Button
          colorScheme={"green"}
          variant={"link"}
          onClick={() => {
            fetch("/api/publish", {
              method: "post",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                address: account.address,
              }),
            }).then(r =>
              toast({
                title: "Score posted",
                status: "success",
              })
            ).catch(e =>
              toast({
                title: "There was an error posting your score",
                description: e,
                status: "error",
              })
            );
          }}
        >
          Publish your score on the leaderboard
        </Button>
      )}
    </Center>
  );
}
