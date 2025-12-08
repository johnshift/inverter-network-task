'use client';

import { useTheme } from 'next-themes';

import {
  darkTheme,
  lightTheme,
  RainbowKitProvider as BaseProvider,
} from '@rainbow-me/rainbowkit';

interface Props {
  children: React.ReactNode;
}

export const RainbowKitProvider = ({ children }: Props) => {
  const { resolvedTheme } = useTheme();

  return (
    <BaseProvider
      theme={
        resolvedTheme === 'dark'
          ? darkTheme({
              accentColor: '#EBEBEB',
              accentColorForeground: '#343434',
            })
          : lightTheme({
              accentColor: '#343434',
              accentColorForeground: '#FBFBFB',
            })
      }
    >
      {children}
    </BaseProvider>
  );
};
