import { Container } from '../container'
import { Row } from '../patterns/row'
import PixelBlast from './pixels'

export function Canvas() {
  return (
    <section className="w-full mt-10 md:mt-20 xl:mt-40">
      <Container className="relative aspect-video max-h-80 md:max-h-100 xl:max-h-160 bg-(--accent-primary)">
        <Row />
        <PixelBlast
          variant="square"
          pixelSize={5}
          color="#FFF" // 98EF1F
          patternScale={6}
          patternDensity={1.2}
          pixelSizeJitter={0.8}
          rippleSpeed={0.4}
          rippleThickness={0.1}
          rippleIntensityScale={1.5}
          speed={0.6}
          edgeFade={0}
          enableRipples
          transparent
        />
        <Row />
      </Container>
    </section>
  )
}
