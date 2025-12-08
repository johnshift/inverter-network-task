'use client';

import { Menu } from 'lucide-react';

import { Brand } from '@/components/brand';
import { SwitchThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface Props {
  navLinks: React.ReactNode;
}

export const MobileNavMenu = ({ navLinks }: Props) => (
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
      {navLinks}
      <SwitchThemeToggle />
    </SheetContent>
  </Sheet>
);
