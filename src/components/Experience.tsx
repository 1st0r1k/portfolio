'use client'

import { useLanguage } from '@/context/LanguageContext'

export function Experience() {
  const { t } = useLanguage()

  return (
    <section id="experience" aria-label="Work experience" className="scroll-mt-24">
      <h3 className="font-mono text-accent">{t.experience.heading}</h3>
      <ol className="mt-6 space-y-10">
        {t.experience.entries.map((entry) => (
          <li key={`${entry.org}-${entry.dateRange}`}>
            <p className="font-mono text-xs text-text-secondary">{entry.dateRange}</p>
            <h4 className="mt-1 font-semibold text-text-primary">
              {entry.title} · {entry.org}
            </h4>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-text-secondary">
              {entry.bullets.map((bullet, index) => (
                <li key={index}>{bullet}</li>
              ))}
            </ul>
            <ul className="mt-3 flex flex-wrap gap-2 font-mono text-xs text-text-secondary">
              {entry.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  )
}
