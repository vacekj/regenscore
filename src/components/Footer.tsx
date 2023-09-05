import { Box, Container, Grid, GridItem, Image, Link, Stack, HStack, Flex, Center } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Container
      fontSize="16px"
      maxW="none"
      p={0}
      m={0}
      paddingRight={{ base: "0px", sm: "40px", md: "40px", lg: "54px", xl: "54px" }}
      bg="backgroundOrange.400"
    >
      <Grid gridTemplateColumns={{ base: "1fr", sm: "6fr 3fr 3fr" }} h="408px" display={{ base: "none", sm: "grid" }}>
        <GridItem bg="white">
          <Box mt={"90px"} ml={{ base: "0px", sm: "54px" }}>
            <Box>
              <Image
                src={"/icons/leaf.svg"}
                alt="leaf"
                style={{
                  display: "inline-block",
                  marginRight: "14px",
                }}
              />
              <Image
                src={"/icons/regenscore.svg"}
                alt="leaf"
                style={{
                  display: "inline-block",
                  marginBottom: "4px",
                }}
              />
            </Box>
            <div style={{ marginTop: "40px" }}>
              <div style={{ marginBottom: "10px" }}>
                Empower your credibility. Elevate your potential.
              </div>
              <div style={{ marginBottom: "30px" }}>REGEN Score</div>
              <Twitter />
              <div style={{ marginBottom: "10px", marginTop: "30px" }}>
                All rights reserved @2023
              </div>
            </div>
          </Box>
        </GridItem>

        <GridItem bg="white">
        <div style={{ marginTop: "100px", marginLeft: "0px" }}>
            <div
              style={{
                marginBottom: "20px",
                fontWeight: "bold",
              }}
            >
              About Us
            </div>
            <div style={{ marginTop: "10px" }}>
              <div style={{ marginBottom: "10px" }}>
                <Link href="#" _hover={{ textDecoration: "none" }}>
                  Docs
                </Link>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <Link href="#" _hover={{ textDecoration: "none" }}>
                  Scores
                </Link>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <Link href="#" _hover={{ textDecoration: "none" }}>
                  Resources
                </Link>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <Link href="#" _hover={{ textDecoration: "none" }}>
                  Activity
                </Link>
              </div>
            </div>
          </div>
        </GridItem>

        <GridItem bg="white" borderTopRightRadius={{ base: "0px", sm: "32px" }}>
          <div style={{ marginTop: "100px", marginLeft: "30px" }}>
            <div
              style={{
                marginBottom: "20px",
                fontWeight: "bold",
              }}
            >
              Help & Support
            </div>
            <div style={{ marginTop: "10px" }}>
              <div style={{ marginBottom: "10px" }}>
                <Link href="#" _hover={{ textDecoration: "none" }}>
                  Leaderboard
                </Link>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <Link href="#" _hover={{ textDecoration: "none" }}>
                  Opportunities
                </Link>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <Link href="#" _hover={{ textDecoration: "none" }}>
                  Privacy - Terms
                </Link>
              </div>
            </div>
          </div>
        </GridItem>
      </Grid>

      <Stack
  spacing={4}
  align="center"
  justify="center"
  py={4}
  display={{ base: "block", sm: "none" }}
  bg="white"
  direction="column"
>
  <HStack spacing={4} align="center" justify="center" mt="56px" mr="55px">
    <Image src={"/icons/leaf.svg"} alt="leaf" />
    <Image src={"/icons/regenscore.svg"} alt="leaf" />
  </HStack>
  <div style={{ textAlign: "center", margin: "20px 45px 0 45px"}}>
    Empower your credibility. Elevate your potential. REGEN Score
  </div>
  <Flex justify="space-around">
    <div style={{ marginTop: "40px", textAlign: "center" , marginBottom: "37px"}}>
      <div
        style={{
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        About Us
      </div>
      <div style={{ marginTop: "10px", textAlign: "left" }}>
        <div style={{ marginBottom: "10px" }}>
          <Link href="#" _hover={{ textDecoration: "none" }}>
            Docs
          </Link>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <Link href="#" _hover={{ textDecoration: "none" }}>
            Scores
          </Link>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <Link href="#" _hover={{ textDecoration: "none" }}>
            Resources
          </Link>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <Link href="#" _hover={{ textDecoration: "none" }}>
            Activity
          </Link>
        </div>
      </div>
    </div>
    <div style={{ marginTop: "40px", textAlign: "start" }}>
      <div
        style={{
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        Help & Support
      </div>
      <div style={{ marginTop: "10px", textAlign: "left" }}>
        <div style={{ marginBottom: "10px" }}>
          <Link href="#" _hover={{ textDecoration: "none" }}>
            Leaderboard
          </Link>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <Link href="#" _hover={{ textDecoration: "none" }}>
            Opportunities
          </Link>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <Link href="#" _hover={{ textDecoration: "none" }}>
            Privacy - Terms
          </Link>
        </div>
      </div>
    </div>
  </Flex>
  <Center>
    <Twitter />
  </Center>
  <div style={{ textAlign: "center", marginTop: "32px", marginBottom: "30px"}}>All rights reserved @2023</div>
</Stack>
    </Container>
  );
}

const Twitter = () => (
  <svg
    width="36"
    height="41"
    viewBox="0 0 36 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M30.0306 14.2042C30.0501 14.4959 30.0501 14.7859 30.0501 15.0759C30.0501 23.9509 23.9744 34.1776 12.8709 34.1776C9.45 34.1776 6.27198 33.0759 3.59766 31.1626C4.08335 31.2242 4.55106 31.2459 5.05624 31.2459C7.77403 31.2532 10.4149 30.2428 12.5531 28.3776C11.293 28.3522 10.0715 27.89 9.0591 27.0554C8.04673 26.2209 7.29402 25.0557 6.90609 23.7226C7.27935 23.7842 7.65412 23.8259 8.04688 23.8259C8.58804 23.8259 9.1322 23.7426 9.63738 23.5976C8.26988 23.2906 7.04022 22.4665 6.15748 21.2654C5.27475 20.0643 4.79345 18.5603 4.79541 17.0092V16.9259C5.6004 17.4242 6.53432 17.7359 7.5237 17.7776C6.69485 17.1652 6.01523 16.3343 5.54545 15.3589C5.07567 14.3835 4.83036 13.294 4.83139 12.1876C4.83139 10.9409 5.1297 9.79755 5.65287 8.80089C7.17013 10.8759 9.0625 12.5735 11.2074 13.7836C13.3523 14.9938 15.7019 15.6896 18.1041 15.8259C18.0111 15.3259 17.9542 14.8076 17.9542 14.2876C17.9538 13.4058 18.1097 12.5326 18.413 11.718C18.7163 10.9033 19.1611 10.163 19.7219 9.53953C20.2826 8.91605 20.9484 8.42157 21.6812 8.08435C22.414 7.74713 23.1993 7.57378 23.9924 7.57422C25.7313 7.57422 27.3008 8.38422 28.4042 9.69422C29.756 9.40358 31.0523 8.85492 32.2358 8.07255C31.7852 9.62391 30.8413 10.9394 29.5809 11.7726C30.7798 11.6205 31.9516 11.27 33.0572 10.7326C32.2315 12.071 31.2082 13.2448 30.0306 14.2042Z"
      fill="#ACD15E"
    />
  </svg>
);