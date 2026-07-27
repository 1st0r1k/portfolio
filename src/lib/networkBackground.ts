export interface Particle {
  x: number
  y: number
  vx: number
  vy: number
}

export function createParticles(count: number, width: number, height: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
  }))
}

export function stepParticle(particle: Particle, width: number, height: number): Particle {
  let { x, y, vx, vy } = particle
  x += vx
  y += vy

  if (x <= 0 || x >= width) {
    vx = -vx
  }
  if (y <= 0 || y >= height) {
    vy = -vy
  }

  return { x, y, vx, vy }
}

export function distanceBetween(a: { x: number; y: number }, b: { x: number; y: number }): number {
  return Math.hypot(a.x - b.x, a.y - b.y)
}
