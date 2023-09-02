import { Box, Flex, Heading, Text } from '@chakra-ui/react';

const Benefits: React.FC = () => {
  const BoxContent = ({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) => (
    <Box flex="1" maxWidth="428px" minWidth="304px" m="12px" textAlign="start">
      <Flex
        minHeight="380px"
        flexDir="column"
        pb="48px"
        borderRadius="25px"
        textAlign="start"
        justifyContent="center"
        bg="brand.beige.400"
        gap="32px"
        paddingX="32px"
        paddingTop="108px"
        width="100%"
      >
        <Text
          variant="bold"
          fontSize="24px"
          mb="32px"
          pb="32px"
          display="inline-block"
          position="relative"
          color="brand.deepGreen.400"
        >
          {title}
          <Box
            width="216px"
            height="7px"
            bgColor="brand.primaryOrange.200"
            position="absolute"
            bottom="0"
            left="0"
          />
        </Text>
        <Text fontSize="16px" lineHeight="32px">
          {content}
        </Text>
      </Flex>
    </Box>
  );

  return (
    <Flex
      flexDir="column"
      align="flex-start"
      justify="center"
      p={4}
      maxWidth="calc(100% - 108px)"
      margin="47px auto"
    >
      <Heading
        as="h1"
        variant="h2"
        mb={6}
        textAlign="left"
        color="brand.primaryOrange.200"
      >
        Benefits for Regen <br />
        Community{' '}
      </Heading>
      <Flex flexWrap="wrap" m="0 -12px" justifyContent="center">
        <BoxContent
          title="Transparent Evaluations"
          content="Qualify for Optimism’s Citizen’s House based on your blockchain activity, and Regen score allowing for an automated inclusion into the Citizen’s House."
        />
        <BoxContent
          title="Gamification"
          content="Qualify for Optimism’s Citizen’s House based on your blockchain activity, and Regen score allowing for an automated inclusion into the Citizen’s House."
        />
        <BoxContent
          title="More Opportunities"
          content="Qualify for Optimism’s Citizen’s House based on your blockchain activity, and Regen score allowing for an automated inclusion into the Citizen’s House."
        />
      </Flex>
    </Flex>
  );
};

export default Benefits;
