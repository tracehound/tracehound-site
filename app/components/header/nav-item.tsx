import { NavLink } from './link'

export function NavItems() {
  return (
    <>
      <NavLink
        className="pt-2.5 pb-3.5 px-3 font-heading font-bold text-lg/5 hover:bg-(--accent-primary) transition-colors text-inherit"
        activeClass="bg-(--accent-primary)"
        href="/ecosystem">
        ECOSYSTEM
      </NavLink>
      <NavLink
        className="pt-2.5 pb-3.5 px-3 font-heading font-bold text-lg/5 hover:bg-(--accent-primary) transition-colors text-inherit"
        activeClass="bg-(--accent-primary)"
        href="/docs">
        DOCUMENTATION
      </NavLink>
      <NavLink
        className="pt-2.5 pb-3.5 px-3 font-heading font-bold text-lg/5 hover:bg-(--accent-primary) transition-colors text-inherit"
        activeClass="bg-(--accent-primary)"
        href="/services">
        SERVICES
      </NavLink>
      <NavLink
        className="pt-2.5 pb-3.5 px-3 font-heading font-bold text-lg/5 hover:bg-(--accent-primary) transition-colors text-inherit"
        activeClass="bg-(--accent-primary)"
        href="/blog">
        BLOG
      </NavLink>
      <NavLink
        className="pt-2.5 pb-3.5 px-3 font-heading font-bold text-lg/5 hover:bg-(--accent-primary) transition-colors text-inherit"
        activeClass="bg-(--accent-primary)"
        href="/faq">
        FAQ
      </NavLink>
      <NavLink
        className="pt-2.5 pb-3.5 px-3 font-heading font-bold text-lg/5 hover:bg-(--accent-primary) transition-colors text-inherit"
        activeClass="bg-(--accent-primary)"
        href="/contact">
        CONTACT
      </NavLink>
    </>
  )
}
