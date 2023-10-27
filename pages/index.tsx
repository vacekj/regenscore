import dynamic from 'next/dynamic';
import Head from 'next/head';

const Layout = dynamic(() => import('@/components/Layout'), { ssr: false });
const Landing = dynamic(() => import('@/components/Landing'), { ssr: false });

export default function Index() {
  return (
    <>
      <Head>
        <link rel="icon" href="/icons/favicon.ico" />
      </Head>
      <Layout>
        <Landing />
      </Layout>
    </>
  );
}
