'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { ProjectThumbnail } from './ProjectThumbnail'
import { ProjectGallery } from './ProjectGallery'
import { IgsuCrmArchitecture } from './diagrams/IgsuCrmArchitecture'
import { IgsuCrmProcess } from './diagrams/IgsuCrmProcess'
import { MsbArchitecture } from './diagrams/MsbArchitecture'
import { CareerAiArchitecture } from './diagrams/CareerAiArchitecture'

const architectureDiagrams: Record<string, () => JSX.Element> = {
  'igsu-crm': IgsuCrmArchitecture,
  msb: MsbArchitecture,
  careerai: CareerAiArchitecture,
}

const processDiagrams: Record<string, () => JSX.Element> = {
  'igsu-crm': IgsuCrmProcess,
}

export function ProjectDetail({ slug }: { slug: string }) {
  const { t } = useLanguage()
  const project = t.projects.entries.find((p) => p.slug === slug)

  if (!project) {
    return null
  }

  const ArchitectureDiagram = architectureDiagrams[slug]
  const ProcessDiagram = processDiagrams[slug]

  return (
    <article>
      <Link href="/#projects" className="font-mono text-sm text-text-secondary hover:text-accent">
        {t.projects.backLabel}
      </Link>

      <h1 className="mt-4 text-2xl font-bold text-text-primary">{project.title}</h1>
      <div className="mt-4">
        <ProjectThumbnail title={project.title} image={project.image} />
      </div>
      {project.images && <ProjectGallery title={project.title} images={project.images} />}
      <ul className="mt-4 flex flex-wrap gap-2 font-mono text-xs text-text-secondary">
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>

      <h2 className="mt-8 font-mono text-accent">{t.projects.problemLabel}</h2>
      <p className="mt-2 text-text-secondary">{project.problem}</p>

      <h2 className="mt-8 font-mono text-accent">{t.projects.approachLabel}</h2>
      <p className="mt-2 text-text-secondary">{project.approach}</p>

      {ArchitectureDiagram && (
        <>
          <h2 className="mt-8 font-mono text-accent">{t.projects.architectureLabel}</h2>
          <div className="mt-4 rounded-lg bg-background-alt p-4">
            <ArchitectureDiagram />
          </div>
        </>
      )}

      {ProcessDiagram && (
        <>
          <h2 className="mt-8 font-mono text-accent">{t.projects.processLabel}</h2>
          <div className="mt-4 rounded-lg bg-background-alt p-4">
            <ProcessDiagram />
          </div>
        </>
      )}

      <h2 className="mt-8 font-mono text-accent">{t.projects.resultsLabel}</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-text-secondary">
        {project.bullets.map((bullet, index) => (
          <li key={index}>{bullet}</li>
        ))}
      </ul>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          aria-label={`GitHub — ${project.title}`}
          className="mt-8 inline-block font-mono text-sm text-accent hover:underline"
        >
          GitHub →
        </a>
      )}
    </article>
  )
}
