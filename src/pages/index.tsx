import {
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Link,
  Stack,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useState } from "react";
const Card = dynamic(() => import("@/components/Card"));
import { PrivyClient } from "@privy-io/privy-node";
import { GetServerSideProps } from "next";
import Sound from "react-sound";

export default function Index(props: {
  leaderboard: {
    user_id: string;
    score: string;
  }[];
}) {
  console.log(props.leaderboard);
  const [badgerMode, setBadgerMode] = useState(false);

  return (
    <Container position={"relative"} backgroundImage={badgerMode ? "http://localhost:3000/badgers.gif" : ""}>
      <Sound
        playFromPosition={3000}
        url="/badgers.mp3"
        playStatus={badgerMode ? "PLAYING" : "STOPPED"}
      />
      <HStack p={4} justifyContent={"space-between"}>
        <Link>Leaderboard</Link>
        <FormControl display="flex" alignItems="center" width={"initial"}>
          <FormLabel htmlFor="badger" mb="0">
            🦡 Badger mode
          </FormLabel>
          <Switch
            isChecked={badgerMode}
            onChange={(e) => setBadgerMode(e.target.checked)}
            id="badger"
          />
        </FormControl>
      </HStack>
      <VStack
        alignItems={"center"}
        maxW={"7xl"}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 36 }}
        mt={16}
      >
        <Stack spacing={{ base: 10 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          >
            Welcome Regen.
          </Heading>
        </Stack>
        <Card />
        <Text px={16}>
          We are celebrating all the regens by rewarding them with an NFT to showcase their regen score. Set it as your
          PFP or use it to gain access to regen-only communities and events. Oh, and the NFTs are soul-bound.
        </Text>
        <Text px={16}>
          We calculate your regen score by looking at your contributions towards impact projects like Gitcoin, Giveth,
          World of Women and more. The more you donate and the more diverse your contributions, the better your regen
          score.
        </Text>
      </VStack>
      <Heading
        textAlign={"center"}
        lineHeight={1.1}
        p={2}
        mb={2}
        fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
      >
        Leaderboard
      </Heading>
      <VStack w={"100%"}>
        {props.leaderboard.slice(0, 10).map((l, index) => {
          return (
            <HStack w={"100%"} justifyContent={"space-between"}>
              <Text>
                {index + 1}. &nbsp;<b>{l.user_id}</b>
              </Text>
              <Text>{l.score}</Text>
            </HStack>
          );
        })}
      </VStack>
      <VStack>
      </VStack>
    </Container>
  );
}

const client = new PrivyClient(
  process.env.PRIVY_API_KEY!,
  process.env.PRIVY_API_SECRET!,
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const batch = await client.getBatch("score", {
    limit: 100,
  });

  const data = batch.users.map(d => {
    return { user_id: d.user_id, score: d.data[0]?.text() };
  });
  return {
    props: {
      leaderboard: data,
    },
  };
};
