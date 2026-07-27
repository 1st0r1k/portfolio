import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NetworkBackground } from './NetworkBackground'

describe('NetworkBackground', () => {
  it('renders a decorative, pointer-events-none canvas', () => {
    render(<NetworkBackground />)
    const canvas = screen.getByTestId('network-background')
    expect(canvas.tagName).toBe('CANVAS')
    expect(canvas).toHaveAttribute('aria-hidden', 'true')
    expect(canvas.className).toContain('pointer-events-none')
  })
})
