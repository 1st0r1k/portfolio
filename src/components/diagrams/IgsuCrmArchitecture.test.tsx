import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { IgsuCrmArchitecture } from './IgsuCrmArchitecture'

describe('IgsuCrmArchitecture', () => {
  it('renders an accessible diagram with the key system components labeled', () => {
    render(<IgsuCrmArchitecture />)
    const svg = screen.getByRole('img', { name: /IGSU CRM architecture/i })
    expect(svg.tagName).toBe('svg')
    ;['Next.js App', 'PostgreSQL', 'Bitrix24 CRM', 'Google Sheets'].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })
})
