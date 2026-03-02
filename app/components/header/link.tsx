'use client'

import { cn } from '@/app/lib/utils'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'

type MatchMode = 'exact' | 'prefix'
type NavLinkProps = PropsWithChildren<
  LinkProps & { activeClass: string; className?: string; match?: MatchMode }
>

const normalizePath = (value: string) => {
  const [withoutQueryOrHash] = value.split(/[?#]/)
  const trimmed = withoutQueryOrHash.replace(/\/+$/, '')

  return trimmed || '/'
}

const getHrefPath = (href: LinkProps['href']) => {
  if (typeof href === 'string') return href

  if ('pathname' in href && typeof href.pathname === 'string') {
    return href.pathname
  }

  return href.toString()
}

const isPathActive = (current: string, target: string, mode: MatchMode) => {
  if (mode === 'exact' || target === '/') {
    return current === target
  }

  return current === target || current.startsWith(`${target}/`)
}

export function NavLink({ href, activeClass, children, className, match = 'exact' }: NavLinkProps) {
  const pathname = usePathname()
  const currentPath = normalizePath(pathname)
  const hrefPath = normalizePath(getHrefPath(href))
  const isActive = isPathActive(currentPath, hrefPath, match)

  return (
    <Link href={href} className={cn(isActive && activeClass, className)} data-active={isActive}>
      {children}
    </Link>
  )
}
