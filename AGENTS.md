# AGENTS.md

Monorepo for an IoT pest-control system (rodent traps on university campuses in La Serena/Ovalle, Chile). Three active subdirectories: `frontend/`, `backend/`, `iot/`. `documentacion/` is a stub.

## Branching

Work on `desarrollo`; merge member branches (`frontend`, `Backend-Data-Base`, `iot-01`) into it. `main` is for releases. Remotes: `origin` (primary) and `upstream`.

## Frontend (`frontend/`)

- **Stack:** React 19 + Vite 8 + JSX (no TypeScript). `@types/react` is for editor autocomplete only.
- **Routing:** `react-router-dom` v7. Layout uses `NavLink` + `Outlet` sidebar pattern. All route paths are Spanish.
- **Entrypoint:** `src/main.jsx` → `src/App.jsx`.
- **Styling:** Plain co-located `.css` files. No CSS modules, no Tailwind, no preprocessor.
- **State:** Entirely mock/hardcoded data. No backend API connected yet.
- **Lint:** oxlint (not ESLint) with `react` and `oxc` plugins — config in `oxlintrc.json`.

### Commands (run from `frontend/`)

```sh
npm run dev      # dev server (usePolling: true — WSL file-watching workaround)
npm run build    # production build (output: dist/)
npm run preview  # preview production build
npm run lint     # oxlint
```

No test framework, formatter, CI/CD, or pre-commit hooks.

## Backend (`backend/`)

FastAPI app with Supabase integration. **Not a stub** — has working login endpoint but no `requirements.txt` (dependencies undocumented).

- **Entrypoint:** `app/main.py` — FastAPI app with `POST /login` (Supabase Auth) and `GET /` health check.
- **Supabase client:** `app/supabase_client.py` — reads `SUPABASE_URL` and `SUPABASE_KEY` from `.env` located at `backend/.env` (not inside `app/`).
- **DB:** Supabase local dev setup in `supabase/` with `config.toml`, `seed.sql`, and migrations.
- **No frontend integration yet** — the frontend does not call this API.

## IoT (`iot/`)

ESP32 firmware and Python tooling for rodent trap sensors. **Not a stub** — has real code.

- **Firmware:** `código ratonera/ratones-v1/` (basic) and `ratones-v2/` (adds LittleFS offline queue). ESP32 + FC-51 IR sensor, MQTT via HiveMQ Cloud (TLS 8883).
- **Python MQTT bridge:** `código ratonera/minibackend.py` — subscribes to `ratones/+/status`, inserts into Supabase `registros_plagas` table.
- **Python GUI:** `código ratonera/control.py` — tkinter app for sending MQTT commands (PING, RESET, RENAME).
- **Hardware:** `case ratonera/` has STL files for 3D-printed enclosures. `diagramas/` has wiring diagrams.
- **⚠️ Hardcoded credentials** in `.ino` files (WiFi + MQTT passwords) — these are committed.
