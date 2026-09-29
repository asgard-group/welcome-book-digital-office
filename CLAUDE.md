# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Mobile-first PWA that serves as a digital "welcome booklet" for short-stay apartments, branded "Jöro Office". Multi-property: each building is served from its own sub-URL (e.g. `/lamartine`). Bilingual FR/EN. Generated with [Lovable](https://lovable.dev) — Vite + React 18 + TypeScript + Tailwind + shadcn/ui.

## Commands

npm scripts are canonical (both `bun.lockb` and `package-lock.json` are checked in; the repo currently tracks `package-lock.json`).

- `netlify dev` — **preferred local dev.** Runs the app *and* the serverless function on one origin, so `/api/building` works. Requires the Netlify CLI.
- `npm run dev` — Vite-only dev server on **port 8080**, host `::`. No `/api/*`; `useProperty` falls back to a dev sample building so UI work still renders regardless of slug.
- `npm run build` — production build; `npm run build:dev` builds in development mode
- `npm run lint` — ESLint (flat config, `eslint.config.js`)
- `npm run test` — Vitest run once; `npm run test:watch` for watch mode
- `npx vitest run src/test/example.test.ts` — run a single test file; add `-t "name"` to filter by test name
- `npm run preview` — serve the production build

## Architecture

**Entry & providers.** `src/main.tsx` → `src/App.tsx`. Provider nesting order (outer→inner): `QueryClientProvider` → `ThemeProvider` → `LanguageProvider` → `TooltipProvider` → toasters → `BrowserRouter`.

**Multi-property routing.** Every building lives under its own sub-URL, `/:buildingSlug/*` (e.g. `/lamartine/home`), defined once in `src/App.tsx`. The bare `/` redirects to `DEFAULT_BUILDING_SLUG` (from `src/property/useProperty.ts`). `/:buildingSlug` renders `BuildingGate` (`src/components/BuildingGate.tsx`), which loads that building's data and gates its children (`Outlet`) on it; each concrete page is a route nested under it (`home`, `checkin`, `checkout`, `facilities`, `services`, `explore`, `info`). The index route is `OnboardingGate` (in `App.tsx`): if `localStorage["joro_onboarded_<slug>"] === "1"` it redirects to `<slug>/home`, otherwise it shows `Onboarding` (which sets that flag — scoped per building — on "start"). Internal links/navigation must stay slug-aware (read `buildingSlug` via `useParams()` and build `` `/${buildingSlug}/...` `` paths) rather than hardcoding absolute paths.

**Building data.** No accounts, no login, no access grants — each building's booklet is a fixed, public URL. `GET /api/building?slug=<id>` (`netlify/functions/building.ts`) looks up that id in `netlify/functions/_data/buildings.json` (private; **never** put it back in `public/`) and returns it, or 404 `building_not_found` if the slug is unknown. `useProperty()` (`src/property/useProperty.ts`) reads `buildingSlug` from the route itself via `useParams()` — callers just call `useProperty()`, no slug plumbing needed — and fetches/caches it with React Query (key `["building", buildingSlug]`). `BuildingGate` shows a splash while loading, `BuildingNotFound` on an unknown slug, `LoadError` on any other failure, and applies the building's brand colors (see below) once loaded.

**Per-building brand colors.** `PropertyData.colors` (hex strings) are converted to `H S% L%` via `hexToHslString()` (`src/lib/color.ts`) and written onto `--brand-ink`/`--brand-surface` (`document.documentElement.style`) by `BuildingGate` once that building's data loads. The `:root` values in `src/index.css` are just the fallback shown before that happens (currently Lamartine's own colors, so there's no flash for the default building). Tailwind consumes them via the `<alpha-value>` pattern in `tailwind.config.ts` (`brand-ink`, `brand-surface`), so `bg-brand-ink/30`-style opacity modifiers work natively. Only three colors exist app-wide: `brand-ink`, `brand-surface`, and `white`.

**Per-building images.** `backgroundUrl`/`logoUrl` in a building's data are plain paths served from `public/buildings/<slug>/` (not bundler imports — they have to be resolvable by URL at runtime, since the building isn't known at build time). Pages fall back to `DEFAULT_BACKGROUND_URL`/`DEFAULT_LOGO_URL` (`src/property/useProperty.ts`) while `property` is still loading.

**Adding a building.** Add an entry to `buildings.json` (id = its slug), drop its hero photo/logo under `public/buildings/<slug>/`, and it's immediately live at `/<slug>` — no code changes needed.

**i18n (custom, not i18next).** `useLanguage()` from `src/i18n/LanguageContext.tsx` returns `{ lang, setLang, t }`. Strings live in `src/i18n/locales/{en,fr}.yaml`, parsed at import time by `src/i18n/translations.ts` (`import ... from "./locales/en.yaml?raw"` + `yaml`'s `parse`); access via `t.section.key`. Language persists to `localStorage["lang"]` and falls back to `navigator.language`.

**Theme (custom, not next-themes).** `useTheme()` from `src/theme/ThemeContext.tsx` toggles the `.dark` class on `<html>` and persists to `localStorage["theme"]`. `next-themes` is a dependency (one shadcn component, `sonner.tsx`, imports it internally) but the app's **own** theming does not use it.

**Styling.** Tailwind with HSL CSS-variable design tokens defined in `src/index.css` (`:root` for light, `.dark` for dark). shadcn/ui components live in `src/components/ui/`. Use the `cn()` helper (`src/lib/utils.ts`) to compose classes. Path alias `@` → `src/` is configured in `vite.config.ts`, `vitest.config.ts`, and `tsconfig.json`. `.h-app-shell` (in `src/index.css`) is the standard full-height page wrapper — `height: 100vh` then `100dvh`, so it degrades on old browsers/iOS without `dvh` support instead of the two rules fighting each other.

**PWA.** `vite-plugin-pwa` (autoUpdate). Registration logic in `src/lib/registerSW.ts` deliberately **skips** the service worker in non-production builds, inside iframes, on Lovable preview/dev hostnames, and when `?sw=off` is present — and unregisters stale SWs in those cases. Expect no SW during local `dev`. A `NetworkFirst` runtime rule (in `vite.config.ts`) caches `GET /api/building` so wifi/entry codes stay available **offline** after the first online load per building.

**Hosting (Netlify).** `netlify.toml` sets `publish = dist`, `functions = netlify/functions`, redirects `/api/*` → functions, and adds the SPA fallback (`/*` → `/index.html`) so deep links like `/lamartine/checkin` survive a hard refresh.

**Layout.** Single-column, mobile-first, capped at `max-w-[760px]`. Every page implements its own full-bleed layout (hero background + `h-app-shell`); there's no shared page chrome/tab bar.

## Conventions & gotchas

- **Loose TypeScript.** `strictNullChecks`, `noImplicitAny`, `noUnusedLocals`/`noUnusedParameters` are all off, and `@typescript-eslint/no-unused-vars` is disabled — don't rely on strict null/unused checking to catch mistakes. Periodically re-check with `npx tsc --noEmit --noUnusedLocals --noUnusedParameters -p tsconfig.app.json` if hunting for dead code.
- **Lovable project.** `lovable-tagger`'s `componentTagger` runs in dev mode only; `.lovable/plan.md` holds project plan state. Images under `src/assets/` have companion `*.asset.json` sidecar files (Lovable asset metadata) — keep them alongside their image. Per-building images under `public/buildings/` are a separate, unrelated concept (see above) and don't get sidecar files.
