export function Cite({ number }: { number: number }) {
  return (
    <cite className="text-xs font-mono font-bold bg-(--border-accent)/20 border border-dashed border-(--border-accent) p-1">
      [{number}]
    </cite>
  )
}
