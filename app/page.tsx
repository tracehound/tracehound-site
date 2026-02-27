import { Canvas } from './components/canvas'
import { Header } from './components/header'
import { Hero } from './components/hero'
import { KeyFeatures } from './components/key-features'
import { ProblemSection } from './components/problem-section'
import { SolutionSection } from './components/solution-section'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <Canvas />
      <ProblemSection />
      <SolutionSection />
      <KeyFeatures />
    </div>
  )
}
