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
  Tooltip,
  Image,
  Icon,
  ChakraProps,
} from '@chakra-ui/react';
import React from 'react';
import { useAccount } from 'wagmi';
import { CATEGORY_TOOLTIP, TooltipProps } from '@/constants';
import { formatTimestamp } from '@/utils/strings';
import { useScore, useEAS } from '@/hooks';

function InfoIcon(props: ChakraProps) {
  return (
    <Icon width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 13C7.72386 13 7.5 12.7761 7.5 12.5L7.5 6.5C7.5 6.22386 7.72386 6 8 6C8.27614 6 8.5 6.22386 8.5 6.5L8.5 12.5C8.5 12.7761 8.27614 13 8 13Z"
        fill="currentColor"
      />
      <circle cx="8" cy="4" r="1" fill="currentColor" />
    </Icon>
  );
}

const Hero: React.FC = () => {
  const { address } = useAccount();
  const { score, categories, loading } = useScore(address);
  const { mintAttestation, lastAttestation } = useEAS(address);

  return (
    <Grid
      templateColumns={['1fr', '1fr', '1fr', 'repeat(2, 1fr)' , 'repeat(2, 1fr)']}
      templateRows={['repeat(3,max-content)', 'repeat(3,max-content)', 'repeat(3,max-content)', 'repeat(2, 1fr)', 'repeat(2, 1fr)']}
      pl={[0, "5px", "54px", "54px",'54px']}
      pr={[0, "5px", "54px", "54px",'54px']}
      pt={[0,"", "", "60px", "100px", '100px']}
      pb={[0, 79]}
      gap={4}
      w="full"
      h={{ base: 'max-content', md: '616px' }}
      bg={`url(/images/leaf-bg.png)`}
      bgRepeat="no-repeat"
      bgSize={["240%", "cover"]}
      borderRadius={{ base: '0', md: '32px 0 0 0' }}
      borderWidth={[0, '1px 0px 1px 1px']}
      borderColor="rgba(143, 164, 133)"
      borderStyle="solid"
      borderBottomWidth={{ base: '0', md: '1px' }}
      boxShadow={[0, '-3px 0px 4px 0 rgba(0, 0, 0, 0.25)']}
      // maxWidth="1386px"
      // marginX="auto"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        borderRadius={{ base: '0', md: '30px 0 0 0' }}
        bgColor="rgba(53, 71, 40, 0.8)"
        zIndex={0}
        // marginX="auto"
        // maxWidth="1386px"
      />

      <Heading
        as="h2"
        variant="h2"
        color="brand.primaryOrange.300"
        maxWidth={{ base: 'auto', sm: '647px', md: '1100px' }}
        minHeight="92px"
        textAlign={{ base: "left", sm: "center", md: "center", lg: "left", xl: "left" }}
        fontSize={['44px', '48px']}
        px={[30]}
        zIndex="2"
        pt={["10px", '20px']}
        minWidth={["auto", "auto", "auto", "auto", "auto"]}
      >
        Mint your attestations to <br /> access opportunities
      </Heading>

      {/* Orange Card with score */}
      <GridItem
        rowSpan={[1, 2]}
        display={'flex'}
        flex="1"
        flexDirection="column"
        justifyContent="center"
        zIndex={3}
        alignItems={{ base: "", sm: "center", md: "", lg: "", xl: "" }}
      >
        <Card
          maxWidth={["", "500px", "500px", "", '654px']}
          maxHeight={["451px","451px","451px","400px","451px"]}
          width="100%"
          height="100%"
          borderRadius="16.235px"
          background="linear-gradient(180deg, #F9DD94 0%, #FFC555 100%)"
          border="0.812px solid rgba(255, 255, 255, 0.50)"
          mt="17.5px"
        >
          <CardHeader padding="0px" textAlign={['start']}>
            <Heading
              as="h3"
              variant="h3"
              fontWeight="bold"
              fontSize="100px"
              color="#FFF"
              marginTop={["77px","20px", "20px", "98px", "98px"]}
              marginLeft={{ base: "150px", sm: "230px", md: "230px", lg: "200px", xl: "337px" }}
            >
              {score || ''}
            </Heading>
          </CardHeader>
          <CardBody
            padding="0px"
            marginLeft={{ base: "150px", sm: "230px", md: "230px", lg: "200px", xl: "337px" }}
            alignItems={'start'}
            justifyContent={'center'}
            textAlign={['start']}
          >
            {/*<div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.89px',
              }}
            >
              <Check status={'WARNING2'} />
              <Text
                fontSize="19.482px"
                fontFamily="Inter-Regular"
                color="#354728"
                gap="10px"
              >
                Top 10% of users
              </Text>
            </div>*/}
            {lastAttestation && score && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Text
                  fontSize="13px"
                  fontFamily="Inter-Regular"
                  color="#354728"
                  opacity="0.5"
                >
                  Attestation Last Updated
                </Text>
                <Text
                  fontSize="13px"
                  fontFamily="Inter-Regular"
                  color="#354728"
                  opacity="0.5"
                >
                  {formatTimestamp(lastAttestation.timeCreated)}
                </Text>
              </div>
            )}

            {score && (
              <Button mb={["63.54px","40px", "40px", "0", "0"]}
                variant="variant3"
                marginTop="26.76px"
                mr="8.25px"
                onClick={() => {
                  if (lastAttestation) {
                    window.open(
                      `https://sepolia.easscan.org/attestation/view/${lastAttestation.id}`,
                    );
                  } else {
                    mintAttestation();
                  }
                }}
              >
                {lastAttestation ? 'VIEW ATTESTATION' : score ? 'MINT NOW' : ''}
              </Button>
            )}
            <Button mb={["63.54px","40px", "40px", "0", "0"]}
              variant="variant4"
              marginTop="26.76px">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M24.0001 20.9997C23.4613 20.9995 22.9281 21.1085 22.4327 21.3201C21.9373 21.5317 21.4899 21.8416 21.1176 22.2309L11.8676 17.0266C12.0467 16.3537 12.0467 15.6457 11.8676 14.9728L21.1176 9.76843C21.7911 10.4668 22.6962 10.8956 23.6632 10.9745C24.6303 11.0534 25.5929 10.777 26.3708 10.1971C27.1487 9.61725 27.6884 8.77364 27.889 7.82435C28.0895 6.87505 27.9371 5.88521 27.4602 5.04025C26.9833 4.1953 26.2146 3.55321 25.2983 3.23428C24.382 2.91535 23.3808 2.94146 22.4824 3.30771C21.5839 3.67397 20.8498 4.35524 20.4176 5.2239C19.9854 6.09256 19.8847 7.089 20.1344 8.02656L10.8844 13.2309C10.3319 12.6548 9.61963 12.2572 8.83927 12.0892C8.0589 11.9213 7.24612 11.9906 6.50549 12.2884C5.76487 12.5861 5.13026 13.0987 4.68333 13.7601C4.23639 14.4215 3.99756 15.2014 3.99756 15.9997C3.99756 16.7979 4.23639 17.5779 4.68333 18.2393C5.13026 18.9007 5.76487 19.4132 6.50549 19.711C7.24612 20.0087 8.0589 20.0781 8.83927 19.9101C9.61963 19.7421 10.3319 19.3445 10.8844 18.7684L20.1344 23.9728C19.92 24.7802 19.9637 25.6345 20.2595 26.4158C20.5552 27.1971 21.0882 27.8662 21.7836 28.3292C22.479 28.7922 23.3019 29.0258 24.1368 28.9974C24.9717 28.9689 25.7768 28.6797 26.439 28.1703C27.1012 27.661 27.5873 26.9572 27.8291 26.1575C28.071 25.3579 28.0563 24.5026 27.7873 23.7116C27.5183 22.9207 27.0084 22.2339 26.3292 21.7475C25.6499 21.2611 24.8355 20.9996 24.0001 20.9997Z" fill="black" />
              </svg>
            </Button>
          </CardBody>
        </Card>
      </GridItem>

      {/* Categories */}
      <Grid
        backgroundColor={['brand.backgroundOrange.400', 'transparent']}
        templateRows={`repeat(${categories.length},1fr)`}
        templateColumns={'max-content 1fr'}
        gap={['36px', 8]}
        color={['brand.deepGreen.400', 'white']}
        alignItems={'center'}
        pb={[79, 0]}
        pt={['70px', 0]}
        mt={[-50, 0]}
        px={['20px', '30px']}
        zIndex={2}
        alignContent="center"
        maxWidth={["", "500px", "500px", "auto", 'auto']}
        minWidth={["", "400px", "500px", "0", '0']}
        marginX={["", "auto", "auto", "0", '0']}
      >
        {
          // TODO: FIX TYPE
          categories.map((categoryItem: any, index: number) => (
            <>
              <Flex gap="8px" alignItems="center" key={index}>
                <Tooltip
                  label={CATEGORY_TOOLTIP[categoryItem.category]}
                  placement="top-end"
                >
                  <InfoIcon
                    color={['brand.deepGreen.400', 'white']}
                    w={'16px'}
                    h={'16px'}
                  />
                </Tooltip>
                {categoryItem.category}
              </Flex>
              <Flex alignItems={'center'} gap={18} >
                <Box
                  bg={['brand.deepGreen.400', 'white']}
                  flexBasis={`${categoryItem.scoreAdded}%`}
                  borderRadius="100px"
                  h="10px"
                />
                <Box
                  w={'100%'}
                  display={'flex'}
                  gap={'16px'}
                  alignItems={'center'}
                  justifyContent={'flex-start'}
                >
                  {categoryItem.scoreAdded}
                </Box>
              </Flex>
            </>
          ))
        }
      </Grid>
    </Grid>
  );
};

const MintYour: React.FC = () => {
  return (
    <Flex
      w="full"
      h="full"
      flexDir="column"
      pos="relative"
      align={['stretch', 'center']}
      justify="center"
      direction="column"
    >
      <Hero />
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
