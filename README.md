# Pokédex — Frontend

React + TypeScript single-page app for browsing the first 150 Pokémon, viewing
their details, and managing favorites. Talks to the NestJS backend over a small
REST API.

## Approach

- **Vite + React 19 + TypeScript** for a fast dev setup.
- **React Query** owns all server state (Pokémon list, details, favorites) with
  caching and optimistic favorite toggles that roll back on error.
- **Zustand** holds light UI state (search text, favorites-only filter).
- **Tailwind v4** for styling.
- The Pokémon list and detail data come from the backend proxy, not PokéAPI
  directly, so the frontend never calls the upstream API.

## Run locally

Requires Node 20+ and the backend running on `http://localhost:3000`.

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`. During dev, `/api` is proxied to the backend
(see `vite.config.ts`), so no extra config is needed. For a deployed build, set
`VITE_API_URL` to the backend URL.

```bash
npm run build     # type-check + production build
npm run preview   # serve the build locally
npm run lint
```

## Features & assumptions

- Scrollable grid of 150 Pokémon with sprite, name, and type badges.
- Click a card to open an accessible modal (Esc / overlay close) showing
  abilities, types, and evolution options.
- Favorite toggle on each card, persisted via the backend and highlighted in the
  list. A favorites-only filter and debounced name search are in the toolbar.
- Loading skeletons, error states with retry, and empty states are handled.
- Assumes a single global favorites list (no auth/users), matching the backend.
