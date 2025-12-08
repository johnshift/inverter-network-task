import Link from 'next/link';

import { Button } from '@/components/ui/button';

export const NotFound = () => {
  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-black'>
      <div className='flex flex-col items-center gap-6 text-center'>
        <h1 className='text-6xl font-semibold tracking-tight text-black dark:text-zinc-50'>
          404
        </h1>
        <p className='text-lg text-zinc-600 dark:text-zinc-400'>Page not found</p>
        <Button variant='outline' asChild>
          <Link href='/'>Go back home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
