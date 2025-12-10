'use client';

import { MobileNavMenu } from './mobile-nav-menu';

import { Brand } from '@/components/brand';
import { NavItem, NavLinks } from '@/components/nav/nav-links';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Mint Token', href: '/mint', isProtected: true },
  { label: 'Transactions', href: '/transactions', isProtected: true },
  { label: 'Market', href: '/market' },
];

interface Props {
  connectWallet: React.ReactNode;
}

export const Nav = ({ connectWallet }: Props) => {
  return (
    <nav className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'>
      <div className='container mx-auto h-16 px-2 md:px-4'>
        <div className='relative flex h-full items-center justify-between'>
          <div className='flex items-center gap-0 md:gap-6'>
            <MobileNavMenu
              navLinks={
                <NavLinks
                  items={NAV_ITEMS}
                  linkClassName={(isActive) =>
                    cn(
                      'rounded-md px-3 py-2',
                      isActive
                        ? 'bg-accent text-foreground'
                        : 'text-muted-foreground hover:bg-accent',
                    )
                  }
                />
              }
            />
            <Brand />
          </div>

          <NavLinks
            items={NAV_ITEMS}
            className='absolute left-1/2 hidden -translate-x-1/2 flex-row items-center gap-6 lg:flex'
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
