import { useInfiniteQuery } from '@tanstack/react-query';
import { Address } from 'viem';

import { tokenQueries } from '@/features/token/queries';
import { type TokenTransfersPage } from '@/features/token/types';

export const useTokenTransfers = (address: Address) => {
  return useInfiniteQuery({
    ...tokenQueries.transfers(address),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage: TokenTransfersPage) => lastPage.pageKey || undefined,
  });
};
