import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import './styles.css';

const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'RegenScore',
  projectId: 'YOUR_PROJECT_ID',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const theme = extendTheme({
  layerStyles: {
    base: {},
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>RegenScore</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0'
        />
      </Head>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} showRecentTransactions={true}>
          <ChakraProvider>
            {/*<MoralisProvider*/}
            {/*  appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID!}*/}
            {/*  serverUrl={process.env.NEXT_PUBLIC_SERVER_URL!}*/}
            {/*>*/}
            <Component {...pageProps} />
            {/*</MoralisProvider>*/}
          </ChakraProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default MyApp;
