import { type Navigation, navigation } from '@/app/lib/navigation'
import { useMemo } from 'react'
import { NavLink } from '../header/link'

function groupByCategory(pages: Navigation[]): Record<Navigation['category'], Navigation[]> {
  return pages.reduce(
    (acc, page) => {
      ;(acc[page.category] ??= []).push(page)
      return acc
    },
    {} as Record<Navigation['category'], Navigation[]>,
  )
}

export function DocumentPageSidebar() {
  const grouped = useMemo(() => groupByCategory(navigation), navigation)

  return (
    <aside className="scrollbar sticky top-16 flex-col gap-4 h-full hidden overflow-y-auto max-h-[calc(100vh-156px)] p-3 lg:flex lg:w-54 xl:p-6 xl:w-96">
      {Object.entries(grouped).map(([label, items]) => (
        <details key={label} className="flex flex-col group" open>
          <summary className="flex items-center justify-between border-b border-dashed border-(--border-accent) font-bold font-heading py-1.5 px-3 list-none cursor-pointer hover:bg-(--accent-primary)/10">
            {label}

            <svg
              className="group-open:rotate-180"
              fill="none"
              height="16"
              width="16"
              shapeRendering="geometricPrecision"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </summary>

          <nav className="flex flex-col gap-1 px-3 py-3">
            {items.map((item) => (
              <NavLink
                key={item.slug}
                className="group/link flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-(--accent-primary)/10"
                activeClass="bg-(--accent-secondary)/5 text-(--accent-secondary) font-medium"
                href={`/docs/${item.slug}`}>
                <span className="inline-flex size-1 rounded-sm bg-(--border-accent) group-data-[active=true]/link:bg-(--accent-secondary)" />
                {item.icon && <item.icon size={18} />}
                <span className="flex-1">{item.title}</span>
              </NavLink>
            ))}
          </nav>
        </details>
      ))}
    </aside>
  )
}
