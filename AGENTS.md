# AGENTS.md

Monorepo for an IoT pest-control system. Only `frontend/` is active; `backend/`, `iot/`, `documentacion/` are stubs (README only).

Work on `desarrollo`; merge to `main` for releases. Remotes: `origin` (primary) and `upstream`.

## Frontend (`frontend/`)

- **Stack:** React 19 + Vite 8 + JSX (no TypeScript). `@types/react` is installed for editor autocomplete only.
- **Routing:** `react-router-dom` v7. Layout uses `NavLink` + `Outlet` sidebar pattern. All route paths are Spanish.
- **Entrypoint:** `src/main.jsx` → `src/App.jsx`.
- **Styling:** Plain co-located `.css` files (e.g. `Devices.jsx` + `Devices.css`). No CSS modules, no Tailwind, no preprocessor. Dark-mode variables exist in `index.css` but component styles are light-themed.
- **Brand:** "ULSPests Control — Monitoreo de Plagas" (sidebar and login).
- **State:** Entirely mock/hardcoded data. No backend API connected yet.

### Route structure (`src/App.jsx`)

| Path | Component | Status |
|---|---|---|
| `/login` | `Login` | Implemented (outside Layout, no sidebar) |
| `/` | `Placeholder("Inicio")` | Stub |
| `/mapa` | `Placeholder("Mapa")` | Stub |
| `/dispositivos` | `Devices` | Implemented (empty list) |
| `/dispositivos/:id` | `DeviceDetail` | Implemented (hardcoded detail) |
| `/estadisticas` | `Statistics` | Implemented (mock bar chart) |

### Commands (run from `frontend/`)

```sh
npm run dev      # dev server (usePolling: true — WSL file-watching workaround)
npm run build    # production build (output: dist/)
npm run preview  # preview production build
npm run lint     # oxlint (not ESLint) — config in oxlintrc.json
```

- **Lint:** oxlint with `react` and `oxc` plugins; enforces rules-of-hooks and only-export-components.
- No test framework, formatter, CI/CD, or pre-commit hooks.
