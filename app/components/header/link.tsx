'use client'

import { cn } from '@/app/lib/utils'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'

export function NavLink({
  href,
  activeClass,
  children,
  className,
}: PropsWithChildren<LinkProps & { activeClass: string; className?: string }>) {
  const pathname = usePathname()
  const isActive = (path: string) => path === pathname

  return (
    <Link
      href={href}
      className={cn(isActive(href.toString()) && activeClass, className)}
      data-active={isActive(href.toString())}>
      {children}
    </Link>
  )
}
