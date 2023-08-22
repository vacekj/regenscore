import { Box, Flex, Heading, Image, Text, Grid } from "@chakra-ui/react";

const HowItWorks: React.FC = () => {
  const BoxContent = ({
    step,
    title,
    content,
    last = false,
  }: {
    step: number;
    title: string;
    content: string;
    last?: boolean;
  }) => (
    <Flex
      minHeight={{ base: "320px", sm: "380px" }}
      flexDir="column"
      p={{ base: 0, sm: "32px" }}
      borderRadius="25px"
      textAlign="start"
      justifyContent="center"
      gap="32px"
      mb={{ base: 0, sm: "4", md: "0" }}
      position="relative"
    >
      <Image
        src="/icons/right-arrow-container.svg"
        alt="Step Arrow"
        position="absolute"
        w="62px"
        h="42px"
        top={0}
        left={0}
        zIndex={1}
      />
      <Text
        fontSize="16px"
        fontWeight="bold"
        position="absolute"
        top="8px"
        left="16px"
        color="black"
        zIndex={2}
        _before={{
          content: '""',
          position: "absolute",
          width: last
            ? "0"
            : { base: 0, sm: "190px", md: "314px", xl: "266px" },
          height: "2px",
          backgroundColor: "brand.primaryOrange.200",
          top: "50%",
          left: "46px",
        }}
      >
        {step}
      </Text>

      <Text
        color="brand.deepGreen.400"
        variant="bold"
        fontSize="24px"
        display="inline-block"
        position="relative"
      >
        {title}
      </Text>
      <Text fontSize="16px" lineHeight="32px">
        {content}
      </Text>
    </Flex>
  );

  return (
    <Flex
      flexDir="column"
      align="flex-start"
      justify="center"
      p={4}
      maxWidth="1342px"
      margin="47px auto"
    >
      <Heading
        as="h1"
        variant="h2"
        mb={6}
        textAlign="left"
        color="brand.primaryOrange.200"
      >
        How It Works
      </Heading>
      <Grid
        templateColumns={{
          base: "repeat(1, minmax(0, 375px))",
          sm: "repeat(2, minmax(0, 375px))",
          xl: "repeat(4, minmax(0, 375px))",
        }}
        mt="48px"
      >
        <BoxContent
          step={1}
          title="Set up your wallet"
          content={`Follow the wallets setup process, either by creating a new wallet or importing an existing one`}
        />
        <BoxContent
          step={2}
          title="Check your Attestation"
          content={`Follow the wallet's setup process, either by creating a new wallet or importing an existing one.`}
        />
        <BoxContent
          step={3}
          title="Improve your Regen score"
          content={`Follow the wallet's setup process, either by creating a new wallet or importing an existing one.`}
        />
        <BoxContent
          step={4}
          title="Leaderboard"
          content={`Follow the wallet's setup process, either by creating a new wallet or importing an existing one.`}
          last={true}
        />
      </Grid>
    </Flex>
  );
};

export default HowItWorks;
