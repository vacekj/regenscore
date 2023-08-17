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
  const [currentDrop, setCurrentDrop] = useState<number | null>(null);
  const levitationStyles = ['levitation1', 'levitation2', 'levitation3'];

  const dropsImages = [
    {
      src: '/images/trusted-seed-logo.svg',
      alt: 'trustedseed',
      top: '13%',
      left: '24%',
      width: { base: 33 },
      height: { base: 33 },
      dropSize: { base: 93 },
      content: 'Some more content for Trustedseed',
    },
    {
      src: '/images/giveth-logo.svg',
      alt: 'giveth',
      top: '10%',
      right: '5%',
      width: { base: 67 },
      height: { base: 67 },
      dropSize: { base: 141 },
      content: 'Some more content for Giveth',
    },
    {
      src: '/images/optimism-logo.svg',
      alt: 'optimism',
      right: { base: '2%', xl: '15%' },
      bottom: { base: 0, xl: '10%' },
      width: { base: 64, xl: 115 },
      height: { base: 64, xl: 115 },
      dropSize: { base: 151, xl: 217 },
      content: 'Some more content for Optimism',
    },
    {
      src: '/images/gitcoin-logo.svg',
      alt: 'gitcoin',
      bottom: '-6',
      right: '50%',
      width: { base: 54, lg: 62 },
      height: { base: 54, lg: 62 },
      dropSize: { base: 115, lg: 120 },
      content: 'Some more content for Gitcoin',
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
      {dropsImages.map((image, index) => (
        <Flex
          key={index}
          position='absolute'
          zIndex={4}
          {...image}
          width={image.dropSize}
          height={image.dropSize}
          transition={'all 0.4s ease'}
          onMouseEnter={() => setCurrentDrop(index)}
          onMouseLeave={() => setCurrentDrop(null)}
          _hover={{ transform: 'scale(1.1)' }}
        >
          <Flex
            justifyContent='center'
            bg='rgba(255, 255, 255, 0.2)'
            boxShadow={'0 4px 30px rgba(0, 0, 0, 0.1)'}
            border='1px solid rgba(255, 255, 255, 0.3)'
            borderRadius='50%'
            backdropFilter={'blur(4px)'}
            alignItems='center'
            width={image.dropSize}
            height={image.dropSize}
            animation={`${
              levitationStyles[index % levitationStyles.length]
            } 5s infinite`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
            />
          </Flex>
        </Flex>
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
        minHeight='92px'
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
        minHeight='115px'
        textAlign='initial'
        zIndex={2}
        fontSize={{ base: '18px', md: '32px', lg: '44px' }}
      >
        {currentDrop !== null
          ? dropsImages[currentDrop].content
          : 'Qualify for Optimism’s Citizen’s House based on your blockchain activity'}{' '}
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
