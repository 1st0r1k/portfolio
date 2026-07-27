import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LanguageProvider } from '@/context/LanguageContext'
import { Footer } from './Footer'
import { content } from '@/content'

describe('Footer', () => {
  it('renders the footer credit text for the active language', () => {
    render(
      <LanguageProvider>
        <Footer />
      </LanguageProvider>
    )
    expect(screen.getByText(content.en.footer)).toBeInTheDocument()
  })
})
