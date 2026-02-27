import * as THREE from 'three'

export type PixelBlastVariant = 'square' | 'circle' | 'triangle' | 'diamond'

export interface TouchPoint {
  x: number
  y: number
  vx: number
  vy: number
  force: number
  age: number
}

export interface TouchTexture {
  canvas: HTMLCanvasElement
  texture: THREE.Texture
  addTouch: (norm: { x: number; y: number }) => void
  update: () => void
  radiusScale: number
  size: number
}

export interface ReinitConfig {
  antialias: boolean
  liquid: boolean
  noiseAmount: number
}

export type PixelBlastProps = {
  variant?: PixelBlastVariant
  pixelSize?: number
  color?: string
  className?: string
  style?: React.CSSProperties
  antialias?: boolean
  patternScale?: number
  patternDensity?: number
  liquid?: boolean
  liquidStrength?: number
  liquidRadius?: number
  pixelSizeJitter?: number
  enableRipples?: boolean
  rippleIntensityScale?: number
  rippleThickness?: number
  rippleSpeed?: number
  liquidWobbleSpeed?: number
  autoPauseOffscreen?: boolean
  speed?: number
  transparent?: boolean
  edgeFade?: number
  noiseAmount?: number
}
