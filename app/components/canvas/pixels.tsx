'use client'

import Image from 'next/image'
import { Effect, EffectComposer, EffectPass, RenderPass } from 'postprocessing'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { FRAGMENT_SRC, SHAPE_MAP, VERTEX_SRC } from './constants'
import type { PixelBlastProps, ReinitConfig } from './types'
import { createLiquidEffect, createTouchTexture } from './util'

type PixelBlastUniforms = {
  uResolution: { value: THREE.Vector2 }
  uTime: { value: number }
  uPrimaryColor: { value: THREE.Color }
  uSecondaryColor: { value: THREE.Color }
  uSecondaryColorRatio: { value: number }
  uBurstCenter: { value: THREE.Vector2 }
  uBurstAttack: { value: number }
  uBurstAttackProgress: { value: number }
  uBurstStabilize: { value: number }
  uShapeType: { value: number }
  uPixelSize: { value: number }
  uScale: { value: number }
  uDensity: { value: number }
  uPixelJitter: { value: number }
  uEdgeFade: { value: number }
}

type BurstState = {
  active: boolean
  centerX: number
  centerY: number
  startTime: number
  nextTime: number
}

const ATTACK_DURATION = 1.15
const STABILIZE_DURATION = 2.2

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1)
const easeOutCubic = (value: number) => 1 - Math.pow(1 - clamp01(value), 3)
const easeInOutSine = (value: number) => -(Math.cos(Math.PI * clamp01(value)) - 1) / 2

export default function PixelBlast({
  variant = 'square',
  pixelSize = 3,
  color,
  primaryColor,
  secondaryColor = '#F25F4C',
  secondaryColorRatio = 0.1,
  className,
  style,
  antialias = true,
  patternScale = 2,
  patternDensity = 1,
  liquid = false,
  liquidStrength = 0.1,
  liquidRadius = 1,
  pixelSizeJitter = 0,
  liquidWobbleSpeed = 4.5,
  autoPauseOffscreen = true,
  speed = 0.5,
  transparent = true,
  edgeFade = 0.5,
  noiseAmount = 0,
}: PixelBlastProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const logoRef = useRef<HTMLDivElement | null>(null)
  const visibilityRef = useRef({ visible: true })
  const speedRef = useRef(speed)
  const resolvedPrimaryColor = primaryColor ?? color ?? '#98EF1F'
  const resolvedSecondaryRatio = clamp01(secondaryColorRatio)

  const threeRef = useRef<{
    renderer: THREE.WebGLRenderer
    scene: THREE.Scene
    camera: THREE.OrthographicCamera
    material: THREE.ShaderMaterial
    clock: THREE.Clock
    uniforms: PixelBlastUniforms
    resizeObserver?: ResizeObserver
    raf?: number
    quad?: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>
    composer?: EffectComposer
    touch?: ReturnType<typeof createTouchTexture>
    liquidEffect?: Effect
    burst: BurstState
  } | null>(null)
  const prevConfigRef = useRef<ReinitConfig | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    speedRef.current = speed
    const needsReinitKeys: (keyof ReinitConfig)[] = ['antialias', 'liquid', 'noiseAmount']
    const cfg: ReinitConfig = { antialias, liquid, noiseAmount }
    let mustReinit = false

    if (!threeRef.current) mustReinit = true
    else if (prevConfigRef.current) {
      for (const key of needsReinitKeys) {
        if (prevConfigRef.current[key] !== cfg[key]) {
          mustReinit = true
          break
        }
      }
    }

    const randomFloat = (): number => {
      if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
        const u32 = new Uint32Array(1)
        window.crypto.getRandomValues(u32)
        return u32[0] / 0xffffffff
      }
      return Math.random()
    }

    const nextBurstDelay = () => 4 + randomFloat() * 6
    const randomBurstCenter = () => ({
      x: 0.18 + randomFloat() * 0.64,
      y: 0.2 + randomFloat() * 0.6,
    })

    if (mustReinit) {
      if (threeRef.current) {
        const t = threeRef.current
        t.resizeObserver?.disconnect()
        cancelAnimationFrame(t.raf!)
        t.quad?.geometry.dispose()
        t.material.dispose()
        t.composer?.dispose()
        t.renderer.dispose()
        if (t.renderer.domElement.parentElement === container) {
          container.removeChild(t.renderer.domElement)
        }
        threeRef.current = null
      }

      const canvas = document.createElement('canvas')
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias,
        alpha: true,
        powerPreference: 'high-performance',
      })
      renderer.domElement.style.width = '100%'
      renderer.domElement.style.height = '100%'
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      container.appendChild(renderer.domElement)

      if (transparent) renderer.setClearAlpha(0)
      else renderer.setClearColor(0x000000, 1)

      const initialCenter = randomBurstCenter()
      const uniforms: PixelBlastUniforms = {
        uResolution: { value: new THREE.Vector2(0, 0) },
        uTime: { value: 0 },
        uPrimaryColor: { value: new THREE.Color(resolvedPrimaryColor) },
        uSecondaryColor: { value: new THREE.Color(secondaryColor) },
        uSecondaryColorRatio: { value: resolvedSecondaryRatio },
        uBurstCenter: { value: new THREE.Vector2(initialCenter.x, initialCenter.y) },
        uBurstAttack: { value: 0 },
        uBurstAttackProgress: { value: 0 },
        uBurstStabilize: { value: 0 },
        uShapeType: { value: SHAPE_MAP[variant] ?? 0 },
        uPixelSize: { value: pixelSize * renderer.getPixelRatio() },
        uScale: { value: patternScale },
        uDensity: { value: patternDensity },
        uPixelJitter: { value: pixelSizeJitter },
        uEdgeFade: { value: edgeFade },
      }

      const scene = new THREE.Scene()
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
      const material = new THREE.ShaderMaterial({
        vertexShader: VERTEX_SRC,
        fragmentShader: FRAGMENT_SRC,
        uniforms,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        glslVersion: THREE.GLSL3,
      })
      const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
      scene.add(quad)

      const clock = new THREE.Clock()
      const setSize = () => {
        const w = container.clientWidth || 1
        const h = container.clientHeight || 1
        renderer.setSize(w, h, false)
        uniforms.uResolution.value.set(renderer.domElement.width, renderer.domElement.height)
        if (threeRef.current?.composer) {
          threeRef.current.composer.setSize(renderer.domElement.width, renderer.domElement.height)
        }
        uniforms.uPixelSize.value = pixelSize * renderer.getPixelRatio()
      }
      setSize()

      const resizeObserver = new ResizeObserver(setSize)
      resizeObserver.observe(container)

      let composer: EffectComposer | undefined
      let touch: ReturnType<typeof createTouchTexture> | undefined
      let liquidEffect: Effect | undefined

      if (liquid) {
        touch = createTouchTexture()
        touch.radiusScale = liquidRadius
        composer = new EffectComposer(renderer)
        composer.addPass(new RenderPass(scene, camera))
        liquidEffect = createLiquidEffect(touch.texture, {
          strength: liquidStrength,
          freq: liquidWobbleSpeed,
        })
        const effectPass = new EffectPass(camera, liquidEffect)
        effectPass.renderToScreen = true
        composer.addPass(effectPass)
      }

      if (noiseAmount > 0) {
        if (!composer) {
          composer = new EffectComposer(renderer)
          composer.addPass(new RenderPass(scene, camera))
        }
        const noiseEffect = new Effect(
          'NoiseEffect',
          `uniform float uTime; uniform float uAmount; float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453);} void mainUv(inout vec2 uv){} void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){ float n=hash(floor(uv*vec2(1920.0,1080.0))+floor(uTime*60.0)); float g=(n-0.5)*uAmount; outputColor=inputColor+vec4(vec3(g),0.0);} `,
          {
            uniforms: new Map<string, THREE.Uniform>([
              ['uTime', new THREE.Uniform(0)],
              ['uAmount', new THREE.Uniform(noiseAmount)],
            ]),
          },
        )
        const noisePass = new EffectPass(camera, noiseEffect)
        noisePass.renderToScreen = true
        composer.passes.forEach((pass) => {
          const target = pass as { renderToScreen?: boolean }
          target.renderToScreen = false
        })
        composer.addPass(noisePass)
      }

      if (composer) composer.setSize(renderer.domElement.width, renderer.domElement.height)

      const mapToPixels = (event: PointerEvent) => {
        const rect = renderer.domElement.getBoundingClientRect()
        const scaleX = renderer.domElement.width / rect.width
        const scaleY = renderer.domElement.height / rect.height
        return {
          fx: (event.clientX - rect.left) * scaleX,
          fy: (rect.height - (event.clientY - rect.top)) * scaleY,
          w: renderer.domElement.width,
          h: renderer.domElement.height,
        }
      }

      const onPointerMove = (event: PointerEvent) => {
        if (!touch) return
        const { fx, fy, w, h } = mapToPixels(event)
        touch.addTouch({ x: fx / w, y: fy / h })
      }

      renderer.domElement.addEventListener('pointermove', onPointerMove, {
        passive: true,
      })

      const burst: BurstState = {
        active: false,
        centerX: initialCenter.x,
        centerY: initialCenter.y,
        startTime: 0,
        nextTime: 1.5 + nextBurstDelay(),
      }

      let raf = 0
      const animate = () => {
        if (autoPauseOffscreen && !visibilityRef.current.visible) {
          raf = requestAnimationFrame(animate)
          return
        }

        const elapsed = clock.getElapsedTime()
        uniforms.uTime.value = elapsed * speedRef.current

        if (!burst.active && elapsed >= burst.nextTime) {
          const nextCenter = randomBurstCenter()
          burst.active = true
          burst.centerX = nextCenter.x
          burst.centerY = nextCenter.y
          burst.startTime = elapsed
        }

        let attack = 0
        let attackProgress = 0
        let stabilize = 0

        if (burst.active) {
          const age = elapsed - burst.startTime
          if (age <= ATTACK_DURATION) {
            const progress = clamp01(age / ATTACK_DURATION)
            attackProgress = easeOutCubic(progress)
            attack = 1 - progress * 0.25
          } else if (age <= ATTACK_DURATION + STABILIZE_DURATION) {
            attackProgress = 1
            const progress = clamp01((age - ATTACK_DURATION) / STABILIZE_DURATION)
            stabilize = 1 - easeInOutSine(progress)
          } else {
            burst.active = false
            burst.nextTime = elapsed + nextBurstDelay()
          }
        }

        uniforms.uBurstCenter.value.set(burst.centerX, burst.centerY)
        uniforms.uBurstAttack.value = attack
        uniforms.uBurstAttackProgress.value = attackProgress
        uniforms.uBurstStabilize.value = stabilize

        const logoElement = logoRef.current
        if (logoElement) {
          const opacity = stabilize > 0.12 ? Math.min(0.92, stabilize * 1.2) : 0
          logoElement.style.left = `${burst.centerX * 100}%`
          logoElement.style.top = `${(1 - burst.centerY) * 100}%`
          logoElement.style.opacity = `${opacity}`
          logoElement.style.transform = 'translate(-50%, -50%) scale(1)'
          logoElement.style.filter = 'none'
        }

        if (liquidEffect) {
          const effect = liquidEffect as Effect & { uniforms: Map<string, THREE.Uniform> }
          const timeUniform = effect.uniforms.get('uTime')
          if (timeUniform) timeUniform.value = uniforms.uTime.value
        }

        if (composer) {
          if (touch) touch.update()
          composer.passes.forEach((pass) => {
            const target = pass as {
              effects?: Array<Effect & { uniforms: Map<string, THREE.Uniform> }>
            }
            target.effects?.forEach((effect) => {
              const timeUniform = effect.uniforms?.get('uTime')
              if (timeUniform) timeUniform.value = uniforms.uTime.value
            })
          })
          composer.render()
        } else {
          renderer.render(scene, camera)
        }

        raf = requestAnimationFrame(animate)
      }

      raf = requestAnimationFrame(animate)
      threeRef.current = {
        renderer,
        scene,
        camera,
        material,
        clock,
        uniforms,
        resizeObserver,
        raf,
        quad,
        composer,
        touch,
        liquidEffect,
        burst,
      }
    } else {
      const t = threeRef.current
      if (!t) return
      t.uniforms.uShapeType.value = SHAPE_MAP[variant] ?? 0
      t.uniforms.uPixelSize.value = pixelSize * t.renderer.getPixelRatio()
      t.uniforms.uPrimaryColor.value.set(resolvedPrimaryColor)
      t.uniforms.uSecondaryColor.value.set(secondaryColor)
      t.uniforms.uSecondaryColorRatio.value = resolvedSecondaryRatio
      t.uniforms.uScale.value = patternScale
      t.uniforms.uDensity.value = patternDensity
      t.uniforms.uPixelJitter.value = pixelSizeJitter
      t.uniforms.uEdgeFade.value = edgeFade
      if (transparent) t.renderer.setClearAlpha(0)
      else t.renderer.setClearColor(0x000000, 1)
      if (t.liquidEffect) {
        const effect = t.liquidEffect as Effect & { uniforms: Map<string, THREE.Uniform> }
        const strengthUniform = effect.uniforms.get('uStrength')
        if (strengthUniform) strengthUniform.value = liquidStrength
        const frequencyUniform = effect.uniforms.get('uFreq')
        if (frequencyUniform) frequencyUniform.value = liquidWobbleSpeed
      }
      if (t.touch) t.touch.radiusScale = liquidRadius
    }

    prevConfigRef.current = cfg
    return () => {
      if (threeRef.current && mustReinit) return
      if (!threeRef.current) return
      const t = threeRef.current
      t.resizeObserver?.disconnect()
      cancelAnimationFrame(t.raf!)
      t.quad?.geometry.dispose()
      t.material.dispose()
      t.composer?.dispose()
      t.renderer.dispose()
      if (t.renderer.domElement.parentElement === container) {
        container.removeChild(t.renderer.domElement)
      }
      threeRef.current = null
    }
  }, [
    antialias,
    liquid,
    noiseAmount,
    pixelSize,
    patternScale,
    patternDensity,
    pixelSizeJitter,
    edgeFade,
    transparent,
    liquidStrength,
    liquidRadius,
    liquidWobbleSpeed,
    autoPauseOffscreen,
    variant,
    resolvedPrimaryColor,
    secondaryColor,
    resolvedSecondaryRatio,
    speed,
  ])

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full overflow-hidden ${className ?? ''}`}
      style={style}
      aria-label="PixelBlast background">
      <div
        ref={logoRef}
        className="pointer-events-none absolute z-10 opacity-0 will-change-transform"
        aria-hidden="true">
        <Image
          src="/favicon-dark.svg"
          alt="Tracehound"
          width={80}
          height={80}
          className="block h-12 w-12 select-none md:h-16 md:w-16"
          draggable={false}
        />
      </div>
    </div>
  )
}
