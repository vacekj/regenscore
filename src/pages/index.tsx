import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('@/components/Layout'), { ssr: false });
const Landing = dynamic(() => import('@/components/Landing'), { ssr: false });

export default function Index() {
  return (
    <Layout>
      <Landing />
    </Layout>
  );
}
