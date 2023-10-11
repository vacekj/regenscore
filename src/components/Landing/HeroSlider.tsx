import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';


const Slide1 = () => {
  const [currentDrop, setCurrentDrop] = useState<number | null>(null);
  const levitationStyles = ['levitation1', 'levitation2', 'levitation3'];

  const dropsImages = [
    {
      src: '/images/trusted-seed-logo.svg',
      alt: 'trustedseed',
      top: { base: '5%', sm: '13%' },
      left: { base: '15%', sm: '24%' },
      width: { base: 16.5, sm: 33 },
      height: { base: 16.5, sm: 33 },
      dropSize: { base: 46.5, sm: 93 },
      content: 'Some more content for Trustedseed',
    },
    {
      src: '/images/giveth-logo.svg',
      alt: 'giveth',
      top: { base: '70%', sm: '10%' },
      right: { base: '70%', sm: '5%' },
      width: { base: 31.5, sm: 42, lg: 67 },
      height: { base: 31.5, sm: 42, lg: 67 },
      dropSize: { base: 75, sm: 100, lg: 141 },
      content: 'Some more content for Giveth',
    },
    {
      src: '/images/optimism-logo.svg',
      alt: 'optimism',
      right: { base: '2%', xl: '15%' },
      bottom: { base: '20%', sm: 0, xl: '10%' },
      width: { base: 62, xl: 115 },
      height: { base: 62, xl: 115 },
      dropSize: { base: 32, xl: 217 },
      content: 'Some more content for Optimism',
    },
    {
      src: '/images/gitcoin-logo.svg',
      alt: 'gitcoin',
      bottom: { base: '80% ', sm: '-6' },
      right: { base: '10%', sm: '50%' },
      width: { base: 40.5, sm: 54, lg: 62 },
      height: { base: 40.5, sm: 54, lg: 62 },
      dropSize: { base: 75, sm: 100, lg: 120 },
      content: 'Some more content for Gitcoin',
    },
  ];

  return (
    <Flex
      flexDirection="column"
      w="full"
      h={{ base: '416px', sm: '616px' }}
      borderTopLeftRadius={{
        base: '0px',
        sm: '32px',
        md: '32px',
        lg: '32px',
        xl: '32px',
      }}
      bg={`url(/images/leaf-bg.webp)`}
      bgRepeat="no-repeat"
      bgSize="cover"
      pl={{ base: '30px', sm: '41px', md: '61px', lg: '75px', xl: '88px' }}
      justifyContent="center"
      borderWidth={{
        base: '0px 0px 0px 0px',
        sm: '1px 0px 1px 1px',
        md: '1px 0px 1px 1px',
        lg: '1px 0px 1px 1px',
        xl: '1px 0px 1px 1px',
      }}
      borderColor="rgba(143, 164, 133)"
      borderStyle="solid"
      borderBottomWidth={{ base: '0', md: '1px' }}
      boxShadow={[0, '-3px 0px 4px 0 rgba(0, 0, 0, 0.25)']}
      marginX="auto"
      maxWidth="1386px"
    >

      {dropsImages.map((image, index) => (
        <Flex
          key={index}
          position="absolute"
          zIndex={{ base: 1, sm: 4 }}
          {...image}
          width={image.dropSize}
          height={image.dropSize}
          transition={'all 0.4s ease'}
          //onMouseEnter={() => setCurrentDrop(index)}
          //onMouseLeave={() => setCurrentDrop(null)}
          _hover={{ transform: 'scale(1.1)' }}
          filter={{ base: 'brightness(70%)', sm: 'none' }}
        >
          <Flex
            justifyContent="center"
            bg="rgba(255, 255, 255, 0.1)"
            boxShadow={'0 4px 30px rgba(0, 0, 0, 0.1)'}
            border="1px solid rgba(255, 255, 255, 0.3)"
            borderRadius="50%"
            backdropFilter={'blur(5px)'}
            alignItems="center"
            width={image.dropSize}
            height={image.dropSize}
            animation={`${levitationStyles[index % levitationStyles.length]
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
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        borderTopLeftRadius={{
          base: '0px',
          sm: '32px',
          md: '32px',
          lg: '32px',
          xl: '32px',
        }}
        bgColor="rgba(53,71,40, 0.8)"
        marginX="auto"
        maxWidth="1386px"
      />
      <Heading
        as="h1"
        variant="h1"
        color="brand.primaryOrange.300"
        maxWidth={{ base: '342px', sm: '647px', md: '1100px' }}
        minHeight="92px"
        textAlign="left"
        zIndex={2}
        mb={'48px'}
        w={'100%'}
        fontSize={{ base: '44px', md: '56px', lg: '79px', xl: '92px' }}
      >
        On-chain reputation layer for regens in public goods
      </Heading>
      <Text
        variant="xLarge"
        color="white"
        width={{ base: '100%', xl: '1221px' }}
        maxWidth={{ base: '100%', sm: '800px' }}
        minHeight={'115px'}
        lineHeight={{ base: '32px', sm: '57px' }}
        textAlign="initial"
        zIndex={2}
        fontSize={{ base: '18px', sm: '32px', lg: '44px' }}
        fontFamily="Inter-Light"
      >
        {currentDrop !== null
          ? dropsImages[currentDrop].content
          : 'Transparent Individual Evaluation and Democratization of Governance'}{' '}
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
      w="full"
      h="full"
      flexDir="column"
      pos="relative"
      align="center"
      justify="center"
      direction="column"
    >
      {slides.map((slide, index) => (
        <VStack
          key={index}
          display={index === currentSlide ? 'flex' : 'none'}
          w="full"
          align="center"
          justify="center"
        >
          {slide.content()}
        </VStack>
      ))}
      <HStack position="absolute" bottom="80px" left="53px" spacing={2}>
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
