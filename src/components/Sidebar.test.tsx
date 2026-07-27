import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LanguageProvider } from '@/context/LanguageContext'
import { Sidebar } from './Sidebar'
import { content } from '@/content'

function renderSidebar() {
  return render(
    <LanguageProvider>
      <Sidebar />
    </LanguageProvider>
  )
}

describe('Sidebar', () => {
  it('renders the name, role and tagline for the active language', () => {
    renderSidebar()
    expect(screen.getByText(content.en.name)).toBeInTheDocument()
    expect(screen.getByText(content.en.role)).toBeInTheDocument()
    expect(screen.getByText(content.en.tagline)).toBeInTheDocument()
  })

  it('renders a nav link for every content.nav entry, pointing at its section id', () => {
    renderSidebar()
    content.en.nav.forEach((item) => {
      const link = screen.getByText(item.label)
      expect(link).toHaveAttribute('href', `#${item.id}`)
    })
  })

  it('renders a GitHub link pointing at the configured profile', () => {
    renderSidebar()
    expect(screen.getByLabelText('GitHub')).toHaveAttribute('href', content.en.social.github)
  })

  it('renders a mailto link for the configured email', () => {
    renderSidebar()
    expect(screen.getByLabelText('Email')).toHaveAttribute('href', `mailto:${content.en.social.email}`)
  })
})
