import {
  Box,
  Container,
  Grid,
  GridItem,
  Image,
  Link,
  Stack,
  HStack,
  Flex,
  Center,
} from '@chakra-ui/react';

export default function Footer() {
  return (
    <>
      <Container
        fontSize="16px"
        maxW="1440px"
        p={0}
        m={{ base: '0px', sm: '0px', md: '0px', lg: '0px', xl: 'auto' }}
        paddingRight={{
          base: '0px',
          sm: '40px',
          md: '40px',
          lg: '54px',
          xl: '0px',
        }}
        zIndex="2"
      >
        <Grid
          gridTemplateColumns={{ base: '1fr', sm: '6fr 3fr 3fr' }}
          h="408px"
          display={{ base: 'none', sm: 'grid' }}
        >
          <GridItem bg="white">
            <Box mt={'90px'} ml={{ base: '0px', sm: '54px' }}>
              <Box>
                <Image
                  src={'/icons/leaf.svg'}
                  alt="leaf"
                  style={{
                    display: 'inline-block',
                    marginRight: '14px',
                  }}
                />
                <Image
                  src={'/icons/regenscore.svg'}
                  alt="leaf"
                  style={{
                    display: 'inline-block',
                    marginBottom: '4px',
                  }}
                />
              </Box>
              <div style={{ marginTop: '40px' }}>
                <div style={{ marginBottom: '10px' }}>
                  Empower your credibility. Elevate your potential.
                </div>
                <div style={{ marginBottom: '30px' }}>REGEN Score</div>
                <Twitter />
                <div style={{ marginBottom: '10px', marginTop: '30px' }}>
                  All rights reserved @2023
                </div>
              </div>
            </Box>
          </GridItem>

          <GridItem bg="white">
            <div style={{ marginTop: '100px', marginLeft: '0px' }}>
              <div
                style={{
                  marginBottom: '20px',
                  fontWeight: 'bold',
                }}
              >
                About Us
              </div>
              <div style={{ marginTop: '10px' }}>
                <div style={{ marginBottom: '10px' }}>
                  <Link href="#" _hover={{ textDecoration: 'none' }}>
                    Docs
                  </Link>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Link href="#" _hover={{ textDecoration: 'none' }}>
                    Scores
                  </Link>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Link href="#" _hover={{ textDecoration: 'none' }}>
                    Resources
                  </Link>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Link href="#" _hover={{ textDecoration: 'none' }}>
                    Activity
                  </Link>
                </div>
              </div>
            </div>
          </GridItem>

          <GridItem
            bg="white"
            borderTopRightRadius={{
              base: '0px',
              sm: '32px',
              md: '32px',
              lg: '32px',
              xl: '0px',
            }}
          >
            <div style={{ marginTop: '100px', marginLeft: '30px' }}>
              <div
                style={{
                  marginBottom: '20px',
                  fontWeight: 'bold',
                }}
              >
                Help & Support
              </div>
              <div style={{ marginTop: '10px' }}>
                <div style={{ marginBottom: '10px' }}>
                  <Link href="#" _hover={{ textDecoration: 'none' }}>
                    Leaderboard
                  </Link>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Link href="#" _hover={{ textDecoration: 'none' }}>
                    Opportunities
                  </Link>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Link href="#" _hover={{ textDecoration: 'none' }}>
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
          display={{ base: 'block', sm: 'none' }}
          bg="white"
          direction="column"
        >
          <HStack
            spacing={4}
            align="center"
            justify="center"
            mt="56px"
            mr="55px"
          >
            <Image src={'/icons/leaf.svg'} alt="leaf" />
            <Image src={'/icons/regenscore.svg'} alt="leaf" />
          </HStack>
          <div style={{ textAlign: 'center', margin: '20px 45px 0 45px' }}>
            Empower your credibility. Elevate your potential. REGEN Score
          </div>
          <Flex justify="space-around">
            <div
              style={{
                marginTop: '40px',
                textAlign: 'center',
                marginBottom: '37px',
              }}
            >
              <div
                style={{
                  marginBottom: '20px',
                  fontWeight: 'bold',
                }}
              >
                About Us
              </div>
              <div style={{ marginTop: '10px', textAlign: 'left' }}>
                <div style={{ marginBottom: '10px' }}>
                  <Link href="#" _hover={{ textDecoration: 'none' }}>
                    Docs
                  </Link>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Link href="#" _hover={{ textDecoration: 'none' }}>
                    Scores
                  </Link>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Link href="#" _hover={{ textDecoration: 'none' }}>
                    Resources
                  </Link>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Link href="#" _hover={{ textDecoration: 'none' }}>
                    Activity
                  </Link>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '40px', textAlign: 'start' }}>
              <div
                style={{
                  marginBottom: '20px',
                  fontWeight: 'bold',
                }}
              >
                Help & Support
              </div>
              <div style={{ marginTop: '10px', textAlign: 'left' }}>
                <div style={{ marginBottom: '10px' }}>
                  <Link href="#" _hover={{ textDecoration: 'none' }}>
                    Leaderboard
                  </Link>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Link href="#" _hover={{ textDecoration: 'none' }}>
                    Opportunities
                  </Link>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Link href="#" _hover={{ textDecoration: 'none' }}>
                    Privacy - Terms
                  </Link>
                </div>
              </div>
            </div>
          </Flex>
          <Center>
            <Twitter />
          </Center>
          <div
            style={{
              textAlign: 'center',
              marginTop: '32px',
              marginBottom: '30px',
            }}
          >
            All rights reserved @2023
          </div>
        </Stack>
      </Container>
      <Box
        display={{ base: 'none', sm: 'none', xl: 'block' }}
        bg="white"
        height="408px"
        width="100%"
        position="absolute"
        bottom="0"
        left="0"
        zIndex="1"
      />
    </>
  );
}

const Twitter = () => (
  <svg
    id="Layer_1"
    data-name="Layer 1"
    width="30px"
    height="30px"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 487.43 456.19"
  >
    <path
      id="path1009"
      d="M7.48,21.9,195.66,273.57,6.29,478.1H48.91L214.71,299l134,179.11h145L294.93,212.33,471.2,21.9H428.58L275.89,186.82,152.51,21.9ZM70.16,53.3h66.63L431,446.7H364.39Z"
      transform="translate(-6.29 -21.9)"
    />
  </svg>
);
