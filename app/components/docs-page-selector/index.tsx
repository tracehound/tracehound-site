'use client'

import { useRouter } from 'next/navigation'
import { type ChangeEvent } from 'react'

export function DocumentPageSelect() {
  const router = useRouter()

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
          <optgroup label="Getting Started">
            <option value="/docs/introduction">Introduction</option>
            <option value="/docs/quickstart">Quickstart</option>
          </optgroup>
          <optgroup label="References">
            <option value="/docs/configuration">Configuration</option>
            <option value="/docs/api-reference">API Reference</option>
          </optgroup>
          <optgroup label="Guides">
            <option value="/docs/concepts">Concepts</option>
            <option value="/docs/advanced">Advanced</option>
            <option value="/docs/examples">Examples</option>
            <option value="/docs/security-assurance">Security Assurance</option>
          </optgroup>
          <optgroup label="Packages">
            <option value="/docs/core">Core</option>
            <option value="/docs/horizon">Horizon</option>
            <option value="/docs/argos">Argos</option>
            <option value="/docs/talos">Talos</option>
            <option value="/docs/huginn">Huginn</option>
            <option value="/docs/muninn">Muninn</option>
            <option value="/docs/norns">Norns</option>
            <option value="/docs/furies">Furies</option>
            <option value="/docs/watchtower">Watchtower</option>
          </optgroup>
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
