import { NavLink } from '../header/link'

export function DocumentPageSidebar() {
  return (
    <aside className="sticky top-16 flex-col gap-4 h-full hidden lg:flex lg:px-3 lg:w-54 xl:px-12 xl:w-80">
      <div className="flex flex-col">
        <h6 className="font-bold font-heading mb-2">Getting Started</h6>

        <NavLink
          className="px-2 py-1.5 border-l-2 border-transparent text-sm hover:bg-(--accent-primary)/10"
          activeClass="bg-(--accent-primary)/20 border-(--accent-primary)!"
          href="/docs">
          Summary
        </NavLink>
        <NavLink
          className="px-2 py-1.5 border-l-2 border-transparent text-sm hover:bg-(--accent-primary)/10"
          activeClass="bg-(--accent-primary)/20 border-(--accent-primary)!"
          href="/docs/introduction">
          Introduction
        </NavLink>
        <NavLink
          className="px-2 py-1.5 border-l-2 border-transparent text-sm hover:bg-(--accent-primary)/10"
          activeClass="bg-(--accent-primary)/20 border-(--accent-primary)!"
          href="/docs/quickstart">
          Quickstart
        </NavLink>
      </div>

      <div className="flex flex-col">
        <h6 className="font-bold font-heading mb-2">References</h6>

        <NavLink
          className="px-2 py-1.5 border-l-2 border-transparent text-sm hover:bg-(--accent-primary)/10"
          activeClass="bg-(--accent-primary)/20 border-(--accent-primary)!"
          href="/docs/configuration">
          Configuration
        </NavLink>
        <NavLink
          className="px-2 py-1.5 border-l-2 border-transparent text-sm hover:bg-(--accent-primary)/10"
          activeClass="bg-(--accent-primary)/20 border-(--accent-primary)!"
          href="/docs/api-reference">
          API Reference
        </NavLink>
      </div>

      <div className="flex flex-col">
        <h6 className="font-bold font-heading mb-2">Guides</h6>

        <NavLink
          className="px-2 py-1.5 border-l-2 border-transparent text-sm hover:bg-(--accent-primary)/10"
          activeClass="bg-(--accent-primary)/20 border-(--accent-primary)!"
          href="/docs/concepts">
          Concepts
        </NavLink>
        <NavLink
          className="px-2 py-1.5 border-l-2 border-transparent text-sm hover:bg-(--accent-primary)/10"
          activeClass="bg-(--accent-primary)/20 border-(--accent-primary)!"
          href="/docs/advanced">
          Advanced
        </NavLink>
        <NavLink
          className="px-2 py-1.5 border-l-2 border-transparent text-sm hover:bg-(--accent-primary)/10"
          activeClass="bg-(--accent-primary)/20 border-(--accent-primary)!"
          href="/docs/examples">
          Examples
        </NavLink>
        <NavLink
          className="px-2 py-1.5 border-l-2 border-transparent text-sm hover:bg-(--accent-primary)/10"
          activeClass="bg-(--accent-primary)/20 border-(--accent-primary)!"
          href="/docs/security-assurance">
          Security Assurance
        </NavLink>
      </div>

      <div className="flex flex-col">
        <h6 className="font-bold font-heading mb-2">Packages</h6>

        <NavLink
          className="px-2 py-1.5 border-l-2 border-transparent text-sm hover:bg-(--accent-primary)/10"
          activeClass="bg-(--accent-primary)/20 border-(--accent-primary)!"
          href="/docs/core">
          Core
        </NavLink>
        <NavLink
          className="px-2 py-1.5 border-l-2 border-transparent text-sm hover:bg-(--accent-primary)/10"
          activeClass="bg-(--accent-primary)/20 border-(--accent-primary)!"
          href="/docs/horizon">
          Horizon
        </NavLink>
        <NavLink
          className="px-2 py-1.5 border-l-2 border-transparent text-sm hover:bg-(--accent-primary)/10"
          activeClass="bg-(--accent-primary)/20 border-(--accent-primary)!"
          href="/docs/argos">
          Argos
        </NavLink>
        <NavLink
          className="px-2 py-1.5 border-l-2 border-transparent text-sm hover:bg-(--accent-primary)/10"
          activeClass="bg-(--accent-primary)/20 border-(--accent-primary)!"
          href="/docs/talos">
          Talos
        </NavLink>
        <NavLink
          className="px-2 py-1.5 border-l-2 border-transparent text-sm hover:bg-(--accent-primary)/10"
          activeClass="bg-(--accent-primary)/20 border-(--accent-primary)!"
          href="/docs/huginn">
          Huginn
        </NavLink>
        <NavLink
          className="px-2 py-1.5 border-l-2 border-transparent text-sm hover:bg-(--accent-primary)/10"
          activeClass="bg-(--accent-primary)/20 border-(--accent-primary)!"
          href="/docs/muninn">
          Muninn
        </NavLink>
        <NavLink
          className="px-2 py-1.5 border-l-2 border-transparent text-sm hover:bg-(--accent-primary)/10"
          activeClass="bg-(--accent-primary)/20 border-(--accent-primary)!"
          href="/docs/norns">
          Norns
        </NavLink>
        <NavLink
          className="px-2 py-1.5 border-l-2 border-transparent text-sm hover:bg-(--accent-primary)/10"
          activeClass="bg-(--accent-primary)/20 border-(--accent-primary)!"
          href="/docs/furies">
          Furies
        </NavLink>
        <NavLink
          className="px-2 py-1.5 border-l-2 border-transparent text-sm hover:bg-(--accent-primary)/10"
          activeClass="bg-(--accent-primary)/20 border-(--accent-primary)!"
          href="/docs/watchtower">
          Watchtower
        </NavLink>
      </div>
    </aside>
  )
}
