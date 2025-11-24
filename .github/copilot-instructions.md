# Copilot instructions for this repository

This Laravel + Inertia (Vue 3) starter app uses Vite, Tailwind, Fortify (auth), and Pest for tests.
Keep guidance concise and actionable — refer to files below for concrete examples.

1) Big-picture architecture
- **Backend:** Laravel (PHP 8.2, `laravel/framework` v12). Key entry: `routes/web.php` (Inertia routes). Providers live in `app/Providers`.
- **Frontend:** Inertia + Vue 3; entry point is `resources/js/app.js`. Pages live under `resources/js/Pages` and are resolved via `resolvePageComponent`.
- **Build/tooling:** Vite (`vite.config.ts`) compiles `resources/css/app.css` and `resources/js/app.js`. Tailwind configured via PostCSS and `tailwind.config.js`.

2) Developer workflows & commands (copyable)
- Install & setup (fresh clone):
  - `composer install ; cp .env.example .env ; php artisan key:generate ; php artisan migrate` (composer `setup` script automates this)
- Local dev (two options):
  - Simple: open two shells: `php artisan serve` and `npm run dev` (Vite dev server).
  - One-liner (runs server, queue, vite via `concurrently`): `composer run dev` (see `composer.json` -> `scripts.dev`).
- Build for production: `npm run build` then `php artisan view:clear` (or use `composer run setup` for full setup script).
- Run tests: `composer run test` or `php artisan test` (Pest is configured in `tests/Pest.php`).

3) Authentication patterns
- Fortify is used for authentication. Configuration: `config/fortify.php` (features toggled here).
- Fortify views render Inertia pages. See `app/Providers/FortifyServiceProvider.php` where each Fortify view maps to an Inertia component (e.g., `auth/Login`, `auth/Register`).
- Custom actions live under `app/Actions/Fortify` (e.g., `CreateNewUser`, `ResetUserPassword`). Update bindings there if you change auth flows.

4) Code patterns & conventions (project-specific)
- Inertia pages are named by PascalCase and resolved from `resources/js/Pages` (example: `Inertia::render('Dashboard')` -> `resources/js/Pages/Dashboard.vue`).
- CSS: Tailwind utilities in `resources/css/app.css`. Vite input references this file in `vite.config.ts`.
- Frontend state: `pinia` is used — register stores in `resources/js` and prefer composables under `resources/js/composables`.
- Routes: small closures return Inertia renders for simple pages. Use controllers under `app/Http/Controllers` for complex logic.

5) Tests & DB
- Tests use Pest + `Illuminate\\Foundation\\Testing\\RefreshDatabase`. Composer post-create touches `database/database.sqlite` — project may prefer sqlite for local tests.
- Typical test command: `composer run test`.

6) Formatting & linting
- Frontend: `npm run format` (Prettier), `npm run lint` (ESLint). See `package.json` scripts.
- Backend: `composer run` includes `laravel/pint` in dev deps — run `./vendor/bin/pint` or add a script if needed.

7) Integration points & external deps
- Fortify (auth), Inertia (server-driven frontend), Wayfinder (`@laravel/vite-plugin-wayfinder`) for form/page helpers; see `vite.config.ts` and `composer.json`.
- Background jobs: `php artisan queue:listen` appears in `composer.json` dev script — worker setup is expected during dev runs.

8) Where to look for examples
- Fortify wiring: `app/Providers/FortifyServiceProvider.php` and `config/fortify.php`.
- Frontend entry + page resolution: `resources/js/app.js` and `vite.config.ts`.
- Routes: `routes/web.php` and `routes/settings.php`.
- Tests: `tests/Feature` and `tests/Unit` with Pest bootstrap at `tests/Pest.php`.

If anything in these sections is unclear or missing (for example, CI specifics, environment conventions, or deployment steps), tell me which area to expand and I will iterate.
# Copilot instructions for this repository

This Laravel + Inertia (Vue 3) starter app uses Vite, Tailwind, Fortify (auth), and Pest for tests.
Keep guidance concise and actionable — refer to files below for concrete examples.

1) Big-picture architecture
- **Backend:** Laravel (PHP 8.2, `laravel/framework` v12). Key entry: `routes/web.php` (Inertia routes). Providers live in `app/Providers`.
- **Frontend:** Inertia + Vue 3; entry point is `resources/js/app.js`. Pages live under `resources/js/Pages` and are resolved via `resolvePageComponent`.
- **Build/tooling:** Vite (`vite.config.ts`) compiles `resources/css/app.css` and `resources/js/app.js`. Tailwind configured via PostCSS and `tailwind.config.js`.

2) Developer workflows & commands (copyable)
- Install & setup (fresh clone):
  - `composer install ; cp .env.example .env ; php artisan key:generate ; php artisan migrate` (composer `setup` script automates this)
- Local dev (two options):
  - Simple: open two shells: `php artisan serve` and `npm run dev` (Vite dev server).
  - One-liner (runs server, queue, vite via `concurrently`): `composer run dev` (see `composer.json` -> `scripts.dev`).
- Build for production: `npm run build` then `php artisan view:clear` (or use `composer run setup` for full setup script).
- Run tests: `composer run test` or `php artisan test` (Pest is configured in `tests/Pest.php`).

3) Authentication patterns
- Fortify is used for authentication. Configuration: `config/fortify.php` (features toggled here).
- Fortify views render Inertia pages. See `app/Providers/FortifyServiceProvider.php` where each Fortify view maps to an Inertia component (e.g., `auth/Login`, `auth/Register`).
- Custom actions live under `app/Actions/Fortify` (e.g., `CreateNewUser`, `ResetUserPassword`). Update bindings there if you change auth flows.

4) Code patterns & conventions (project-specific)
- Inertia pages are named by PascalCase and resolved from `resources/js/Pages` (example: `Inertia::render('Dashboard')` -> `resources/js/Pages/Dashboard.vue`).
- CSS: Tailwind utilities in `resources/css/app.css`. Vite input references this file in `vite.config.ts`.
- Frontend state: `pinia` is used — register stores in `resources/js` and prefer composables under `resources/js/composables`.
- Routes: small closures return Inertia renders for simple pages. Use controllers under `app/Http/Controllers` for complex logic.

5) Tests & DB
- Tests use Pest + `Illuminate\\Foundation\\Testing\\RefreshDatabase`. Composer post-create touches `database/database.sqlite` — project may prefer sqlite for local tests.
- Typical test command: `composer run test`.

6) Formatting & linting
- Frontend: `npm run format` (Prettier), `npm run lint` (ESLint). See `package.json` scripts.
- Backend: `composer run` includes `laravel/pint` in dev deps — run `./vendor/bin/pint` or add a script if needed.

7) Integration points & external deps
- Fortify (auth), Inertia (server-driven frontend), Wayfinder (`@laravel/vite-plugin-wayfinder`) for form/page helpers; see `vite.config.ts` and `composer.json`.
- Background jobs: `php artisan queue:listen` appears in `composer.json` dev script — worker setup is expected during dev runs.

8) Where to look for examples
- Fortify wiring: `app/Providers/FortifyServiceProvider.php` and `config/fortify.php`.
- Frontend entry + page resolution: `resources/js/app.js` and `vite.config.ts`.
- Routes: `routes/web.php` and `routes/settings.php`.
- Tests: `tests/Feature` and `tests/Unit` with Pest bootstrap at `tests/Pest.php`.

If anything in these sections is unclear or missing (for example, CI specifics, environment conventions, or deployment steps), tell me which area to expand and I will iterate.
