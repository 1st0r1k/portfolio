'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { content } from '@/content'
import type { Language, SiteContent } from '@/content/types'

const STORAGE_KEY = 'portfolio-lang'
const DEFAULT_LANGUAGE: Language = 'en'

interface LanguageContextValue {
  lang: Language
  setLang: (lang: Language) => void
  t: SiteContent
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(DEFAULT_LANGUAGE)

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'ru') {
      setLangState(stored)
    }
  }, [])

  const setLang = (next: Language) => {
    setLangState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }

  const value = useMemo(() => ({ lang, setLang, t: content[lang] }), [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return ctx
}
