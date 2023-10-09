'use client';

import dynamic from 'next/dynamic';
import Head from 'next/head';

import { Flex } from '@chakra-ui/react';
import { Hex } from 'viem';

const Layout = dynamic(() => import('@/components/Layout'), { ssr: false });
const YourScore = dynamic(() => import('@/components/YourScore'), {
  ssr: false,
});
const TrackedActivity = dynamic(() => import('@/components/TrackedActivity'), {
  ssr: false,
});

async function getProps(address: string) {
  try {
    // TODO: MAKE THIS WORK, RIGHT NOW THE API IS NOT ACCESSIBLE FROM HERE
    // if (address) {
    //   const res = await fetchScoreData(getAddress(address));
    //   console.log({ res });
    //   const { score, meta, categories } = res;
    //   return { address, score, meta, categories };
    // }
    return { address, score: 0, meta: {}, categories: [] };
  } catch (error: any) {
    console.log({ error });
    console.error('Error fetching score data:', error.message);
    // Handle error appropriately for your use case
    return { address, score: 0, meta: {}, categories: [] };
  }
}

export default async function ShareProfile({
  params,
}: {
  params: { address: string };
}) {
  // const props = await getProps(params.address);
  const { address } = params;
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
          <YourScore _address={address as Hex} />
        </Flex>
        {/*DEPLOY TRIGGER*/}
        <TrackedActivity address={address as Hex} />
      </Layout>
    </>
  );
}
