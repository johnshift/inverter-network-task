'use client';

import { useTheme } from 'next-themes';

import { Moon, Sun } from 'lucide-react';

import { Switch } from '@/components/ui/switch';

export const SwitchThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const Icon = isDark ? Moon : Sun;

  return (
    <div className='mt-6 border-t pt-4'>
      <div className='flex items-center justify-between px-3'>
        <div className='flex items-center gap-2'>
          <Icon className='size-4 text-muted-foreground' />
          <span className='text-sm font-medium'>Dark Mode</span>
        </div>
        <Switch
          checked={isDark}
          onCheckedChange={(checked) => {
            setTheme(checked ? 'dark' : 'light');
          }}
          aria-label='Toggle theme'
        />
      </div>
    </div>
  );
};
