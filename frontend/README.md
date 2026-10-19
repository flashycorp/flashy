# Flashy — Frontend

The Flashy web client, built with **React (JavaScript) + Vite**. Routing uses `react-router-dom`, HTTP requests use `axios`.

## Structure

```
frontend/
├── public/                 # static assets, served as-is
├── src/
│   ├── app/                # App.jsx, router.jsx — application root and routes
│   ├── api/                # axios client and REST API wrappers (client.js)
│   ├── components/
│   │   ├── layout/         # Layout, Header, ProtectedRoute
│   │   └── ui/             # reusable UI components (Button, Modal, Card...)
│   ├── context/            # React contexts (AuthContext, theme, language)
│   ├── features/           # components and hooks by domain
│   │   ├── auth/  decks/  cards/  study/  catalog/
│   │   └── stats/ profile/ admin/ demo/
│   ├── pages/              # route pages (Home, Login, Decks, Study, Admin...)
│   ├── hooks/              # shared hooks
│   ├── i18n/               # localization (uk, en)
│   ├── styles/             # global styles, light/dark theme
│   ├── constants/          # constants, route paths
│   ├── utils/              # utilities
│   ├── assets/             # images, icons
│   └── main.jsx            # entry point
├── tests/                  # unit tests (Jest + React Testing Library)
├── e2e/                    # e2e tests (Playwright)
├── Dockerfile              # build + nginx
├── nginx.conf              # SPA fallback, asset caching
└── .env.example
```

## Routes

| Path              | Access | Page          |
|-------------------|--------|---------------|
| `/`               | Guest  | Home (+ demo) |
| `/login`, `/register` | Guest | Sign in / sign up (email, Google, QR) |
| `/catalog`        | Guest  | Public deck catalog |
| `/decks`, `/decks/:deckId` | User | My decks, cards |
| `/study/:deckId`  | User   | Training (Cards / Quiz / Writing) |
| `/stats`          | User   | Progress and streak |
| `/profile`        | User   | Profile and settings |
| `/admin/*`        | Admin  | Users, moderation, support |

## Running

```bash
cp .env.example .env
npm install
npm run dev        # http://localhost:5173
npm run build
npm run lint
```