import type { Metadata } from 'next'
import { Darker_Grotesque, Space_Grotesk } from 'next/font/google'
import { Column } from './components/patterns/columns'
import './globals.css'
import { cn } from './lib/utils'

const darkerGrotesque = Darker_Grotesque({
  variable: '--font-darker-grotesque',
  subsets: ['latin-ext'],
})

const spaceGrotesque = Space_Grotesk({
  variable: '--font-space-grotesque',
  subsets: ['latin-ext'],
})

export const metadata: Metadata = {
  title: 'Tracehound',
  description: 'The Deterministic Runtime Security Buffer',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(darkerGrotesque.variable, spaceGrotesque.variable, 'antialiased')}>
        <Column direction="left" />
        <div className="w-full min-h-screen border-x border-(--border-accent) border-dashed mx-auto py-6 xl:py-20 max-w-[calc(100%-6rem)] md:max-w-[calc(100%-10rem)] xl:max-w-[calc(100%-20rem)] 2xl:max-w-360">
          {children}
        </div>
        <Column direction="right" />
      </body>
    </html>
  )
}
