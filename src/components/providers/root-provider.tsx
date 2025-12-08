'use client';

import { ThemeProvider } from 'next-themes';

import { WagmiProvider } from 'wagmi';

import { RainbowKitProvider } from './rainbowkit-provider';
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
      <WagmiProvider config={config}>
        <ReactQueryProvider>
          <RainbowKitProvider>
            {nav}
            <div className='container mx-auto px-2 md:px-4'>{children}</div>
          </RainbowKitProvider>
        </ReactQueryProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
};
