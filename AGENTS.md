# AGENTS.md

Monorepo for an IoT pest-control system. Only `frontend/` is active; `backend/`, `iot/`, `documentacion/` are stubs (README only).

Work on `desarrollo`; merge to `main` for releases.

## Frontend (`frontend/`)

- **Stack:** React 19 + Vite 8 + JSX (no TypeScript). `@types/react` is installed for editor autocomplete only.
- **Entrypoint:** `src/main.jsx` → `src/App.jsx`.
- **Scaffold name** in `package.json` is still `vite-temp` (Vite template default).

### Commands (run from `frontend/`)

```sh
npm run dev      # dev server (usePolling: true — WSL workaround)
npm run build    # production build
npm run preview  # preview production build
npm run lint     # oxlint (not ESLint) — config in oxlintrc.json
```

- No test framework installed yet.
- No formatter config. Match existing style manually.
- No CI/CD or pre-commit hooks.
