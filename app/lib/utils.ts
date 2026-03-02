import { clsx, type ClassValue } from 'clsx'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'
import { Navigation } from './navigation'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function Portal({ children }: { children: React.ReactNode }) {
  if (typeof window === 'undefined') return null
  return createPortal(children, document.body)
}

export function groupByCategory(pages: Navigation[]): Record<Navigation['category'], Navigation[]> {
  return pages.reduce(
    (acc, page) => {
      ;(acc[page.category] ??= []).push(page)
      return acc
    },
    {} as Record<Navigation['category'], Navigation[]>,
  )
}

export function urlNormalizer(url: string) {
  return encodeURIComponent(url.toLocaleLowerCase().replaceAll(' ', '-'))
}
