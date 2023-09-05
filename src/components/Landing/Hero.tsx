import { Flex } from '@chakra-ui/react';
import Slider from './HeroSlider';

export default function Hero() {
  return (
    <Flex
      w="100%"
      justifySelf="flex-end"
      pl={{ base: '0px', sm: '40px', md: '40px', lg: '54px', xl: '54px' }}
      boxShadow={{ base: '0px 4px 4px rgba(0, 0, 0, 0.25)', xl: 'none' }}
    >
      <Slider />
    </Flex>
  );
}
