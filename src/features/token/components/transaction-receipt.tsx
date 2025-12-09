import Link from 'next/link';

import { ExternalLinkIcon } from 'lucide-react';
import { type Address, type TransactionReceipt } from 'viem';

import { Separator } from '@/components/ui/separator';
import { SEPOLIA_EXPLORER_URL } from '@/features/token/constants';
import { truncateHash } from '@/lib/utils';

interface TransactionReceiptProps {
  hash: Address;
  receipt: TransactionReceipt;
}

export const TransactionReceiptDisplay = ({ hash, receipt }: TransactionReceiptProps) => {
  return (
    <div className='space-y-4 rounded-lg border bg-card p-4'>
      <div className='space-y-1'>
        <p className='text-sm font-medium'>Transaction Receipt</p>
        <p className='text-xs text-muted-foreground'>
          Transaction completed successfully
        </p>
      </div>
      <Separator />
      <div className='space-y-3'>
        <div className='space-y-1'>
          <p className='text-xs font-medium text-muted-foreground'>Transaction Hash</p>
          <div className='flex items-center gap-2'>
            <Link
              href={`${SEPOLIA_EXPLORER_URL}/tx/${hash}`}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2 font-mono text-sm hover:underline'
            >
              {truncateHash(hash)} <ExternalLinkIcon className='size-4' />
            </Link>
          </div>
        </div>
        <div className='space-y-1'>
          <p className='text-xs font-medium text-muted-foreground'>Block Number</p>
          <p className='text-sm'>{receipt.blockNumber.toString()}</p>
        </div>
        <div className='space-y-1'>
          <p className='text-xs font-medium text-muted-foreground'>Gas Used</p>
          <p className='text-sm'>{receipt.gasUsed}</p>
        </div>
      </div>
    </div>
  );
};
