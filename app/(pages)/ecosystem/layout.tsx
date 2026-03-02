import type { ReactNode } from 'react'

export default function EcosystemLayout({ children }: { children: ReactNode }) {
  return <main className="relative w-full h-full flex">{children}</main>
}
