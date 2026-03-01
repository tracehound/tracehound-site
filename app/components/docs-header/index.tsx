import { cn } from '@/app/lib/utils'
import { Badge } from '../badge'
import { Row } from '../patterns/row'

type DocsHeaderProps = {
  title: string
  label?: string
  summary?: string | string[]
}

export function DocsHeader({ label, title, summary }: DocsHeaderProps) {
  return (
    <>
      <Row />

      <header className="w-full flex flex-col bg-(--background) mb-px py-4.5 xl:py-9 px-6 xl:px-12">
        {label && <Badge variant="secondary">{label}</Badge>}
        <h2 className="mb-5 font-heading font-bold text-2xl/6 md:text-4xl/9 xl:text-6xl/16">
          {title}
        </h2>

        {summary &&
          (typeof summary === 'string' ? (
            <p className="font-sans font-light text-lg md:text-xl xl:text-2xl">{summary}</p>
          ) : (
            summary.map((sum, index) => (
              <p
                key={`#@${index}@#`}
                className={cn(
                  'font-sans font-light text-lg md:text-xl xl:text-2xl',
                  summary.length - 1 === index || 'mb-2 xl:mb-4',
                )}>
                {sum}
              </p>
            ))
          ))}
      </header>

      <Row />
    </>
  )
}
