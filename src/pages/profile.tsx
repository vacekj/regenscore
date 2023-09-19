import dynamic from 'next/dynamic';
import Head from 'next/head';
import TrackedActivity from '@/components/TrackedActivity';

import { Flex } from '@chakra-ui/react';

const Layout = dynamic(() => import('@/components/Layout'), { ssr: false });
const MintYour = dynamic(() => import('@/components/MintYour'), { ssr: false });

export default function Mint() {
  return (
    <>
      <Head>
        <link rel="icon" href="icons/favicon.ico" />
      </Head>
      <Layout>
        <Flex
          bg={[
            'linear-gradient(to bottom left, #577442 0%, #354728 35%)',
            'linear-gradient(to bottom right, #577442 0%, #354728 25%)',
          ]}
          justifyContent="flex-end"
          boxShadow={[0, '0px 4px 4px rgba(0, 0, 0, 0.25)']}
          pt="96px"
          pl={{ base: '0px', sm: '0px', md: '40px', lg: '54px', xl: '54px' }}
        >
          <MintYour />
        </Flex>
        <TrackedActivity />
      </Layout>
    </>
  );
}
