'use client';

import { useTheme } from 'next-themes';

import { type ClassValue } from 'clsx';
import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
  className: ClassValue;
}

export const ThemeToggle = ({ className }: Props) => {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      variant='ghost'
      size='icon'
      className={cn('z-50', className)}
      onClick={toggleTheme}
      aria-label='Toggle theme'
    >
      <Sun className='hidden size-5 dark:block' />
      <Moon className='block size-5 dark:hidden' />
    </Button>
  );
};
