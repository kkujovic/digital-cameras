# Data Loading Plan

## Context
`CameraDataLoader` is disabled in prod via `@Profile("!prod")`. The goal is to be able to trigger the same YAML-based loading manually in prod when needed, without restarting the container or changing profiles.

Neon's SQL editor is useful for ad-hoc SQL but can't help here — the data source is YAML files bundled in the JAR, not SQL. A protected admin endpoint is the simplest approach.

## Approach

### 1. Extract loading logic into `CameraLoaderService`
Create `src/main/java/com/kkujovic/dc/loader/CameraLoaderService.java`

Move the YAML scanning + batch insert logic out of `CameraDataLoader.run()` into a `load()` method here. `CameraLoaderService` has no profile restriction — it's a plain `@Service`.

### 2. Update `CameraDataLoader`
Make it delegate to `CameraLoaderService.load()` instead of containing the logic directly. Keep `@Profile("!prod")` so dev auto-loading is unchanged.

### 3. Add `AdminController`
Create `src/main/java/com/kkujovic/dc/controller/AdminController.java`

```
POST /admin/load-cameras
Header: X-Admin-Key: <value>
```

- Read expected key from env var `ADMIN_API_KEY` via `@Value`
- If header is missing or wrong → return `403 Forbidden`
- If correct → call `CameraLoaderService.load()` and return a summary (inserted/skipped counts)

No Spring Security needed — a simple header check is sufficient for a one-off admin action.

## Usage in prod
```bash
curl -X POST https://your-app.onrender.com/admin/load-cameras \
  -H "X-Admin-Key: your-secret"
```

Set `ADMIN_API_KEY=your-secret` as an env var on Render.

## Files to change
- **New**: `src/main/java/com/kkujovic/dc/loader/CameraLoaderService.java`
- **Modify**: `src/main/java/com/kkujovic/dc/loader/CameraDataLoader.java` — delegate to service
- **New**: `src/main/java/com/kkujovic/dc/controller/AdminController.java`

## Verification
1. `./gradlew test` — existing tests pass
2. `./gradlew bootRun` (dev, no prod profile) — loader still runs on startup as before
3. `curl -X POST localhost:8080/admin/load-cameras -H "X-Admin-Key: test"` — returns load summary
4. `curl -X POST localhost:8080/admin/load-cameras -H "X-Admin-Key: wrong"` — returns 403
