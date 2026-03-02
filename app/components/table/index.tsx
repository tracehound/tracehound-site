import type { ReactNode } from 'react'

export type TableProps = {
  head: ReactNode[]
  body: {
    row: ReactNode[]
  }[]
}

export function Table({ head, body }: TableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="[&_tr]:border-b [&_tr]:border-(--border-accent)">
            {head.map((h, i) => (
              <th
                key={`#@${i}@#`}
                className="text-foreground h-10 px-4 text-left align-middle font-medium whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0 [&_tr]:border-(--border-accent)">
          {body.map(({ row }, i) => (
            <tr key={`#@${i}@#`} className="hover:bg-(--background) border-b transition-colors">
              {row.map((el, j) => (
                <td key={`#@${j}@#`} className="py-2 px-4 align-middle whitespace-nowrap">
                  {el}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
