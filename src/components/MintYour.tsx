import { Check } from '@/components/Check';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  VStack,
  Card,
  CardBody,
  CardHeader,
  Text,
  Button,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useScore } from '@/hooks';

const Slide1 = () => {
  const { address } = useAccount();
  const { score, categories } = useScore(address);

  return (
    <Grid

      templateColumns="auto 1fr"
      gap={4}
      w="full"
      h={{ base: 'auto', md: '616px' }}
      borderRadius={{ base: '0', md: '32px 0 0 0' }}
      bg={`url(/images/leaf-bg.png)`}
      bgRepeat="no-repeat"
      bgSize="cover"
      pl={{ base: '4', md: '82' }}
      pr="54px"
      borderWidth="1px 0px 1px 1px"
      borderColor="rgba(143, 164, 133)"
      borderStyle="solid"
      borderBottomWidth={{ base: "0", md: "1px" }}
      boxShadow="0px 0px 4px rgba(0, 0, 0, 0.25)"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        borderRadius={{ base: '0', md: '30px 0 0 0' }}
        bgColor="rgba(53, 71, 40, 0.8)"
        zIndex={1}
      />

      <Flex
        flex="1"
        flexDirection="column"
        justifyContent="center"
        alignItems={{ base: 'center', md: 'flex-start' }}
        zIndex={2}
      >
        <Heading
          as="h2"
          variant="h2"
          color="brand.primaryOrange.300"
          maxWidth={{ base: '342px', sm: '647px', md: '1100px' }}
          minHeight="92px"
          textAlign="left"
          mb={'49px'}
          fontSize="48px"
        >
          Mint your attestations to <br /> access opportunities
        </Heading>

        <Grid templateColumns="repeat(20, 1fr)" gap={4} color="white">
          {categories.map((categoryItem, index) => (
            <>
              <GridItem
                colStart={1}
                colEnd={2}
                h="10"
                display="flex"
                gap="8px"
                alignItems="center"
                key={index}
              >
                <Exclamation />
                {categoryItem.category}
              </GridItem>
              <GridItem
                colStart={3}
                colEnd={20}
                h="10"
                display="flex"
                alignItems="center"
                gap={4}
                key={index + 'grid'}
              >
                <Box
                  w={'100%'}
                  display={'flex'}
                  gap={'16px'}
                  alignItems={'center'}
                  justifyContent={'flex-start'}
                >
                  <Box
                    bg="white"
                    flexBasis={`${categoryItem.scoreAdded}%`}
                    borderRadius="100px"
                    h="10px"
                  />
                  {categoryItem.scoreAdded}
                </Box>
              </GridItem>
            </>
          ))}
        </Grid>
      </Flex>
      <Flex flex="1" zIndex={2} flexDirection="column" justifyContent="center">
        <Card
          width="654px"
          height="451px"
          borderRadius="16.235px"
          margin="0 auto"
          background="linear-gradient(180deg, #F9DD94 0%, #FFC555 100%)"
          border="0.812px solid rgba(255, 255, 255, 0.50)"
          mt="17.5px"
        >
          <CardHeader padding="0px">
            <Box>
              <Heading
                as="h3"
                variant="h3"
                fontWeight="bold"
                fontSize="100px"
                color="#FFF"
                marginTop="98px"
                marginLeft="337px"
              >
                {score || 0}
              </Heading>
            </Box>
          </CardHeader>
          <CardBody padding="0px" marginLeft="339px">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.89px',
              }}
            >
              {/* <Check status={'WARNING2'} />
              <Text
                fontSize="19.482px"
                fontFamily="Inter-Regular"
                color="#354728"
                gap="10px"
              >
                Top 10% of users
              </Text> */}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.89px',
              }}
            >
              {/* <Text
                fontSize="13px"
                fontFamily="Inter-Regular"
                color="#354728"
                opacity="0.5"
              >
                Last Updated
              </Text>
              <Text
                fontSize="13px"
                fontFamily="Inter-Regular"
                color="#354728"
                ml="18px"
                opacity="0.5"
              >
                3 Months Ago
              </Text> */}
            </div>
            <div>
              <Button variant="variant3" marginTop="46.76px">
                MINT NOW
              </Button>
            </div>
          </CardBody>
        </Card>
      </Flex>
    </Grid>
  );
};

const slides = [
  {
    content: Slide1,
  },
];

const MintYour: React.FC = () => {
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
    </Flex>
  );
};

export default MintYour;

const Exclamation = () => (
  <svg
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Group 1000004440">
      <path
        id="Vector"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 8.5C16 12.9183 12.4183 16.5 8 16.5C3.58172 16.5 0 12.9183 0 8.5C0 4.08172 3.58172 0.5 8 0.5C12.4183 0.5 16 4.08172 16 8.5ZM15 8.5C15 12.366 11.866 15.5 8 15.5C4.13401 15.5 1 12.366 1 8.5C1 4.63401 4.13401 1.5 8 1.5C11.866 1.5 15 4.63401 15 8.5Z"
        fill="white"
      />
      <path
        id="Line 27 (Stroke)"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 13.5C7.72386 13.5 7.5 13.2761 7.5 13L7.5 7C7.5 6.72386 7.72386 6.5 8 6.5C8.27614 6.5 8.5 6.72386 8.5 7L8.5 13C8.5 13.2761 8.27614 13.5 8 13.5Z"
        fill="white"
      />
      <circle id="Ellipse 36" cx="8" cy="4.5" r="1" fill="white" />
    </g>
  </svg>
);
