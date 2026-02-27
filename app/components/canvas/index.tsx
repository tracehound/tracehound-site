import { Container } from '../container'
import { Row } from '../patterns/row'
import LightPillar from './pillar'

export function Canvas() {
  return (
    <section className="w-full mt-10 md:mt-20 xl:mt-40 hidden xl:block" data-background="dark">
      <Container className="relative w-full aspect-video max-h-160">
        <Row />
        <LightPillar
          topColor="#98EF1F"
          bottomColor="#080808"
          intensity={2}
          rotationSpeed={0.2}
          glowAmount={0.002}
          pillarWidth={10}
          pillarHeight={0.6}
          noiseIntensity={0.2}
          pillarRotation={0}
          mixBlendMode="normal"
          quality="high"
          interactive
        />
      </Container>
    </section>
  )
}
