import { Box, Flex, Heading, Image, Text, Grid } from '@chakra-ui/react';
const HowItWorks: React.FC = () => {
  return (
    <Flex
      flexDir="column"
      align="flex-start"
      justify="center"
      maxWidth="1342px"
      p={{ base: '16px', sm: '0px', md: '0px', lg: '0px', xl: '0px' }}
      margin={{
        base: '0px auto',
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
        How It Works
      </Heading>
      <Grid
        templateColumns={{
          base: 'repeat(1, minmax(0, 375px))',
          sm: 'repeat(3, minmax(0, 375px))',
          md: 'repeat(3, minmax(0, 375px))',
          lg: 'repeat(3, minmax(0, 375px))',
          xl: 'repeat(4, minmax(0, 375px))',
        }}
        mt="48px"
      >
        <BoxContent
          step={1}
          title="Connect your wallet"
          content={`Connect your wallet to the Regen Score platform in order to track your activity on the blockchain and calculate your current Regen Score.`}
        />
        <BoxContent
          step={2}
          title="Check out your profile"
          content={`See your Regen Score and learn more about how it is calculated. Check out the attestations earned, which are statements that verify your impact.`}
        />
        <BoxContent
          step={3}
          title="Share & inspire"
          content={`Share the impact of your activities on the world and encourage others to get involved!`}
        />
        <BoxContent
          step={4}
          title="Help us improve"
          content={(
            <>
              Join the Regen Score community and{' '}
              <Text fontWeight="bold" as="span">
              <a href="https://tally.so/r/w4JpDA">share your feedback and suggestions</a></Text>{' '}
              on how we can make it even better.
            </>
          )}
          last={true}
        />
      </Grid>
    </Flex>
  );
};

const BoxContent = ({
  step,
  title,
  content,
  last = false,
}: {
  step: number;
  title: string;
  content: React.ReactNode;
  last?: boolean;
}) => (
  <Flex
    minHeight={{ base: '320px', sm: '380px' }}
    flexDir="column"
    p={{ base: 0 }}
    pr={['32px']}
    borderRadius="25px"
    textAlign="start"
    justifyContent="flex-start"
    gap="32px"
    mb={{ base: 0, sm: '4', md: '0' }}
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
      zIndex={1}
      _before={{
        content: '""',
        position: 'absolute',
        width: last ? '0' : { base: 0, sm: '250px', md: '314px', xl: '277px' },
        height: '2px',
        backgroundColor: 'brand.primaryOrange.200',
        top: '48%',
        left: '45px',
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
      pt="70px"
      
    >
      {title}
    </Text>
    <Text fontSize="16px" lineHeight="32px" paddingRight={{ base: "0px", sm: "10px", md: "10px", lg: "10px", xl: "10px" }}>
      {content}
    </Text>
  </Flex>
);

export default HowItWorks;
