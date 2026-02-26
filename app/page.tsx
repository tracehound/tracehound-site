import { Canvas } from './components/canvas'
import { Header } from './components/header'
import { Hero } from './components/hero'
import { ProblemSection } from './components/problem-section'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <Canvas />
      <ProblemSection />
    </div>
  )
}
