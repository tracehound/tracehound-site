'use client'

import { navigation } from '@/app/lib/navigation'
import { groupByCategory } from '@/app/lib/utils'
import { useRouter } from 'next/navigation'
import { useMemo, type ChangeEvent } from 'react'

export function DocumentPageSelect() {
  const router = useRouter()

  const grouped = useMemo(() => groupByCategory(navigation), [])

  const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    router.push(event.target.value)
  }

  return (
    <div className="w-full flex items-center lg:hidden px-6 xl:px-12 gap-2">
      <span className="group relative block flex-1 before:absolute before:inset-px before:bg-(--background) before:border before:border-(--border-accent) after:pointer-events-none after:absolute after:inset-0 after:ring-transparent after:ring-inset">
        <select
          className="relative block w-full appearance-none py-2 px-4 [>_optgroup]:font-semibold text-base/6"
          defaultValue="/docs"
          onChange={onChangeHandler}>
          <option value="/docs">Select page</option>
          {Object.entries(grouped).map(([label, items]) => (
            <optgroup key={label} label={label}>
              {items.map((item) => (
                <option key={item.slug} value={`/docs/${item.slug}`}>
                  {item.title}
                </option>
              ))}
            </optgroup>
          ))}
        </select>

        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <svg
            className="size-5 stroke-(--border) group-has-data-disabled:stroke-(--border)"
            viewBox="0 0 16 16"
            aria-hidden="true"
            fill="none">
            <path
              d="M5.75 10.75L8 13L10.25 10.75"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.25 5.25L8 3L5.75 5.25"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>
    </div>
  )
}
