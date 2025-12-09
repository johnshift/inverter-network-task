'use client';

import { type FallbackProps } from 'react-error-boundary';

import { ArrowDownIcon, ArrowUpIcon, WalletIcon } from 'lucide-react';
import { type Address } from 'viem';
import { useAccount } from 'wagmi';

import { CopyText } from '@/app/components/copy-text';
import { LinkText } from '@/app/components/link-text';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { WithQueryErrorBoundary } from '@/components/with-query-error-boundary';
import { SEPOLIA_EXPLORER_URL } from '@/features/token/constants';
import { useTokenTransfers } from '@/features/token/hooks/use-token-transfers';
import { tokenQueries } from '@/features/token/queries';
import { type TokenTransfersPage } from '@/features/token/types';
import { formatDate, truncateHash } from '@/lib/utils';

const TransactionsListLoading = () => {
  return (
    <div className='space-y-4'>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className='rounded-lg border bg-card p-4 shadow-sm'>
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <Skeleton className='h-5 w-32' />
              <Skeleton className='h-6 w-28' />
            </div>
            <Separator />
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <Skeleton className='h-4 w-16' />
                <Skeleton className='h-4 w-32' />
              </div>
              <div className='flex items-center justify-between'>
                <Skeleton className='h-4 w-16' />
                <Skeleton className='h-4 w-32' />
              </div>
              <div className='flex items-center justify-between'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-4 w-32' />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const TransactionsListError = () => {
  return (
    <div className='rounded-lg border border-destructive/50 bg-destructive/10 p-4'>
      <p className='text-sm font-medium text-destructive'>Failed to load transactions</p>
      <p className='mt-1 text-xs text-muted-foreground'>Please try again later</p>
    </div>
  );
};

const TransactionsListEmpty = () => {
  return (
    <div className='rounded-lg border bg-card p-8 shadow-sm'>
      <div className='flex flex-col items-center justify-center gap-3 text-center'>
        <WalletIcon className='size-12 text-muted-foreground/50' />
        <div className='space-y-1'>
          <p className='text-sm font-medium'>No transactions found</p>
          <p className='text-xs text-muted-foreground'>
            Your transaction history will appear here once you make transfers
          </p>
        </div>
      </div>
    </div>
  );
};

const TransactionItem = ({
  transfer,
  address,
}: {
  transfer: TokenTransfersPage['transfers'][number];
  address: Address;
}) => {
  const isIncoming = transfer.to.toLowerCase() === address.toLowerCase();
  const date = formatDate(transfer.timestamp);

  return (
    <div className='rounded-lg border bg-card p-4 shadow-sm transition-shadow hover:shadow-md'>
      <div className='space-y-4'>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center gap-3'>
            <div
              className={`flex size-10 shrink-0 items-center justify-center rounded-full ${
                isIncoming
                  ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                  : 'bg-red-500/10 text-red-600 dark:text-red-400'
              }`}
            >
              {isIncoming ? (
                <ArrowDownIcon className='size-5' />
              ) : (
                <ArrowUpIcon className='size-5' />
              )}
            </div>
            <div className='flex flex-col gap-0.5'>
              <p className='text-sm font-medium'>{isIncoming ? 'Received' : 'Sent'}</p>
              <p className='text-xs text-muted-foreground'>{date}</p>
            </div>
          </div>
          <div className='flex flex-col items-end gap-0.5'>
            <p
              className={`text-xl font-semibold tracking-tight tabular-nums ${
                isIncoming
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {isIncoming ? '+' : '-'}
              {transfer.amount.toLocaleString('en-US', {
                maximumFractionDigits: 4,
              })}
            </p>
            {transfer.token && (
              <p className='text-sm font-medium text-muted-foreground'>
                {transfer.token}
              </p>
            )}
          </div>
        </div>
        <Separator />
        <div className='space-y-3'>
          <div className='flex items-center justify-between gap-2'>
            <Label className='text-xs text-muted-foreground'>From</Label>
            <CopyText text={truncateHash(transfer.from)} copyText={transfer.from} />
          </div>
          <div className='flex items-center justify-between gap-2'>
            <Label className='text-xs text-muted-foreground'>To</Label>
            <CopyText text={truncateHash(transfer.to)} copyText={transfer.to} />
          </div>
          <div className='flex items-center justify-between gap-2'>
            <Label className='text-xs text-muted-foreground'>Transaction Hash</Label>
            <LinkText
              text={truncateHash(transfer.hash)}
              href={`${SEPOLIA_EXPLORER_URL}/tx/${transfer.hash}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const TransactionsListLoadMore = ({
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
  hasTransactions,
}: {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
  hasTransactions: boolean;
}) => {
  if (hasNextPage) {
    return (
      <div className='flex justify-center pt-4'>
        <Button
          onClick={onLoadMore}
          disabled={isFetchingNextPage}
          variant='outline'
          className='w-full sm:w-auto'
        >
          {isFetchingNextPage ? (
            <>
              <Spinner className='mr-2 size-4' />
              Loading...
            </>
          ) : (
            'Load More'
          )}
        </Button>
      </div>
    );
  }

  if (hasTransactions) {
    return (
      <div className='flex justify-center pt-4'>
        <p className='text-sm text-muted-foreground'>No more transactions to show</p>
      </div>
    );
  }

  return null;
};

const TransactionsListInner = ({ address }: { address: Address }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useTokenTransfers(address);

  const allTransfers = data?.pages.flatMap((page) => page.transfers) || [];

  if (isLoading) {
    return <TransactionsListLoading />;
  }

  if (isError) {
    return <TransactionsListError />;
  }

  if (allTransfers.length === 0) {
    return <TransactionsListEmpty />;
  }

  return (
    <div className='space-y-4'>
      {allTransfers.map((transfer, index) => (
        <TransactionItem
          key={`${transfer.hash}-${index}`}
          transfer={transfer}
          address={address}
        />
      ))}

      <TransactionsListLoadMore
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={fetchNextPage}
        hasTransactions={allTransfers.length > 0}
      />
    </div>
  );
};

const TransactionsListFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className='rounded-lg border border-destructive/50 bg-destructive/10 p-4'>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex-1'>
          <p className='text-sm font-medium text-destructive'>
            Failed to load transactions
          </p>
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

export const TransactionsList = () => {
  const { address } = useAccount();

  if (!address) {
    return (
      <div className='rounded-lg border bg-card p-8 shadow-sm'>
        <div className='flex flex-col items-center justify-center gap-3 text-center'>
          <WalletIcon className='size-12 text-muted-foreground/50' />
          <div className='space-y-1'>
            <p className='text-sm font-medium'>Connect your wallet</p>
            <p className='text-xs text-muted-foreground'>
              Please connect your wallet to view transaction history
            </p>
          </div>
        </div>
      </div>
    );
  }

  const queryKey = tokenQueries.transfers(address).queryKey;

  return (
    <WithQueryErrorBoundary queryKey={queryKey} fallback={TransactionsListFallback}>
      <TransactionsListInner address={address} />
    </WithQueryErrorBoundary>
  );
};
