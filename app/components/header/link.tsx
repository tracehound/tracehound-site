'use client'

import { cn } from '@/app/lib/utils'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'

export function NavLink({
  href,
  activeClass,
  children,
}: PropsWithChildren<LinkProps & { activeClass: string }>) {
  const pathname = usePathname()
  const isActive = (path: string) => path === pathname

  return (
    <Link
      href={href}
      className={cn(
        isActive(href.toString()) && activeClass,
        'pt-2.5 pb-3.5 px-3 font-heading font-bold text-lg/5 hover:bg-(--accent-primary) transition-colors text-inherit',
      )}>
      {children}
    </Link>
  )
}
