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
        borderRadius="24px"
        textAlign="start"
        bg="brand.beige.400"
        gap="32px"
        paddingX="32px"
        paddingTop="108px"
        width="100%"
        shadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        height="100%"
        justifyContent="start"
      >
        <Text
          variant="bold"
          fontSize="24px"
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
      maxWidth="1342px"
      p={{ base: '16px', sm: '0px', md: '0px', lg: '0px', xl: '0px' }}
      margin={{
        base: '47px auto',
        sm: '47px 40px',
        md: '47px 40px',
        lg: '47px 52px',
        xl: '47px auto',
      }}
    >
      <Heading
        as="h1"
        variant="h2"
        mb={6}
        textAlign="left"
        color="brand.primaryOrange.200"
      >
        Benefits for Regen Community{' '}
      </Heading>
      <Flex flexWrap="wrap" m="0 -12px" justifyContent="center">
        <BoxContent
          title="Standout & Cooperate better"
          content="Measure your impact, establish credibility and trustworthiness with potential collaborators, and inspire others to join the Regen Score community. Increase your chances of being involved in positive ecosystem projects that align with your values."
        />
        <BoxContent
          title="Aspire to Improve"
          content="Regen Score empowers you to evaluate and identify ways to improve your positive impact across the blockchain ecosystem as a regen supporter. You can suggest attestations that should be considered regarding the positive impact of other regen-focused projects and receive feedback."
        />
        <BoxContent
          title="Own Your Impact"
          content="Your ownership of your Regen Score serves as a secure representation of your identity on the blockchain. As it quantifies your positive contributions to the ecosystem. It is designed to be resistant to manipulation. Additionally, the decentralized approach to Regen Score means that you are not interacting with a faceless algorithm, but rather with a community of like-minded individuals who are also committed to making a positive impact."
        />
      </Flex>
    </Flex>
  );
};

export default Benefits;
