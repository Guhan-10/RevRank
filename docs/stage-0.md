# Stage 0 — Baseline and setup

Week 1 of the v2 plan (starting 16 Nov 2026). Goal: freeze v1, put the app online, and run tests on every pull request.

## 0.1 Freeze v1

- Git tag `v1.0.0` points at `ab94251` (the last v1 commit on `master`).
- Export the live data: from `backend/`, run `python scripts/export_cars.py`. It writes `exports/cars_v1_<date>.json` (git-ignored) and fails if the exported count doesn't match the live count.
- Screenshots of all 5 pages (Home, Garage, Add Car, Compare, Top Cars) go in `docs/v1-screenshots/`.

v1 endpoints as they are in the code (the README table is wrong; fixed in Stage 1.6):

| Method | Route | Does |
|---|---|---|
| POST | `/add-car` | Validate, score and insert a car |
| GET | `/cars` | List all cars |
| PUT | `/update-car/<car_id>` | Update a car (no validation or re-score yet) |
| DELETE | `/delete-car/<car_id>` | Delete a car |
| GET | `/top-cars` | Top 5 by `performance_score` |
| POST | `/car-compare/<name1>/<name2>` | Compare two cars by name |
| GET | `/health` | New in Stage 0: 200 if the database answers a ping, else 503 |

## 0.2 Host backend and database

1. MongoDB Atlas: create a free M0 cluster and a database user. Under Network Access, allow `0.0.0.0/0` (Render has no fixed outbound IP on the free plan). Copy the connection string.
2. Render: New → Blueprint, pick this repo. `render.yaml` creates `revrank-api`. Paste the Atlas string into `MONGO_URI` when asked.
3. Check `https://<service>.onrender.com/health` returns `{"status": "ok", "database": "ok"}`.
4. If Render gives a different URL from `https://revrank-api.onrender.com`, update `.env.production`.

CORS only allows the origins in `ALLOWED_ORIGINS` (production: `https://guhan-10.github.io`; local default: `http://localhost:3000`).

## 0.3 Frontend config

- The API URL comes from `REACT_APP_API_URL`: `.env.development` for `npm start`, `.env.production` for `npm run build` / `npm run deploy`.
- `postbuild` copies `index.html` to `404.html`, so GitHub Pages serves the app on a refresh of `/RevRank/garage` instead of a 404.

## 0.4 Tests and CI

- Backend: `cd backend && pip install -r requirements-dev.txt && pytest` (uses mongomock, no database needed).
- Frontend: `npm test`.
- `.github/workflows/ci.yml` runs both, plus a production build, on every pull request and on pushes to `master`.
- To make a failing check block the merge: GitHub → Settings → Branches → add a rule for `master` → require status checks `backend` and `frontend`.

## Gate to Stage 1

- [ ] Public site works end to end with real data
- [ ] CI runs on every pull request and is green
- [ ] `v1.0.0` tag and v1 data export saved
