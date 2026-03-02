import { NavLink } from './link'

export function NavItems() {
  return (
    <>
      <NavLink
        className="py-2 px-3 font-heading font-bold text-base/5 hover:bg-(--accent-primary) transition-colors text-inherit"
        activeClass="bg-(--accent-primary)"
        href="/ecosystem">
        ECOSYSTEM
      </NavLink>
      <NavLink
        className="py-2 px-3 font-heading font-bold text-base/5 hover:bg-(--accent-primary) transition-colors text-inherit"
        activeClass="bg-(--accent-primary)"
        href="/docs"
        match="prefix">
        DOCUMENTATION
      </NavLink>
      <NavLink
        className="py-2 px-3 font-heading font-bold text-base/5 hover:bg-(--accent-primary) transition-colors text-inherit"
        activeClass="bg-(--accent-primary)"
        href="/services">
        SERVICES
      </NavLink>
      <NavLink
        className="py-2 px-3 font-heading font-bold text-base/5 hover:bg-(--accent-primary) transition-colors text-inherit"
        activeClass="bg-(--accent-primary)"
        href="/blog">
        BLOG
      </NavLink>
      <NavLink
        className="py-2 px-3 font-heading font-bold text-base/5 hover:bg-(--accent-primary) transition-colors text-inherit"
        activeClass="bg-(--accent-primary)"
        href="/faq">
        FAQ
      </NavLink>
      <NavLink
        className="py-2 px-3 font-heading font-bold text-base/5 hover:bg-(--accent-primary) transition-colors text-inherit"
        activeClass="bg-(--accent-primary)"
        href="/contact">
        CONTACT
      </NavLink>
    </>
  )
}
