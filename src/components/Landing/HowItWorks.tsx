import { Box, Flex, Heading, Text, Grid } from '@chakra-ui/react';

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
      minHeight='380px'
      flexDir='column'
      p='32px'
      pb='48px'
      borderRadius='25px'
      textAlign='start'
      justifyContent='center'
      gap='32px'
      mb={{ base: '4', md: '0' }}
      position='relative'
    >
      <Text
        fontSize='32px'
        fontWeight='bold'
        position='absolute'
        top='0'
        left='16px'
        color='brand.primaryOrange.200'
        _before={{
          content: '""',
          position: 'absolute',
          width: last ? '0' : '310px',
          height: '2px',
          backgroundColor: 'brand.primaryOrange.200',
          top: '50%',
          left: '100%',
        }}
      >
        {step}
      </Text>
      <Text
        variant='bold'
        fontSize='24px'
        display='inline-block'
        position='relative'
      >
        {title}
      </Text>
      <Text fontSize='16px' lineHeight='32px'>
        {content}
      </Text>
    </Flex>
  );

  return (
    <Flex
      flexDir='column'
      align='flex-start'
      justify='center'
      p={4}
      maxWidth='1342px'
      margin='47px auto'
    >
      <Heading
        as='h1'
        variant='h2'
        mb={6}
        textAlign='left'
        color='brand.primaryOrange.200'
      >
        How It Works
      </Heading>
      <Grid
        templateColumns={{
          base: 'repeat(1, minmax(0, 375px))',
          sm: 'repeat(2, minmax(0, 375px))',
          md: 'repeat(4, minmax(0, 375px))',
        }}
        mt='48px'
      >
        <BoxContent
          step={1}
          title='Set up your wallet'
          content={`Follow the wallets setup process, either by creating a new wallet or importing an existing one`}
        />
        <BoxContent
          step={2}
          title='Check your Attestation'
          content={`Follow the wallet's setup process, either by creating a new wallet or importing an existing one.`}
        />
        <BoxContent
          step={3}
          title='Improve your Regen score'
          content={`Follow the wallet's setup process, either by creating a new wallet or importing an existing one.`}
        />
        <BoxContent
          step={4}
          title='Leaderboard'
          content={`Follow the wallet's setup process, either by creating a new wallet or importing an existing one.`}
          last={true}
        />
      </Grid>
    </Flex>
  );
};

export default HowItWorks;
