import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LanguageProvider } from '@/context/LanguageContext'
import { LanguageToggle } from './LanguageToggle'

function renderToggle() {
  return render(
    <LanguageProvider>
      <LanguageToggle />
    </LanguageProvider>
  )
}

describe('LanguageToggle', () => {
  it('renders EN and RU buttons', () => {
    renderToggle()
    expect(screen.getByText('EN')).toBeInTheDocument()
    expect(screen.getByText('RU')).toBeInTheDocument()
  })

  it('marks EN as pressed by default', () => {
    renderToggle()
    expect(screen.getByText('EN')).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('RU')).toHaveAttribute('aria-pressed', 'false')
  })

  it('switches active language when RU is clicked', () => {
    renderToggle()
    fireEvent.click(screen.getByText('RU'))
    expect(screen.getByText('RU')).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('EN')).toHaveAttribute('aria-pressed', 'false')
  })
})
