import { useInfiniteQuery } from '@tanstack/react-query';
import { Address } from 'viem';

import { tokenQueries } from '@/features/token/queries';

type TokenTransfersPage = {
  pageKey: string | undefined;
  transfers: Array<{
    from: string;
    to: string;
    amount: string;
    timestamp: string;
    hash: string;
    token: string | undefined;
  }>;
};

export const useTokenTransfers = (address: Address) => {
  return useInfiniteQuery({
    ...tokenQueries.transfers(address),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage: TokenTransfersPage) => lastPage.pageKey || undefined,
  });
};
