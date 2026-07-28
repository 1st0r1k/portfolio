import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProjectGallery } from './ProjectGallery'

describe('ProjectGallery', () => {
  it('renders nothing when there are no images', () => {
    const { container } = render(<ProjectGallery title="IGSU CRM" images={[]} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders a base-path-prefixed, clickable thumbnail for every image', () => {
    render(<ProjectGallery title="IGSU CRM" images={['/projects/igsu-crm-2.png', '/projects/igsu-crm-3.png']} />)

    const thumb1 = screen.getByRole('img', { name: 'IGSU CRM screenshot 2' })
    expect(thumb1).toHaveAttribute('src', '/portfolio/projects/igsu-crm-2.png')
    expect(thumb1.closest('a')).toHaveAttribute('href', '/portfolio/projects/igsu-crm-2.png')
    expect(thumb1.closest('a')).toHaveAttribute('target', '_blank')

    const thumb2 = screen.getByRole('img', { name: 'IGSU CRM screenshot 3' })
    expect(thumb2).toHaveAttribute('src', '/portfolio/projects/igsu-crm-3.png')
  })
})
