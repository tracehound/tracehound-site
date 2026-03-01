import { Badge } from '../badge'

type DocsHeaderProps = {
  label: string
  title: string
  summary?: string
}

export function DocsHeader({ label, title, summary }: DocsHeaderProps) {
  return (
    <header className="w-full flex flex-col pb-6 xl:pb-12">
      <Badge variant="secondary">{label}</Badge>
      <h2 className="mb-5 font-heading font-bold text-2xl/6 md:text-4xl/9 xl:text-6xl/16">
        {title}
      </h2>

      {summary && <p className="font-sans font-light text-lg md:text-xl xl:text-2xl">{summary}</p>}
    </header>
  )
}
