import { useQuery } from '@tanstack/react-query';

import { tokenQueries } from '@/features/token/queries';

export const useTokenName = (enabled = true) => {
  return useQuery({
    ...tokenQueries.name(),
    enabled,
  });
};
