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
      templateColumns={['1fr', 'repeat(2, 1fr)']}
      templateRows={['repeat(3,max-content)', 'repeat(2, 1fr)']}
      pl={[0, '82px']}
      pr={[0, '54px']}
      pt={[0, '100px']}
      pb={[0, 79]}
      gap={4}
      w="full"
      h={{ base: 'auto', md: '616px' }}
      bg={`url(/images/leaf-bg.png)`}
      bgRepeat="no-repeat"
      bgSize="cover"
      borderRadius={{ base: '0', md: '32px 0 0 0' }}
      borderWidth={[0, '1px 0px 1px 1px']}
      borderColor="rgba(143, 164, 133)"
      borderStyle="solid"
      borderBottomWidth={{ base: '0', md: '1px' }}
      boxShadow={[0, '-3px 0px 4px 0 rgba(0, 0, 0, 0.25)']}
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
      />

      <Heading
        as="h2"
        variant="h2"
        color="brand.primaryOrange.300"
        maxWidth={{ base: 'auto', sm: '647px', md: '1100px' }}
        minHeight="92px"
        textAlign="left"
        fontSize={['44px', '48px']}
        px={[30]}
        zIndex="2"
        pt={[0, '20px']}
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
      >
        <Card
          width={['auto', '654px']}
          height="451px"
          borderRadius="16.235px"
          background="linear-gradient(180deg, #F9DD94 0%, #FFC555 100%)"
          border="0.812px solid rgba(255, 255, 255, 0.50)"
          mt="17.5px"
        >
          <CardHeader padding="0px" textAlign={'center'}>
            <Heading
              as="h3"
              variant="h3"
              fontWeight="bold"
              fontSize="100px"
              color="#FFF"
              marginTop="98px"
              marginLeft={[0, '337px']}
            >
              {score || ''}
            </Heading>
          </CardHeader>
          <CardBody
            padding="0px"
            marginLeft={[0, '339px']}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
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
              <Button
                variant="variant3"
                marginTop="26.76px"
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
              <Flex alignItems={'center'} gap={18}>
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
