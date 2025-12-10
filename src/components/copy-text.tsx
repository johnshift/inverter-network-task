'use client';

import { useState } from 'react';

import { CheckIcon, CopyIcon } from 'lucide-react';
import { toast } from 'sonner';

import { TextWithAction } from './text-with-action';

import { Button } from '@/components/ui/button';

interface CopyTextProps {
  text: string;
  copyText?: string;
  className?: string;
}

export const CopyText = ({ text, copyText, className }: CopyTextProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText || text);
      setCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  const copyButton = (
    <Button
      variant='ghost'
      size='icon-sm'
      onClick={handleCopy}
      className='h-6 w-6'
      aria-label='Copy to clipboard'
    >
      {copied ? (
        <CheckIcon className='size-3 text-green-600 dark:text-green-400' />
      ) : (
        <CopyIcon className='size-3' />
      )}
    </Button>
  );

  return <TextWithAction text={text} action={copyButton} className={className} />;
};
