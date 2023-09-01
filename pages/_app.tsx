import '../styles/global.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { RainbowKitProvider, getDefaultWallets, connectorsForWallets } from '@rainbow-me/rainbowkit';
import { Chain, configureChains, createConfig, WagmiConfig } from 'wagmi';
import { polygonMumbai, mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import React from 'react';

export const mumbai = {
  ...polygonMumbai,
  rpcUrls: {
    public: { http: ['https://polygon-mumbai-bor.publicnode.com'] },
    default: { http: ['https://polygon-mumbai-bor.publicnode.com'] },
  },
} as const satisfies Chain;

const { chains, publicClient, webSocketPublicClient } = configureChains([mainnet, mumbai], [publicProvider()]);

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID as string;

const { wallets } = getDefaultWallets({
  appName: 'EMP Test Task',
  projectId,
  chains,
});

const connectors = connectorsForWallets(wallets);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
