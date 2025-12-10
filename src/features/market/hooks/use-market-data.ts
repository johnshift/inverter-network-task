import { useInfiniteQuery } from '@tanstack/react-query';

import { RateLimitError } from '@/features/market/api/get-market-data-by-page';
import { marketQueries } from '@/features/market/queries';
import { CoingeckoMarketDataResponse } from '@/features/market/schemas';

export const useMarketData = (query?: string, refetchInterval?: number) => {
  return useInfiniteQuery<
    CoingeckoMarketDataResponse,
    Error,
    CoingeckoMarketDataResponse[],
    ReturnType<typeof marketQueries.byPage>['queryKey'],
    number
  >({
    ...marketQueries.byPage(query),
    initialPageParam: 1,
    getNextPageParam: (_, pages) => pages.length + 1,
    select: (data) => data.pages,
    retry: (failureCount, error) => {
      console.log('hook retry error isRateLimitError', error instanceof RateLimitError);
      if (error instanceof RateLimitError) return false;
      return failureCount < 3;
    },
    placeholderData: (prev) => prev,
    throwOnError: false,
    refetchInterval,
  });
};
