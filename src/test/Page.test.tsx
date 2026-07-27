import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { LanguageProvider } from '@/context/LanguageContext'
import { Sidebar } from '@/components/Sidebar'
import { About } from '@/components/About'
import { Experience } from '@/components/Experience'
import { Projects } from '@/components/Projects'
import { Skills } from '@/components/Skills'
import { content } from '@/content'

function AssembledPage() {
  return (
    <LanguageProvider>
      <Sidebar />
      <About />
      <Experience />
      <Projects />
      <Skills />
    </LanguageProvider>
  )
}

describe('assembled page', () => {
  it('every sidebar nav link points at a section id that exists in the rendered page', () => {
    render(<AssembledPage />)
    content.en.nav.forEach((item) => {
      expect(document.getElementById(item.id)).not.toBeNull()
    })
  })
})
