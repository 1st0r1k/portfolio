'use client'

import { useLanguage } from '@/context/LanguageContext'

export function Projects() {
  const { t } = useLanguage()

  return (
    <section id="projects" aria-label="Selected projects" className="scroll-mt-24">
      <h3 className="font-mono text-accent">{t.projects.heading}</h3>
      <ul className="mt-6 space-y-10">
        {t.projects.entries.map((project) => (
          <li key={project.title}>
            <h4 className="font-semibold text-text-primary">
              {project.link ? (
                <a href={project.link} target="_blank" rel="noreferrer" className="hover:text-accent">
                  {project.title}
                </a>
              ) : (
                project.title
              )}
            </h4>
            <p className="mt-2 text-text-secondary">{project.description}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-text-secondary">
              {project.bullets.map((bullet, index) => (
                <li key={index}>{bullet}</li>
              ))}
            </ul>
            <ul className="mt-3 flex flex-wrap gap-2 font-mono text-xs text-text-secondary">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  )
}
