import dynamic from 'next/dynamic';
import MintYour from '@/components/MintYour';
import TrackedActivity from '@/pages/TrackedActivity';

import { Flex } from '@chakra-ui/react';

const Layout = dynamic(() => import('@/components/Layout'), { ssr: false });

export default function Mint() {
  return (
    <Layout>
      <Flex
        bg="linear-gradient(to bottom right, #577442 0%, #354728 25%)"
        pl="54px"
        pt="96px"
        justifyContent="flex-end"
      >
        <MintYour />
      </Flex>
      <TrackedActivity />
    </Layout>
  );
}
