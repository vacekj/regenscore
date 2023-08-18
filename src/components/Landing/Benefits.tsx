import { Box, Flex, Heading, Text, Grid } from '@chakra-ui/react';

const Benefits: React.FC = () => {
  const BoxContent = ({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) => (
    <Flex
      minHeight='380px'
      flexDir='column'
      p='32px'
      pb='48px'
      borderRadius='25px'
      textAlign='start'
      justifyContent='center'
      bg='brand.beige.400'
      gap='32px'
      mb={{ base: '4', md: '0' }}
    >
      <Text
        variant='bold'
        fontSize='24px'
        mb={'32px'}
        pb='32px'
        display='inline-block'
        position='relative'
        color='brand.deepGreen.400'
      >
        {title}
        <Box
          width='216px'
          height='7px'
          bgColor='brand.primaryOrange.200'
          position='absolute'
          bottom='0'
          left='0'
        />
      </Text>
      <Text fontSize='16px' lineHeight='32px'>
        {content}
      </Text>
    </Flex>
  );

  return (
    <Flex
      flexDir='column'
      align='start'
      justify='center'
      p={4}
      w='100%'
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
        Benefits for Regen Community{' '}
      </Heading>
      <Grid
        templateColumns={{
          base: 'repeat(1, minmax(0, 420px))',
          sm: 'repeat(2, minmax(0, 420px))',
          md: 'repeat(3, minmax(0, 420px))',
        }}
        mt='48px'
        gap='24px'
      >
        <BoxContent
          title='Transparent Evaluations'
          content='Qualify for Optimism’s Citizen’s House based on your blockchain activity, and Regen score allowing for an automated inclusion into the Citizen’s House.'
        />
        <BoxContent
          title='Gamification'
          content='Qualify for Optimism’s Citizen’s House based on your blockchain activity, and Regen score allowing for an automated inclusion into the Citizen’s House.'
        />
        <BoxContent
          title='More Opportunities'
          content='Qualify for Optimism’s Citizen’s House based on your blockchain activity, and Regen score allowing for an automated inclusion into the Citizen’s House.'
        />
      </Grid>
    </Flex>
  );
};

export default Benefits;
