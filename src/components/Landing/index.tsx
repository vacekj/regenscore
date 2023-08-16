import { Flex } from '@chakra-ui/react';
import Hero from './Hero';

export default function Landing() {
  return (
    <Flex bg={'brand.deepGreen.400'} pt='180' justifyContent='flex-end'>
      <Hero />
    </Flex>
  );
}
