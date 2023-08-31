import { Box, Flex, Grid, GridItem, Heading, VStack } from "@chakra-ui/react";
import { useState } from "react";

const Slide1 = () => {
  return (
    <Flex
      flexDirection="row"
      w="full"
      h={{ base: "416px", sm: "616px" }}
      borderRadius={{ base: "0", md: "32px 0 0 0" }}
      bg={`url(/images/leaf-bg.png)`}
      bgRepeat="no-repeat"
      bgSize="cover"
      pl={{ base: "4", md: "82" }}
      pt="96px"
      justifyContent="start"
      borderWidth="1px 0px 1px 1px"
      borderColor="rgba(143, 164, 133)"
      borderStyle="solid"
      borderBottomWidth={{ base: "0", md: "1px" }}
      boxShadow={"-3px 2px 4px 0 rgba(0, 0, 0, 0.25)"}
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        borderRadius="30px 0 0 0"
        bgColor="rgba(53,71,40, 0.8)"
      />

      <Box flex="1" zIndex="100">
        <Heading
          as="h2"
          variant="h2"
          color="brand.primaryOrange.300"
          maxWidth={{ base: "342px", sm: "647px", md: "1100px" }}
          minHeight="92px"
          textAlign="left"
          zIndex={2}
          mb={"49px"}
          w={"50%"}
          fontSize="48px"
        >
          Mint your attestations to <br /> access opportunuties
        </Heading>

        <Grid
          templateColumns="repeat(20, 1fr)"
          w="53%"
          gap={4}
          color="white"
          zIndex="100"
        >
          <GridItem
            colStart={1}
            colEnd={2}
            h="10"
            display="flex"
            gap="8px"
            alignItems="center"
          >
            <Exclamation />
            Utilization
          </GridItem>
          <GridItem
            colStart={3}
            colEnd={18}
            h="10"
            display="flex"
            alignItems="center"
            gap={4}
          >
            <Box bg="white" borderRadius="100px" h="10px" w="80%"></Box>300
          </GridItem>
          <GridItem
            colStart={1}
            colEnd={2}
            h="10"
            display="flex"
            gap="8px"
            alignItems="center"
          >
            <Exclamation />
            Security
          </GridItem>
          <GridItem
            colStart={3}
            colEnd={18}
            h="10"
            display="flex"
            alignItems="center"
            gap={4}
          >
            <Box bg="white" borderRadius="100px" h="10px" w="100%"></Box>450
          </GridItem>
          <GridItem
            colStart={1}
            colEnd={2}
            h="10"
            display="flex"
            gap="8px"
            alignItems="center"
          >
            <Exclamation />
            Governance
          </GridItem>
          <GridItem
            colStart={3}
            colEnd={18}
            h="10"
            display="flex"
            alignItems="center"
            gap={4}
          >
            <Box bg="white" borderRadius="100px" h="10px" w="100%"></Box>450
          </GridItem>
          <GridItem
            colStart={1}
            colEnd={2}
            h="10"
            display="flex"
            gap="8px"
            alignItems="center"
          >
            <Exclamation />
            Contribution
          </GridItem>
          <GridItem
            colStart={3}
            colEnd={18}
            h="10"
            display="flex"
            alignItems="center"
            gap={4}
          >
            <Box bg="white" borderRadius="100px" h="10px" w="70%"></Box>280
          </GridItem>
          <GridItem
            colStart={1}
            colEnd={2}
            h="10"
            display="flex"
            gap="8px"
            alignItems="center"
          >
            <Exclamation />
            Outreach
          </GridItem>
          <GridItem
            colStart={3}
            colEnd={18}
            h="10"
            display="flex"
            alignItems="center"
            gap={4}
          >
            <Box bg="white" borderRadius="100px" h="10px" w="60%"></Box>200
          </GridItem>
        </Grid>
      </Box>
    </Flex>
  );
};

const slides = [
  {
    title: "Slide 1",
    description: "Description for slide 1.",
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
          display={index === currentSlide ? "flex" : "none"}
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

export default HeroSlider;

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
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16 8.5C16 12.9183 12.4183 16.5 8 16.5C3.58172 16.5 0 12.9183 0 8.5C0 4.08172 3.58172 0.5 8 0.5C12.4183 0.5 16 4.08172 16 8.5ZM15 8.5C15 12.366 11.866 15.5 8 15.5C4.13401 15.5 1 12.366 1 8.5C1 4.63401 4.13401 1.5 8 1.5C11.866 1.5 15 4.63401 15 8.5Z"
        fill="white"
      />
      <path
        id="Line 27 (Stroke)"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8 13.5C7.72386 13.5 7.5 13.2761 7.5 13L7.5 7C7.5 6.72386 7.72386 6.5 8 6.5C8.27614 6.5 8.5 6.72386 8.5 7L8.5 13C8.5 13.2761 8.27614 13.5 8 13.5Z"
        fill="white"
      />
      <circle id="Ellipse 36" cx="8" cy="4.5" r="1" fill="white" />
    </g>
  </svg>
);
