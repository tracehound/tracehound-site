import type { Metadata } from 'next'
import { Darker_Grotesque, Space_Grotesk } from 'next/font/google'
import { Footer } from './components/footer'
import { Header } from './components/header'
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
  icons: [
    {
      rel: 'icon',
      url: '/favicon-dark.svg',
      media: '(prefers-color-scheme: light)',
      type: 'image/svg+xml',
    },
    {
      rel: 'icon',
      url: '/favicon-light.svg',
      media: '(prefers-color-scheme: dark)',
      type: 'image/svg+xml',
    },
  ],
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
        <Header />
        {children}
        <Footer />
        <Column direction="right" />
      </body>
    </html>
  )
}
