'use client';

import { useEffect, useRef } from 'react';

import { InfoIcon } from 'lucide-react';

import { CooldownIndicator } from './cooldown-indicator';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useCooldown } from '@/hooks/use-cooldown';

const MIN_INTERVAL = 10;
const MAX_INTERVAL = 300;
const DEFAULT_INTERVAL = 60;

interface Props {
  value: number;
  onChange: (value: number) => void;
  dataUpdatedAt: number;
  disabled?: boolean;
}

export const RefreshIntervalInput = ({
  value,
  onChange,
  dataUpdatedAt,
  disabled,
}: Props) => {
  const cooldown = useCooldown(value);
  const prevDataUpdatedAt = useRef(dataUpdatedAt);

  useEffect(() => {
    if (disabled) return;
    if (dataUpdatedAt !== prevDataUpdatedAt.current) {
      prevDataUpdatedAt.current = dataUpdatedAt;
      cooldown.start(value);
    }
  }, [dataUpdatedAt, cooldown, value, disabled]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      const clampedValue = Math.min(MAX_INTERVAL, Math.max(MIN_INTERVAL, newValue));
      onChange(clampedValue);
      cooldown.start(clampedValue);
    }
  };

  return (
    <div className='space-y-2 self-end'>
      <div className='flex items-center justify-end gap-1.5'>
        <Label htmlFor='refresh-interval-input'>Refresh Interval</Label>
        <Tooltip>
          <TooltipTrigger asChild>
            <InfoIcon className='size-3.5 text-muted-foreground' />
          </TooltipTrigger>
          <TooltipContent side='top' className='text-xs'>
            Minimum interval is {MIN_INTERVAL}s
          </TooltipContent>
        </Tooltip>
      </div>
      <InputGroup className='ml-auto w-fit'>
        <InputGroupAddon>
          <InputGroupText>
            {disabled ? (
              <Spinner className='size-4' />
            ) : (
              <CooldownIndicator
                remainingSeconds={cooldown.remaining}
                totalSeconds={cooldown.total}
              />
            )}
          </InputGroupText>
        </InputGroupAddon>
        <InputGroupInput
          id='refresh-interval-input'
          type='number'
          min={MIN_INTERVAL}
          max={MAX_INTERVAL}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          placeholder='Refresh (s)'
          className='[&::-webkit-inner-spin-button]:opacity-100 [&::-webkit-outer-spin-button]:opacity-100'
        />
      </InputGroup>
    </div>
  );
};

RefreshIntervalInput.defaultInterval = DEFAULT_INTERVAL;
