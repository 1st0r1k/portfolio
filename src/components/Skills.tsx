'use client'

import { useLanguage } from '@/context/LanguageContext'

export function Skills() {
  const { t } = useLanguage()

  return (
    <section id="skills" aria-label="Skills" className="scroll-mt-24">
      <h3 className="font-mono text-accent">{t.skills.heading}</h3>
      <div className="mt-6 grid gap-8 sm:grid-cols-2">
        {t.skills.categories.map((category) => (
          <div key={category.title}>
            <h4 className="font-semibold text-text-primary">{category.title}</h4>
            <ul className="mt-2 flex flex-wrap gap-2 font-mono text-xs text-text-secondary">
              {category.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
