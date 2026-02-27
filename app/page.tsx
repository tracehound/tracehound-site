import { BottomSection } from './components/bottom-section'
import { Canvas } from './components/canvas'
import { ComparisonSection } from './components/comparison-section'
import { Hero } from './components/hero'
import { KeyFeatures } from './components/key-features'
import { ProblemSection } from './components/problem-section'
import { SecurityCompliance } from './components/security-compliance-section'
import { SolutionSection } from './components/solution-section'
import { UseCasesSection } from './components/use-cases-section'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Canvas />
      <ProblemSection />
      <SolutionSection />
      <KeyFeatures />
      <ComparisonSection />
      <UseCasesSection />
      <SecurityCompliance />
      <BottomSection />
    </div>
  )
}
