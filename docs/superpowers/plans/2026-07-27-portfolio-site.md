# Personal Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a bilingual (EN/RU) personal portfolio site for Artem Bugrov, modeled on brittanychiang.com's layout, as a statically-exported Next.js app on GitHub Pages at `1st0r1k.github.io/portfolio`.

**Architecture:** Next.js 14 (App Router) + TypeScript + Tailwind CSS, `output: 'export'` static build. A single typed content dictionary (`en`/`ru`) feeds all components through a `LanguageProvider` React context backed by `localStorage`. Deployed via GitHub Actions to GitHub Pages.

**Tech Stack:** Next.js, TypeScript, Tailwind CSS, Vitest, React Testing Library, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-07-27-portfolio-site-design.md`

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `next-env.d.ts`
- Create: `.gitignore`
- Create: `src/app/globals.css`

This task is configuration/tooling setup (no application behavior), which is the documented TDD exception for config files — no failing test is written for this task.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.0",
    "@testing-library/react": "^16.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "autoprefixer": "^10.4.0",
    "jsdom": "^24.0.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.4.0",
    "vitest": "^1.6.0"
  }
}
```

- [ ] **Step 2: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create `next.config.ts`**

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/portfolio',
  assetPrefix: '/portfolio/',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
```

- [ ] **Step 4: Create `next-env.d.ts`**

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
```

- [ ] **Step 5: Create `.gitignore`**

```
node_modules
.next
out
*.local
.DS_Store
```

- [ ] **Step 6: Create `src/app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 7: Install dependencies**

Run: `npm install`
Expected: installs cleanly, creates `package-lock.json` and `node_modules/`.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts next-env.d.ts .gitignore src/app/globals.css
git commit -m "chore: scaffold Next.js + TypeScript project"
```

---

## Task 2: Tailwind & Test Tooling Setup

**Files:**
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`

Configuration/tooling — no failing test for this task (same exception as Task 1).

- [ ] **Step 1: Create `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#15130f',
        'background-alt': '#1a1712',
        'text-primary': '#f2ede4',
        'text-secondary': '#9a8f7f',
        accent: '#f5a623',
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Create `postcss.config.js`**

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 3: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

- [ ] **Step 4: Create `vitest.setup.ts`**

```ts
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 5: Verify Vitest runs (no tests yet)**

Run: `npm test`
Expected: `No test files found` (or similar) — exits without error since no `*.test.ts(x)` files exist yet.

- [ ] **Step 6: Commit**

```bash
git add tailwind.config.ts postcss.config.js vitest.config.ts vitest.setup.ts
git commit -m "chore: configure Tailwind CSS and Vitest"
```

---

## Task 3: Content Types & Bilingual Dictionary

**Files:**
- Create: `src/content/types.ts`
- Create: `src/content/en.ts`
- Create: `src/content/ru.ts`
- Create: `src/content/index.ts`
- Test: `src/content/content.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/content/content.test.ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- content.test.ts`
Expected: FAIL — `Cannot find module './en'` (or `./ru`) — the modules don't exist yet.

- [ ] **Step 3: Create `src/content/types.ts`**

```ts
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
```

- [ ] **Step 4: Create `src/content/en.ts`**

```ts
import type { SiteContent } from './types'

export const en: SiteContent = {
  name: 'Artem Bugrov',
  role: 'Systems Analyst',
  tagline: 'I design data models and APIs, then build the systems myself.',
  nav: [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
  ],
  social: {
    github: 'https://github.com/1st0r1k',
    email: 'bugrov-ay@ist0.ru',
  },
  about: {
    heading: 'About',
    paragraphs: [
      "Analyst and builder with 8+ years designing and shipping digital systems end to end. I elicit business requirements and translate them into architecture, API contracts and data models, then write specifications engineering teams can build from directly.",
      "Outside a corporate title, I have hands-on systems-analysis experience through three production applications I designed and built myself — including a CRM built from scratch when off-the-shelf tools didn't fit — covering REST API design, relational data modeling, third-party integrations, and message-queue architecture. I map processes in BPMN 2.0 / UML, write SQL confidently, and have led a production team through 0-to-1 buildouts for 6+ years.",
    ],
  },
  experience: {
    heading: 'Experience',
    entries: [
      {
        dateRange: 'Oct 2025 — Present',
        title: 'Acting Director, IT Center',
        org: 'IGSU RANEPA',
        bullets: [
          "Own IT infrastructure and the media-production studio; designed and built the IGSU CRM when a commercial CRM rollout alone didn't cover the admissions process.",
          'Rolled out Bitrix24 CRM and IP telephony for the admissions call center — requirements, configuration, integration.',
          'Design local databases and build dashboards and reporting in SQL; closed a full tender procurement cycle for department equipment.',
        ],
        tags: ['Systems Analysis', 'Next.js', 'PostgreSQL', 'Bitrix24'],
      },
      {
        dateRange: 'Mar 2025 — Present',
        title: 'Team Lead, Media Production Studio',
        org: 'IGSU RANEPA',
        bullets: [
          'Lead full-cycle production end to end; run up to 10 parallel projects and 1–2 major federal deliverables a month.',
          'Built the production system from zero: procurement, IT infrastructure, network/NAS design, request-intake and briefing workflows.',
          'Grew a one-person, no-process studio into a federal-level production unit; hired and trained 30+ interns over 6+ years.',
        ],
        tags: ['Process Design', 'Team Leadership', 'Infrastructure'],
      },
      {
        dateRange: '2024 — 2025',
        title: 'Project Coordinator, "My Finance"',
        org: 'Ministry of Finance of Russia',
        bullets: [
          'Coordinated distributed production teams across 4–5 cities; set shared technical standards, managed scope, budget and documentation.',
          'Delivered 26 lectures in 2024 and ~28 in 2025, both cycles ahead of schedule.',
        ],
        tags: ['Coordination', 'Documentation'],
      },
      {
        dateRange: '2024 — 2025',
        title: 'Digital Designer / E-learning Specialist',
        org: 'DIA (under the Central Bank of Russia)',
        bullets: [
          'Built and scaled the design system of an internal educational portal: 100+ courses and a UX/UI kit for interactive content.',
        ],
        tags: ['Design Systems', 'UX/UI'],
      },
    ],
  },
  projects: {
    heading: 'Projects',
    entries: [
      {
        title: 'IGSU CRM',
        description:
          "Full-stack admissions CRM designed and built from scratch after evaluating off-the-shelf tools and finding none fit the institute's process.",
        bullets: [
          'Designed the data model and architecture for contract tracking, admissions-funnel analytics and a custom database builder with role-based access control.',
          'Built two-way integrations with Bitrix24 CRM and Google Sheets — OAuth, streaming CSV import for 50,000+ rows.',
          'Redesigned reporting aggregation to run in SQL instead of the application layer — roughly a 30x speed-up.',
          'Set up CI with 900+ automated tests, Docker deployment and automated backups.',
        ],
        tags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'NextAuth', 'Docker'],
      },
      {
        title: 'MSB — Messenger Sync Bridge',
        description:
          'Real-time message-sync service between Telegram, VK and Max for media companies running parallel social channels.',
        bullets: [
          'Designed bidirectional "bridges" between channels across platforms, including message filtering, role-based access and Redis Streams-based queues.',
          'Built adapters for the Telegram, VK and Max APIs, normalizing messages into a single internal data model.',
          'Built an OAuth integration with VK (implicit token flow) to publish media to a group wall.',
          'Set up production deployment: Docker Compose, encrypted bot-token storage (AES-256-GCM), CI/CD.',
        ],
        tags: ['NestJS', 'PostgreSQL', 'Redis', 'Docker', 'React'],
        link: 'https://github.com/1st0r1k/msb',
      },
      {
        title: 'CareerAI',
        description:
          'AI job-search assistant (Telegram bot + web app) aggregating listings from 5+ sources and matching them to resumes via embeddings and an LLM.',
        bullets: [
          'Built resume-to-listing matching using vector embeddings and an LLM.',
          'Aggregated job listings from 5+ sources into a unified pipeline.',
        ],
        tags: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'Redis', 'Docker'],
      },
    ],
  },
  skills: {
    heading: 'Skills',
    categories: [
      {
        title: 'Systems analysis',
        items: [
          'Requirements elicitation & formalization',
          'REST API design',
          'Relational data modeling',
          'BPMN 2.0 / UML process mapping',
          'Technical specifications',
          'Third-party integrations (OAuth, webhooks, CSV/streaming import)',
          'Gap and bottleneck analysis',
        ],
      },
      {
        title: 'Engineering & data',
        items: [
          'Next.js / React',
          'TypeScript',
          'Python (FastAPI)',
          'NestJS',
          'PostgreSQL',
          'Prisma',
          'SQLAlchemy / Alembic',
          'SQL query optimization',
          'Redis',
          'Docker',
          'CI/CD',
          'Automated testing (TDD)',
        ],
      },
      {
        title: 'Delivery & leadership',
        items: [
          '0-to-1 product delivery',
          'Agile / Scrum / Kanban',
          'Hiring & mentoring',
          'Cross-functional coordination',
          'Jira',
          'Confluence',
          'Miro',
          'Notion',
        ],
      },
      {
        title: 'Systems & domain',
        items: [
          'CRM design (Bitrix24 + custom-built CRM)',
          'IP telephony integration',
          'Process automation',
          'AI-assisted workflow automation',
        ],
      },
    ],
  },
  footer: 'Designed and built by Artem Bugrov. Next.js, TypeScript, Tailwind CSS. Deployed on GitHub Pages.',
}
```

- [ ] **Step 5: Create `src/content/ru.ts`**

```ts
import type { SiteContent } from './types'

export const ru: SiteContent = {
  name: 'Артём Бугров',
  role: 'Системный аналитик',
  tagline: 'Проектирую системы данных и API, а затем сам довожу их до продакшена.',
  nav: [
    { id: 'about', label: 'Обо мне' },
    { id: 'experience', label: 'Опыт' },
    { id: 'projects', label: 'Проекты' },
    { id: 'skills', label: 'Навыки' },
  ],
  social: {
    github: 'https://github.com/1st0r1k',
    email: 'bugrov-ay@ist0.ru',
  },
  about: {
    heading: 'Обо мне',
    paragraphs: [
      'Аналитик и разработчик с опытом 8+ лет — проектирую и довожу цифровые системы до продакшена от начала до конца. Формализую бизнес-требования в архитектуру, API-контракты и модели данных, затем пишу спецификации, по которым инженерные команды могут разрабатывать напрямую.',
      'Помимо основной должности, у меня есть практический опыт системного анализа на трёх продакшн-приложениях, которые я спроектировал и построил самостоятельно — включая CRM, написанную с нуля, когда готовые решения не подошли под процессы института. Это охватывает проектирование REST API, реляционное моделирование данных, интеграции со сторонними сервисами и архитектуру очередей сообщений. Картирую процессы в BPMN 2.0 / UML, уверенно пишу SQL и веду продакшн-команду через запуски продуктов с нуля уже 6+ лет.',
    ],
  },
  experience: {
    heading: 'Опыт',
    entries: [
      {
        dateRange: 'окт. 2025 — наст. время',
        title: 'И.о. директора IT-центра',
        org: 'ИГСУ РАНХиГС',
        bullets: [
          'Отвечаю за IT-инфраструктуру и студию медиапроизводства; спроектировал и построил IGSU CRM, когда внедрения коммерческой CRM оказалось недостаточно для процесса приёмной кампании.',
          'Внедрил Bitrix24 CRM и IP-телефонию для колл-центра приёмной комиссии — требования, настройка, интеграция.',
          'Проектирую локальные базы данных, строю дашборды и отчётность на SQL; закрыл полный цикл тендерных закупок оборудования для отдела.',
        ],
        tags: ['Системный анализ', 'Next.js', 'PostgreSQL', 'Bitrix24'],
      },
      {
        dateRange: 'март 2025 — наст. время',
        title: 'Руководитель студии медиапроизводства',
        org: 'ИГСУ РАНХиГС',
        bullets: [
          'Веду полный цикл продакшена; одновременно до 10 параллельных проектов и 1–2 крупных федеральных релиза в месяц.',
          'Построил систему производства с нуля: закупки, IT-инфраструктура, проектирование сети/NAS, процессы приёма заявок и брифинга.',
          'Вырастил студию из одного человека без процессов в подразделение федерального уровня; нанял и обучил 30+ стажёров за 6+ лет.',
        ],
        tags: ['Проектирование процессов', 'Управление командой', 'Инфраструктура'],
      },
      {
        dateRange: '2024 — 2025',
        title: 'Координатор проекта «Моё финансирование»',
        org: 'Минфин России',
        bullets: [
          'Координировал распределённые продакшн-команды в 4–5 городах; задавал единые технические стандарты, управлял скоупом, бюджетом и документацией.',
          'Провёл 26 лекций в 2024 году и ~28 в 2025 — оба цикла с опережением графика.',
        ],
        tags: ['Координация', 'Документация'],
      },
      {
        dateRange: '2024 — 2025',
        title: 'Дизайнер / специалист по e-learning',
        org: 'АСВ (при ЦБ РФ)',
        bullets: [
          'Построил и масштабировал дизайн-систему внутреннего образовательного портала: 100+ курсов и UX/UI-кит для интерактивного контента.',
        ],
        tags: ['Дизайн-системы', 'UX/UI'],
      },
    ],
  },
  projects: {
    heading: 'Проекты',
    entries: [
      {
        title: 'IGSU CRM',
        description:
          'Full-stack CRM для приёмной кампании, спроектированная и построенная с нуля после того, как готовые решения не подошли под процессы института.',
        bullets: [
          'Спроектировал модель данных и архитектуру для учёта договоров, аналитики воронки приёма и конструктора баз данных с ролевым доступом.',
          'Построил двусторонние интеграции с Bitrix24 CRM и Google Sheets — OAuth, потоковый импорт CSV для 50 000+ строк.',
          'Перепроектировал агрегацию отчётности на SQL вместо уровня приложения — ускорение примерно в 30 раз.',
          'Настроил CI с 900+ автотестами, Docker-деплой и автоматическими бэкапами.',
        ],
        tags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'NextAuth', 'Docker'],
      },
      {
        title: 'MSB — Messenger Sync Bridge',
        description:
          'Сервис синхронизации сообщений в реальном времени между Telegram, VK и Max для медиакомпаний с параллельными соцканалами.',
        bullets: [
          'Спроектировал двунаправленные «мосты» между каналами разных платформ: фильтрация сообщений, ролевой доступ, очереди на Redis Streams.',
          'Построил адаптеры для API Telegram, VK и Max, приводя сообщения к единой внутренней модели данных.',
          'Реализовал OAuth-интеграцию с VK (implicit token flow) для публикации медиа на стену группы.',
          'Настроил продакшн-деплой: Docker Compose, шифрованное хранение bot-токенов (AES-256-GCM), CI/CD.',
        ],
        tags: ['NestJS', 'PostgreSQL', 'Redis', 'Docker', 'React'],
        link: 'https://github.com/1st0r1k/msb',
      },
      {
        title: 'CareerAI',
        description:
          'AI-ассистент поиска работы (Telegram-бот + веб-приложение), агрегирующий вакансии из 5+ источников и подбирающий их под резюме через эмбеддинги и LLM.',
        bullets: [
          'Реализовал подбор вакансий под резюме через векторные эмбеддинги и LLM.',
          'Агрегировал вакансии из 5+ источников в единый пайплайн.',
        ],
        tags: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'Redis', 'Docker'],
      },
    ],
  },
  skills: {
    heading: 'Навыки',
    categories: [
      {
        title: 'Системный анализ',
        items: [
          'Сбор и формализация требований',
          'Проектирование REST API',
          'Реляционное моделирование данных',
          'BPMN 2.0 / UML',
          'Технические спецификации',
          'Интеграции со сторонними сервисами (OAuth, webhooks, CSV/потоковый импорт)',
          'Анализ узких мест',
        ],
      },
      {
        title: 'Инженерия и данные',
        items: [
          'Next.js / React',
          'TypeScript',
          'Python (FastAPI)',
          'NestJS',
          'PostgreSQL',
          'Prisma',
          'SQLAlchemy / Alembic',
          'Оптимизация SQL-запросов',
          'Redis',
          'Docker',
          'CI/CD',
          'Автотестирование (TDD)',
        ],
      },
      {
        title: 'Деливери и лидерство',
        items: [
          'Запуск продуктов с нуля',
          'Agile / Scrum / Kanban',
          'Найм и менторинг',
          'Кросс-функциональная координация',
          'Jira',
          'Confluence',
          'Miro',
          'Notion',
        ],
      },
      {
        title: 'Системы и домен',
        items: [
          'Проектирование CRM (Bitrix24 + собственная CRM)',
          'Интеграция IP-телефонии',
          'Автоматизация процессов',
          'AI-автоматизация рабочих процессов',
        ],
      },
    ],
  },
  footer: 'Спроектировано и построено Артёмом Бугровым. Next.js, TypeScript, Tailwind CSS. Деплой на GitHub Pages.',
}
```

- [ ] **Step 6: Create `src/content/index.ts`**

```ts
import { en } from './en'
import { ru } from './ru'
import type { SiteContent, Language } from './types'

export const content: Record<Language, SiteContent> = { en, ru }
export type { SiteContent, Language, NavItem, ExperienceEntry, ProjectEntry, SkillCategory } from './types'
```

- [ ] **Step 7: Run test to verify it passes**

Run: `npm test -- content.test.ts`
Expected: PASS — 5/5 tests green.

- [ ] **Step 8: Commit**

```bash
git add src/content
git commit -m "feat: add bilingual content dictionary with parity tests"
```

---

## Task 4: Language Context & Hook

**Files:**
- Create: `src/context/LanguageContext.tsx`
- Test: `src/context/LanguageContext.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/context/LanguageContext.test.tsx
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LanguageProvider, useLanguage } from './LanguageContext'

function Probe() {
  const { lang, setLang, t } = useLanguage()
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="name">{t.name}</span>
      <button onClick={() => setLang('ru')}>to-ru</button>
    </div>
  )
}

describe('useLanguage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('defaults to English', () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    )
    expect(screen.getByTestId('lang')).toHaveTextContent('en')
  })

  it('switches language and updates content when setLang is called', () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    )
    fireEvent.click(screen.getByText('to-ru'))
    expect(screen.getByTestId('lang')).toHaveTextContent('ru')
  })

  it('persists the chosen language to localStorage', () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    )
    fireEvent.click(screen.getByText('to-ru'))
    expect(window.localStorage.getItem('portfolio-lang')).toBe('ru')
  })

  it('reads a persisted language back on mount', () => {
    window.localStorage.setItem('portfolio-lang', 'ru')
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    )
    expect(screen.getByTestId('lang')).toHaveTextContent('ru')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- LanguageContext.test.tsx`
Expected: FAIL — `Cannot find module './LanguageContext'`.

- [ ] **Step 3: Create `src/context/LanguageContext.tsx`**

```tsx
'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { content } from '@/content'
import type { Language, SiteContent } from '@/content/types'

const STORAGE_KEY = 'portfolio-lang'
const DEFAULT_LANGUAGE: Language = 'en'

interface LanguageContextValue {
  lang: Language
  setLang: (lang: Language) => void
  t: SiteContent
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(DEFAULT_LANGUAGE)

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'ru') {
      setLangState(stored)
    }
  }, [])

  const setLang = (next: Language) => {
    setLangState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }

  const value = useMemo(() => ({ lang, setLang, t: content[lang] }), [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return ctx
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- LanguageContext.test.tsx`
Expected: PASS — 4/4 tests green.

- [ ] **Step 5: Commit**

```bash
git add src/context/LanguageContext.tsx src/context/LanguageContext.test.tsx
git commit -m "feat: add LanguageProvider and useLanguage hook"
```

---

## Task 5: Language Toggle Component

**Files:**
- Create: `src/components/LanguageToggle.tsx`
- Test: `src/components/LanguageToggle.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/LanguageToggle.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LanguageProvider } from '@/context/LanguageContext'
import { LanguageToggle } from './LanguageToggle'

function renderToggle() {
  return render(
    <LanguageProvider>
      <LanguageToggle />
    </LanguageProvider>
  )
}

describe('LanguageToggle', () => {
  it('renders EN and RU buttons', () => {
    renderToggle()
    expect(screen.getByText('EN')).toBeInTheDocument()
    expect(screen.getByText('RU')).toBeInTheDocument()
  })

  it('marks EN as pressed by default', () => {
    renderToggle()
    expect(screen.getByText('EN')).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('RU')).toHaveAttribute('aria-pressed', 'false')
  })

  it('switches active language when RU is clicked', () => {
    renderToggle()
    fireEvent.click(screen.getByText('RU'))
    expect(screen.getByText('RU')).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('EN')).toHaveAttribute('aria-pressed', 'false')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- LanguageToggle.test.tsx`
Expected: FAIL — `Cannot find module './LanguageToggle'`.

- [ ] **Step 3: Create `src/components/LanguageToggle.tsx`**

```tsx
'use client'

import { useLanguage } from '@/context/LanguageContext'

export function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <div role="group" aria-label="Language" className="flex gap-2 font-mono text-xs">
      <button
        type="button"
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        className={lang === 'en' ? 'text-accent' : 'text-text-secondary'}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang('ru')}
        aria-pressed={lang === 'ru'}
        className={lang === 'ru' ? 'text-accent' : 'text-text-secondary'}
      >
        RU
      </button>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- LanguageToggle.test.tsx`
Expected: PASS — 3/3 tests green.

- [ ] **Step 5: Commit**

```bash
git add src/components/LanguageToggle.tsx src/components/LanguageToggle.test.tsx
git commit -m "feat: add LanguageToggle component"
```

---

## Task 6: Sidebar Component

**Files:**
- Create: `src/components/Sidebar.tsx`
- Test: `src/components/Sidebar.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/Sidebar.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LanguageProvider } from '@/context/LanguageContext'
import { Sidebar } from './Sidebar'
import { content } from '@/content'

function renderSidebar() {
  return render(
    <LanguageProvider>
      <Sidebar />
    </LanguageProvider>
  )
}

describe('Sidebar', () => {
  it('renders the name, role and tagline for the active language', () => {
    renderSidebar()
    expect(screen.getByText(content.en.name)).toBeInTheDocument()
    expect(screen.getByText(content.en.role)).toBeInTheDocument()
    expect(screen.getByText(content.en.tagline)).toBeInTheDocument()
  })

  it('renders a nav link for every content.nav entry, pointing at its section id', () => {
    renderSidebar()
    content.en.nav.forEach((item) => {
      const link = screen.getByText(item.label)
      expect(link).toHaveAttribute('href', `#${item.id}`)
    })
  })

  it('renders a GitHub link pointing at the configured profile', () => {
    renderSidebar()
    expect(screen.getByLabelText('GitHub')).toHaveAttribute('href', content.en.social.github)
  })

  it('renders a mailto link for the configured email', () => {
    renderSidebar()
    expect(screen.getByLabelText('Email')).toHaveAttribute('href', `mailto:${content.en.social.email}`)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- Sidebar.test.tsx`
Expected: FAIL — `Cannot find module './Sidebar'`.

- [ ] **Step 3: Create `src/components/Sidebar.tsx`**

```tsx
'use client'

import { useLanguage } from '@/context/LanguageContext'
import { LanguageToggle } from './LanguageToggle'

export function Sidebar() {
  const { t } = useLanguage()

  return (
    <header className="flex flex-col justify-between p-8 lg:sticky lg:top-0 lg:h-screen lg:w-1/3 lg:p-12">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">{t.name}</h1>
        <h2 className="mt-2 text-lg text-text-primary">{t.role}</h2>
        <p className="mt-4 max-w-xs text-text-secondary">{t.tagline}</p>

        <nav aria-label="In-page jump links" className="mt-12">
          <ul className="space-y-3 font-mono text-sm">
            {t.nav.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-text-secondary hover:text-accent">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-12 flex items-center gap-4">
        <a
          href={t.social.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="text-text-secondary hover:text-accent"
        >
          GitHub
        </a>
        <a href={`mailto:${t.social.email}`} aria-label="Email" className="text-text-secondary hover:text-accent">
          Email
        </a>
        <LanguageToggle />
      </div>
    </header>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- Sidebar.test.tsx`
Expected: PASS — 4/4 tests green.

- [ ] **Step 5: Commit**

```bash
git add src/components/Sidebar.tsx src/components/Sidebar.test.tsx
git commit -m "feat: add Sidebar component"
```

---

## Task 7: About Section

**Files:**
- Create: `src/components/About.tsx`
- Test: `src/components/About.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/About.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LanguageProvider, useLanguage } from '@/context/LanguageContext'
import { About } from './About'
import { content } from '@/content'

function Wrapper() {
  const { setLang } = useLanguage()
  return (
    <div>
      <button onClick={() => setLang('ru')}>to-ru</button>
      <About />
    </div>
  )
}

describe('About', () => {
  it('renders the English paragraphs by default', () => {
    render(
      <LanguageProvider>
        <About />
      </LanguageProvider>
    )
    content.en.about.paragraphs.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument()
    })
  })

  it('renders the Russian paragraphs after switching language', () => {
    render(
      <LanguageProvider>
        <Wrapper />
      </LanguageProvider>
    )
    fireEvent.click(screen.getByText('to-ru'))
    content.ru.about.paragraphs.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument()
    })
  })

  it('has id="about" so the sidebar nav link can target it', () => {
    render(
      <LanguageProvider>
        <About />
      </LanguageProvider>
    )
    expect(document.getElementById('about')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- About.test.tsx`
Expected: FAIL — `Cannot find module './About'`.

- [ ] **Step 3: Create `src/components/About.tsx`**

```tsx
'use client'

import { useLanguage } from '@/context/LanguageContext'

export function About() {
  const { t } = useLanguage()

  return (
    <section id="about" aria-label="About me" className="scroll-mt-24">
      <h3 className="font-mono text-accent">{t.about.heading}</h3>
      {t.about.paragraphs.map((paragraph, index) => (
        <p key={index} className="mt-4 text-text-secondary">
          {paragraph}
        </p>
      ))}
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- About.test.tsx`
Expected: PASS — 3/3 tests green.

- [ ] **Step 5: Commit**

```bash
git add src/components/About.tsx src/components/About.test.tsx
git commit -m "feat: add About section"
```

---

## Task 8: Experience Section

**Files:**
- Create: `src/components/Experience.tsx`
- Test: `src/components/Experience.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/Experience.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LanguageProvider } from '@/context/LanguageContext'
import { Experience } from './Experience'
import { content } from '@/content'

describe('Experience', () => {
  it('renders every experience entry title for the active language', () => {
    render(
      <LanguageProvider>
        <Experience />
      </LanguageProvider>
    )
    content.en.experience.entries.forEach((entry) => {
      expect(screen.getByText(`${entry.title} · ${entry.org}`)).toBeInTheDocument()
    })
  })

  it('has id="experience" so the sidebar nav link can target it', () => {
    render(
      <LanguageProvider>
        <Experience />
      </LanguageProvider>
    )
    expect(document.getElementById('experience')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- Experience.test.tsx`
Expected: FAIL — `Cannot find module './Experience'`.

- [ ] **Step 3: Create `src/components/Experience.tsx`**

```tsx
'use client'

import { useLanguage } from '@/context/LanguageContext'

export function Experience() {
  const { t } = useLanguage()

  return (
    <section id="experience" aria-label="Work experience" className="scroll-mt-24">
      <h3 className="font-mono text-accent">{t.experience.heading}</h3>
      <ol className="mt-6 space-y-10">
        {t.experience.entries.map((entry) => (
          <li key={`${entry.org}-${entry.dateRange}`}>
            <p className="font-mono text-xs text-text-secondary">{entry.dateRange}</p>
            <h4 className="mt-1 font-semibold text-text-primary">
              {entry.title} · {entry.org}
            </h4>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-text-secondary">
              {entry.bullets.map((bullet, index) => (
                <li key={index}>{bullet}</li>
              ))}
            </ul>
            <ul className="mt-3 flex flex-wrap gap-2 font-mono text-xs text-text-secondary">
              {entry.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- Experience.test.tsx`
Expected: PASS — 2/2 tests green.

- [ ] **Step 5: Commit**

```bash
git add src/components/Experience.tsx src/components/Experience.test.tsx
git commit -m "feat: add Experience section"
```

---

## Task 9: Projects Section

**Files:**
- Create: `src/components/Projects.tsx`
- Test: `src/components/Projects.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/Projects.test.tsx
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- Projects.test.tsx`
Expected: FAIL — `Cannot find module './Projects'`.

- [ ] **Step 3: Create `src/components/Projects.tsx`**

```tsx
'use client'

import { useLanguage } from '@/context/LanguageContext'

export function Projects() {
  const { t } = useLanguage()

  return (
    <section id="projects" aria-label="Selected projects" className="scroll-mt-24">
      <h3 className="font-mono text-accent">{t.projects.heading}</h3>
      <ul className="mt-6 space-y-10">
        {t.projects.entries.map((project) => (
          <li key={project.title}>
            <h4 className="font-semibold text-text-primary">
              {project.link ? (
                <a href={project.link} target="_blank" rel="noreferrer" className="hover:text-accent">
                  {project.title}
                </a>
              ) : (
                project.title
              )}
            </h4>
            <p className="mt-2 text-text-secondary">{project.description}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-text-secondary">
              {project.bullets.map((bullet, index) => (
                <li key={index}>{bullet}</li>
              ))}
            </ul>
            <ul className="mt-3 flex flex-wrap gap-2 font-mono text-xs text-text-secondary">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- Projects.test.tsx`
Expected: PASS — 4/4 tests green.

- [ ] **Step 5: Commit**

```bash
git add src/components/Projects.tsx src/components/Projects.test.tsx
git commit -m "feat: add Projects section"
```

---

## Task 10: Skills Section

**Files:**
- Create: `src/components/Skills.tsx`
- Test: `src/components/Skills.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/Skills.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LanguageProvider } from '@/context/LanguageContext'
import { Skills } from './Skills'
import { content } from '@/content'

describe('Skills', () => {
  it('renders every skill category title', () => {
    render(
      <LanguageProvider>
        <Skills />
      </LanguageProvider>
    )
    content.en.skills.categories.forEach((category) => {
      expect(screen.getByText(category.title)).toBeInTheDocument()
    })
  })

  it('renders every skill item within the first category', () => {
    render(
      <LanguageProvider>
        <Skills />
      </LanguageProvider>
    )
    content.en.skills.categories[0].items.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument()
    })
  })

  it('has id="skills" so the sidebar nav link can target it', () => {
    render(
      <LanguageProvider>
        <Skills />
      </LanguageProvider>
    )
    expect(document.getElementById('skills')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- Skills.test.tsx`
Expected: FAIL — `Cannot find module './Skills'`.

- [ ] **Step 3: Create `src/components/Skills.tsx`**

```tsx
'use client'

import { useLanguage } from '@/context/LanguageContext'

export function Skills() {
  const { t } = useLanguage()

  return (
    <section id="skills" aria-label="Skills" className="scroll-mt-24">
      <h3 className="font-mono text-accent">{t.skills.heading}</h3>
      <div className="mt-6 grid gap-8 sm:grid-cols-2">
        {t.skills.categories.map((category) => (
          <div key={category.title}>
            <h4 className="font-semibold text-text-primary">{category.title}</h4>
            <ul className="mt-2 flex flex-wrap gap-2 font-mono text-xs text-text-secondary">
              {category.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- Skills.test.tsx`
Expected: PASS — 3/3 tests green.

- [ ] **Step 5: Commit**

```bash
git add src/components/Skills.tsx src/components/Skills.test.tsx
git commit -m "feat: add Skills section"
```

---

## Task 11: Footer Component

**Files:**
- Create: `src/components/Footer.tsx`
- Test: `src/components/Footer.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/Footer.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LanguageProvider } from '@/context/LanguageContext'
import { Footer } from './Footer'
import { content } from '@/content'

describe('Footer', () => {
  it('renders the footer credit text for the active language', () => {
    render(
      <LanguageProvider>
        <Footer />
      </LanguageProvider>
    )
    expect(screen.getByText(content.en.footer)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- Footer.test.tsx`
Expected: FAIL — `Cannot find module './Footer'`.

- [ ] **Step 3: Create `src/components/Footer.tsx`**

```tsx
'use client'

import { useLanguage } from '@/context/LanguageContext'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="mt-20 pb-8 text-sm text-text-secondary">
      <p>{t.footer}</p>
    </footer>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- Footer.test.tsx`
Expected: PASS — 1/1 tests green.

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer.tsx src/components/Footer.test.tsx
git commit -m "feat: add Footer component"
```

---

## Task 12: Assemble the Page & Integration Test

**Files:**
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Test: `src/test/Page.test.tsx`

- [ ] **Step 1: Write the failing integration test**

```tsx
// src/test/Page.test.tsx
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
```

This test already passes using existing components (all sections and the Sidebar were built in prior tasks with matching ids), so it exercises integration rather than driving new production code — run it once to confirm it's green, which proves the pieces wire together correctly.

- [ ] **Step 2: Run test to verify it passes immediately**

Run: `npm test -- Page.test.tsx`
Expected: PASS — 1/1 tests green (confirms nav/id wiring across all components built so far).

- [ ] **Step 3: Create `src/app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import { LanguageProvider } from '@/context/LanguageContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'Artem Bugrov — Systems Analyst',
  description: 'Systems analyst and full-stack builder — portfolio site.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background font-sans text-text-primary">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Create `src/app/page.tsx`**

```tsx
import { Sidebar } from '@/components/Sidebar'
import { About } from '@/components/About'
import { Experience } from '@/components/Experience'
import { Projects } from '@/components/Projects'
import { Skills } from '@/components/Skills'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 space-y-24 p-8 lg:p-12">
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Footer />
      </main>
    </div>
  )
}
```

- [ ] **Step 5: Run the full test suite**

Run: `npm test`
Expected: PASS — all test files green, no errors or warnings.

- [ ] **Step 6: Commit**

```bash
git add src/app/layout.tsx src/app/page.tsx src/test/Page.test.tsx
git commit -m "feat: assemble portfolio page from all sections"
```

---

## Task 13: Local Verification in the Browser

No new automated tests — this task verifies the visual/responsive behavior that automated tests can't meaningfully cover (per project convention: UI changes get verified in a real browser before being called done).

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`
Expected: server starts on `http://localhost:3000`.

- [ ] **Step 2: Open the site in a browser and check the desktop layout**

Verify: sticky sidebar on the left with name/role/tagline/nav/social icons/language toggle; scrolling right column shows About → Experience → Projects → Skills → Footer in the Charcoal + Amber theme; clicking a nav link scrolls to the right section.

- [ ] **Step 3: Toggle RU/EN**

Verify: clicking RU immediately swaps all visible text (sidebar, all sections) to Russian; reloading the page keeps the last-selected language (localStorage persistence).

- [ ] **Step 4: Check the narrow/mobile viewport**

Verify: resize to ~375px width — sidebar stacks above the main content (no horizontal scroll, no overlapping text), nav links still work.

- [ ] **Step 5: Stop the dev server**

No commit for this task (verification only).

---

## Task 14: GitHub Pages Deployment

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm test
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Verify the production build succeeds locally**

Run: `npm run build`
Expected: exits 0, produces a static `out/` directory (proves the static export config from Task 1 is correct before it's exercised in CI).

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "chore: add GitHub Pages deploy workflow"
```

- [ ] **Step 4: Create the GitHub repository and push**

This step requires the user's explicit go-ahead (creating a remote repository and pushing is a visible, hard-to-reverse action). Once approved:

```bash
gh repo create 1st0r1k/portfolio --public --source=. --remote=origin
git push -u origin main
```

- [ ] **Step 5: Enable GitHub Pages "GitHub Actions" source**

In the repository's Settings → Pages, set Source to "GitHub Actions" (one-time manual step in the GitHub UI — the workflow from Step 1 handles every deploy after that).

- [ ] **Step 6: Verify the live site**

Open `https://1st0r1k.github.io/portfolio` after the Action completes and confirm it matches the local dev-server verification from Task 13.

---

## Self-Review Notes

- **Spec coverage:** every section from the spec (Sidebar, About, Experience×4, Projects×3, Skills×4, Footer, RU/EN toggle, GitHub Pages deploy) maps to a task above.
- **Type consistency:** `SiteContent`, `NavItem`, `ExperienceEntry`, `ProjectEntry`, `SkillCategory` are defined once in `src/content/types.ts` (Task 3) and reused as-is by every component and test in later tasks — no renamed fields.
- **No placeholders:** all content, config, and code blocks above are complete and copy-pasteable; nothing marked TBD.
