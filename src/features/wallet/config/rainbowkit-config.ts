import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia } from 'viem/chains';

import { env } from '@/config/env';

export const getConfig = () =>
  getDefaultConfig({
    appName: 'Inverter Interview Task',
    projectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    chains: [mainnet, sepolia],
    ssr: true,
  });
