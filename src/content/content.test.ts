import { describe, it, expect } from 'vitest'
import { en } from './en'
import { ru } from './ru'

describe('content parity', () => {
  it('en and ru expose the same top-level content keys', () => {
    expect(Object.keys(en).sort()).toEqual(Object.keys(ru).sort())
  })

  it('en and ru have the same number of experience entries', () => {
    expect(ru.experience.entries.length).toBe(en.experience.entries.length)
  })

  it('en and ru have the same number of project entries', () => {
    expect(ru.projects.entries.length).toBe(en.projects.entries.length)
  })

  it('en and ru have the same number of skill categories', () => {
    expect(ru.skills.categories.length).toBe(en.skills.categories.length)
  })

  it('en and ru have the same number of nav items', () => {
    expect(ru.nav.length).toBe(en.nav.length)
  })
})
