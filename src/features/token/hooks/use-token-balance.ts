import { useQuery } from '@tanstack/react-query';
import { type Address } from 'viem';

import { tokenQueries } from '@/features/token/queries';

export const useTokenBalance = (address: Address, enabled = true) => {
  return useQuery({
    ...tokenQueries.balance(address),
    enabled,
  });
};
