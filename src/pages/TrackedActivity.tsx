import { Check } from '@/components/Check';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Heading,
  Box,
  Flex,
  Text,
  Tooltip,
} from '@chakra-ui/react';

import React from 'react';

import { useAccount } from 'wagmi';
import { useScore } from '@/hooks';

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
      <Td>{activity.value.toString()}</Td>
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
                (meta?.tokenBalances?.tokens)
                  .filter((key: any) => !!key.applies)
                  .map((activity: any, index: string) => (
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

const GitcoinLogo = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Currencies">
      <circle id="Ellipse 11" cx="12" cy="12" r="12" fill="#354728" />
      <path
        id="Vector"
        d="M17.8465 20.0901C17.773 20.1124 17.7366 20.133 17.701 20.133C15.6958 20.133 13.6835 20.2371 11.6878 20.1036C8.55852 19.8947 6.07317 17.6605 5.27267 14.7843C4.33533 11.4171 5.87384 7.88699 8.97855 6.29078C9.22455 6.16445 9.32422 6.02223 9.3084 5.74733C9.28625 5.36675 9.2989 4.98379 9.30444 4.60162C9.3084 4.29096 9.36456 4.0089 9.76165 4.00016C10.0749 3.9938 10.2125 4.17575 10.2157 4.59367C10.2181 4.97187 10.2157 5.35006 10.2157 5.75368C10.6824 5.66072 11.1016 5.5773 11.5651 5.48513C11.5651 5.18162 11.5596 4.86778 11.5667 4.55474C11.5746 4.24805 11.6798 4.00016 12.0374 4.00334C12.3902 4.00652 12.5017 4.23534 12.4962 4.55633C12.4914 4.85507 12.4954 5.15461 12.4954 5.48513C13.776 5.51294 14.9491 5.82281 15.99 6.48703C16.6798 6.9272 17.2952 7.48575 18 8.03636C16.6664 9.28218 15.4063 10.4605 14.151 11.6332C14.5876 12.8568 14.5813 13.0268 14.0457 14.1193C14.6604 14.5698 15.2876 15.0163 15.9015 15.4827C16.5058 15.9419 17.0975 16.4178 17.6883 16.8937C17.7603 16.9517 17.8394 17.0574 17.8402 17.1416C17.8505 18.1261 17.8473 19.1097 17.8473 20.0909L17.8465 20.0901ZM16.0565 8.06258C15.8769 7.93148 15.7464 7.82263 15.6025 7.73364C14.0355 6.76909 12.368 6.51007 10.5867 7.00109C10.3106 7.07736 10.2109 7.19893 10.2212 7.49052C10.2434 8.14839 10.226 8.80785 10.2283 9.46651C10.2299 9.7875 10.1144 10.0163 9.76244 10.0171C9.41123 10.0171 9.291 9.77955 9.28546 9.46651C9.27913 9.11056 9.28388 8.75541 9.28388 8.39946C9.28388 8.14521 9.28388 7.89096 9.28388 7.57156C9.09878 7.68915 8.98567 7.75192 8.88283 7.82819C6.85785 9.33779 5.99486 11.3495 6.36901 13.8579C6.7479 16.3956 8.96905 18.5718 11.5161 18.78C13.1574 18.9134 14.8154 18.8388 16.4654 18.8538C16.4987 18.8538 16.5319 18.8197 16.5825 18.7911C16.5825 18.598 16.5612 18.3978 16.5873 18.2047C16.6403 17.8082 16.4828 17.5596 16.1601 17.3268C15.1919 16.6284 14.2427 15.9014 13.3022 15.1657C13.0427 14.9623 12.796 14.905 12.474 14.9392C11.7344 15.0171 11.1056 14.7628 10.6412 14.1685C10.0195 13.3724 9.96731 12.4778 10.4775 11.6729C11.0035 10.8426 11.8808 10.4994 12.8608 10.7179C12.989 10.7465 13.1835 10.7258 13.2729 10.6448C14.196 9.80577 15.1041 8.95007 16.0549 8.06337L16.0565 8.06258ZM12.2945 13.6568C12.7714 13.66 13.1464 13.2898 13.1487 12.8123C13.1519 12.3387 12.7762 11.9558 12.3063 11.9526C11.8365 11.9494 11.4536 12.3292 11.4512 12.8011C11.4489 13.2779 11.8198 13.6545 12.2945 13.6576V13.6568Z"
        fill="white"
        fill-opacity="0.75"
      />
    </g>
  </svg>
);

const GivethLogo = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Currencies">
      <circle id="Ellipse 11" cx="12" cy="12" r="12" fill="#5326EC" />
      <g id="Vector">
        <path
          d="M20.136 13.3675C20.087 13.5947 20.0481 13.8249 19.9872 14.0487C19.3411 16.4252 17.9337 18.2015 15.7487 19.336C14.1164 20.1838 12.3752 20.4385 10.5654 20.1137C8.47239 19.7386 6.77168 18.6947 5.46062 17.0202C5.44856 17.0048 5.45661 16.9512 5.47233 16.9388C7.64228 15.3121 9.81373 13.6875 11.9867 12.0651C12.0375 12.0305 12.0991 12.0151 12.1603 12.0217C14.8289 12.4024 17.4971 12.7855 20.1649 13.1709L20.136 13.3675Z"
          fill="#FCFCFF"
        />
        <path
          d="M13.3737 3.85434C13.5956 3.90366 13.8189 3.94594 14.0389 4.00226C15.3274 4.33253 16.4707 4.93814 17.4688 5.8191C17.4754 5.82579 17.4817 5.83285 17.4876 5.84024L16.6909 6.43521C16.5175 6.56471 16.3449 6.69537 16.1699 6.82269C16.1593 6.82757 16.1477 6.82978 16.1361 6.82912C16.1244 6.82847 16.1131 6.82498 16.1031 6.81894C15.0855 6.02094 13.9335 5.55547 12.6471 5.42255C9.76887 5.12602 6.98248 6.79377 5.89632 9.47425C5.22377 11.1351 5.22461 12.805 5.87697 14.475C5.88321 14.4908 5.879 14.5233 5.86761 14.5312C5.43291 14.859 4.99703 15.1857 4.55998 15.5112C4.55572 15.5144 4.55065 15.5167 4.54096 15.5225C4.51299 15.4616 4.48453 15.4024 4.45838 15.3424C3.73463 13.6819 3.55678 11.9648 3.94896 10.1954C4.765 6.51724 7.9711 3.86911 11.7469 3.75221C12.1287 3.74046 12.5119 3.77868 12.8943 3.79375L12.9724 3.79659L13.3737 3.85434Z"
          fill="#FCFCFF"
        />
        <path
          d="M16.8004 9.37671C16.8499 9.03721 17.0155 8.72536 17.2691 8.49425C17.5226 8.26313 17.8485 8.12703 18.1911 8.10912C18.5337 8.0912 18.8719 8.19257 19.1481 8.39597C19.4244 8.59938 19.6217 8.89224 19.7063 9.22473C19.791 9.55721 19.7578 9.90876 19.6124 10.2195C19.4671 10.5303 19.2185 10.7811 18.9091 10.9293C18.5996 11.0774 18.2484 11.1137 17.9152 11.032C17.582 10.9503 17.2874 10.7557 17.0816 10.4812C16.9644 10.3247 16.8792 10.1465 16.831 9.95698C16.7827 9.76746 16.7723 9.57027 16.8004 9.37671Z"
          fill="#FCFCFF"
        />
      </g>
    </g>
  </svg>
);

const OptimismLogo = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Network Logos" clip-path="url(#clip0_668_1248)">
      <path
        id="Vector"
        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
        fill="#FF0420"
      />
      <path
        id="Vector_2"
        d="M8.50258 15.1898C7.78805 15.1898 7.20264 15.0217 6.74631 14.6854C6.29597 14.3432 6.0708 13.8569 6.0708 13.2264C6.0708 13.0943 6.08582 12.9321 6.11582 12.74C6.19392 12.3077 6.30499 11.7883 6.44909 11.1819C6.85738 9.53068 7.91117 8.70508 9.61042 8.70508C10.0728 8.70508 10.487 8.78313 10.8533 8.93922C11.2196 9.08932 11.5078 9.31751 11.718 9.62375C11.9281 9.92394 12.0332 10.2842 12.0332 10.7045C12.0332 10.8306 12.0182 10.9897 11.9881 11.1819C11.8981 11.7163 11.79 12.2357 11.6639 12.74C11.4538 13.5626 11.0905 14.1781 10.5741 14.5864C10.0577 14.9887 9.36725 15.1898 8.50258 15.1898ZM8.62867 13.8929C8.96496 13.8929 9.25013 13.7938 9.48432 13.5957C9.72451 13.3975 9.89563 13.0943 9.99768 12.686C10.1358 12.1216 10.2409 11.6292 10.3129 11.2089C10.3369 11.0828 10.3489 10.9537 10.3489 10.8216C10.3489 10.2752 10.0637 10.002 9.49335 10.002C9.15706 10.002 8.86886 10.1011 8.62867 10.2992C8.39453 10.4974 8.22639 10.8006 8.12434 11.2089C8.01624 11.6112 7.90814 12.1036 7.8001 12.686C7.77605 12.8061 7.76405 12.9321 7.76405 13.0642C7.76405 13.6167 8.05229 13.8929 8.62867 13.8929Z"
        fill="white"
      />
      <path
        id="Vector_3"
        d="M12.4465 15.0996C12.3805 15.0996 12.3294 15.0786 12.2934 15.0365C12.2634 14.9885 12.2544 14.9345 12.2664 14.8744L13.5093 9.02009C13.5213 8.95404 13.5543 8.89999 13.6084 8.85795C13.6624 8.81595 13.7194 8.79492 13.7795 8.79492H16.1753C16.8417 8.79492 17.3761 8.93302 17.7784 9.20921C18.1867 9.48545 18.3909 9.88471 18.3909 10.4071C18.3909 10.5572 18.3729 10.7133 18.3368 10.8754C18.1867 11.566 17.8835 12.0763 17.4272 12.4066C16.9769 12.7368 16.3584 12.9019 15.5718 12.9019H14.3559L13.9416 14.8744C13.9296 14.9405 13.8966 14.9945 13.8426 15.0365C13.7885 15.0786 13.7314 15.0996 13.6714 15.0996H12.4465ZM15.6349 11.659C15.887 11.659 16.1062 11.59 16.2923 11.4519C16.4845 11.3138 16.6106 11.1156 16.6706 10.8574C16.6886 10.7553 16.6976 10.6653 16.6976 10.5872C16.6976 10.4131 16.6466 10.281 16.5445 10.191C16.4424 10.0949 16.2683 10.0469 16.0221 10.0469H14.9413L14.5991 11.659H15.6349Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_668_1248">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const EthLogo = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="12" fill="white" />
    <g clip-path="url(#clip0_685_548)">
      <path
        d="M11.9983 3L11.8804 3.42374V15.7197L11.9983 15.8442L17.3967 12.4704L11.9983 3Z"
        fill="#5326EC"
        fill-opacity="0.2"
      />
      <path
        d="M11.9985 3L6.6001 12.4704L11.9985 15.8442V9.87611V3Z"
        fill="#5326EC"
      />
      <path
        d="M11.9986 16.9248L11.9321 17.0105V21.3906L11.9986 21.5958L17.4002 13.5527L11.9986 16.9248Z"
        fill="#5326EC"
        fill-opacity="0.4"
      />
      <path
        d="M11.9985 21.5958V16.9248L6.6001 13.5527L11.9985 21.5958Z"
        fill="#5326EC"
      />
      <path
        d="M11.9985 15.845L17.3969 12.4712L11.9985 9.87695V15.845Z"
        fill="#5326EC"
      />
      <path
        d="M6.6001 12.4712L11.9984 15.845V9.87695L6.6001 12.4712Z"
        fill="#5326EC"
        fill-opacity="0.2"
      />
    </g>
    <defs>
      <clipPath id="clip0_685_548">
        <rect
          width="10.8"
          height="18.6"
          fill="white"
          transform="translate(6.6001 3)"
        />
      </clipPath>
    </defs>
  </svg>
);
