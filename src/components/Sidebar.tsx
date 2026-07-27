'use client'

import { useLanguage } from '@/context/LanguageContext'
import { LanguageToggle } from './LanguageToggle'

export function Sidebar() {
  const { t } = useLanguage()

  return (
    <header className="flex flex-col justify-between p-8 lg:sticky lg:top-0 lg:h-screen lg:w-1/3 lg:p-12">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">{t.name}</h1>
        <h2 className="mt-2 text-lg text-text-primary">{t.role}</h2>
        <p className="mt-4 max-w-xs text-text-secondary">{t.tagline}</p>

        <nav aria-label="In-page jump links" className="mt-12">
          <ul className="space-y-3 font-mono text-sm">
            {t.nav.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-text-secondary hover:text-accent">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-12 flex items-center gap-4">
        <a
          href={t.social.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="text-text-secondary hover:text-accent"
        >
          GitHub
        </a>
        <a href={`mailto:${t.social.email}`} aria-label="Email" className="text-text-secondary hover:text-accent">
          Email
        </a>
        <LanguageToggle />
      </div>
    </header>
  )
}
