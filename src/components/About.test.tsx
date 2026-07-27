import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LanguageProvider, useLanguage } from '@/context/LanguageContext'
import { About } from './About'
import { content } from '@/content'

function Wrapper() {
  const { setLang } = useLanguage()
  return (
    <div>
      <button onClick={() => setLang('ru')}>to-ru</button>
      <About />
    </div>
  )
}

describe('About', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('renders the English paragraphs by default', () => {
    render(
      <LanguageProvider>
        <About />
      </LanguageProvider>
    )
    content.en.about.paragraphs.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument()
    })
  })

  it('renders the Russian paragraphs after switching language', () => {
    render(
      <LanguageProvider>
        <Wrapper />
      </LanguageProvider>
    )
    fireEvent.click(screen.getByText('to-ru'))
    content.ru.about.paragraphs.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument()
    })
  })

  it('has id="about" so the sidebar nav link can target it', () => {
    render(
      <LanguageProvider>
        <About />
      </LanguageProvider>
    )
    expect(document.getElementById('about')).toBeInTheDocument()
  })
})
