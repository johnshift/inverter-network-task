import { useQuery } from '@tanstack/react-query';

import { tokenQueries } from '@/features/token/queries';

export const useTokenSymbol = () => {
  return useQuery(tokenQueries.symbol());
};
