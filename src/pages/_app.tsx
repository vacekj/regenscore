import { isDevelopmentEnvironment } from "@/pages/api/claim";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { chain, configureChains, createClient, WagmiProvider } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import "./styles.css";

const { provider, chains } = configureChains(
  [chain.polygonMumbai],
  [infuraProvider({
    infuraId: process.env.NEXT_PUBLIC_INFURA_PROJECT_ID!,
  })],
);

const { connectors } = getDefaultWallets({
  appName: "RegenScore",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
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
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      <WagmiProvider client={wagmiClient}>
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
      </WagmiProvider>
    </>
  );
}

export default MyApp;
