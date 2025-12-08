import { LoaderIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

export const Spinner = ({ className, ...props }: React.ComponentProps<'svg'>) => (
  <LoaderIcon
    role='status'
    aria-label='Loading'
    className={cn('size-6 animate-spin', className)}
    {...props}
  />
);
