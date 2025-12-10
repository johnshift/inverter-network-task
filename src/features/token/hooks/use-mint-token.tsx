import Link from 'next/link';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ExternalLinkIcon } from 'lucide-react';
import { toast } from 'sonner';
import { type Address, formatUnits } from 'viem';

import { mintToken } from '@/features/token/api/mint-token';
import { SEPOLIA_EXPLORER_URL } from '@/features/token/constants';
import { tokenQueries } from '@/features/token/queries';
import { truncateHash } from '@/lib/utils';

interface MintTokenParams {
  address: Address;
  amount: bigint;
}

const isUserRejectionError = (error: Error): boolean => {
  const message = error.message?.toLowerCase() || '';
  return (
    message.includes('user rejected') ||
    message.includes('user denied') ||
    message.includes('user cancelled') ||
    error.name === 'UserRejectedRequestError'
  );
};

export const useMintToken = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ address, amount }: MintTokenParams) => {
      return mintToken(address, amount);
    },
    onSuccess: (data, { address, amount }) => {
      queryClient.invalidateQueries({ queryKey: tokenQueries.balance(address).queryKey });
      queryClient.invalidateQueries({
        queryKey: tokenQueries.transfers(address).queryKey,
      });
      const formattedAmount = formatUnits(amount, 18);
      toast.success(`You have minted ${formattedAmount} tokens!`, {
        description: (
          <div className='flex items-center gap-1 text-xs'>
            View on explorer:{' '}
            <Link
              href={`${SEPOLIA_EXPLORER_URL}/tx/${data.hash}`}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-1.5 font-mono hover:underline'
            >
              {truncateHash(data.hash)} <ExternalLinkIcon className='-mt-0.5 size-3' />
            </Link>
          </div>
        ),
        duration: 10000,
      });
    },
    onError: (error) => {
      if (isUserRejectionError(error)) {
        toast.error('Cancelled transaction', {
          description: 'Transaction signature request was rejected.',
        });
        return;
      }

      toast.error('Mint failed', {
        description: error.message || 'Failed to mint tokens. Please try again.',
      });
    },
    throwOnError: false,
  });
};
