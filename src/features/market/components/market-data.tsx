'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { useDebounce } from 'ahooks';
import { SearchIcon } from 'lucide-react';
import { toast } from 'sonner';

import { CooldownIndicator } from './cooldown-indicator';
import { RefreshIntervalInput } from './refresh-interval-input';

import { Button } from '@/components/ui/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { RateLimitError } from '@/features/market/api/get-market-data-by-page';
import { MarketTable } from '@/features/market/components/market-table';
import { useMarketData } from '@/features/market/hooks/use-market-data';
import { CoingeckoMarketDataItem } from '@/features/market/schemas';
import { useCooldown } from '@/hooks/use-cooldown';
import { cn } from '@/lib/utils';

const DEBOUNCE_WAIT = 500;
const COOLDOWN_SECONDS = 15;

export const MarketData = () => {
  const [searchValue, setSearchValue] = useState('');
  const [previousItems, setPreviousItems] = useState<CoingeckoMarketDataItem[]>([]);
  const [refreshInterval, setRefreshInterval] = useState(
    RefreshIntervalInput.defaultInterval,
  );
  const debouncedValue = useDebounce(searchValue, { wait: DEBOUNCE_WAIT });
  const cooldown = useCooldown(COOLDOWN_SECONDS);
  const { isActive: isCooldownActive, start: startCooldown } = cooldown;

  const query = isCooldownActive ? undefined : debouncedValue?.trim() || undefined;
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    dataUpdatedAt,
    refetch,
  } = useMarketData(query, refreshInterval * 1000);
  const items = useMemo(() => data?.flat() ?? [], [data]);
  const isRateLimited = error instanceof RateLimitError;

  const toastShownRef = useRef(false);
  const wasCooldownActiveRef = useRef(false);

  useEffect(() => {
    if (isRateLimited && !toastShownRef.current) {
      toast('You’re too fast for us!', {
        description: 'Hang tight while we catch up.',
      });
      toastShownRef.current = true;
      startCooldown();
      return;
    }

    if (!isRateLimited && !isCooldownActive) {
      toastShownRef.current = false;
      if (items.length > 0) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPreviousItems(items);
      }
    }
  }, [isRateLimited, items, isCooldownActive, startCooldown]);

  useEffect(() => {
    if (wasCooldownActiveRef.current && !isCooldownActive) {
      refetch();
    }
    wasCooldownActiveRef.current = isCooldownActive;
  }, [isCooldownActive, refetch]);

  const displayItems = isCooldownActive || isRateLimited ? previousItems : items;
  const isLoadingButton = isLoading || isFetchingNextPage;
  const showLoadMore =
    isFetching || ((hasNextPage || isCooldownActive) && displayItems.length > 0);

  return (
    <div className='space-y-4'>
      <div className='flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-4'>
        <div className='flex-1 space-y-2'>
          <Label htmlFor='search-input'>Search</Label>
          <InputGroup className='max-w-sm'>
            <InputGroupAddon align='inline-start'>
              <InputGroupText>
                {isCooldownActive ? (
                  <CooldownIndicator
                    remainingSeconds={cooldown.remaining}
                    totalSeconds={cooldown.total}
                  />
                ) : (
                  <SearchIcon />
                )}
              </InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              id='search-input'
              placeholder={isCooldownActive ? 'Cooling down...' : 'Search name or symbol'}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className={cn(isCooldownActive && 'text-muted-foreground')}
            />
          </InputGroup>
        </div>
        <RefreshIntervalInput
          value={refreshInterval}
          onChange={setRefreshInterval}
          dataUpdatedAt={dataUpdatedAt}
          disabled={isCooldownActive}
        />
      </div>

      {isLoading && !isCooldownActive ? (
        <p>Loading ...</p>
      ) : displayItems.length === 0 ? (
        isCooldownActive ? (
          <p>Please wait ...</p>
        ) : (
          <p>No results found</p>
        )
      ) : (
        <MarketTable data={displayItems} isFetching={isFetching} />
      )}

      <div className='mt-4 flex justify-center'>
        {showLoadMore && (
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetching || isCooldownActive}
          >
            {isLoadingButton ? (
              <>
                <Spinner className='mr-2 size-4' />
                Loading...
              </>
            ) : isCooldownActive ? (
              'Please wait...'
            ) : (
              'Load More'
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
