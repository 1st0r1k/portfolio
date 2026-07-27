import type { Metadata } from 'next'
import { ProjectDetail } from '@/components/ProjectDetail'
import { content } from '@/content'

export function generateStaticParams() {
  return content.en.projects.entries.map((project) => ({ slug: project.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = content.en.projects.entries.find((p) => p.slug === params.slug)
  return {
    title: project ? `${project.title} — Artem Bugrov` : 'Project — Artem Bugrov',
    description: project?.description,
  }
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  return (
    <div className="mx-auto max-w-3xl p-8 lg:p-12">
      <ProjectDetail slug={params.slug} />
    </div>
  )
}
