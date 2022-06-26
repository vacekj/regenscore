import { useTotalCards } from "@/hooks";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Link,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
const Card = dynamic(() => import("@/components/Card"));

export default function Index() {
  return (
    <Container position={"relative"}>
      <HStack p={4} justifyContent={"space-between"}>
        <Link>Leaderboard</Link>
        <FormControl display="flex" alignItems="center" width={"initial"}>
          <FormLabel htmlFor="beaver" mb="0">
            🦫 Beaver mode
          </FormLabel>
          <Switch id="beaver" />
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
        fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
      >
        Leaderboard
      </Heading>
      <VStack>
      </VStack>
    </Container>
  );
}
