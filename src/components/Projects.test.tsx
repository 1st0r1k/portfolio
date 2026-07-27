import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LanguageProvider } from '@/context/LanguageContext'
import { Projects } from './Projects'
import { content } from '@/content'

describe('Projects', () => {
  it('renders every project title for the active language', () => {
    render(
      <LanguageProvider>
        <Projects />
      </LanguageProvider>
    )
    content.en.projects.entries.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument()
    })
  })

  it('renders a "read case study" link to /projects/<slug> for every tile', () => {
    render(
      <LanguageProvider>
        <Projects />
      </LanguageProvider>
    )
    const readMoreLinks = screen.getAllByText(content.en.projects.readMoreLabel)
    expect(readMoreLinks).toHaveLength(content.en.projects.entries.length)
    content.en.projects.entries.forEach((project) => {
      const link = readMoreLinks.find((el) => el.closest('a')?.getAttribute('href')?.endsWith(`/projects/${project.slug}`))
      expect(link).toBeDefined()
    })
  })

  it('renders an external GitHub link for the MSB project', () => {
    render(
      <LanguageProvider>
        <Projects />
      </LanguageProvider>
    )
    const msb = content.en.projects.entries.find((p) => p.slug === 'msb')
    expect(msb?.link).toBeDefined()
    expect(screen.getByRole('link', { name: `GitHub — ${msb!.title}` })).toHaveAttribute('href', msb!.link)
  })

  it('does not render an external GitHub link for projects without one', () => {
    render(
      <LanguageProvider>
        <Projects />
      </LanguageProvider>
    )
    const igsu = content.en.projects.entries.find((p) => p.slug === 'igsu-crm')
    expect(igsu?.link).toBeUndefined()
    expect(screen.queryByRole('link', { name: `GitHub — ${igsu!.title}` })).toBeNull()
  })

  it('has id="projects" so the sidebar nav link can target it', () => {
    render(
      <LanguageProvider>
        <Projects />
      </LanguageProvider>
    )
    expect(document.getElementById('projects')).toBeInTheDocument()
  })
})
