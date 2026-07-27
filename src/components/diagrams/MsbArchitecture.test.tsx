import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MsbArchitecture } from './MsbArchitecture'

describe('MsbArchitecture', () => {
  it('renders an accessible diagram with the key system components labeled', () => {
    render(<MsbArchitecture />)
    const svg = screen.getByRole('img', { name: /MSB architecture/i })
    expect(svg.tagName).toBe('svg')
    ;['Telegram', 'VK', 'Max', 'Redis Streams', 'PostgreSQL'].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })
})
