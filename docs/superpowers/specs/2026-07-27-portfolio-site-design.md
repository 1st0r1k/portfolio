# Personal Portfolio Site — Design Spec

**Date:** 2026-07-27
**Author:** Artem Bugrov (with Claude)
**Status:** Approved

## Goal

A personal portfolio site for Artem Bugrov (Systems Analyst / full-stack builder), inspired by the
structure and polish of [brittanychiang.com](https://brittanychiang.com), deployed to GitHub Pages
at `1st0r1k.github.io/portfolio`.

## Reference

brittanychiang.com uses a sticky two-column layout: a fixed left sidebar (name, title, tagline,
anchor nav, social icons) next to a scrolling right column of content sections (About, Experience,
Projects, Writing, footer credits). Dark theme, clean sans-serif typography, minimal accent color.
Built with Next.js + Tailwind CSS.

## Content Source

Real content sourced from `Resume_Bugrov_Systems.pdf`. Summary:

- **Name / role:** Artem Bugrov — Systems Analyst · API & data-model design · BPMN / UML · 0-to-1
  product delivery
- **Contact:** bugrov-ay@ist0.ru, GitHub [github.com/1st0r1k](https://github.com/1st0r1k)
- **No photo**, no résumé PDF download link.

## Architecture

- **Framework:** Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Rendering:** Static export (`output: 'export'` in `next.config.mjs`) — no server runtime needed
- **Hosting:** GitHub Pages, project site at `1st0r1k.github.io/portfolio`
  - `basePath: '/portfolio'` and `assetPrefix` configured in `next.config.mjs`
  - Deployed via a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds on push to
    `main` and publishes the `out/` directory using `actions/deploy-pages`
- **i18n (RU/EN):** No Next.js built-in i18n routing (conflicts with static export + basePath).
  Instead:
  - A single content dictionary (`src/content/index.ts`) exporting `en` and `ru` objects with
    identical shape
  - A `LanguageProvider` React context + `useLanguage()` hook that reads/writes the active language
    to `localStorage` (key: `portfolio-lang`), defaulting to `en`
  - Components read strings via `useLanguage()` — no hardcoded copy in JSX

## Page Structure

Two-column layout, sticky left sidebar:

**Sidebar** (`src/components/Sidebar.tsx`)
- Name: "Artem Bugrov"
- Role: "Systems Analyst"
- Tagline (one line, EN/RU)
- Anchor nav: About / Experience / Projects / Skills
- Social icons: GitHub (github.com/1st0r1k), Email (bugrov-ay@ist0.ru)
- Language toggle (RU/EN)

**Main content** (scrolling, right column):

1. **About** (`About.tsx`) — summary paragraph(s) adapted from résumé: 8+ years, systems analyst,
   three self-built production systems, BPMN/UML, SQL, 0-to-1 delivery, hiring/mentoring.
2. **Experience** (`Experience.tsx`) — top 4 roles, most recent first:
   - Acting Director, IT Center — IGSU RANEPA (Oct 2025 – present)
   - Team Lead, Media Production Studio — IGSU RANEPA (Mar 2025 – present)
   - Project Coordinator, "My Finance" — Ministry of Finance of Russia (2024 – 2025)
   - Digital Designer / E-learning Specialist — DIA (2024 – 2025)

   Each entry: date range, title · organization, 2-4 bullet points, tech/skill tags.
3. **Projects** (`Projects.tsx`) — 3 cards:
   - **IGSU CRM** — admissions management system, 2026. Stack: Next.js, TypeScript, Prisma,
     PostgreSQL, NextAuth, Docker. No external link (private repo).
   - **MSB — Messenger Sync Bridge** — 2026, self-hosted. Stack: NestJS, PostgreSQL, Redis, Docker,
     React. Linked to [github.com/1st0r1k/msb](https://github.com/1st0r1k/msb).
   - **CareerAI** — AI job-search assistant. Stack: Python (FastAPI), PostgreSQL + pgvector, Redis,
     Docker Compose. No external link.

   Each card: title, one-line description, bullet highlights, stack tag list, optional GitHub link.
4. **Skills** (`Skills.tsx`) — 4 categories from résumé, replacing brittanychiang.com's "Writing"
   section:
   - Systems analysis
   - Engineering & data
   - Delivery & leadership
   - Systems & domain
5. **Footer** (`Footer.tsx`) — simple credit line (tech used, year).

## Visual Design

Dark "Charcoal + Amber" theme:

| Token | Value | Use |
|---|---|---|
| `background` | `#15130f` | page background |
| `background-alt` | `#1a1712` | card/panel background |
| `text-primary` | `#f2ede4` | headings, primary text |
| `text-secondary` | `#9a8f7f` | secondary text, dates |
| `accent` | `#f5a623` | links, nav highlight, section numbers, hover states |

- Monospace font for nav labels and section numbers (e.g. `01. About`) and stack tags
- Sans-serif (Inter) for body copy
- Fully responsive: sidebar collapses to a top bar / hamburger-free stacked layout on narrow
  viewports (single column, sidebar content moves above main content)

## Data Flow

```
src/content/index.ts (en, ru objects)
        │
        ▼
LanguageProvider (context, wraps app in layout.tsx)
        │
        ▼
useLanguage() hook  →  { lang, setLang, t }  (t = active-language content object)
        │
        ▼
Sidebar / About / Experience / Projects / Skills / Footer consume `t.*`
```

## Testing

Static, content-driven site — TDD applies to the testable logic and rendering behavior, not to
markup-for-its-own-sake:

- **`useLanguage` hook** (unit): defaults to `en`, `setLang('ru')` updates state, persists to
  `localStorage`, reads persisted value back on mount.
- **Section components** (React Testing Library): render with `LanguageProvider`, assert expected
  text appears for `en` and for `ru` after toggling.
- **Nav anchors**: assert each sidebar nav link's `href` matches an existing section `id` in the
  rendered DOM.

Stack: Vitest + React Testing Library + `@testing-library/jest-dom`.

## Out of Scope

- CMS / dynamic content editing
- Blog / writing section (replaced by Skills, per content decision above)
- Résumé PDF download
- Analytics
- Custom domain (using default `1st0r1k.github.io/portfolio` path)
