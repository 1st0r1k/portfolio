import { describe, it, expect } from 'vitest'
import { createParticles, stepParticle, distanceBetween } from './networkBackground'

describe('createParticles', () => {
  it('creates the requested number of particles within bounds', () => {
    const particles = createParticles(20, 800, 600)
    expect(particles).toHaveLength(20)
    particles.forEach((p) => {
      expect(p.x).toBeGreaterThanOrEqual(0)
      expect(p.x).toBeLessThanOrEqual(800)
      expect(p.y).toBeGreaterThanOrEqual(0)
      expect(p.y).toBeLessThanOrEqual(600)
    })
  })
})

describe('stepParticle', () => {
  it('moves the particle by its velocity', () => {
    const p = { x: 100, y: 100, vx: 2, vy: -1 }
    const next = stepParticle(p, 800, 600)
    expect(next.x).toBe(102)
    expect(next.y).toBe(99)
  })

  it('bounces off the right edge', () => {
    const p = { x: 799, y: 100, vx: 5, vy: 0 }
    const next = stepParticle(p, 800, 600)
    expect(next.vx).toBeLessThan(0)
  })

  it('bounces off the left edge', () => {
    const p = { x: 1, y: 100, vx: -5, vy: 0 }
    const next = stepParticle(p, 800, 600)
    expect(next.vx).toBeGreaterThan(0)
  })

  it('bounces off the bottom edge', () => {
    const p = { x: 100, y: 599, vx: 0, vy: 5 }
    const next = stepParticle(p, 800, 600)
    expect(next.vy).toBeLessThan(0)
  })

  it('bounces off the top edge', () => {
    const p = { x: 100, y: 1, vx: 0, vy: -5 }
    const next = stepParticle(p, 800, 600)
    expect(next.vy).toBeGreaterThan(0)
  })
})

describe('distanceBetween', () => {
  it('computes euclidean distance between two points', () => {
    expect(distanceBetween({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(5)
  })
})
