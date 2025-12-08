import './globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { Nav } from '@/components/nav';
import { RootProvider } from '@/components/providers/root-provider';
import { ConnectWallet } from '@/features/wallet/components/connect-wallet';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Inverter Task',
  description: 'Inverter assignment task for frontend role.',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <RootProvider nav={<Nav connectWallet={<ConnectWallet />} />}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
};

export default RootLayout;
