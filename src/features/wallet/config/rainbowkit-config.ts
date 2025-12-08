import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  coinbaseWallet,
  injectedWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { mainnet, sepolia } from 'viem/chains';

import { env } from '@/config/env';

const walletsUsingWalletConnect = [rainbowWallet, metaMaskWallet, walletConnectWallet];

export const config = getDefaultConfig({
  appName: 'Inverter Interview Task',
  projectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  chains: [mainnet, sepolia],
  ssr: true,
  wallets: [
    {
      groupName: 'Popular',
      wallets: [
        injectedWallet,
        coinbaseWallet,
        ...(typeof indexedDB !== 'undefined' ? walletsUsingWalletConnect : []),
      ],
    },
  ],
});
