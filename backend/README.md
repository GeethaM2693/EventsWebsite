# Events API

Express 5 + Mongoose (MongoDB Atlas). Read-only for now: events, search, collections, categories, places.

## Setup
1. Create a free cluster on MongoDB Atlas, add a database user, and allow your IP (Network Access).
2. `cp .env.example .env` and paste your connection string into `MONGODB_URI` (keep `/events` as the database name).
3. `npm install`
4. `npm run seed` — loads the sample listings (`npm run seed:reset` wipes and reloads).
5. `npm run dev` — API on http://localhost:5001/api

`APP_TODAY=2026-10-10` in `.env` makes the Today / This Weekend tabs line up with the sample data. Remove it to use the real date.

## Endpoints (all under `/api`)
| Route | Purpose |
|---|---|
| `GET /health` | Server + DB status |
| `GET /events` | List. Params: `tab` (today, tomorrow, weekend, next-week, month) or `from`/`to` (YYYY-MM-DD), `category`, `area`, `price` (free, under-500, 500-1500, above-1500), `goodFor`, `timeOfDay` (morning, afternoon, evening, late-night), `q`, `sort` (recommended, soonest, price-asc, trending), `page`, `limit`. Comma-separate multi-values. |
| `GET /events/:slug` | Detail, plus `similar` |
| `GET /search?q=&type=` | Results with facet counts |
| `GET /search/suggest?q=` | Type-ahead (2+ chars): events, categories, venues |
| `GET /search/popular` | Popular searches |
| `GET /collections`, `GET /collections/:slug?sub=` | Collection pages |
| `GET /categories`, `GET /filters`, `GET /places` | Browse grid, Explore filter options, hidden gems |
| `GET /home` | Every homepage section in one request |
| `GET /saved`, `/saved/ids`, `/saved/recommendations`; `PUT`/`DELETE /saved/events\|places/:slug` | Saved events and places. Requires an `X-Client-Id` header (anonymous per-browser id) |
| `POST /organizer/submissions`, `PUT /organizer/submissions/:id` | "List your event" form: submit for review or save a draft (`draft: true`). 422 returns `error.fields` |
| `GET /admin/submissions`, `PATCH /admin/submissions/:id` | Review queue; approving publishes the event. Needs `ADMIN_API_KEY` + `X-Admin-Key` |

Errors are `{ "error": { "message": "…" } }`.

## Layout
`src/config` env, DB, categories · `src/models` Mongoose schemas · `src/services` query building and response shaping · `src/controllers` · `src/routes` · `src/middleware` · `src/seed` sample data + loader
