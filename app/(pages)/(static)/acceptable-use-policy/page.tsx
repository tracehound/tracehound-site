import { Badge } from '@/app/components/badge'
import { Row } from '@/app/components/patterns/row'

export default function AcceptableUsePolicy() {
  return (
    <section className="relative w-full pb-16 lg:pb-24 xl:pb-30">
      <header className="w-full flex flex-col p-6 xl:p-12">
        <Badge variant="neutral">LEGAL</Badge>
        <h3 className="my-3 font-heading font-bold text-2xl/6 md:text-4xl/9 xl:text-[64px]/16">
          Acceptable Use Policy
        </h3>
        <p className="font-sans font-light text-base md:text-xl xl:text-2xl">
          Last updated: December 28, 2025
        </p>
      </header>

      <Row />

      <article className="flex flex-col p-6 xl:p-12 lg:flex-row">
        <div className="flex flex-col">
          <h3 className="mb-5 font-heading font-bold text-xl md:text-2xl xl:text-4xl">
            1. Lorem Ipsum Dolor
          </h3>
          <p className="font-sans md:text-lg xl:text-xl mb-3 lg:mb-6 xl:mb-9">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat totam consequatur optio
            fuga perspiciatis eos quam at aperiam officiis explicabo ex eaque delectus, similique
            expedita saepe a ullam distinctio cupiditate?
          </p>
          <p className="font-sans md:text-lg xl:text-xl">
            Impedit nisi sequi rem ad in tempore tempora est dolorem distinctio! Maiores, architecto
            eos modi reprehenderit unde itaque iusto placeat consectetur qui.
          </p>
        </div>
      </article>
    </section>
  )
}
