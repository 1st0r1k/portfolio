import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LanguageProvider, useLanguage } from '@/context/LanguageContext'
import { ProjectDetail } from './ProjectDetail'
import { content } from '@/content'

function Wrapper({ slug }: { slug: string }) {
  const { setLang } = useLanguage()
  return (
    <div>
      <button onClick={() => setLang('ru')}>to-ru</button>
      <ProjectDetail slug={slug} />
    </div>
  )
}

describe('ProjectDetail', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('renders the title, problem and approach for the given slug', () => {
    render(
      <LanguageProvider>
        <ProjectDetail slug="msb" />
      </LanguageProvider>
    )
    const project = content.en.projects.entries.find((p) => p.slug === 'msb')!
    expect(screen.getByRole('heading', { name: project.title, level: 1 })).toBeInTheDocument()
    expect(screen.getByText(project.problem)).toBeInTheDocument()
    expect(screen.getByText(project.approach)).toBeInTheDocument()
  })

  it('renders a thumbnail for the project', () => {
    render(
      <LanguageProvider>
        <ProjectDetail slug="msb" />
      </LanguageProvider>
    )
    const project = content.en.projects.entries.find((p) => p.slug === 'msb')!
    expect(screen.getByRole('img', { name: new RegExp(project.title.split(' ')[0]) })).toBeInTheDocument()
  })

  it('renders every result bullet for the given slug', () => {
    render(
      <LanguageProvider>
        <ProjectDetail slug="msb" />
      </LanguageProvider>
    )
    const project = content.en.projects.entries.find((p) => p.slug === 'msb')!
    project.bullets.forEach((bullet) => {
      expect(screen.getByText(bullet)).toBeInTheDocument()
    })
  })

  it('does not render an external GitHub link for any project (repos are private)', () => {
    content.en.projects.entries.forEach((project) => {
      const { unmount } = render(
        <LanguageProvider>
          <ProjectDetail slug={project.slug} />
        </LanguageProvider>
      )
      expect(project.link).toBeUndefined()
      expect(screen.queryByRole('link', { name: `GitHub — ${project.title}` })).toBeNull()
      unmount()
    })
  })

  it('renders a back link to the projects section on the home page', () => {
    render(
      <LanguageProvider>
        <ProjectDetail slug="msb" />
      </LanguageProvider>
    )
    expect(screen.getByText(content.en.projects.backLabel).closest('a')).toHaveAttribute(
      'href',
      '/#projects'
    )
  })

  it('renders the Russian content after switching language', () => {
    render(
      <LanguageProvider>
        <Wrapper slug="msb" />
      </LanguageProvider>
    )
    fireEvent.click(screen.getByText('to-ru'))
    const project = content.ru.projects.entries.find((p) => p.slug === 'msb')!
    expect(screen.getByText(project.problem)).toBeInTheDocument()
  })

  it('renders localized Problem/Approach/Results section labels', () => {
    render(
      <LanguageProvider>
        <ProjectDetail slug="msb" />
      </LanguageProvider>
    )
    expect(screen.getByText(content.en.projects.problemLabel)).toBeInTheDocument()
    expect(screen.getByText(content.en.projects.approachLabel)).toBeInTheDocument()
    expect(screen.getByText(content.en.projects.resultsLabel)).toBeInTheDocument()
  })
})
