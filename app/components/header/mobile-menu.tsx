'use client'

import { Portal } from '@/app/lib/utils'
import { ListIcon } from '@phosphor-icons/react/dist/ssr'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useEffectEvent, useState } from 'react'
import { NavLink } from './link'
import { NavItems } from './nav-item'

export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const closeMenuOnRouteChange = useEffectEvent(() => {
    setOpen(false)
  })

  useEffect(() => {
    closeMenuOnRouteChange()
  }, [pathname])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2.5 text-(--foreground) bg-(--accent-primary) xl:hidden">
        <ListIcon size={24} weight="light" />
      </button>

      <Portal>
        <AnimatePresence>
          {open && (
            <>
              {/* backdrop */}
              <motion.div
                className="fixed inset-0 bg-(--background-accent)/10 z-9998 backdrop-blur-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
              />

              {/* dropdown */}
              <motion.div
                className="max-w-sm fixed inset-0 mx-auto z-9999 grid grid-cols-2 items-center justify-center py-16 [&_a]:text-center"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}>
                <NavLink
                  className="pt-2.5 pb-3.5 px-3 font-heading font-bold text-lg/5 hover:bg-(--accent-primary) transition-colors text-inherit"
                  activeClass="bg-(--accent-primary)"
                  href="/">
                  HOME
                </NavLink>
                <NavItems />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Portal>
    </>
  )
}
