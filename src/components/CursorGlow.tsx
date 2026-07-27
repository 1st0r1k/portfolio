'use client'

import { useEffect, useRef } from 'react'

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      return
    }

    function handleMove(event: MouseEvent) {
      ref.current?.style.setProperty('--glow-x', `${event.clientX}px`)
      ref.current?.style.setProperty('--glow-y', `${event.clientY}px`)
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div
      ref={ref}
      data-testid="cursor-glow"
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background:
          'radial-gradient(600px circle at var(--glow-x, 50%) var(--glow-y, 20%), rgba(245, 166, 35, 0.14), transparent 70%)',
      }}
    />
  )
}
