'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

export const Error = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-black'>
      <div className='flex flex-col items-center gap-6 text-center'>
        <h1 className='text-6xl font-semibold tracking-tight text-black dark:text-zinc-50'>
          500
        </h1>
        <p className='text-lg text-zinc-600 dark:text-zinc-400'>Something went wrong</p>
        <div className='flex flex-col gap-3 sm:flex-row'>
          <Button variant='outline' onClick={reset}>
            Try again
          </Button>
          <Button variant='secondary' asChild>
            <Link href='/'>Go back home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Error;
