# SpaceMV-ScAI Frontend

<div align="center">

[![License](https://img.shields.io/badge/License-AGPL%203.0-blue.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Build](https://img.shields.io/badge/Build-Rspack%20%2B%20Webpack-8DD6F9?logo=webpack&logoColor=black)](./package.json)
[![Graphics](https://img.shields.io/badge/Graphics-WebGL-990000?logo=webgl&logoColor=white)](https://www.khronos.org/webgl/)
[![Test](https://img.shields.io/badge/Test-Jest-C21325?logo=jest&logoColor=white)](https://jestjs.io/)

[简体中文](./README.md) | [English](./README_EN.md)

</div>

<img width="2564" height="1536" alt="Gemini_Generated_Image_7urlyp7urlyp7url" src="https://github.com/user-attachments/assets/b018204f-a95b-4f39-a104-1fda4432462f" />

`SpaceMV-ScAI Frontend` is the frontend client of the `SpaceMV-ScAI` constellation intelligent management platform. It is responsible for 3D satellite visualization, sensor and situational analysis, constellation management, coverage simulation result display, and integration with backend services, the user manual, ScAI Agent, ADS-B / AIS, and other external systems.

The project is a secondary development based on [KeepTrack.Space](https://github.com/thkruz/keeptrack.space). The current version extends it with login authentication, constellation upload and deletion, coverage analysis, streaming simulation result display, and multi-service integration capabilities.

![Preview](./public/keeptrack10-preview.png)

## Current Capabilities

### 1. 3D Visualization

- Rendering of the Earth, satellites, orbits, the Sun, the Moon, and starfield scenes
- Satellite search, selection, highlighting, orbit display, and information panels
- Timeline, time machine, day-night switching, and multiple viewing modes
- Satellite view, 3D map, planetarium, and celestial view

### 2. Sensors and Analysis

- Sensor list, sensor details, and custom sensors
- Single-station / multi-station observation geometry calculation
- Sensor field of view, short-term fence, surveillance fence, and satellite FOV
- DOP analysis, polar charts, orbit reference, and close-target analysis

### 3. Constellation and Business Features

- Constellation category display: navigation, communication, Earth observation, and custom
- Constellation query and one-click search
- Constellation file upload, deletion, and refresh
- Coverage analysis plugin
- Analysis at both single-satellite and constellation levels
- Streaming display of calculation progress and results
- Support for ground point, line, and area targets
- Coverage analysis requires the current user to have access permission

### 4. Orbit and Space Situational Awareness

- New launches, launch calendar, missile simulation, and breakup events
- Collision analysis, debris screening, and impact prediction
- Satellite changes, transponder channel data, and country-based filtering
- Graphical analysis for ECI / ECF / RIC / Time2Lon / Lat2Lon / Inc2Alt / Inc2Lon

### 5. Output and External Integration

- Screenshots, screen recording, and Video Director
- Catalog export: TLE / 3LE / CSV / targets within FOV
- Online user manual entry
- Standalone ScAI Agent frontend integration
- Embedded ADS-B / AIS pages

## Technology Stack

| Category | Technology |
| :--- | :--- |
| Language | TypeScript |
| Build | Rspack, Webpack, Babel, TSX |
| Rendering | WebGL, webgl-obj-loader |
| Computation | Web Workers, ootk, gl-matrix, numeric |
| UI | Materialize CSS, Material Icons |
| Charts | ECharts, ECharts GL |
| Internationalization | i18next, i18next-browser-languagedetector |
| Testing | Jest, Testing Library, Cypress |

## Directory Structure

| Directory | Description |
| :--- | :--- |
| `src/` | Core source code |
| `src/plugins/` | Feature plugins |
| `src/singletons/` | Core singletons for rendering, catalog, time, input, and more |
| `src/webworker/` | Threads for position and orbit calculations |
| `src/settings/` | Default configuration, plugin switches, and runtime settings |
| `src/auth/` | Login state retrieval and authentication logic |
| `build/` | Build pipeline and environment variable loading |
| `public/` | Static assets, login page, textures, styles, and sample data |
| `docs/` | Docsify user manual source |
| `deploy/nginx/` | Nginx deployment configuration |
| `test/` | Jest tests and test assets |

## Runtime Dependencies and Integration

The current version is intended to be served through an Nginx reverse proxy by default, rather than exposing the static directory directly with `npm start`.

The repository already includes a reusable Nginx configuration file:

- [`deploy/nginx/frontend.conf`](./deploy/nginx/frontend.conf)

### Main Endpoints the Frontend Depends On

| Capability | Default Endpoint | Description |
| :--- | :--- | :--- |
| Login | `/api/login` | Login page submission for username and password |
| Registration | `/api/accountAdd` | Registration form on the login page |
| Main Business API | `/api/settings` | Base path for satellite catalog, constellations, coverage analysis, and related APIs |
| Simulation Result Page | `/simulation/*` | Coverage analysis result pages |
| User Manual | `/manual` | Docsify documentation entry |
| ScAI Agent | `SCAI_AGENT_URL` | Standalone frontend address |
| ADS-B / AIS | `SCAI_ADSB_URL` / `SCAI_AIS_URL` | External embedded page addresses |

### APIs Accessed Under `TIANXUN_SERVER_SETTINGS`

- `/satellites`
- `/constellations`
- `/constellations_find/:id`
- `/upload_constellation`
- `/simulation_stream`

## Quick Start

### 1. Prerequisites

- Node.js `18.x` or later
- npm or pnpm
- Docker or host-level Nginx
- A modern browser, preferably Chrome / Edge

### 2. Install Dependencies

```bash
git clone https://github.com/tianxunweixiao/SpaceMV-ScAI-Frontend.git
cd SpaceMV-ScAI-Frontend
npm install
```

### 3. Configure Environment Variables

Copy the example file:

```bash
cp .env.example .env
```

Or use a preset:

```bash
npm run setenv app
```

Preset files already included in the repository:

- `.env.app`
- `.env.celestrak`
- `.env.embed`
- `.env.epfl`

### 4. Update `.env`

Make sure the following settings are correct:

- `TIANXUN_SERVER_LOGIN=/api/login`
- `TIANXUN_SERVER_SETTINGS=/api/settings`
- `USER_MANUAL_URL=/manual`
- `SCAI_AGENT_URL`
- `SCAI_ADSB_URL`
- `SCAI_AIS_URL`

Notes:

- `/api/login` and `/api/accountAdd` are reverse-proxied by Nginx to the account service
- `/api/settings/` is reverse-proxied by Nginx to the main backend service
- `/simulation/` is reverse-proxied by Nginx to the visualization / simulation result service
- `/manual/` is reverse-proxied by Nginx to the Docsify user manual

### 5. Build the Frontend Artifacts

Development build:

```bash
npm run build:dev
```

Continuous watch build:

```bash
npm run build:watch
```

Production build:

```bash
npm run build
```

After the build completes, the frontend static files are output to `dist/`.

### 6. Optional: Start the Local Docsify User Manual

```bash
cd docs
docker build -t spacemv-scai-docs .
docker run --rm -p 3000:3000 -v ${PWD}:/docs spacemv-scai-docs
```

If the documentation service is not proxied through Nginx, you can temporarily change `USER_MANUAL_URL` in `.env` to:

```text
http://localhost:3000
```

### 7. Start the Frontend Through Nginx

This is the default startup approach recommended by this README.

See the Nginx configuration file:

- [`deploy/nginx/frontend.conf`](./deploy/nginx/frontend.conf)

This configuration handles:

- `dist/` static files
- `/api/login`, `/api/accountAdd` -> `account-backend-svc:5001`
- `/api/settings/` -> `serve-backend-svc:8401`
- `/simulation/` -> `visual-backend-svc:8501`
- `/manual/` -> `scai-docs-svc:3000`

#### Option 1: Start Nginx with Docker

Build the frontend first:

```bash
npm run build
```

Windows PowerShell:

```powershell
docker run --rm -p 80:80 `
  -v ${PWD}\dist:/opt/project/scai/frontend/dist:ro `
  -v ${PWD}\deploy\nginx\frontend.conf:/etc/nginx/conf.d/default.conf:ro `
  nginx:1.27
```

Linux / macOS:

```bash
docker run --rm -p 80:80 \
  -v "$(pwd)/dist:/opt/project/scai/frontend/dist:ro" \
  -v "$(pwd)/deploy/nginx/frontend.conf:/etc/nginx/conf.d/default.conf:ro" \
  nginx:1.27
```

Default access URL after startup:

```text
http://localhost/
```

#### Option 2: Start Nginx on the Host Machine

```bash
npm run build
sudo cp deploy/nginx/frontend.conf /etc/nginx/conf.d/scai-frontend.conf
sudo nginx -t
sudo systemctl reload nginx
```

If you are not in a `systemd` environment, you can also run:

```bash
sudo nginx -s reload
```

#### Notes Before Use

- `account-backend-svc`, `serve-backend-svc`, `visual-backend-svc`, and `scai-docs-svc` in `frontend.conf` are service discovery names.
- If you are not running in Kubernetes or the same container network, replace them with actual reachable addresses.
- The configuration assumes the frontend build output is mounted at `/opt/project/scai/frontend/dist`. If the mount path differs, update `root` accordingly.
- `npm start` can still be used for quick local preview of `dist/`, but it is not the recommended production startup method in this README.

## Environment Variables

| Variable | Example Value | Description |
| :--- | :--- | :--- |
| `SETTINGS_PATH` | `public/settings/settingsOverride.js` | Settings override file copied to `dist/settings/settingsOverride.js` during build |
| `FAVICON_PATH` | `public/img/favicons/favicon.ico` | Favicon used during build |
| `LOADING_SCREEN_CSS_PATH` | `public/css/loading-screen.css` | Startup screen stylesheet |
| `STYLE_CSS_PATH` | `public/css/style.css` | Main stylesheet |
| `TEXT_LOGO_PATH` | `public/img/logo.png` | Text logo |
| `PRIMARY_LOGO_PATH` | `public/img/logo-primary.png` | Primary logo |
| `SECONDARY_LOGO_PATH` | `public/img/logo-secondary.png` | Secondary logo |
| `MODE` | `development` | Build mode. In the current implementation, the value in `.env` overrides script parameters. Before a production build, confirm whether it should be changed to `production` |
| `IS_PRO` | `false` | Whether to enable Pro plugin path switching |
| `TIANXUN_SERVER_LOGIN` | `/api/login` | Build-time injected value for the login page; keep it aligned with reverse proxy configuration |
| `TIANXUN_SERVER_SETTINGS` | `/api/settings` | Base path for the main business APIs |
| `USER_MANUAL_URL` | `/manual` | User manual entry |
| `SCAI_AGENT_URL` | `http://10.0.10.213:80/` | ScAI Agent frontend address |
| `SCAI_ADSB_URL` | `http://10.0.88.5:8511` | ADS-B page address |
| `SCAI_AIS_URL` | `http://10.0.88.5:8510` | AIS page address |

## Common Scripts

| Command | Description |
| :--- | :--- |
| `npm run setenv <name>` | Copy `.env.<name>` to `.env` |
| `npm run build` | Build static artifacts into `dist/` |
| `npm run build:dev` | Development-mode build |
| `npm run build:watch` | Watch source changes and keep rebuilding |
| `npm start` | Only for quick local preview of `dist/`; not the recommended formal startup method |
| `npm test` | Run Jest tests |
| `npm run lint` | Run ESLint |
| `npm run cypress:open` | Open Cypress |

## Development Notes

### Login and Permissions

- The entry file [`src/main.ts`](./src/main.ts) checks the local login state when the page loads.
- Unauthenticated access to non-auth pages is automatically redirected to [`/login.html`](./public/login.html).
- Login information is stored by default in `localStorage` under `auth-token` and `user-info`.

### Data Loading Logic

- The satellite catalog is fetched from `${TIANXUN_SERVER_SETTINGS}/satellites` first.
- If the request fails because the network is unreachable, it falls back to `public/tle/tle.json`.
- The constellation list is fetched and cached after startup, and related plugins reuse the same cached data.

### External Page Integration Behavior

- `SCAI_AGENT_URL`, `SCAI_ADSB_URL`, and `SCAI_AIS_URL` all support absolute URLs.
- If an address uses `localhost` or `127.0.0.1`, the frontend automatically replaces it with the hostname currently used by the browser, which is convenient for LAN integration testing.

## Troubleshooting

| Issue | Suggestion |
| :--- | :--- |
| The homepage immediately redirects to the login page | Check whether valid `auth-token` and `user-info` exist in `localStorage` |
| No satellite data is shown on the page | Check whether `/api/settings/satellites` is reachable; if the backend is unavailable, confirm that `public/tle/tle.json` exists |
| The constellation list is empty or uploads fail | Check `/api/settings/constellations`, `/api/settings/upload_constellation`, and `/api/settings/constellations_find/:id` |
| The coverage analysis button is unavailable | The current account must have `coverageAnalysisPermission=1` |
| Agent / ADS-B / AIS shows "not configured" after clicking | Update the corresponding addresses in `.env`, rebuild, and reload Nginx |
| The online manual cannot be opened | Check whether `USER_MANUAL_URL` is reachable or correctly proxied to the `docs/` service |
| `.env` was changed but the page did not update | Rebuild the project and reload the Nginx configuration |

## Acknowledgements

- Original open-source project: [KeepTrack.Space](https://github.com/thkruz/keeptrack.space)
- This project uses the AGPL-3.0 license. See [LICENSE](./LICENSE) for details

## Contact

- Email: `code@spacemv.com`
- Issues: <https://github.com/tianxunweixiao/SpaceMV-ScAI-Frontend/issues>

For more information, follow the company's WeChat official account:

<img width="106" height="106" alt="image" src="https://github.com/user-attachments/assets/69a02ad0-422c-422a-bf5f-9b7890cf31ab" />
