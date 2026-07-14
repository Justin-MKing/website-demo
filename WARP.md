# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is Justin Michael King's portfolio site: a React + TypeScript single-page app built with Vite, skinned as a retro Mac OS "Platinum" desktop. The visible UI is a checkerboard desktop background, a fixed menu bar, and a set of draggable windows that display the portfolio content (About, Skills, Experience, Projects, Contact). This is a compiled app, not a static HTML/CSS/JS site — `npm run build` is required before deployment.

## Architecture

### Application shell

- `src/main.tsx` — React entry point, mounts `<App />` in `StrictMode` and imports the global theme styles (`src/index.css`, which defines the Mac Platinum color variables and the checkerboard desktop background).
- `src/App.tsx` — renders a single component, `Desktop`.
- `src/components/retro/Desktop.tsx` — the actual page. It owns two pieces of state: the z-order of the windows (`order`, an array of `WindowId`) and whether the Contact window is open. Its `handleNavigate` function brings the target window to the front and scrolls it into view via `document.getElementById('window-<id>').scrollIntoView(...)` — this is passed down to `MenuBar` as the `onNavigate` prop. It renders the `MenuBar`, all five always-present windows, the decorative `KernelViewWidget`, and the `TrashContactIcon` (which conditionally mounts `ContactWindow`).

### Component structure (`src/components/retro/`)

- **`MenuBar.tsx`** — fixed top bar with the Apple-menu glyph, decorative `File`/`Edit`/`View` labels, and navigation buttons for each window (`Home`, `About`, `Skills`, `Experience`, `Projects`). Each button calls the `onNavigate` prop it's given; `MenuBar` itself doesn't touch the DOM.
- **`Window.tsx`** — shared window chrome: a title bar (close box, title text, zoom box) and a body. Dragging is implemented with pointer events wired to the `useDraggable` hook; position is applied via a CSS `transform: translate(x, y)`. Windows can optionally be closeable (`isCloseable` + `onClose`), used by `ContactWindow`.
- **`types.ts`** — defines `WindowId`, the union of window identifiers (`'about-mac' | 'about-text' | 'skills' | 'process-list' | 'projects' | 'contact'`) used for z-order tracking and navigation.
- **`AboutMacWindow.tsx`** — styled as the classic "About This Macintosh" dialog: hero heading/subtitle/tagline plus a set of `MemoryBar` components rendering animated stat bars from `content.about.stats`.
- **`MemoryBar.tsx`** — an individual animated bar/stat used inside `AboutMacWindow`.
- **`AboutTextWindow.tsx`** — a Get-Info-style plain text window with the longer about-me description.
- **`SkillsIconWindow.tsx`** — icon-grid window rendering `content.skills` (categories and their items).
- **`ProcessListWindow.tsx`** — a Mac "Process List"-style table repurposed to display `content.experience` entries (company, role, date range, bullets).
- **`ProjectsIconWindow.tsx`** — icon-grid window rendering `content.projects` (title, description, tech tags, links).
- **`KernelViewWidget.tsx`** — a decorative, non-interactive (`aria-hidden`) activity-monitor-style bar chart that randomizes its bars on an interval; disabled via `useReducedMotion` when the user prefers reduced motion.
- **`TrashContactIcon.tsx`** — a desktop icon styled like the Trash, which opens the `ContactWindow` on click (contact is intentionally not in the menu bar's nav list).
- **`ContactWindow.tsx`** — a small closeable window with GitHub/LinkedIn/email links, rendered only when the Trash icon has been clicked.
- **`icons.tsx`** — hand-drawn `PixelIcon` primitives (`document` / `app` / `trash` variants) used by the icon-grid windows (`SkillsIconWindow`, `ProjectsIconWindow`) and `TrashContactIcon`.

There are three separate icon sources in the codebase, not one — worth calling out since it's easy to conflate them:

1. **`src/components/retro/icons.tsx`** — the new `PixelIcon` set described above, added for the retro reskin.
2. **`src/components/icons.tsx`** — a pre-existing file (from before the retro reskin) exporting hand-rolled inline-SVG `GithubIcon`/`LinkedinIcon` components. `ContactWindow.tsx` imports these directly (`import { GithubIcon, LinkedinIcon } from '../icons'`) for its GitHub/LinkedIn links.
3. **`lucide-react`** (npm package) — used directly for exactly one icon, `Mail`, in `ContactWindow.tsx` (`import { Mail } from 'lucide-react'`).

Each component pairs with a `*.module.css` file (CSS Modules) for scoped styling.

### Hooks (`src/hooks/`)

- **`useDraggable.ts`** — given an initial `{ x, y }` position, returns `{ position, onPointerDown, onPointerMove, onPointerUp }`. On pointer down it captures the pointer and records the drag origin; on pointer move it updates `position` by the pointer delta; on pointer up it releases the pointer capture. `Window.tsx` wires these handlers to its title bar.
- **`useReducedMotion.ts`** — reports the user's `prefers-reduced-motion` setting so decorative animation (e.g. `KernelViewWidget`) can be skipped.

### Content model

All copy — hero text, about description, skill categories, experience entries, projects, and footer/social links — lives in one typed object in `src/data/content.ts` (`content: SiteContent`). Every window component imports from this file rather than hardcoding text. To update site content, edit `src/data/content.ts`; no component changes are needed for text/data changes.

## Development Commands

```bash
npm install         # install dependencies
npm run dev          # start Vite dev server with HMR
npm run build         # tsc -b (type-check) && vite build -> dist/
npm run preview        # serve the built dist/ bundle locally
npm run lint          # run oxlint
```

There is no vanilla-JS/no-build-step mode for this repo — `npm run build` (which runs a TypeScript project build via `tsc -b` before `vite build`) must succeed to produce a deployable `dist/` output.

## Build and Deployment

Deployment is automated via GitHub Actions, defined in `.github/workflows/static.yml`:

1. Triggered on every push to `main` (or manually via `workflow_dispatch`).
2. The `build` job checks out the repo, sets up Node 20, runs `npm ci`, then `npm run build`.
3. `dist/` is uploaded as a GitHub Pages artifact (`actions/upload-pages-artifact`).
4. The `deploy` job publishes that artifact to GitHub Pages (`actions/deploy-pages`).

The site is served under a custom domain: `public/CNAME` contains `justinkingdev.com`, which Vite copies into `dist/` at build time so GitHub Pages serves the custom domain instead of the default `github.io` URL.

## Code Patterns and Conventions

- **CSS Modules per component**: styling is scoped via `ComponentName.module.css` imported as `styles` and referenced as `styles.someClass`. Shared theme variables (Platinum grays, highlight/shadow colors, the checkerboard desktop background) are defined globally in `src/index.css`.
- **Typed content, not hardcoded strings**: window components read from `src/data/content.ts`'s `content` object and its exported interfaces (`SiteContent`, `Stat`, `SkillCategory`, `ExperienceEntry`, `Project`) rather than embedding copy directly.
- **Pointer events for dragging**: window dragging uses the Pointer Events API (`onPointerDown`/`onPointerMove`/`onPointerUp` with `setPointerCapture`/`releasePointerCapture`) rather than mouse events, so it works consistently across mouse, touch, and pen input.
- **Z-order via array position**: `Desktop.tsx` tracks window stacking order as an array of `WindowId`; bringing a window to front moves its id to the end of the array, and `zIndex` is derived from each id's index.
- **Reduced-motion awareness**: any purely decorative animation (currently `KernelViewWidget`) checks `useReducedMotion` before animating.

## Key Dependencies

- **react** / **react-dom** (v19)
- **framer-motion** — animation
- **lucide-react** — used for a single icon, `Mail`, in `ContactWindow` (GitHub/LinkedIn icons there come from the pre-existing hand-rolled `src/components/icons.tsx`, not this package)
- **typescript**, **vite**, **@vitejs/plugin-react** — build tooling
- **oxlint** — linting

## Notes for Future Work

- Window positions are hardcoded per-component (`initialPosition` passed to `Window`); there's no persistence of user-dragged positions across reloads.
- `KernelViewWidget` is purely decorative (`aria-hidden="true"`) and does not reflect real data.
- The Contact window is reachable only via the Trash icon, not the menu bar — keep this in mind if adding new navigation entry points.
