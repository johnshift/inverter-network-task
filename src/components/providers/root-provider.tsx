'use client';

import { ThemeProvider } from 'next-themes';

import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';

import { ReactQueryProvider } from './react-query-provider';

import { config } from '@/features/wallet/config/rainbowkit-config';

interface Props {
  children: React.ReactNode;
  nav: React.ReactNode;
}

export const RootProvider = ({ children, nav }: Props) => {
  return (
    <ThemeProvider
      attribute='class'
      enableSystem
      defaultTheme='system'
      disableTransitionOnChange
    >
      {nav}
      <WagmiProvider config={config}>
        <ReactQueryProvider>
          <RainbowKitProvider>{children}</RainbowKitProvider>
        </ReactQueryProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
};
