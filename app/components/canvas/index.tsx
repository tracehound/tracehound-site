import { Container } from '../container'
import { Row } from '../patterns/row'
import FuzzyText from './fuzzy'

export function Canvas() {
  return (
    <section className="relative w-full pt-10 xl:pt-20">
      <Container>
        <Row />

        <article className="relative w-full aspect-video max-h-100 bg-(--foreground) flex items-center justify-center size-full pointer-events-none select-none text-center">
          <div className="absolute top-1/2 left-1/2 -translate-1/2">
            <FuzzyText
              baseIntensity={0.14}
              hoverIntensity={0.4}
              fontWeight={100}
              color="#fff"
              glitchMode>
              Controlled Runtime Security.
            </FuzzyText>
          </div>

          {/*
          <LiquidEther
            colors={['oklch(86% 0.25 132)', 'oklch(63% 0.25 14)', 'oklch(100% 0 271)']}
            mouseForce={20}
            cursorSize={100}
            isViscous
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
          />
          */}
        </article>

        <Row />
      </Container>
    </section>
  )
}
