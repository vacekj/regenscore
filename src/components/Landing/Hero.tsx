import { Container, Heading } from '@chakra-ui/react';

export default function Hero() {
  return (
    <Container minH={'1389px'}>
      <Heading
        as='h1'
        variant='h1'
        color='brand.primaryOrange.200'
        w={'100%'}
        minW='200px'
      >
        On-chain reputation layer for regens in public goods
      </Heading>
    </Container>
  );
}
