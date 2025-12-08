'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

interface NavLinksProps {
  items: { label: string; href: string }[];
  className?: string;
  linkClassName?: (isActive: boolean) => string;
}

const defaultLinkClassName = (isActive: boolean) =>
  cn(
    'text-sm font-medium transition-colors',
    isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
  );

export const NavLinks = ({
  items,
  className,
  linkClassName = defaultLinkClassName,
}: NavLinksProps) => {
  const pathname = usePathname();

  return (
    <nav className={cn('flex flex-col gap-2', className)}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={linkClassName(pathname === item.href)}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};
