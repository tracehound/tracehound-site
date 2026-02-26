import { cn } from '@/app/lib/utils'
import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import { createElement, PropsWithChildren } from 'react'

type ButtonProps = {
  variant: 'primary' | 'secondary' | 'neutral' | 'light'
  size?: 'lg' | 'md' | 'sm'
  href?: string
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
}: PropsWithChildren<ButtonProps>) {
  return createElement(href ? Link : 'button', {
    href: href as Url,
    className: cn(
      "border-0 bg-clip-padding font-bold gap-2 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-6 outline-none group/button select-none cursor-pointer font-heading",
      variant === 'primary' &&
        'bg-(--accent-primary) text-(--foreground) hover:bg-(--accent-primary-hover)',
      variant === 'secondary' &&
        'bg-(--foreground) text-(--background) hover:bg-(--foreground-hover)',
      variant === 'neutral' &&
        'bg-(--background-accent) text-(--background) hover:bg-(--background-accent-hover)',
      variant === 'light' && 'bg-(--foreground) text-(--background) hover:bg-(--foreground-hover)',
      size === 'lg' && 'h-12 px-7 text-xl/normal',
      size === 'md' && 'h-11 px-6 text-xl/normal',
      size === 'sm' && 'h-9 px-5 text-lg/normal',
    ),
    children,
  })
}
