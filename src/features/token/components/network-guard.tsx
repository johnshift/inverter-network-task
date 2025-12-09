'use client';

import { useChainModal } from '@rainbow-me/rainbowkit';
import { AlertCircle, ArrowUpDownIcon } from 'lucide-react';
import { sepolia } from 'viem/chains';
import { useAccount, useChainId } from 'wagmi';

import { Button } from '@/components/ui/button';

interface Props {
  children: React.ReactNode;
}

export const NetworkGuard = ({ children }: Props) => {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { openChainModal } = useChainModal();

  const isSepolia = chainId === sepolia.id;

  if (!isConnected) {
    return <>{children}</>;
  }

  if (!isSepolia) {
    return (
      <div className='rounded-lg border border-destructive/50 bg-destructive/10 p-6'>
        <div className='flex flex-col items-center gap-4 text-center'>
          <AlertCircle className='size-8 text-destructive' />
          <div className='space-y-2'>
            <h3 className='text-lg font-semibold'>Unsupported Network</h3>
            <div className='flex flex-col gap-0'>
              <p className='text-sm text-muted-foreground'>
                Please switch to <span className='font-semibold text-white'>Sepolia</span>{' '}
                network to mint tokens.
              </p>
            </div>
          </div>
          <Button onClick={openChainModal} variant='default' size='lg' className='gap-1'>
            <ArrowUpDownIcon />
            Switch Network
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
