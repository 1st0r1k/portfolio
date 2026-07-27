'use client'

import { useEffect, useRef } from 'react'
import { createParticles, stepParticle, distanceBetween, type Particle } from '@/lib/networkBackground'

const NODE_COUNT = 45
const CONNECT_DISTANCE = 140

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function resize() {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let particles: Particle[] = createParticles(NODE_COUNT, canvas.width, canvas.height)

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const d = distanceBetween(particles[i], particles[j])
          if (d < CONNECT_DISTANCE) {
            ctx!.strokeStyle = `rgba(154, 143, 127, ${0.35 * (1 - d / CONNECT_DISTANCE)})`
            ctx!.lineWidth = 1
            ctx!.beginPath()
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.stroke()
          }
        }
      }

      particles.forEach((p) => {
        ctx!.fillStyle = 'rgba(245, 166, 35, 0.55)'
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx!.fill()
      })
    }

    let frameId: number | undefined

    if (prefersReducedMotion) {
      draw()
    } else {
      const loop = () => {
        particles = particles.map((p) => stepParticle(p, canvas!.width, canvas!.height))
        draw()
        frameId = requestAnimationFrame(loop)
      }
      frameId = requestAnimationFrame(loop)
    }

    return () => {
      window.removeEventListener('resize', resize)
      if (frameId !== undefined) cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-testid="network-background"
      className="pointer-events-none fixed inset-0 z-0"
    />
  )
}
