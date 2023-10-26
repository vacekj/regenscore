import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Card,
  CardBody,
  CardHeader,
  Text,
  Button,
  Icon,
  ChakraProps,
  Container,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useScore } from '@/hooks';
import { Arrow } from '@/components/ScoreMeter';
import { useBreakpointValue } from '@chakra-ui/react';
import useSWR from 'swr';
import supabase from '@/utils/supabase-client';
import { Check } from '@/components/Check';
import { Hex } from 'viem';
import { formatNumber } from '@/utils/strings';
import CategoriesSection from './CategorySection';
import AttestationFailed from './SVG-components/AttestationFailed';

interface IMintYour {
  _address: Hex;
}

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

export const Hero = ({ _address }: IMintYour) => {
  const [address, setAddress] = useState<Hex>(_address);

  const {
    fetchScore,
    score,
    meta,
    data,
    version: scoreVersion,
    categories,
    loading,
    error,
  } = useScore(_address);

  const { data: percentile } = useSWR<{
    address: Hex;
    percentile_rank_all: number;
    score: number;
  }>('percentiles' + address, async () => {
    const { data, error } = await supabase
      .from('percentiles')
      .select('*')
      .eq('address', address)
      .single();

    if (data) {
      return data;
    } else if (error) {
      throw error;
    }
  });

  const { data: created_at } = useSWR<{
    created_at: string;
  }>('created_at', async () => {
    const { data, error } = await supabase
      .from('scores')
      .select('*')
      .order('created_at', { ascending: false })
      .eq('address', address)
      .limit(1)
      .single();

    if (data) {
      return data;
    } else if (error) {
      throw error;
    }
  });
  const [showShareModal, setShowShareModal] = useState(false);
  const scale = useBreakpointValue({
    base: 0.5,
    sm: 0.8,
    md: 0.8,
    lg: 0.8,
    xl: 0.9,
  });

  return (
    <Grid
      templateColumns={[
        '1fr',
        '1fr',
        '1fr',
        'repeat(2, 1fr)',
        'repeat(2, 1fr)',
      ]}
      templateRows={[
        'repeat(3,max-content)',
        'repeat(3,max-content)',
        'repeat(3,max-content)',
        'repeat(2, 1fr)',
        'repeat(2, 1fr)',
      ]}
      pl={[0, '5px', '54px', '54px', '54px']}
      pr={[0, '5px', '54px', '54px', '54px']}
      pt={[0, '', '', '60px', '100px', '100px']}
      pb={[0, 79]}
      gap={4}
      w="full"
      h={{ base: 'max-content', lg: '616px' }}
      bg={`url(/images/leaf-bg.png)`}
      bgRepeat="no-repeat"
      bgSize={['240%', 'cover']}
      borderRadius={{ base: '0', md: '32px 0 0 0' }}
      borderWidth={[0, '1px 0px 1px 1px']}
      borderColor="rgba(143, 164, 133)"
      borderStyle="solid"
      borderBottomWidth={{ base: '0', md: '1px' }}
      boxShadow={[0, '-3px 0px 4px 0 rgba(0, 0, 0, 0.25)']}
      maxWidth="1386px"
      marginX="auto"
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
        marginX="auto"
        maxWidth="1386px"
      />

      <Heading
        as="h2"
        variant="h2"
        color="brand.primaryOrange.300"
        maxWidth={{ base: 'auto', sm: '647px', md: '1100px' }}
        minHeight="92px"
        textAlign={{
          base: 'left',
          sm: 'center',
          md: 'center',
          lg: 'left',
          xl: 'left',
        }}
        fontSize={['44px', '48px']}
        px={[30]}
        zIndex="2"
        pt={['10px', '20px']}
        minWidth={['auto']}
        mx={['auto', 'auto', '0']}
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
        alignItems={{ base: '', sm: 'center', md: '', lg: '', xl: '' }}
      >
        <Card
          maxWidth={['', '500px', '500px', '', '654px']}
          maxHeight={['451px', '400px', '400px', '400px', '451px']}
          minW={['0', '435px']}
          minH={['400px']}
          width="100%"
          height="100%"
          borderRadius="16.235px"
          background="linear-gradient(180deg, #F9DD94 0%, #FFC555 100%)"
          border={['none', '0.812px solid rgba(255, 255, 255, 0.50)']}
          mt="17.5px"
          style={{
            color: '#cf34eb !important',
          }}
        >
          {/* Empty State */}
          {!score && !error && !loading ? (
            <CardBody
              position="absolute"
              top="55%"
              left="50%"
              transform="translate(-50%, -50%)"
            >
              <Flex
                alignItems="center"
                justifyContent="center"
                flexDir="row"
                gap="11px"
              >
                {/*<WarningSharp />*/}
                <Text
                  textAlign="center"
                  fontFamily="Inter-Bold"
                  fontSize="24px"
                  color="white"
                >
                  {score === 0 ? 0 : 'No data'}
                </Text>
              </Flex>
            </CardBody>
          ) : (
            loading && (
              <CardBody
                position="absolute"
                top="55%"
                left="50%"
                transform="translate(-50%, -50%)"
              >
                <Flex flexDir="column" align="center">
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    flexDir="row"
                    gap="11px"
                  >
                    <Text
                      textAlign="center"
                      fontFamily="Inter-Bold"
                      fontSize="24px"
                      color="white"
                    >
                      Loading data.....
                    </Text>
                  </Flex>
                  <Button variant="variant3" isDisabled mt="22px">
                    {' '}
                    MINT
                  </Button>
                </Flex>
              </CardBody>
            )
          )}
          {/* Error State */}
          {!!error && (
            <CardBody
              position="absolute"
              top="55%"
              left="50%"
              transform="translate(-50%, -50%)"
            >
              <Flex flexDir="column" align="center">
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  flexDir="column"
                  gap="11px"
                >
                  <AttestationFailed />
                  <Text
                    textAlign="center"
                    fontFamily="Inter-Bold"
                    fontSize="24px"
                    color="#E43126"
                    whiteSpace="nowrap"
                  >
                    Attestation Failed!!!
                  </Text>
                  <Text
                    textAlign="center"
                    fontFamily="Inter-Regular"
                    fontSize="24px"
                    color="#E43126"
                    width={['90vW', '35vw']}
                    mx="50px"
                  >
                    Loading your data attestation failed. Please try again.
                  </Text>
                </Flex>
                <Button variant="variant3" isDisabled mt="22px">
                  MINT
                </Button>
              </Flex>
            </CardBody>
          )}
          {Boolean(score) && score != 0 && !loading && (
            <Flex display="flex" flexDirection="row">
              {/* Left Column */}

              <Flex
                flex={['0.3', '1', '1', '1', '1']}
                alignItems={'center'}
                justifyContent={'center'}
                flexDirection="column"
                position={'relative'}
                marginRight={'0px'}
                ml={['-67px', '0']}
                mt={['-60px', '0', '0', '0', '30px']}
              >
                <Container position="absolute" marginLeft={['104%', '130%']}>
                  <Arrow
                    rotate={(percentile?.percentile_rank_all ?? 0) * 170 + 10}
                  />
                </Container>
                <svg
                  width="213"
                  height="418"
                  viewBox="0 0 213 418"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ transform: `scale(${scale})` }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M212.093 20.0429C209.894 6.96064 197.507 -1.86248 184.425 0.335915C62.9625 20.7469 0.33979 115.902 0.00116021 210.465C-0.338276 305.255 61.9335 399.596 184.909 417.69C198.033 419.621 210.238 410.547 212.169 397.423C214.1 384.299 205.026 372.094 191.902 370.163C94.4967 355.83 47.7791 283.535 48.0402 210.637C48.302 137.513 95.8696 63.93 192.386 47.711C205.468 45.5126 214.291 33.1252 212.093 20.0429Z"
                    fill="url(#paint0_linear_1201_930)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1201_930"
                      x1="77.3146"
                      y1="76.266"
                      x2="180.599"
                      y2="383.718"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0.0429313" stopColor="white" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </Flex>

              {/* Right Column */}
              <Flex flex={['0.7', '1', '1', '1', '1']} flexDirection="column">
                <CardHeader
                  padding="0px"
                  textAlign={['start']}
                  ml={['-10px', '-5px']}
                >
                  {score && score !== 0 && (
                    <Heading
                      as="h3"
                      variant="h3"
                      fontWeight="bold"
                      fontSize={['80px', '100px']}
                      color="#FFF"
                      marginTop={['55px', '78px', '78px', '78px', '80px']}
                      // marginLeft={{
                      //   base: '150px',
                      //   sm: '230px',
                      //   md: '230px',
                      //   lg: '200px',
                      //   xl: '337px',
                      // }}
                    >
                      {formatNumber(score) || ''}
                    </Heading>
                  )}
                </CardHeader>
                <CardBody
                  padding="0px"
                  // marginLeft={{
                  //   base: '150px',
                  //   sm: '230px',
                  //   md: '230px',
                  //   lg: '200px',
                  //   xl: '337px',
                  // }}
                  alignItems={'start'}
                  justifyContent={'center'}
                  textAlign={['start']}
                  ml={['-10px', '-5px']}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Check status={'WARNING2'} />
                    <Text
                      fontSize="19.482px"
                      fontFamily="Inter-Regular"
                      color="#354728"
                      gap="10px"
                    >
                      {' '}
                      Top{' '}
                      {(
                        100 -
                        (percentile?.percentile_rank_all ?? 0) * 100
                      ).toFixed(0)}
                      % of users
                    </Text>
                  </div>
                </CardBody>
              </Flex>
            </Flex>
          )}
        </Card>
      </GridItem>

      <CategoriesSection />
    </Grid>
  );
};

const MintYour = ({ _address }: IMintYour) => {
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
      <Hero _address={_address} />
    </Flex>
  );
};

export default MintYour;
