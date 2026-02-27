import { redirect, RedirectType } from 'next/navigation'
import { pages } from '../pages'

async function getPage(slug: string) {
  const data = pages.find((value) => value.slug === slug)
  return data
}

export default async function Document({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await getPage(slug)

  if (typeof page === 'undefined') {
    redirect('/docs', RedirectType.replace)
  }

  return (
    <div className="flex flex-col min-h-screen px-6 xl:px-12">
      <header className="w-full flex flex-col pb-6 xl:pb-12">
        <h2 className="mb-5 font-heading font-bold text-2xl/6 md:text-4xl/9 xl:text-6xl/16">
          {page.title}
        </h2>
        <p className="font-sans font-light text-lg md:text-xl xl:text-2xl">{page.summary}</p>
      </header>
    </div>
  )
}
