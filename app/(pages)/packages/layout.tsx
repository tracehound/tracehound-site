import type { ReactNode } from 'react'

export default function PackagesLayout({ children }: { children: ReactNode }) {
  return <main className="relative w-full h-full flex flex-col min-h-screen">{children}</main>
}
