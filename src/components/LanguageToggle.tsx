'use client'

import { useLanguage } from '@/context/LanguageContext'

export function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <div role="group" aria-label="Language" className="flex gap-2 font-mono text-xs">
      <button
        type="button"
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        className={lang === 'en' ? 'text-accent' : 'text-text-secondary'}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang('ru')}
        aria-pressed={lang === 'ru'}
        className={lang === 'ru' ? 'text-accent' : 'text-text-secondary'}
      >
        RU
      </button>
    </div>
  )
}
