import { describe, it, expect } from 'vitest'
import { generateStaticParams } from './page'
import { content } from '@/content'

describe('generateStaticParams', () => {
  it('returns one param object per project slug', () => {
    const params = generateStaticParams()
    expect(params).toEqual(content.en.projects.entries.map((p) => ({ slug: p.slug })))
  })
})
