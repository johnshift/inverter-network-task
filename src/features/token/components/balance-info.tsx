'use client';

import { type FallbackProps } from 'react-error-boundary';

import { useChainModal } from '@rainbow-me/rainbowkit';
import { AlertCircleIcon, ArrowUpDownIcon, WalletIcon } from 'lucide-react';
import { type Address, zeroAddress } from 'viem';
import { sepolia } from 'viem/chains';
import { useAccount, useChainId } from 'wagmi';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { WithQueryErrorBoundary } from '@/components/with-query-error-boundary';
import { useTokenBalance } from '@/features/token/hooks/use-token-balance';
import { useTokenName } from '@/features/token/hooks/use-token-name';
import { useTokenSymbol } from '@/features/token/hooks/use-token-symbol';
import { tokenQueries } from '@/features/token/queries';

const BalanceInfoInner = ({ address }: { address: Address }) => {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { openChainModal } = useChainModal();

  const isSepolia = chainId === sepolia.id;
  const showNetworkError = isConnected && !isSepolia;
  const queriesEnabled = !showNetworkError;

  const {
    data: balance,
    isLoading: isLoadingBalance,
    isRefetching,
  } = useTokenBalance(address || zeroAddress, queriesEnabled);
  const { data: tokenName, isLoading: isLoadingName } = useTokenName(queriesEnabled);
  const { data: tokenSymbol, isLoading: isLoadingSymbol } =
    useTokenSymbol(queriesEnabled);

  const isLoading = isLoadingBalance || isLoadingName || isLoadingSymbol;

  if (showNetworkError) {
    return (
      <div className='rounded-lg border bg-card p-4 shadow-sm'>
        <div className='flex items-center gap-3'>
          <AlertCircleIcon className='size-8 shrink-0 text-destructive' />
          <div className='flex flex-1 flex-col gap-1'>
            <Label>Current Balance</Label>
            <div className='flex items-center justify-between gap-2'>
              <div className='flex flex-col gap-0.5'>
                <p className='text-sm font-medium text-destructive'>
                  Unsupported Network
                </p>
                <p className='text-xs text-muted-foreground'>
                  Please switch to <span className='font-semibold'>Sepolia</span> network
                </p>
              </div>
              <Button
                variant='outline'
                size='sm'
                onClick={openChainModal}
                className='shrink-0 gap-1'
              >
                <ArrowUpDownIcon className='size-3' />
                Switch Network
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='rounded-lg border bg-card p-4 shadow-sm'>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex items-center gap-3'>
          <WalletIcon className='size-8 shrink-0' />
          <div className='flex flex-col gap-1'>
            <Label>Current Balance</Label>
            <span className='text-xs text-muted-foreground'>
              {tokenName || 'Unknown Token'}
            </span>
          </div>
        </div>
        {isLoading ? (
          <Skeleton className='h-8 w-32' />
        ) : (
          <div className='flex items-baseline gap-2'>
            {isRefetching && <Spinner className='size-4 text-muted-foreground/60' />}
            <span className='text-2xl font-semibold tracking-tight tabular-nums'>
              {balance || '0'}
            </span>
            <span className='text-lg font-medium text-foreground/80'>
              {tokenSymbol || 'tokens'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const BalanceInfoFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className='space-y-2'>
      <Label>Current Balance</Label>
      <div className='flex items-center gap-2 rounded-md border border-destructive/50 bg-destructive/10 p-3'>
        <AlertCircleIcon className='size-4 shrink-0 text-destructive' />
        <div className='min-w-0 flex-1'>
          <p className='text-sm font-medium text-destructive'>Failed to load balance</p>
          <p className='mt-1 text-xs text-muted-foreground'>
            {error instanceof Error ? error.message : 'An error occurred'}
          </p>
        </div>
        <Button
          variant='outline'
          size='sm'
          onClick={resetErrorBoundary}
          className='shrink-0'
        >
          Retry
        </Button>
      </div>
    </div>
  );
};

export const BalanceInfo = () => {
  const { address } = useAccount();
  const queryKey = tokenQueries.balance(address || zeroAddress).queryKey;

  return (
    <WithQueryErrorBoundary queryKey={queryKey} fallback={BalanceInfoFallback}>
      <BalanceInfoInner address={address || zeroAddress} />
    </WithQueryErrorBoundary>
  );
};
