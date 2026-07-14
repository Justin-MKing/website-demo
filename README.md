# J KING — ML/AI Data Operations Portfolio

Justin Michael King's portfolio site, built as a React + TypeScript single-page app and skinned as a retro Mac OS "Platinum" desktop: a checkerboard desktop background, a persistent menu bar, and draggable windows that hold the actual portfolio content.

## Tech Stack

- **React 19** (`react`, `react-dom`) with `StrictMode`
- **TypeScript** (`~6.0`), project-referenced build via `tsc -b`
- **Vite 8** as the dev server and bundler (`@vitejs/plugin-react`)
- **Framer Motion** for animation
- **Icons come from three sources**: `lucide-react` (just the `Mail` icon in the Contact window), the pre-existing hand-rolled `GithubIcon`/`LinkedinIcon` SVGs in `src/components/icons.tsx`, and a small set of new hand-drawn pixel icons (`PixelIcon`) in `src/components/retro/icons.tsx` used by the Skills/Projects/Trash icon grids
- **CSS Modules** (`*.module.css`) for component-scoped styling; retro theme variables (colors, checkerboard desktop background) live in `src/index.css`
- **oxlint** for linting

There is no separate CSS or JS framework beyond this — no Tailwind, no state management library. The app's entire content model is a single typed object exported from `src/data/content.ts`.

## Local Development

```bash
npm install       # install dependencies
npm run dev        # start the Vite dev server with HMR
npm run build       # type-check (tsc -b) and produce a production bundle in dist/
npm run preview     # serve the built dist/ bundle locally
npm run lint        # run oxlint
```

Building the project is required before it can be deployed — this is a compiled Vite app, not a set of static files you can open directly in a browser.

## The Retro Desktop UI

The whole site is one component tree rooted at `src/components/retro/Desktop.tsx`, which renders:

- **`MenuBar`** — a fixed top bar styled after the classic Mac OS menu bar, with an Apple-menu glyph, decorative `File`/`Edit`/`View` labels, and real navigation buttons (`Home`, `About`, `Skills`, `Experience`, `Projects`) that bring the matching window to the front and scroll it into view.
- **Draggable windows** (`Window.tsx`, driven by the `useDraggable` hook in `src/hooks/useDraggable.ts`) — each window has a Mac-style title bar with a close box and zoom box, and can be dragged around the desktop via pointer events. The windows are:
  - **`AboutMacWindow`** — styled as the classic "About This Macintosh" dialog, showing the hero heading/tagline plus animated `MemoryBar` stat bars (e.g. models deployed, pipelines built, data processed).
  - **`AboutTextWindow`** — a Get-Info-style text window with the longer "about me" description.
  - **`SkillsIconWindow`** — an icon-grid window listing skill categories and items.
  - **`ProcessListWindow`** — a Mac "Process List"-style table repurposed to show work experience entries.
  - **`ProjectsIconWindow`** — an icon-grid window listing featured projects with links.
  - **`ContactWindow`** — a small closeable window with GitHub/LinkedIn/email links, opened from the Trash-style desktop icon (`TrashContactIcon`) rather than the menu bar.
- **`KernelViewWidget`** — a decorative, always-on activity-monitor-style bar chart that animates randomly (disabled when the user prefers reduced motion) to sell the retro-OS feel.

All copy — hero text, stats, skills, experience entries, and projects — is defined once in `src/data/content.ts` (typed as `SiteContent`) and consumed by the window components above; updating the site's content means editing that file, not the components.

## Deployment

The site deploys to GitHub Pages via GitHub Actions (`.github/workflows/static.yml`): on every push to `main`, the workflow installs dependencies with `npm ci`, runs `npm run build`, and uploads `dist/` as the Pages artifact. It's served under the custom domain configured in `public/CNAME` (`justinkingdev.com`).

## Contact

- **Email**: justinking90@gmail.com
- **GitHub**: [@Justin-MKing](https://github.com/Justin-MKing)
- **LinkedIn**: [@justin-mking](https://linkedin.com/in/justin-mking)

## License

This project is open source and available under the [MIT License](LICENSE).
