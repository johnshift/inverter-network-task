'use client';

import { NetworkIcon, UserIcon } from 'lucide-react';
import { useAccount, useChainId, useChains } from 'wagmi';

import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  balanceInfo?: React.ReactNode;
}

export const WalletStatus = ({ balanceInfo }: Props) => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const chains = useChains();
  const chain = chains.find((c) => c.id === chainId);

  if (!isConnected || !address) {
    return (
      <div className='rounded-lg border bg-card p-4 shadow-sm'>
        <p className='text-sm text-muted-foreground'>Not connected</p>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <div className='rounded-lg border bg-card p-4 shadow-sm'>
        <div className='flex items-center gap-3'>
          <UserIcon className='size-8 shrink-0' />
          <div className='flex min-w-0 flex-1 flex-col gap-1'>
            <Label>Connected Address</Label>
            <p className='font-mono text-sm break-all text-muted-foreground'>{address}</p>
          </div>
        </div>
      </div>

      <div className='rounded-lg border bg-card p-4 shadow-sm'>
        <div className='flex items-center gap-3'>
          <NetworkIcon className='size-8 shrink-0' />
          <div className='flex min-w-0 flex-1 flex-col gap-1'>
            <Label>Network</Label>
            {chain ? (
              <div className='flex items-center gap-2'>
                <p className='text-sm text-muted-foreground'>{chain.name}</p>
                <span className='text-xs text-muted-foreground/60'>
                  (Chain ID: {chainId})
                </span>
              </div>
            ) : (
              <Skeleton className='h-5 w-32' />
            )}
          </div>
        </div>
      </div>

      {balanceInfo}
    </div>
  );
};
