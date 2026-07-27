import { en } from './en'
import { ru } from './ru'
import type { SiteContent, Language } from './types'

export const content: Record<Language, SiteContent> = { en, ru }
export type { SiteContent, Language, NavItem, ExperienceEntry, ProjectEntry, SkillCategory } from './types'
