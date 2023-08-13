import { ChakraProvider } from "@chakra-ui/react";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, gnosis, mainnet, optimism, polygon } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { theme } from "../chakra";
import "./styles.css";

const { chains, publicClient } = configureChains(
  [mainnet, optimism, arbitrum, gnosis, polygon],
  [publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: "RegenScore",
  projectId: "df4f5f1b03670ef123bd5ee18401d0de",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
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
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} showRecentTransactions={true}>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default MyApp;
