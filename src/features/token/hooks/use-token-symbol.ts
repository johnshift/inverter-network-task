import { useQuery } from '@tanstack/react-query';

import { tokenQueries } from '@/features/token/queries';

export const useTokenSymbol = (enabled = true) => {
  return useQuery({
    ...tokenQueries.symbol(),
    enabled,
  });
};
