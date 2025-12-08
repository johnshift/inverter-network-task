/* eslint-disable @next/next/no-img-element */

'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { CircleAlertIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const ConnectWallet = () => {
  return (
    <ConnectButton
      showBalance={false}
      chainStatus={{
        smallScreen: 'icon',
        largeScreen: 'full',
      }}
      accountStatus={{
        smallScreen: 'avatar',
        largeScreen: 'full',
      }}
    />
  );
};

export const ChainSelector = () => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, mounted, authenticationStatus, openChainModal }) => {
        const isReady = mounted && authenticationStatus !== 'loading';
        const connected =
          isReady &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        if (!connected) return null;

        if (chain.unsupported) {
          return (
            <Button variant='outline' size='default' onClick={openChainModal}>
              <CircleAlertIcon className='size-4' />
              <span className='hidden sm:inline'>Unsupported Network</span>
              <span className='sm:hidden'>Network</span>
            </Button>
          );
        }

        return (
          <Button variant='secondary' size='default' onClick={openChainModal}>
            {chain.hasIcon && chain.iconUrl && (
              <div
                className='flex shrink-0 items-center justify-center overflow-hidden rounded-full'
                style={{
                  background: chain.iconBackground,
                  width: 18,
                  height: 18,
                }}
              >
                <img
                  alt={chain.name ?? 'Chain icon'}
                  src={chain.iconUrl}
                  className='size-full object-contain'
                />
              </div>
            )}
            <span className='font-medium'>
              {chain.name} {chain.id}
            </span>
          </Button>
        );
      }}
    </ConnectButton.Custom>
  );
};
