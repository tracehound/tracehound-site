import { NavLink } from './link'

export function NavItems() {
  return (
    <>
      <NavLink activeClass="bg-(--accent-primary)" href="/platform">
        PLATFORM
      </NavLink>
      <NavLink activeClass="bg-(--accent-primary)" href="/products">
        PRODUCTS
      </NavLink>
      <NavLink activeClass="bg-(--accent-primary)" href="/docs">
        DOCS
      </NavLink>
      <NavLink activeClass="bg-(--accent-primary)" href="/services">
        SERVICES
      </NavLink>
      <NavLink activeClass="bg-(--accent-primary)" href="/blog">
        BLOG
      </NavLink>
      <NavLink activeClass="bg-(--accent-primary)" href="/faq">
        FAQ
      </NavLink>
      <NavLink activeClass="bg-(--accent-primary)" href="/contact">
        CONTACT
      </NavLink>
    </>
  )
}
