'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAccount } from 'wagmi';

import { Spinner } from '@/components/ui/spinner';
import { useDeferToNextTick } from '@/hooks/defer-to-next-tick';

interface Props {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
  const router = useRouter();
  const { isConnected, isConnecting, isReconnecting } = useAccount();

  const isLoading = isConnecting || isReconnecting;

  // Give wagmi time to init wallet otherwise redirect triggers too soon.
  const ready = useDeferToNextTick();

  useEffect(() => {
    if (ready && !isLoading && !isConnected) {
      router.replace('/');
    }
  }, [ready, isLoading, isConnected, router]);

  if (!ready || isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  if (!isConnected) return null;

  return <>{children}</>;
};
