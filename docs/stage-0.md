# Stage 0 — Baseline and setup

Week 1 of the v2 plan (starting 16 Nov 2026). Goal: freeze v1, run the app end to end on this laptop, and run tests on every pull request.

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

## 0.2 Backend and database on this laptop

Decision (16 Nov 2026): no cloud hosting for now. MongoDB and the Flask backend both run on this laptop, so the app works only here. A public host or tunnel can come later, before the phone and beta checks need it.

1. MongoDB: the local `mongod` service (v8.2) listens on `127.0.0.1:27017`. Keep it bound to localhost; don't expose it on the network.
2. Backend: `cp backend/.env.example backend/.env`, then `cd backend && pip install -r requirements.txt && python app.py`.
3. Check `http://127.0.0.1:5000/health` returns `{"status": "ok", "database": "ok"}`.

CORS only allows the origins in `ALLOWED_ORIGINS` (default `http://localhost:3000`). Add `https://guhan-10.github.io` to use the Pages build from this laptop.

## 0.3 Frontend config

- The API URL comes from `REACT_APP_API_URL`: `.env.development` for `npm start`, `.env.production` for `npm run build` / `npm run deploy`.
- `postbuild` copies `index.html` to `404.html`, so GitHub Pages serves the app on a refresh of `/RevRank/garage` instead of a 404.

## 0.4 Tests and CI

- Backend: `cd backend && pip install -r requirements-dev.txt && pytest` (uses mongomock, no database needed).
- Frontend: `npm test`.
- `.github/workflows/ci.yml` runs both, plus a production build, on every pull request and on pushes to `master`.
- To make a failing check block the merge: GitHub → Settings → Branches → add a rule for `master` → require status checks `backend` and `frontend`.

## Gate to Stage 1

- [ ] Site works end to end on this laptop with real data (phone and 2-friends checks wait for a public backend)
- [ ] CI runs on every pull request and is green
- [ ] `v1.0.0` tag and v1 data export saved
