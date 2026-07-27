export interface NavItem {
  id: string
  label: string
}

export interface ExperienceEntry {
  dateRange: string
  title: string
  org: string
  bullets: string[]
  tags: string[]
}

export interface ProjectEntry {
  title: string
  description: string
  bullets: string[]
  tags: string[]
  link?: string
}

export interface SkillCategory {
  title: string
  items: string[]
}

export interface SiteContent {
  name: string
  role: string
  tagline: string
  nav: NavItem[]
  social: {
    github: string
    email: string
  }
  about: {
    heading: string
    paragraphs: string[]
  }
  experience: {
    heading: string
    entries: ExperienceEntry[]
  }
  projects: {
    heading: string
    entries: ProjectEntry[]
  }
  skills: {
    heading: string
    categories: SkillCategory[]
  }
  footer: string
}

export type Language = 'en' | 'ru'
