import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LanguageProvider } from '@/context/LanguageContext'
import { Skills } from './Skills'
import { content } from '@/content'

describe('Skills', () => {
  it('renders every skill category title', () => {
    render(
      <LanguageProvider>
        <Skills />
      </LanguageProvider>
    )
    content.en.skills.categories.forEach((category) => {
      expect(screen.getByText(category.title)).toBeInTheDocument()
    })
  })

  it('renders every skill item within the first category', () => {
    render(
      <LanguageProvider>
        <Skills />
      </LanguageProvider>
    )
    content.en.skills.categories[0].items.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument()
    })
  })

  it('has id="skills" so the sidebar nav link can target it', () => {
    render(
      <LanguageProvider>
        <Skills />
      </LanguageProvider>
    )
    expect(document.getElementById('skills')).toBeInTheDocument()
  })
})
