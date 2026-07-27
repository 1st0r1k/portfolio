'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { ProjectThumbnail } from './ProjectThumbnail'

export function Projects() {
  const { t } = useLanguage()

  return (
    <section id="projects" aria-label="Selected projects" className="scroll-mt-24">
      <h3 className="font-mono text-accent">{t.projects.heading}</h3>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {t.projects.entries.map((project) => (
          <div key={project.slug} className="rounded-lg bg-background-alt p-6">
            <ProjectThumbnail title={project.title} image={project.image} />
            <h4 className="mt-4 font-semibold text-text-primary">{project.title}</h4>
            <p className="mt-2 text-text-secondary">{project.description}</p>
            <ul className="mt-3 flex flex-wrap gap-2 font-mono text-xs text-text-secondary">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <div className="mt-4 flex items-center gap-4 font-mono text-sm">
              <Link href={`/projects/${project.slug}`} className="text-accent hover:underline">
                {t.projects.readMoreLabel}
              </Link>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`GitHub — ${project.title}`}
                  className="text-text-secondary hover:text-accent"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
