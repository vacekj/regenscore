import { Container, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const Card = dynamic(() => import("@/components/Card"), { ssr: false });

export default function Demo() {
  return (
    <Container position={"relative"}>
      <VStack
        alignItems={"center"}
        maxW={"7xl"}
        spacing={{ base: 10, lg: 16 }}
        py={{ base: 10, sm: 20, lg: 36 }}
        mt={16}
      >
        <Stack textAlign={"center"} spacing={{ base: 4 }}>
          <Heading
            mt={-20}
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          >
            Welcome Regen 🌱.
          </Heading>
          <Text textAlign={"center"}>
            We are celebrating all regens who contribute to the greater good.
            Discover your score below.
          </Text>
        </Stack>
        <Card />
      </VStack>
    </Container>
  );
}
