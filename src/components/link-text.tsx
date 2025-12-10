import Link from 'next/link';

import { SquareArrowOutUpRightIcon } from 'lucide-react';

import { TextWithAction } from './text-with-action';

import { Button } from '@/components/ui/button';

interface LinkTextProps {
  text: string;
  href: string;
  className?: string;
}

export const LinkText = ({ text, href, className }: LinkTextProps) => {
  const linkButton = (
    <Button variant='ghost' size='icon-sm' asChild className='h-6 w-6'>
      <Link
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        aria-label='Open in explorer'
      >
        <SquareArrowOutUpRightIcon className='size-3 stroke-3 text-muted-foreground' />
      </Link>
    </Button>
  );

  return <TextWithAction text={text} action={linkButton} className={className} />;
};
