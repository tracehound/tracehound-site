import type { ReactNode } from 'react'

type DocsListProps = {
  items: ReactNode[]
}

export function DocsList({ items }: DocsListProps) {
  return (
    items.length > 0 && (
      <ul className="pl-2 xl:list-disc xl:pl-6 text-lg">
        {items.map((item, index) => (
          <li key={`#@${index}@#`}>{item}</li>
        ))}
      </ul>
    )
  )
}
