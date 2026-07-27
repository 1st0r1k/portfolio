import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CareerAiArchitecture } from './CareerAiArchitecture'

describe('CareerAiArchitecture', () => {
  it('renders an accessible diagram with the key system components labeled', () => {
    render(<CareerAiArchitecture />)
    const svg = screen.getByRole('img', { name: /CareerAI architecture/i })
    expect(svg.tagName).toBe('svg')
    ;['Job Sources', 'pgvector', 'LLM Matching', 'Telegram Bot'].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })
})
