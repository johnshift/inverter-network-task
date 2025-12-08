'use client';

import { NAV_ITEMS } from './constants';
import { MobileNavMenu } from './mobile-nav-menu';

import { Brand } from '@/components/brand';
import { NavLinks } from '@/components/nav/nav-links';
import { ThemeToggle } from '@/components/theme-toggle';

interface Props {
  connectWallet: React.ReactNode;
}

export const Nav = ({ connectWallet }: Props) => {
  return (
    <nav className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'>
      <div className='container mx-auto h-16 px-2 md:px-4'>
        <div className='flex h-full items-center justify-between'>
          <div className='flex items-center gap-0 md:gap-6'>
            <MobileNavMenu />
            <Brand />
          </div>

          <NavLinks
            items={NAV_ITEMS}
            className='hidden flex-1 flex-row items-center justify-center gap-6 md:flex'
          />

          <div className='flex items-center gap-2 md:gap-4'>
            <ThemeToggle className='relative hidden md:inline-flex' />
            {connectWallet}
          </div>
        </div>
      </div>
    </nav>
  );
};
