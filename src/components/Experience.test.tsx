import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LanguageProvider } from '@/context/LanguageContext'
import { Experience } from './Experience'
import { content } from '@/content'

describe('Experience', () => {
  it('renders every experience entry title for the active language', () => {
    render(
      <LanguageProvider>
        <Experience />
      </LanguageProvider>
    )
    content.en.experience.entries.forEach((entry) => {
      expect(screen.getByText(`${entry.title} · ${entry.org}`)).toBeInTheDocument()
    })
  })

  it('has id="experience" so the sidebar nav link can target it', () => {
    render(
      <LanguageProvider>
        <Experience />
      </LanguageProvider>
    )
    expect(document.getElementById('experience')).toBeInTheDocument()
  })
})
