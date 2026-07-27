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

  it('links the MSB project to its GitHub repository', () => {
    render(
      <LanguageProvider>
        <Projects />
      </LanguageProvider>
    )
    const msb = content.en.projects.entries.find((p) => p.title.includes('MSB'))
    expect(msb?.link).toBeDefined()
    expect(screen.getByText(msb!.title).closest('a')).toHaveAttribute('href', msb!.link)
  })

  it('does not render a link for projects without one', () => {
    render(
      <LanguageProvider>
        <Projects />
      </LanguageProvider>
    )
    const igsu = content.en.projects.entries.find((p) => p.title.includes('IGSU'))
    expect(igsu?.link).toBeUndefined()
    expect(screen.getByText(igsu!.title).closest('a')).toBeNull()
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
