'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

interface MintButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled: boolean;
}

export const MintButton = ({ onClick, isLoading, disabled }: MintButtonProps) => {
  return (
    <Button onClick={onClick} disabled={disabled} className='w-full' size='lg'>
      {isLoading ? (
        <>
          <Spinner className='size-4' />
          Confirming...
        </>
      ) : (
        'Mint Tokens'
      )}
    </Button>
  );
};
