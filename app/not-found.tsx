import { Badge } from './components/badge'
import { Button } from './components/button'
import { Container } from './components/container'
import { Row } from './components/patterns/row'

export default function NotFound() {
  return (
    <section className="relative w-full py-16 lg:py-24 xl:py-30">
      <Container>
        <Row />
        <div className="w-full flex flex-col items-start p-6 xl:p-12 bg-(--background) mb-px">
          <Badge variant="secondary">ERROR</Badge>
          <h3 className="mt-3 mb-5 font-heading font-bold text-2xl/6 md:text-4xl/9 xl:text-[64px]/16">
            Not Found
          </h3>
          <p className="font-sans font-light text-lg md:text-2xl xl:text-[32px] xl:mb-12">
            Could not find requested resource
          </p>

          <Button variant="primary" href="/">
            Return Home
          </Button>
        </div>
        <Row />
      </Container>
    </section>
  )
}
