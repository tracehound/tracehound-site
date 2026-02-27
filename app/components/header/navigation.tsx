import { MobileNav } from './mobile-menu'
import { NavItems } from './nav-item'

export function Navigation() {
  return (
    <>
      <nav className="hidden items-center gap-4 xl:flex">
        <NavItems />
      </nav>

      <MobileNav />
    </>
  )
}
