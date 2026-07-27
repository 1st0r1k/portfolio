import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { IgsuCrmProcess } from './IgsuCrmProcess'

describe('IgsuCrmProcess', () => {
  it('renders an accessible BPMN-style admissions funnel diagram', () => {
    render(<IgsuCrmProcess />)
    const svg = screen.getByRole('img', { name: /admissions funnel process/i })
    expect(svg.tagName).toBe('svg')
    ;['Submit application', 'Review & verify', 'Generate contract', 'Enrolled'].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })
})
