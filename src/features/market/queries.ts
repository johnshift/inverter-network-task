import { createQueryKeys } from '@lukemorales/query-key-factory';

import { getMarketDataByPage } from '@/features/market/api/get-market-data-by-page';
import { CoingeckoMarketDataResponse } from '@/features/market/schemas';

export const marketQueries = createQueryKeys('market', {
  all: null,
  byPage: (query?: string) => ({
    queryKey: ['byPage', { query }],
    queryFn: async ({
      pageParam = 1,
    }: {
      pageParam: number;
    }): Promise<CoingeckoMarketDataResponse> =>
      // getMarketDataByPage(pageParam),
      getMarketDataByPage({ page: pageParam, query }),
  }),
});
