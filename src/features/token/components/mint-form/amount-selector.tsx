'use client';

import { MAX_AMOUNT, MIN_AMOUNT } from './constants';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface AmountSelectorProps {
  amount: number;
  onAmountChange: (amount: number) => void;
  disabled?: boolean;
}

export const AmountSelector = ({
  amount,
  onAmountChange,
  disabled,
}: AmountSelectorProps) => {
  const handleSliderChange = (values: number[]) => {
    onAmountChange(values[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      onAmountChange(0);
      return;
    }
    const numValue = Number.parseInt(value, 10);
    if (!Number.isNaN(numValue) && numValue >= MIN_AMOUNT && numValue <= MAX_AMOUNT) {
      onAmountChange(numValue);
    }
  };

  return (
    <div className='space-y-2'>
      <Label htmlFor='amount'>Amount to Mint</Label>
      <div className='flex items-center gap-4'>
        <Slider
          value={[amount]}
          onValueChange={handleSliderChange}
          min={MIN_AMOUNT}
          max={MAX_AMOUNT}
          step={1}
          disabled={disabled}
          className='flex-1'
        />
        <Input
          id='amount'
          type='number'
          value={amount}
          onChange={handleInputChange}
          min={MIN_AMOUNT}
          max={MAX_AMOUNT}
          disabled={disabled}
          className='w-24'
        />
      </div>
      <p className='text-xs text-muted-foreground'>
        Range: {MIN_AMOUNT} - {MAX_AMOUNT} tokens
      </p>
    </div>
  );
};
