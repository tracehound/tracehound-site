import type { Metadata } from 'next'
import { Host_Grotesk, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import { Footer } from './components/footer'
import { Header } from './components/header'
import { Column } from './components/patterns/columns'
import './globals.css'
import { cn } from './lib/utils'

const hostGrotesk = Host_Grotesk({
  variable: '--font-host-grotesk',
  subsets: ['latin-ext'],
})

const spaceGrotesque = Space_Grotesk({
  variable: '--font-space-grotesque',
  subsets: ['latin-ext'],
})

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
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
      <body
        className={cn(
          hostGrotesk.variable,
          spaceGrotesque.variable,
          jetBrainsMono.variable,
          'antialiased',
        )}>
        <Column direction="left" />
        <Header />
        {children}
        <Footer />
        <Column direction="right" />
      </body>
    </html>
  )
}
