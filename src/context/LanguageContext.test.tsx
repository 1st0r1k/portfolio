import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LanguageProvider, useLanguage } from './LanguageContext'

function Probe() {
  const { lang, setLang, t } = useLanguage()
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="name">{t.name}</span>
      <button onClick={() => setLang('ru')}>to-ru</button>
    </div>
  )
}

describe('useLanguage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('defaults to English', () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    )
    expect(screen.getByTestId('lang')).toHaveTextContent('en')
  })

  it('switches language and updates content when setLang is called', () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    )
    fireEvent.click(screen.getByText('to-ru'))
    expect(screen.getByTestId('lang')).toHaveTextContent('ru')
  })

  it('persists the chosen language to localStorage', () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    )
    fireEvent.click(screen.getByText('to-ru'))
    expect(window.localStorage.getItem('portfolio-lang')).toBe('ru')
  })

  it('reads a persisted language back on mount', () => {
    window.localStorage.setItem('portfolio-lang', 'ru')
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    )
    expect(screen.getByTestId('lang')).toHaveTextContent('ru')
  })
})
