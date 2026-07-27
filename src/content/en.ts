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
    readMoreLabel: 'Read case study',
    backLabel: '← Back to projects',
    problemLabel: 'Problem',
    approachLabel: 'Approach',
    resultsLabel: 'Results',
    architectureLabel: 'Architecture',
    processLabel: 'Process',
    entries: [
      {
        slug: 'igsu-crm',
        title: 'IGSU CRM',
        description:
          "Full-stack admissions CRM designed and built from scratch after evaluating off-the-shelf tools and finding none fit the institute's process.",
        problem:
          "The institute's admissions process didn't fit any off-the-shelf CRM: it needed contract tracking, funnel analytics, and a flexible database builder with role-based access — after evaluating several commercial tools, none covered all three without heavy customization.",
        approach:
          'Designed the data model and system architecture from scratch on Next.js (App Router), TypeScript, Prisma and PostgreSQL, with NextAuth for role-based access. Built two-way integrations with Bitrix24 CRM and Google Sheets (OAuth, streaming CSV import for 50,000+ rows without memory overflow), and moved reporting aggregation from the application layer into SQL (GROUP BY), cutting report generation time by roughly 30x. Shipped with CI running 900+ automated tests, Docker-based deployment and automated backups.',
        bullets: [
          'Designed the data model and architecture for contract tracking, admissions-funnel analytics and a custom database builder with role-based access control.',
          'Built two-way integrations with Bitrix24 CRM and Google Sheets — OAuth, streaming CSV import for 50,000+ rows.',
          'Redesigned reporting aggregation to run in SQL instead of the application layer — roughly a 30x speed-up.',
          'Set up CI with 900+ automated tests, Docker deployment and automated backups.',
        ],
        tags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'NextAuth', 'Docker'],
      },
      {
        slug: 'msb',
        title: 'MSB — Messenger Sync Bridge',
        description:
          'Real-time message-sync service between Telegram, VK and Max for media companies running parallel social channels.',
        problem:
          'Media companies running parallel channels on Telegram, VK and Max needed messages synced across platforms in real time — with no existing tool handling three-way bidirectional sync, filtering and role-based access together.',
        approach:
          "Built bidirectional \"bridges\" between channels across platforms on NestJS, PostgreSQL and Redis Streams-based queues, with adapters normalizing each platform's API into a single internal message model. Implemented a VK OAuth integration using the implicit token flow to work around VK's restrictions on third-party publishing. Deployed via Docker Compose with encrypted bot-token storage (AES-256-GCM) and CI/CD.",
        bullets: [
          'Designed bidirectional "bridges" between channels across platforms, including message filtering, role-based access and Redis Streams-based queues.',
          'Built adapters for the Telegram, VK and Max APIs, normalizing messages into a single internal data model.',
          'Built an OAuth integration with VK (implicit token flow) to publish media to a group wall.',
          'Set up production deployment: Docker Compose, encrypted bot-token storage (AES-256-GCM), CI/CD.',
        ],
        tags: ['NestJS', 'PostgreSQL', 'Redis', 'Docker', 'React'],
      },
      {
        slug: 'careerai',
        title: 'CareerAI',
        description:
          'AI job-search assistant (Telegram bot + web app) aggregating listings from 5+ sources and matching them to resumes via embeddings and an LLM.',
        problem:
          'Job seekers have to manually check listings across many separate sites and guess which postings actually match their resume.',
        approach:
          "Built a Telegram bot and web app that aggregate listings from 5+ sources into a single pipeline, then match them to a user's resume using vector embeddings and an LLM, ranking relevance instead of just keyword-matching.",
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
