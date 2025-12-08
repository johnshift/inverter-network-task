'use client';

import { Menu } from 'lucide-react';

import { NAV_ITEMS } from './constants';

import { Brand } from '@/components/brand';
import { NavLinks } from '@/components/nav/nav-links';
import { SwitchThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

export const MobileNavMenu = () => (
  <Sheet>
    <SheetTrigger asChild className='md:hidden'>
      <Button variant='ghost' size='icon'>
        <Menu className='size-5' />
        <span className='sr-only'>Toggle menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side='left' className='w-[280px] px-2'>
      <SheetHeader className='pb-4 pl-0'>
        <SheetTitle>
          <Brand />
        </SheetTitle>
      </SheetHeader>
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
      <SwitchThemeToggle />
    </SheetContent>
  </Sheet>
);
