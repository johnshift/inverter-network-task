'use client';

import { useState } from 'react';

import { toast } from 'sonner';
import { type Address, parseUnits, type TransactionReceipt } from 'viem';
import { useAccount } from 'wagmi';

import { AmountSelector } from './amount-selector';
import { DEFAULT_AMOUNT, MAX_AMOUNT, MIN_AMOUNT } from './constants';
import { MintButton } from './mint-button';
import { MintSuccessView } from './mint-success-view';

import { useMintToken } from '@/features/token/hooks/use-mint-token';

export const MintForm = () => {
  const { address, isConnected } = useAccount();
  const [amount, setAmount] = useState(DEFAULT_AMOUNT);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastReceipt, setLastReceipt] = useState<{
    hash: Address;
    receipt: TransactionReceipt;
  } | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const { mutate: mintToken, isPending } = useMintToken();

  const handleMint = () => {
    if (!address || !isConnected) {
      toast.error('Please connect your wallet');
      return;
    }

    if (amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
      toast.error(`Amount must be between ${MIN_AMOUNT} and ${MAX_AMOUNT}`);
      return;
    }

    setIsSubmitting(true);
    const amountBigInt = parseUnits(amount.toString(), 18);

    mintToken(
      { address, amount: amountBigInt },
      {
        onSuccess: (data) => {
          setIsSubmitting(false);
          setLastReceipt({ hash: data.hash, receipt: data.receipt });
          setShowSuccess(true);
        },
        onError: () => {
          setIsSubmitting(false);
          setLastReceipt(null);
        },
      },
    );
  };

  const handleMintAgain = () => {
    setShowSuccess(false);
    setLastReceipt(null);
    setAmount(DEFAULT_AMOUNT);
  };

  const isLoading = isPending || isSubmitting;
  const isButtonDisabled =
    !isConnected || isLoading || amount < MIN_AMOUNT || amount > MAX_AMOUNT;

  if (showSuccess && lastReceipt) {
    return (
      <MintSuccessView
        hash={lastReceipt.hash}
        receipt={lastReceipt.receipt}
        onMintAgain={handleMintAgain}
      />
    );
  }

  return (
    <div className='space-y-6'>
      <AmountSelector amount={amount} onAmountChange={setAmount} disabled={isLoading} />
      <MintButton
        onClick={handleMint}
        isLoading={isLoading}
        disabled={isButtonDisabled}
      />
    </div>
  );
};
