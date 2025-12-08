'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAccount } from 'wagmi';

import { Spinner } from '@/components/ui/spinner';

interface Props {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
  const { isConnected, isConnecting } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isConnecting && !isConnected) {
      router.replace('/');
    }
  }, [isConnected, isConnecting, router]);

  if (isConnecting) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  if (!isConnected) return null;

  return <>{children}</>;
};
