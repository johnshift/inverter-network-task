'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

import { cn } from '@/lib/utils';

interface BaseNavLinkProps {
  href: string;
  label: string;
  linkClassName?: (isActive: boolean) => string;
}

const defaultLinkClassName = (isActive: boolean) =>
  cn(
    'text-sm font-medium transition-colors',
    isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
  );

export const NavLink = ({
  href,
  label,
  linkClassName = defaultLinkClassName,
}: BaseNavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={linkClassName(isActive)}>
      {label}
    </Link>
  );
};

export const ProtectedNavLink = ({
  href,
  label,
  linkClassName = defaultLinkClassName,
}: BaseNavLinkProps) => {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const pathname = usePathname();
  const isActive = pathname === href;

  if (isConnected) {
    return (
      <Link href={href} className={linkClassName(isActive)}>
        {label}
      </Link>
    );
  }

  return (
    <button
      type='button'
      onClick={() => openConnectModal?.()}
      className={linkClassName(isActive)}
    >
      {label}
    </button>
  );
};

export interface NavItem {
  label: string;
  href: string;
  isProtected?: boolean;
}

interface NavLinksProps {
  items: NavItem[];
  className?: string;
  linkClassName?: (isActive: boolean) => string;
}

export const NavLinks = ({
  items,
  className,
  linkClassName = defaultLinkClassName,
}: NavLinksProps) => {
  return (
    <nav className={cn('flex flex-col gap-2', className)}>
      {items.map((item) => {
        const LinkComponent = item.isProtected ? ProtectedNavLink : NavLink;

        return (
          <LinkComponent
            key={item.href}
            href={item.href}
            label={item.label}
            linkClassName={linkClassName}
          />
        );
      })}
    </nav>
  );
};
