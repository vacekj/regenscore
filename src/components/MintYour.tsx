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
  Link,
  Button,
  Tooltip,
  Image,
  Icon,
  ChakraProps,
  Container,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { CATEGORY_TOOLTIP, CategoryTooltipKeyType } from '@/constants';
import { formatTimestamp, formatNumber } from '@/utils/strings';
import { useEAS } from '@/hooks';
import { Arrow } from '@/components/ScoreMeter';
import { useBreakpointValue } from '@chakra-ui/react';
import useSWR from 'swr';
import supabase from '@/utils/supabase-client';
import { Check } from '@/components/Check';
import ShareModal from '@/components/Modals/ShareModal';
import { Hex } from 'viem';
import { useScoreContext } from '@/contexts/scoreContext';

interface IMintYour {
  _address?: Hex;
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
  const { chain } = useNetwork();
  const currentChain = chain?.id;
  const [address, setAddress] = useState<Hex>(_address as Hex);
  const { address: connectedAddress } = useAccount();

  useEffect(() => {
    if (_address) {
      setAddress(_address);
    } else {
      setAddress(connectedAddress as Hex);
    }
  }, [_address]);

  const {
    fetchScore,
    score,
    meta,
    data,
    version: scoreVersion,
    categories,
    loading,
    error,
  } = useScoreContext();

  const { mintAttestation, lastAttestation } = useEAS(address);
  // TODO: do this somewhere else
  const network = currentChain === 11155111 ? 'sepolia' : 'optimism';
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

  useEffect(() => {
    if (!score && !loading) {
      fetchScore('/api/score');
    }
  }, [score]);

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
      {showShareModal && <ShareModal setShowModal={setShowShareModal} />}
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

                  {created_at && lastAttestation && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}
                    >
                      <Text
                        fontSize="13px"
                        fontFamily="Inter-Regular"
                        ml="2px"
                        color="#354728"
                        opacity="0.5"
                        pl="5px"
                      >
                        Last Updated{' '}
                        {formatTimestamp(new Date(created_at.created_at))}
                      </Text>
                    </div>
                  )}
                  <Flex flexDir={'row'}>
                    {score && lastAttestation ? (
                      <Flex w="200px" flexDir="column" textAlign={'center'}>
                        <Button
                          mb={['63.54px', '40px', '40px', '0', '0']}
                          variant="variant3"
                          marginTop="26.76px"
                          mr="8.25px"
                          cursor={'pointer'}
                          ml={['0px', '-5px']}
                          onClick={() => {
                            try {
                              window.open(
                                `https://${network}.easscan.org/attestation/view/${lastAttestation?.id}`,
                              );
                            } catch (error) {
                              console.log({ error });
                            }
                          }}
                        >
                          View Attestation
                        </Button>
                        <Link
                          cursor="pointer"
                          mt="1"
                          onClick={() => {
                            try {
                              mintAttestation(score, meta, data);
                            } catch (error) {
                              console.log({ error });
                            }
                          }}
                        >
                          Mint again
                        </Link>
                      </Flex>
                    ) : (
                      !!score && (
                        <Button
                          mb={['63.54px', '40px', '40px', '0', '0']}
                          variant="variant3"
                          marginTop="26.76px"
                          mr="8.25px"
                          cursor={'pointer'}
                          ml={['0px', '-5px']}
                          onClick={() => {
                            try {
                              mintAttestation(score, meta, data);
                            } catch (error) {
                              console.log({ error });
                            }
                          }}
                        >
                          MINT ATTESTATION
                        </Button>
                      )
                    )}
                    {score && (
                      <Button
                        mb={['63.54px', '40px', '40px', '0', '0']}
                        variant="variant4"
                        marginTop="26.76px"
                        as={'a'}
                        cursor={'pointer'}
                        onClick={() => setShowShareModal(true)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                        >
                          <path
                            d="M24.0001 20.9997C23.4613 20.9995 22.9281 21.1085 22.4327 21.3201C21.9373 21.5317 21.4899 21.8416 21.1176 22.2309L11.8676 17.0266C12.0467 16.3537 12.0467 15.6457 11.8676 14.9728L21.1176 9.76843C21.7911 10.4668 22.6962 10.8956 23.6632 10.9745C24.6303 11.0534 25.5929 10.777 26.3708 10.1971C27.1487 9.61725 27.6884 8.77364 27.889 7.82435C28.0895 6.87505 27.9371 5.88521 27.4602 5.04025C26.9833 4.1953 26.2146 3.55321 25.2983 3.23428C24.382 2.91535 23.3808 2.94146 22.4824 3.30771C21.5839 3.67397 20.8498 4.35524 20.4176 5.2239C19.9854 6.09256 19.8847 7.089 20.1344 8.02656L10.8844 13.2309C10.3319 12.6548 9.61963 12.2572 8.83927 12.0892C8.0589 11.9213 7.24612 11.9906 6.50549 12.2884C5.76487 12.5861 5.13026 13.0987 4.68333 13.7601C4.23639 14.4215 3.99756 15.2014 3.99756 15.9997C3.99756 16.7979 4.23639 17.5779 4.68333 18.2393C5.13026 18.9007 5.76487 19.4132 6.50549 19.711C7.24612 20.0087 8.0589 20.0781 8.83927 19.9101C9.61963 19.7421 10.3319 19.3445 10.8844 18.7684L20.1344 23.9728C19.92 24.7802 19.9637 25.6345 20.2595 26.4158C20.5552 27.1971 21.0882 27.8662 21.7836 28.3292C22.479 28.7922 23.3019 29.0258 24.1368 28.9974C24.9717 28.9689 25.7768 28.6797 26.439 28.1703C27.1012 27.661 27.5873 26.9572 27.8291 26.1575C28.071 25.3579 28.0563 24.5026 27.7873 23.7116C27.5183 22.9207 27.0084 22.2339 26.3292 21.7475C25.6499 21.2611 24.8355 20.9996 24.0001 20.9997Z"
                            fill="black"
                          />
                        </svg>
                      </Button>
                    )}
                  </Flex>
                </CardBody>
              </Flex>
            </Flex>
          )}
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
        mt={['-50px', '20px', '20px', '20px', '0']}
        px={['20px', '30px']}
        zIndex={2}
        alignContent="center"
        maxWidth={['', '500px', '500px', 'auto', 'auto']}
        minWidth={['', '500px', '500px', '0', '0']}
        marginX={['', 'auto', 'auto', '0', '0']}
      >
        {
          // TODO: FIX TYPE
          categories.map(
            (
              categoryItem: {
                category: string;
                scoreAdded: number;
              },
              index: number,
            ) => (
              <>
                <Flex gap="8px" alignItems="center" key={index}>
                  <Tooltip
                    label={
                      CATEGORY_TOOLTIP[
                        categoryItem.category as CategoryTooltipKeyType
                      ]
                    }
                    placement="top-end"
                  >
                    <InfoIcon
                      color={['brand.deepGreen.400', 'white']}
                      w={'16px'}
                      h={'16px'}
                    />
                  </Tooltip>
                  <span
                    style={{
                      fontFamily: 'Inter-Medium',
                      fontWeight: '500',
                      fontSize: '16px',
                    }}
                  >
                    {categoryItem.category}
                  </span>
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
                    <span
                      style={{
                        fontFamily: 'Inter-Medium',
                        fontWeight: '500',
                        fontSize: '16px',
                      }}
                    >
                      {formatNumber(categoryItem.scoreAdded)}
                    </span>
                  </Box>
                </Flex>
              </>
            ),
          )
        }

        {/* Loading State */}
        {loading && (
          <Flex
            alignItems={'center'}
            mx="auto"
            gap={'25px'}
            ml={['0', '100px', '100px', '0', '0']}
          >
            <Box
              gap={['34px', '34px', '34px', '28px', '34px']}
              display={['none', 'flex']}
              alignItems="center"
              flexDir={'column'}
            >
              <Rectangle />
              <Rectangle />
              <Rectangle />
              <Rectangle />
              <Rectangle />
            </Box>
            <Box
              gap={['34px', '34px', '34px', '28px', '34px']}
              display={['flex', 'none']}
              alignItems="center"
              flexDir={'column'}
            >
              <RectangleGreen />
              <RectangleGreen />
              <RectangleGreen />
              <RectangleGreen />
              <RectangleGreen />
            </Box>
            <Box
              bg={['brand.deepGreen.400', 'white']}
              display={'flex'}
              flexDir={'row'}
            />
            <Box
              w={'5px'}
              gap={['34px', '34px', '34px', '28px', '34px']}
              alignItems={'start'}
              justifyContent={'flex-start'}
              flexDir={'column'}
              display={['none', 'flex']}
            >
              <Bar />
              <Bar />
              <Bar />
              <Bar />
              <Bar />
            </Box>
            <Box
              w={'5px'}
              gap={['34px', '34px', '34px', '28px', '34px']}
              alignItems={'start'}
              justifyContent={'flex-start'}
              flexDir={'column'}
              display={['flex', 'none']}
            >
              <BarGreen />
              <BarGreen />
              <BarGreen />
              <BarGreen />
              <BarGreen />
            </Box>
            <Box
              display={'flex'}
              gap={['30px', '30px', '30px', '24px', '30px']}
              alignItems={'start'}
              justifyContent={'flex-start'}
              flexDir={'column'}
            >
              <span
                style={{
                  fontFamily: 'Inter-Medium',
                  fontWeight: '500',
                  fontSize: '16px',
                }}
              >
                Loading...
              </span>
              <span
                style={{
                  fontFamily: 'Inter-Medium',
                  fontWeight: '500',
                  fontSize: '16px',
                }}
              >
                Loading...
              </span>
              <span
                style={{
                  fontFamily: 'Inter-Medium',
                  fontWeight: '500',
                  fontSize: '16px',
                }}
              >
                Loading...
              </span>
              <span
                style={{
                  fontFamily: 'Inter-Medium',
                  fontWeight: '500',
                  fontSize: '16px',
                }}
              >
                Loading...
              </span>
              <span
                style={{
                  fontFamily: 'Inter-Medium',
                  fontWeight: '500',
                  fontSize: '16px',
                }}
              >
                Loading...
              </span>
            </Box>
          </Flex>
        )}

        {/* Error State */}
        {!!error && (
          <Flex
            alignItems={'center'}
            mx="auto"
            gap={'25px'}
            ml={['0', '100px', '100px', '0', '0']}
          >
            <Box
              gap={['34px', '34px', '34px', '28px', '34px']}
              display={['none', 'flex']}
              alignItems="center"
              flexDir={'column'}
            >
              <Rectangle />
              <Rectangle />
              <Rectangle />
              <Rectangle />
              <Rectangle />
            </Box>
            <Box
              gap={['34px', '34px', '34px', '28px', '34px']}
              display={['flex', 'none']}
              alignItems="center"
              flexDir={'column'}
            >
              <RectangleGreen />
              <RectangleGreen />
              <RectangleGreen />
              <RectangleGreen />
              <RectangleGreen />
            </Box>
            <Box
              bg={['brand.deepGreen.400', 'white']}
              display={'flex'}
              flexDir={'row'}
            />
            <Box
              w={'5px'}
              gap={['34px', '34px', '34px', '28px', '34px']}
              alignItems={'start'}
              justifyContent={'flex-start'}
              flexDir={'column'}
              display={['none', 'flex']}
            >
              <Bar />
              <Bar />
              <Bar />
              <Bar />
              <Bar />
            </Box>
            <Box
              w={'5px'}
              gap={['34px', '34px', '34px', '28px', '34px']}
              alignItems={'start'}
              justifyContent={'flex-start'}
              flexDir={'column'}
              display={['flex', 'none']}
            >
              <BarGreen />
              <BarGreen />
              <BarGreen />
              <BarGreen />
              <BarGreen />
            </Box>
            <Box
              display={'flex'}
              gap={['30px', '30px', '30px', '24px', '30px']}
              alignItems={'start'}
              justifyContent={'flex-start'}
              flexDir={'column'}
            >
              <span
                style={{
                  fontFamily: 'Inter-Medium',
                  fontWeight: '500',
                  fontSize: '16px',
                }}
              >
                Loading...
              </span>
              <span
                style={{
                  fontFamily: 'Inter-Medium',
                  fontWeight: '500',
                  fontSize: '16px',
                }}
              >
                Loading...
              </span>
              <span
                style={{
                  fontFamily: 'Inter-Medium',
                  fontWeight: '500',
                  fontSize: '16px',
                }}
              >
                Loading...
              </span>
              <span
                style={{
                  fontFamily: 'Inter-Medium',
                  fontWeight: '500',
                  fontSize: '16px',
                }}
              >
                Loading...
              </span>
              <span
                style={{
                  fontFamily: 'Inter-Medium',
                  fontWeight: '500',
                  fontSize: '16px',
                }}
              >
                Loading...
              </span>
            </Box>
          </Flex>
        )}

        {/* Empty State */}
        {!score && !error && !loading && (
          <Flex
            alignItems={'center'}
            mx="auto"
            gap={'25px'}
            ml={['0', '100px', '100px', '0', '0']}
          >
            <Box
              gap={['34px', '34px', '34px', '28px', '34px']}
              display={['none', 'flex']}
              alignItems="center"
              flexDir={'column'}
            >
              <Rectangle />
              <Rectangle />
              <Rectangle />
              <Rectangle />
              <Rectangle />
            </Box>
            <Box
              gap={['34px', '34px', '34px', '28px', '34px']}
              display={['flex', 'none']}
              alignItems="center"
              flexDir={'column'}
            >
              <RectangleGreen />
              <RectangleGreen />
              <RectangleGreen />
              <RectangleGreen />
              <RectangleGreen />
            </Box>
            <Box
              bg={['brand.deepGreen.400', 'white']}
              display={'flex'}
              flexDir={'row'}
            />
            <Box
              w={'5px'}
              gap={['34px', '34px', '34px', '28px', '34px']}
              alignItems={'start'}
              justifyContent={'flex-start'}
              flexDir={'column'}
              display={['none', 'flex']}
            >
              <Bar />
              <Bar />
              <Bar />
              <Bar />
              <Bar />
            </Box>
            <Box
              w={'5px'}
              gap={['34px', '34px', '34px', '28px', '34px']}
              alignItems={'start'}
              justifyContent={'flex-start'}
              flexDir={'column'}
              display={['flex', 'none']}
            >
              <BarGreen />
              <BarGreen />
              <BarGreen />
              <BarGreen />
              <BarGreen />
            </Box>
            <Box
              display={'flex'}
              gap={['30px', '30px', '30px', '24px', '30px']}
              alignItems={'start'}
              justifyContent={'flex-start'}
              flexDir={'column'}
            >
              <span
                style={{
                  fontFamily: 'Inter-Medium',
                  fontWeight: '500',
                  fontSize: '16px',
                }}
              >
                No Data
              </span>
              <span
                style={{
                  fontFamily: 'Inter-Medium',
                  fontWeight: '500',
                  fontSize: '16px',
                }}
              >
                No Data
              </span>
              <span
                style={{
                  fontFamily: 'Inter-Medium',
                  fontWeight: '500',
                  fontSize: '16px',
                }}
              >
                No Data
              </span>
              <span
                style={{
                  fontFamily: 'Inter-Medium',
                  fontWeight: '500',
                  fontSize: '16px',
                }}
              >
                No Data
              </span>
              <span
                style={{
                  fontFamily: 'Inter-Medium',
                  fontWeight: '500',
                  fontSize: '16px',
                }}
              >
                No Data
              </span>
            </Box>
          </Flex>
        )}
      </Grid>
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

const Scoremeter = () => (
  <svg
    width="213"
    height="418"
    viewBox="0 0 213 418"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      style={{
        mixBlendMode: 'overlay',
      }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M212.093 20.0429C209.894 6.96064 197.507 -1.86248 184.425 0.335915C62.9624 20.7469 0.339778 115.902 0.00114755 210.465C-0.338291 305.255 61.9335 399.596 184.909 417.69C198.033 419.621 210.238 410.547 212.169 397.423C214.1 384.299 205.026 372.094 191.902 370.163C94.4967 355.83 47.7791 283.535 48.0402 210.637C48.302 137.513 95.8696 63.93 192.386 47.711C205.468 45.5126 214.291 33.1252 212.093 20.0429Z"
        fill="url(#paint0_linear_668_1462)"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_668_1462"
        x1="77.3146"
        y1="76.266"
        x2="180.599"
        y2="383.718"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.0429313" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

const WarningSharp = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M29.9374 27.9861L16.7768 3.54044C16.734 3.46091 16.6704 3.39445 16.5929 3.34813C16.5154 3.3018 16.4268 3.27734 16.3365 3.27734C16.2461 3.27734 16.1575 3.3018 16.08 3.34813C16.0025 3.39445 15.9389 3.46091 15.8961 3.54044L2.73301 27.9861C2.69202 28.0623 2.67151 28.1478 2.67347 28.2343C2.67543 28.3208 2.69981 28.4053 2.74421 28.4795C2.78861 28.5538 2.85152 28.6153 2.92679 28.6579C3.00206 28.7006 3.08712 28.723 3.17364 28.7229H29.4999C29.5861 28.7224 29.6708 28.6997 29.7456 28.6568C29.8205 28.6139 29.883 28.5524 29.927 28.4782C29.971 28.404 29.9951 28.3197 29.997 28.2335C29.9988 28.1473 29.9783 28.062 29.9374 27.9861ZM17.5861 25.7179H15.0861V23.2179H17.5861V25.7179ZM17.3361 21.7229H15.3361L14.9611 11.7229H17.7111L17.3361 21.7229Z"
      fill="white"
    />
  </svg>
);

const AttestationFailed = () => (
  <svg
    width="52"
    height="52"
    viewBox="0 0 52 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M26 0C11.6637 0 0 11.6637 0 26C0 40.3363 11.6637 52 26 52C40.3363 52 52 40.3363 52 26C52 11.6637 40.3363 0 26 0ZM28.5 39.9888H23.5V34.9888H28.5V39.9888ZM28 32H24L23.25 12H28.75L28 32Z"
      fill="#E43126"
    />
  </svg>
);

const Rectangle = () => (
  <svg
    width="80"
    height="19"
    viewBox="0 0 80 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="80" height="19" fill="url(#paint0_linear_847_5847)" />
    <defs>
      <linearGradient
        id="paint0_linear_847_5847"
        x1="76.8542"
        y1="-2.00987e-06"
        x2="39.0971"
        y2="50.4459"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F2EFE5" />
        <stop offset="1" stopColor="#F3FFDA" />
      </linearGradient>
    </defs>
  </svg>
);

const Bar = () => (
  <svg
    width="5"
    height="19"
    viewBox="0 0 5 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="5" height="19" fill="url(#paint0_linear_847_5845)" />
    <defs>
      <linearGradient
        id="paint0_linear_847_5845"
        x1="4.80338"
        y1="-2.00987e-06"
        x2="-1.72336"
        y2="0.545007"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F2EFE5" />
        <stop offset="1" stopColor="#F3FFDA" />
      </linearGradient>
    </defs>
  </svg>
);

const RectangleGreen = () => (
  <svg
    width="80"
    height="19"
    viewBox="0 0 80 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="80" height="19" fill="#354728" />
  </svg>
);

const BarGreen = () => (
  <svg
    width="5"
    height="19"
    viewBox="0 0 5 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="5" height="19" fill="#354728" />
  </svg>
);
