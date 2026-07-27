'use client'

import { useLanguage } from '@/context/LanguageContext'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="mt-20 pb-8 text-sm text-text-secondary">
      <p>{t.footer}</p>
    </footer>
  )
}
