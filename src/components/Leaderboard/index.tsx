import { Flex } from '@chakra-ui/react';
import Hero from '../Landing/Hero';
import TrackedActivity from '@/components/TrackedActivity';

export default function Landing() {
  return (
    <Flex flexDir="column">
      <Flex bg={'brand.deepGreen.400'} pt="96px" justifyContent="flex-end">
        <Hero />
      </Flex>
      <TrackedActivity />
    </Flex>
  );
}
