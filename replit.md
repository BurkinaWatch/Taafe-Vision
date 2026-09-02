# Taafé Vision

The official website for Taafé Vision, a Burkinabè association using cinema to promote women's rights, support women filmmakers, and engage communities.

## Run & Operate

- `pnpm install --frozen-lockfile` — install the workspace dependencies
- `PORT=20053 BASE_PATH=/ pnpm --filter @workspace/taafe-vision run dev` — run the frontend
- `PORT=8080 pnpm --filter @workspace/api-server run dev` — run the API server
- `PORT=20053 BASE_PATH=/ pnpm --filter @workspace/taafe-vision run build` — build the frontend
- `pnpm run typecheck` — full typecheck across all packages

The Replit workflows are `Taafe Vision` (frontend) and `API Server` (backend). The frontend proxies `/api` requests to the API on port 8080 during development.

Required environment:

- `RAILWAY_DATABASE_URL` or `DATABASE_URL` — PostgreSQL connection string
- `ADMIN_USERNAME` — administrator login username
- `ADMIN_PASSWORD` — administrator login password
- `SESSION_SECRET` — persistent session signing secret

## Stack

- pnpm workspaces, Node.js 20, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Frontend: React + Vite + Tailwind CSS
- Validation: Zod
- Build: Vite and esbuild

## Where things live

- `artifacts/taafe-vision/src` — frontend pages, components, hooks, and API client
- `artifacts/api-server/src` — Express API routes, storage, and database initialization
- `lib/db/src/schema` — database schema
- `lib/api-spec/openapi.yaml` — shared API contract

## Architecture decisions

- Keep the imported pnpm workspace and React/Vite/Express/PostgreSQL stack unchanged.
- Run the frontend and API as separate Replit workflows.
- Proxy `/api` from Vite to the API workflow in development so browser requests stay same-origin.

## Product

The public site presents Taafé Vision's films, projects, news, partners, training activities, organization information, and contact form. An authenticated admin area manages the site's content.

## User preferences

No project-specific preferences recorded.

## Gotchas

- The Vite config requires both `PORT` and `BASE_PATH` for direct commands.
- The API requires a PostgreSQL connection and `ADMIN_PASSWORD`; do not replace missing values with mock data.

## Pointers
- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
