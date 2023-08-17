import {
  Box,
  Flex,
  VStack,
  HStack,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

const Slide1 = () => {
  const images = [
    {
      src: '/images/trusted-seed-logo.svg',
      alt: 'trustedseed',
      top: '10%',
      left: '22%',
      width: { base: 93 },
      height: { base: 93 },
    },
    {
      src: '/images/giveth-logo.svg',
      alt: 'giveth',
      top: '10%',
      right: '5%',
      width: { base: 141 },
      height: { base: 141 },
    },
    {
      src: '/images/optimism-logo.svg',
      alt: 'optimism',
      right: { base: '2%', xl: '15%' },
      bottom: { base: 0, xl: '10%' },
      width: { base: 151, xl: 217 },
      height: { base: 151, xl: 217 },
    },
    {
      src: '/images/gitcoin-logo.svg',
      alt: 'gitcoin',
      bottom: '-10',
      right: '50%',
      width: { base: 115, lg: 161 },
      height: { base: 115, lg: 161 },
    },
  ];
  return (
    <Flex
      flexDirection='column'
      w='full'
      h='616px'
      border='1px solid rgba(255, 255, 255, 0.2)'
      borderRadius={{ base: 0, md: '32px 0 0 0' }}
      bg={`url(/images/leaf-bg.png)`}
      bgRepeat='no-repeat'
      bgSize='cover'
      pl={{ base: '4', md: '82' }}
      justifyContent='center'
      position='relative'
    >
      {images.map((image, index) => (
        <Box key={index} position='absolute' blur={10} {...image} zIndex={4}>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
          />
        </Box>
      ))}
      <Box
        position='absolute'
        top='0'
        left='0'
        right='0'
        bottom='0'
        borderRadius='32px 0 0 0'
        bgColor='rgba(53,71,40, 0.8)'
      />
      <Heading
        as='h1'
        variant='h1'
        color='brand.primaryOrange.300'
        maxWidth={'1100px'}
        textAlign='left'
        zIndex={2}
        mb={'48px'}
        w={'100%'}
        fontSize={{ base: '44px', md: '56px', lg: '79px', xl: '92px' }}
      >
        On-chain reputation layer for regens in public goods
      </Heading>
      <Text
        variant='xLarge'
        color='white'
        width={{ base: '100%', md: '100%', lg: '800px' }}
        textAlign='initial'
        zIndex={2}
        fontSize={{ base: '18px', md: '32px', lg: '44px' }}
      >
        Qualify for Optimism’s Citizen’s House based on your blockchain activity
      </Text>
    </Flex>
  );
};

const slides = [
  {
    title: 'Slide 1',
    description: 'Description for slide 1.',
    content: Slide1,
  },
];

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Flex
      w='full'
      h='full'
      flexDir='column'
      pos='relative'
      align='center'
      justify='center'
      direction='column'
    >
      {slides.map((slide, index) => (
        <VStack
          key={index}
          display={index === currentSlide ? 'flex' : 'none'}
          w='full'
          align='center'
          justify='center'
        >
          {slide.content()}
        </VStack>
      ))}
      <HStack position='absolute' bottom='80px' left='53px' spacing={2}>
        {/* 
        // TODO: Waiting for more content to bring this
        {slides.map((_, index) => (
          <Box
            key={index}
            w='10px'
            h='10px'
            borderRadius='full'
            bgColor={index === currentSlide ? 'white' : 'gray.400'}
            cursor='pointer'
            onClick={() => setCurrentSlide(index)}
          />
        ))} */}
      </HStack>
    </Flex>
  );
};

export default HeroSlider;
