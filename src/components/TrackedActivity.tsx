import { Check } from '@/components/Check';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Flex,
  Text,
  Tooltip,
} from '@chakra-ui/react';

import React from 'react';

import { useAccount } from 'wagmi';
import { useScore } from '@/hooks';
import {
  EthLogo,
  GitcoinLogo,
  GivethLogo,
  OptimismLogo,
} from '@/components/Logo';

// TODO: FIX TYPE
const ActivityRow = ({ activity }: any) => {
  const source = activity.source || activity.network;
  // TODO: Fix this by improving the sources
  if (activity?.tokens) return null;
  return (
    <Tr>
      <Td paddingLeft="0px">
        <Text
          variant={activity?.category?.toLowerCase()}
          borderRadius="30px"
          border="1px solid"
          padding="7px 16px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          w={'fit-content'}
        >
          {activity.category}
        </Text>
      </Td>
      <Td display="flex" gap="8px" alignItems="center" height="83px">
        {source === 'Optimism' && <OptimismLogo />}
        {source === 'Gitcoin' && <GitcoinLogo />}
        {source === 'Giveth' && <GivethLogo />}
        {source === 'Mainnet' && <EthLogo />}
        {source}
      </Td>
      <Td>{activity.behavior}</Td>
      <Td>
        {typeof activity.value === 'boolean'
          ? activity.value.toString()
          : activity.value}
      </Td>
      <Td>{activity.scoreAdded}</Td>
    </Tr>
  );
};

const TrackedActivity = () => {
  const { address } = useAccount();
  const { meta, loading } = useScore(address);

  return (
    <Flex
      flexDir="column"
      align="flex-center"
      justify="center"
      marginX={['0', 'auto']}
      maxWidth={{ base: '100%', xl: '1331px' }}
      width="100%"
    >
      <Heading
        as="h1"
        variant="h2"
        fontSize={['36px', '48px']}
        fontWeight={[600, 500]}
        mb="8px"
        mt={['0', '82px']}
        textAlign="start"
        color="brand.primaryOrange.200"
        marginX={{ base: '16px', sm: '40px', md: '40px', lg: '54px', xl: '0' }}
        maxWidth={{ base: 'auto', xl: '1386px' }}
        width="100%"
      >
        Tracked Activity
      </Heading>
      <Text
        mb={['28px', '46px']}
        fontSize={['16px', '20']}
        fontFamily="Inter-Regular"
        marginX={{ base: '16px', sm: '40px', md: '40px', lg: '54px', xl: '0' }}
      >
        Check out the details of your activities
      </Text>

      {meta && (
        <TableContainer
          borderRadius="8"
          bg="brand.beige.400"
          shadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          padding="28px 32px 16px 32px"
          mb="94px"
          maxWidth="1331px"
          width="100%"
          marginX={{
            base: '16px',
            sm: '40px',
            md: '40px',
            lg: '54px',
            xl: '0',
          }}
        >
          <Table size="lg">
            <Thead>
              <Tr>
                <Th
                  style={{ borderBottom: '1px solid #F5B333' }}
                  fontFamily="Inter-Bold"
                  fontSize="24px"
                  color="brand.deepGreen.400"
                  textTransform="capitalize"
                  paddingLeft="0px"
                >
                  Taxonomy
                </Th>
                <Th
                  style={{ borderBottom: '1px solid #F5B333' }}
                  fontFamily="Inter-Bold"
                  fontSize="24px"
                  color="brand.deepGreen.400"
                  textTransform="capitalize"
                >
                  Network
                </Th>
                <Th
                  style={{ borderBottom: '1px solid #F5B333' }}
                  fontFamily="Inter-Bold"
                  fontSize="24px"
                  color="brand.deepGreen.400"
                  textTransform="capitalize"
                  display="flex"
                  alignItems="center"
                  gap="8px"
                >
                  Behavior
                  <Tooltip
                    label="A concise description of the activity that resulted in the attestation"
                    placement="top-end"
                  >
                    <div>
                      <Check status={'WARNING2'} />
                    </div>
                  </Tooltip>
                </Th>
                <Th
                  style={{ borderBottom: '1px solid #F5B333' }}
                  fontFamily="Inter-Bold"
                  fontSize="24px"
                  color="brand.deepGreen.400"
                  textTransform="capitalize"
                >
                  Value
                </Th>
                <Th
                  style={{ borderBottom: '1px solid #F5B333' }}
                  fontFamily="Inter-Bold"
                  fontSize="24px"
                  color="brand.deepGreen.400"
                  textTransform="capitalize"
                  display="flex"
                  alignItems="center"
                  gap="8px"
                >
                  Points Earned
                  <Tooltip
                    label="The number of points awarded for the activity. These points are used to calculate the user's Regen Score."
                    placement="top-end"
                  >
                    <div>
                      <Check status={'WARNING2'} />
                    </div>
                  </Tooltip>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {meta &&
                // TODO: FIX TYPE
                Object.values(meta)
                  .filter((key: any) => !!key.applies)
                  .map((activity: any, index) => (
                    <ActivityRow
                      key={index}
                      activity={activity}
                      category={activity.category}
                    />
                  ))}
              {meta &&
                // TODO: FIX TYPE
                meta?.tokenBalances?.tokens
                  ?.filter((key: any) => !!key.applies)
                  ?.map((activity: any, index: number) => (
                    <ActivityRow key={index} activity={activity} />
                  ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Flex>
  );
};

export default TrackedActivity;
