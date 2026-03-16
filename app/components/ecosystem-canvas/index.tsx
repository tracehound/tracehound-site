import Waves from './waves'

export function PackagesCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full -z-1">
      <Waves
        lineColor="#EDF0E7"
        backgroundColor="transparent"
        waveSpeedX={0.0125}
        waveSpeedY={0.01}
        waveAmpX={40}
        waveAmpY={20}
        friction={0.9}
        tension={0.01}
        maxCursorMove={120}
        xGap={12}
        yGap={36}
      />
    </div>
  )
}
