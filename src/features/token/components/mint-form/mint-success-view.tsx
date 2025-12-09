'use client';

import { type Address, type TransactionReceipt } from 'viem';

import { Button } from '@/components/ui/button';
import { TransactionReceiptDisplay } from '@/features/token/components/transaction-receipt';

interface MintSuccessViewProps {
  hash: Address;
  receipt: TransactionReceipt;
  onMintAgain: () => void;
}

export const MintSuccessView = ({ hash, receipt, onMintAgain }: MintSuccessViewProps) => {
  return (
    <div className='space-y-6'>
      <TransactionReceiptDisplay hash={hash} receipt={receipt} />
      <Button onClick={onMintAgain} className='w-full' size='lg'>
        Mint Again
      </Button>
    </div>
  );
};
