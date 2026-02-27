import { Container } from '../container'
import { Row } from '../patterns/row'
import PixelBlast from './pixels'

export function Canvas() {
  return (
    <section className="w-full mt-10 md:mt-20 xl:mt-40 hidden xl:block">
      <Container className="relative aspect-video max-h-160 bg-(--accent-primary)">
        <Row />
        <PixelBlast
          variant="square"
          pixelSize={5}
          color="#fff" // 98EF1F
          patternScale={3.75}
          patternDensity={1}
          pixelSizeJitter={1}
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid={false}
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0.2}
          enableRipples
          transparent
        />
        <Row />
      </Container>
    </section>
  )
}
