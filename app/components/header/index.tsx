'use client'

import { cn } from '@/app/lib/utils'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { Container } from '../container'
import { Logo } from './logo'
import { Navigation } from './navigation'

export function Header() {
  const { scrollY } = useScroll()
  const lastScrollYRef = useRef(0)
  const [hidden, setHidden] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = lastScrollYRef.current
    if (latest > previous && latest > 100) {
      setHidden(true)
    } else {
      setHidden(false)
    }
    lastScrollYRef.current = latest
  })
  return (
    <motion.header
      className={cn('sticky top-0 z-99 w-full pb-8 xl:pb-16')}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}>
      <Container>
        <div className="w-full flex items-center justify-between p-6 xl:px-12 xl:py-6 bg-(--background-accent)/1 backdrop-blur-lg">
          <motion.h1 className="font-heading font-bold text-[32px]/8 text-foreground">
            <Link href="/" className="flex items-center gap-4" title="Tracehound">
              <Logo />
            </Link>
          </motion.h1>

          <Navigation />
        </div>
      </Container>
    </motion.header>
  )
}
