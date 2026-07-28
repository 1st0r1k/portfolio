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
  slug: string
  title: string
  description: string
  problem: string
  approach: string
  bullets: string[]
  tags: string[]
  link?: string
  image?: string
  images?: string[]
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
    readMoreLabel: string
    backLabel: string
    problemLabel: string
    approachLabel: string
    resultsLabel: string
    architectureLabel: string
    processLabel: string
    entries: ProjectEntry[]
  }
  skills: {
    heading: string
    categories: SkillCategory[]
  }
  footer: string
}

export type Language = 'en' | 'ru'
