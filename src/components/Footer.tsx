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
import Twitter from './SVG-components/Twitter';

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
                <div style={{ marginBottom: '85px' }}>REGEN Score</div>
                <div style={{ marginBottom: '10px', marginTop: '30px' }}>
                  All rights reserved © 2023
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
                About
              </div>
              <div style={{ marginTop: '10px' }}>
                <div style={{ marginBottom: '10px' }}>
                  <Link
                    href="https://docs.regenscore.io/scoring-formula"
                    _hover={{ textDecoration: 'none' }}
                  >
                    Scoring Formula
                  </Link>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Link
                    href="https://docs.regenscore.io/matchmaking"
                    _hover={{ textDecoration: 'none' }}
                  >
                    Matchmaking
                  </Link>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Link
                    href="https://docs.regenscore.io/governance-accessibility"
                    _hover={{ textDecoration: 'none' }}
                  >
                    Governance Accesibility
                  </Link>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Link
                    href="https://docs.regenscore.io/steward-health-check"
                    _hover={{ textDecoration: 'none' }}
                  >
                    Steward Health Check
                  </Link>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Link
                    href="https://mirror.xyz/0xC5A756D63C5fe67b438acBE468aA62a52093fDEf"
                    _hover={{ textDecoration: 'none' }}
                  >
                    Mirror Blog
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
                  <Link
                    href="https://twitter.com/regenscoreio"
                    _hover={{ textDecoration: 'none' }}
                  >
                    <Twitter />
                  </Link>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Link
                    href="https://discord.gg/8wDkQtwYbm"
                    _hover={{ textDecoration: 'none' }}
                  >
                    Discord
                  </Link>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Link
                    href="https://github.com/vacekj/regenscore"
                    _hover={{ textDecoration: 'none' }}
                  >
                    Github
                  </Link>{' '}
                  |{' '}
                  <Link
                    href="https://github.com/vacekj/regenscore/issues"
                    _hover={{ textDecoration: 'none' }}
                  >
                    Submit issues
                  </Link>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Link
                    href="mailto:info@regenscore.io"
                    _hover={{ textDecoration: 'none' }}
                  >
                    E-Mail
                  </Link>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Link
                    href="https://docs.regenscore.io/user-agreement"
                    _hover={{ textDecoration: 'none' }}
                  >
                    User Agreement
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
                textAlign: 'left',
                marginBottom: '37px',
              }}
            >
              <div
                style={{
                  marginBottom: '20px',
                  fontWeight: 'bold',
                }}
              >
                About
              </div>
              <div style={{ marginTop: '10px', textAlign: 'left' }}>
                <div style={{ marginBottom: '10px' }}>
                  <Link
                    href="https://docs.regenscore.io/scoring-formula"
                    _hover={{ textDecoration: 'none' }}
                  >
                    Scoring Formula
                  </Link>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Link
                    href="https://docs.regenscore.io/matchmaking"
                    _hover={{ textDecoration: 'none' }}
                  >
                    Matchmaking
                  </Link>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Link
                    href="https://docs.regenscore.io/governance-accessibility"
                    _hover={{ textDecoration: 'none' }}
                  >
                    Governance Accesibility
                  </Link>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Link
                    href="https://docs.regenscore.io/steward-health-check"
                    _hover={{ textDecoration: 'none' }}
                  >
                    Steward Health Check
                  </Link>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Link
                    href="https://mirror.xyz/0xC5A756D63C5fe67b438acBE468aA62a52093fDEf"
                    _hover={{ textDecoration: 'none' }}
                  >
                    Mirror Blog
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
                  <Link
                    href="https://twitter.com/regenscoreio"
                    _hover={{ textDecoration: 'none' }}
                  >
                    <Twitter />
                  </Link>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Link
                    href="https://discord.gg/8wDkQtwYbm"
                    _hover={{ textDecoration: 'none' }}
                  >
                    Discord
                  </Link>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Link
                    href="https://github.com/vacekj/regenscore"
                    _hover={{ textDecoration: 'none' }}
                  >
                    Github
                  </Link>{' '}
                  |{' '}
                  <Link
                    href="https://github.com/vacekj/regenscore/issues"
                    _hover={{ textDecoration: 'none' }}
                  >
                    Submit issues
                  </Link>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Link
                    href="mailto:info@regenscore.io"
                    _hover={{ textDecoration: 'none' }}
                  >
                    E-Mail
                  </Link>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Link
                    href="https://docs.regenscore.io/user-agreement"
                    _hover={{ textDecoration: 'none' }}
                  >
                    User Agreement
                  </Link>
                </div>
              </div>
            </div>
          </Flex>
          <div
            style={{
              textAlign: 'center',
              marginTop: '32px',
              marginBottom: '24px',
            }}
          >
            All rights reserved © 2023
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
