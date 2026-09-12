# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands
- `npm run dev` - Start development server on localhost:8080
- `npm run build` - Production build: regenerates the sitemap, builds the client bundle, builds an SSR bundle, prerenders every route to static HTML in `dist/` (`scripts/prerender.js`), then runs `scripts/verify-prerender.js`, which fails the build if any sampled page lacks its own `<title>`, canonical, description, JSON-LD or `<h1>`
- `npm run build:spa` - Client-only build without prerendering (debugging only; never deploy this)
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

### Development Workflow
The project uses Vite for fast development with hot module replacement. The dev server runs on port 8080 by default.

## Project Architecture

### Overview
This is a Progressive Web App (PWA) that helps users check the halal status of food additives (E-codes). Built with React, TypeScript, and Vite, it features offline support and can be installed as a mobile app.

### Tech Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite with SWC
- **Styling**: Tailwind CSS with custom theme
- **UI Components**: shadcn/ui component library
- **State Management**: React Query (TanStack Query) for data fetching
- **Routing**: React Router v6

### Key Architecture Patterns

#### Data Management
The E-code database is embedded in `src/services/eCodeService.ts` as a static JSON structure. Each E-code has:
- code (e.g., "E100")
- name (chemical name)
- description
- status ('halal' or 'doubtful')
- optional source category

Search functionality supports multi-term queries (comma-separated) and filters by halal status.

#### Component Structure
- **UI Components**: Located in `src/components/ui/` using shadcn/ui pattern
- **Page Components**: In `src/pages/` for routing
- **Feature Components**: In `src/components/` for specific features
- **Hooks**: Custom hooks in `src/hooks/` for shared logic

#### Routing
- `/` - Homepage with search and E-code grid
- `/ecode/:code` - Individual E-code detail page
- Query parameters: `?q=` for search, `?filter=` for status filtering

#### Rendering & SEO (important)
- Every route is prerendered at build time. `src/entry-server.tsx` renders `AppShell` (from `src/App.tsx`) with `StaticRouter`; `src/main.tsx` hydrates in the browser and falls back to a fresh render in app modes (PWA/TWA/native).
- Components must be SSR-safe: no `window`/`document`/`localStorage` access during render or in `useState` initialisers (use effects). Render output must be deterministic (no `new Date()` in JSX).
- `react-helmet-async` owns all per-page head tags. `index.html` must not contain a `<title>`, description, canonical or robots tag. Do not add a custom `manualChunks` function to `vite.config.ts`: under Rolldown it duplicated React and silently broke Helmet in production (Aug 2026).
- Vercel serves the static files with `cleanUrls` + `trailingSlash: false`; unknown URLs get a real 404 from `dist/404.html`. E-code URL variants (`/e622`, `/ecode/E622`) are 301-redirected in `vercel.json`.
- SEO copy rules live in `src/utils/seoHelpers.tsx` (title/H1 lead with the common name when short, meta = verdict + reason + foods, `getHalalReason` from curated `halalNotes` or origin). Bump `SITE_LAST_REVIEWED` when data is reviewed.

#### PWA Implementation
- Service worker at `public/sw.js` handles caching
- Web manifest at `public/manifest.json` for app installation
- Custom install prompt component for better UX

### Important Notes
- Path alias `@` maps to `/src` directory
- The project integrates with Lovable platform for deployment
- No formal testing framework is currently set up; `scripts/verify-prerender.js` is the build-time SEO guard
- TypeScript is configured with relaxed type checking (no strict null checks)