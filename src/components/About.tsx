'use client'

import { useLanguage } from '@/context/LanguageContext'

export function About() {
  const { t } = useLanguage()

  return (
    <section id="about" aria-label="About me" className="scroll-mt-24">
      <h3 className="font-mono text-accent">{t.about.heading}</h3>
      {t.about.paragraphs.map((paragraph, index) => (
        <p key={index} className="mt-4 text-text-secondary">
          {paragraph}
        </p>
      ))}
    </section>
  )
}
