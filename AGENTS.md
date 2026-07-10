# AGENTS.md

Monorepo for an IoT pest-control system. Only `frontend/` is active; `backend/`, `iot/`, `documentacion/` are stubs (README only).

Work on `desarrollo`; merge to `main` for releases. Remotes: `origin` (primary) and `upstream`.

## Frontend (`frontend/`)

- **Stack:** React 19 + Vite 8 + JSX (no TypeScript). `@types/react` is installed for editor autocomplete only.
- **Routing:** `react-router-dom` v7. Layout uses `NavLink` + `Outlet` sidebar pattern. Routes use Spanish paths (`/dispositivos`, `/mapa`, `/estadisticas`). Some routes are placeholders ("Proximamente").
- **Entrypoint:** `src/main.jsx` → `src/App.jsx`.
- **Styling:** Plain `.css` files (no CSS modules, no Tailwind, no preprocessor).
- **Scaffold name** in `package.json` is still `vite-temp` (Vite template default).

### Commands (run from `frontend/`)

```sh
npm run dev      # dev server (usePolling: true — WSL file-watching workaround)
npm run build    # production build (output: dist/)
npm run preview  # preview production build
npm run lint     # oxlint (not ESLint) — config in oxlintrc.json
```

- **Lint config:** oxlint with `react` and `oxc` plugins; enforces rules-of-hooks and only-export-components.
- No test framework installed yet.
- No formatter config. Match existing style manually.
- No CI/CD or pre-commit hooks.
