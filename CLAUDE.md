# Events website

City events discovery site (launching in Hyderabad). `[Brand]` is a placeholder name; listings are sample data, not verified events.

## Layout
- `design/` — handoff spec (read `design/README.md`). Source of truth for layout, copy and behavior. Do not edit.
- `frontend/` — React (plain JS) + Vite + React Router + Tailwind v4 + lucide-react. Dev: `npm run dev` → http://127.0.0.1:5173 (Vite proxies `/api` → the backend)
- `backend/` — Node + Express 5 + Mongoose on MongoDB Atlas. Dev: `npm run dev` → http://localhost:5001/api (not 5000: macOS AirPlay uses it)

## Frontend conventions
- Feature-based: `components/{ui,layout,events}` for shared pieces, `features/<screen>` for screen-specific parts, `pages/` stay thin, `lib/api.js` is the API client, `hooks/useFetch.js` loads data, `context/SavedContext.jsx` owns saved-heart state. `data/` is only static option lists (no mock events; "Discover near you" is the one sample list left).
- Design tokens live in `src/styles/index.css` (`@theme`). Use Tailwind classes (`bg-primary`, `text-muted`, `border-line`, `rounded-card`); no inline styles.
- Reuse before creating: `Section`, `EventSection`, `EventCard*`, `Chip`, `UnderlineTabs`, `PhotoPlaceholder`, `MapSketch`, `FormField`.
- Photos are `PhotoPlaceholder` until real images exist. Keep the sample-data banner until real data is wired in.
- Min touch target 44px; keep the `focus-visible` ring.

## Backend conventions
- `routes → controllers → services → models`. Responses: `{ data, meta? }`; errors: `{ error: { message } }`.
- Seed data in `src/seed/data/*.json`; `npm run seed` is idempotent.
- Config comes from `backend/.env` (see `.env.example`). `ADMIN_API_KEY` enables `/api/admin/*`.
- Saved events are keyed by an anonymous `X-Client-Id` (localStorage) until accounts exist. Organizer submissions go to a review queue; approving one creates the Event.

## Allowed (no need to ask)
- Read any file in the repo, including `design/`.
- Create and edit files under `frontend/src`, `backend/src`, and the READMEs / this file.
- `npm install <pkg>` in `frontend/` or `backend/` when a feature needs it.
- `npm run dev | build | lint | seed` and `curl` against `localhost`.
- Headless-browser screenshots and throwaway scripts, kept in the scratchpad directory.
- Read-only git commands (`git status`, `git diff`, `git log`).

## Deny (never, unless explicitly asked)
- Print, log, quote or commit secrets: `backend/.env`, `backend/atlas-credentials.env`, connection strings or passwords. Mask them in any output.
- Edit or delete anything in `design/`.
- `npm run seed:reset`, dropping collections, or other destructive database operations.
- `git commit`, `git push`, force-push, `git reset --hard`, or any publishing/deploy.
- `rm -rf` outside build output (`dist/`, `node_modules/`), or touching files outside this project.
- Installing system software (brew, global npm) or changing machine settings.
- Leaving test data behind in Atlas: clean up any events, submissions or saved items created while testing.

## Note on enforcement
This file is guidance, not a lock. To have Claude Code actually block or auto-approve commands, put matching rules in `.claude/settings.json` under `permissions.allow` / `permissions.deny`.
