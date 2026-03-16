import { Container } from '../container'
import { Row } from '../patterns/row'
import PixelBlast from './pixels'

export function Canvas() {
  return (
    <section className="w-full mt-4 md:mt-8 xl:mt-16">
      <Container className="relative aspect-video max-h-80 md:max-h-100 xl:max-h-160 bg-(--background)">
        <Row />
        <PixelBlast
          variant="square"
          pixelSize={5}
          primaryColor="#98ef1f"
          secondaryColor="#eea386"
          secondaryColorRatio={0.1}
          patternScale={6}
          patternDensity={1.2}
          pixelSizeJitter={0.8}
          speed={0.6}
          edgeFade={0}
          transparent
        />
        <Row />
      </Container>
    </section>
  )
}
