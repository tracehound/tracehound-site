import { Row } from '../patterns/row'
import LightPillar from './pillar'

export function Canvas() {
  return (
    <div className="relative w-full mt-10 xl:mt-20">
      <Row />
      <div className="relative w-full aspect-video">
        <LightPillar
          topColor="#98EF1F"
          bottomColor="#080808"
          intensity={1.4}
          rotationSpeed={0.25}
          glowAmount={0.005}
          pillarWidth={10}
          pillarHeight={0.2}
          noiseIntensity={0.2}
          pillarRotation={0}
          mixBlendMode="normal"
          quality="high"
          interactive
        />
      </div>
      <Row />
    </div>
  )
}
