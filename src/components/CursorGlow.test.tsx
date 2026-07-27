import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { CursorGlow } from './CursorGlow'

function mockMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })) as unknown as typeof window.matchMedia
}

describe('CursorGlow', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders a decorative, pointer-events-none overlay', () => {
    mockMatchMedia(false)
    render(<CursorGlow />)
    const glow = screen.getByTestId('cursor-glow')
    expect(glow).toHaveAttribute('aria-hidden', 'true')
    expect(glow.className).toContain('pointer-events-none')
  })

  it('updates its glow position on mousemove', () => {
    mockMatchMedia(false)
    render(<CursorGlow />)
    const glow = screen.getByTestId('cursor-glow')
    fireEvent(window, new MouseEvent('mousemove', { clientX: 120, clientY: 80 }))
    expect(glow.style.getPropertyValue('--glow-x')).toBe('120px')
    expect(glow.style.getPropertyValue('--glow-y')).toBe('80px')
  })

  it('does not track the cursor when the user prefers reduced motion', () => {
    mockMatchMedia(true)
    render(<CursorGlow />)
    const glow = screen.getByTestId('cursor-glow')
    fireEvent(window, new MouseEvent('mousemove', { clientX: 200, clientY: 200 }))
    expect(glow.style.getPropertyValue('--glow-x')).toBe('')
  })
})
