import { useQuery } from '@tanstack/react-query';

import { tokenQueries } from '@/features/token/queries';

export const useTokenName = () => {
  return useQuery(tokenQueries.name());
};
