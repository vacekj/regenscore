import { Flex } from '@chakra-ui/react';
import Hero from './Hero';
import Benefits from './Benefits';
import HowItWorks from './HowItWorks';

export default function Landing() {
  return (
    <Flex flexDir="column">
      <Flex bg="linear-gradient(to bottom right, #577442 0%, #354728 25%)" pt="96px" justifyContent="flex-end">
        <Hero />
      </Flex>
      <Benefits />
      <HowItWorks />
    </Flex>
  );
}
