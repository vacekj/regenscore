import { Grid, Flex, Box, Tooltip } from '@chakra-ui/react';
import { useScoreContext } from '@/contexts/scoreContext';
import { formatNumber } from '@/utils/strings';
import { CATEGORY_TOOLTIP, CategoryTooltipKeyType } from '@/constants';
import {
  EthLogo,
  GitcoinLogo,
  GivethLogo,
  GnosisSafeLogo,
  OptimismLogo,
  TrustedSeedLogo,
} from '@/components/Logo';
import RectangleGreen from './SVG-components/RectangleGreen';
import BarGreen from './SVG-components/BarGreen';
import Rectangle from './SVG-components/Rectangle';
import Bar from './SVG-components/Bar';

const IconBySource = ({ source }: { source: string }) => {
  switch (source) {
    case 'Mainnet':
      return <EthLogo />;
    case 'Gitcoin':
      return <GitcoinLogo />;
    case 'Giveth':
      return <GivethLogo />;
    case 'Gnosis Safe':
      return <GnosisSafeLogo />;
    case 'Optimism':
      return <OptimismLogo />;
    case 'Trusted Seed':
      return <TrustedSeedLogo />;
    default:
      return <EthLogo />;
  }
};

const CategoriesSection = () => {
  const { score, categories, loading, error } = useScoreContext();

  if (loading) {
    return (
      <Flex
        alignItems={'center'}
        mx="auto"
        my="auto"
        justify={['', 'center', 'center', 'start', 'start']}
        gap={'25px'}
        ml={['0', '100px', '100px', '0', '0']}
        color={['brand.deepGreen.400', 'white']}
        zIndex={2}
        marginX={['', 'auto', 'auto', '0', '0']}
        backgroundColor={['brand.backgroundOrange.400', 'transparent']}
        pb={[79, 0]}
        pt={['70px', 0]}
        mt={['-50px', '20px', '20px', '20px', '0']}
        px={['20px', '30px']}
        alignContent="center"
        maxWidth={['', '500px', '500px', 'auto', 'auto']}
        minWidth={['', '500px', '500px', '0', '0']}
      >
        <Box
          gap={['36px', '27px']}
          display={['none', 'flex']}
          alignItems="center"
          flexDir={'column'}
        >
          <Rectangle />
          <Rectangle />
          <Rectangle />
          <Rectangle />
          <Rectangle />
          <Rectangle />
        </Box>
        <Box
          gap={['36px', '27px']}
          display={['flex', 'none']}
          alignItems="center"
          flexDir={'column'}
        >
          <RectangleGreen />
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
          gap={['36px', '27px']}
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
          <Bar />
        </Box>
        <Box
          w={'5px'}
          gap={['36px', '25px']}
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
          <BarGreen />
        </Box>
        <Box
          display={'flex'}
          gap={['31px', '22px']}
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
    );
  }

  return (
    <Grid
      backgroundColor={['brand.backgroundOrange.400', 'transparent']}
      templateRows={`repeat(${categories.length},1fr)`}
      templateColumns={'max-content 1fr'}
      gap={['36px', 6]}
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
                  <IconBySource source={categoryItem.category} />
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
    </Grid>
  );
};

export default CategoriesSection;
