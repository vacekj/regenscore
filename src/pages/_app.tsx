import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { infuraProvider } from 'wagmi/providers/infura';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { optimism, optimismGoerli, sepolia } from 'wagmi/chains';

import { AnimatePresence } from 'framer-motion';
import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { theme } from '@/chakra';
import './styles.css';
import CustomHead from './customhead';
import Hotjar from '@hotjar/browser';

const siteId = 3651658;
const hotjarVersion = 6;

Hotjar.init(siteId, hotjarVersion);

const chains = [optimism, optimismGoerli, sepolia];
const projectId = 'df4f5f1b03670ef123bd5ee18401d0de';

const { publicClient } = configureChains(chains, [
  w3mProvider({ projectId }),
  infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_PROJECT_ID! }),
]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CustomHead />
      <Head>
        <title>RegenScore</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      <WagmiConfig config={wagmiConfig}>
        <ChakraProvider theme={theme}>
          <AnimatePresence mode="wait">
            <Component {...pageProps} />
          </AnimatePresence>
        </ChakraProvider>
      </WagmiConfig>
      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        themeVariables={{
          '--w3m-font-family': 'Remixa, sans-serif',
          '--w3m-accent-color': 'black',
          '--w3m-background-color': '#354728',
          '--w3m-button-border-radius': '100px',
        }}
      />
    </>
  );
}

export default MyApp;
