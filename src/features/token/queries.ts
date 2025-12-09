import { createQueryKeys } from '@lukemorales/query-key-factory';
import { type Address } from 'viem';

import { getTokenBalance } from '@/features/token/api/get-token-balance';
import { getTokenName } from '@/features/token/api/get-token-name';
import { getTokenSymbol } from '@/features/token/api/get-token-symbol';

export const tokenQueries = createQueryKeys('token', {
  all: null,
  balance: (address: Address) => ({
    queryKey: ['balance', address],
    queryFn: async () => getTokenBalance(address),
  }),
  name: () => ({
    queryKey: ['name'],
    queryFn: async () => getTokenName(),
  }),
  symbol: () => ({
    queryKey: ['symbol'],
    queryFn: async () => getTokenSymbol(),
  }),
});
