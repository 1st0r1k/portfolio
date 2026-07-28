import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProjectThumbnail } from './ProjectThumbnail'

describe('ProjectThumbnail', () => {
  it('renders an <img> with the base-path-prefixed src when an image is given', () => {
    render(<ProjectThumbnail title="MSB" image="/projects/msb.png" />)
    const img = screen.getByRole('img', { name: /MSB/ })
    expect(img.tagName).toBe('IMG')
    expect(img).toHaveAttribute('src', '/portfolio/projects/msb.png')
  })

  it('renders a labeled placeholder (not an <img>) when no image is provided', () => {
    render(<ProjectThumbnail title="IGSU CRM" />)
    const placeholder = screen.getByRole('img', { name: /IGSU CRM/ })
    expect(placeholder.tagName).not.toBe('IMG')
    expect(screen.getByText('IGSU CRM')).toBeInTheDocument()
  })
})
