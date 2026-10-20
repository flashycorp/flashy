# Flashy

**Flashy** is a service for learning foreign-language vocabulary and grammar with flashcards and spaced repetition (SRS). It includes a web app, native mobile apps (iOS/Android) and a shared REST API.

## Features

- **SRS training** — the next review time of a card is calculated from the rating: `Again → 5 min`, `Hard → 15 min`, `Good → 1 h`, `Easy → 4 days`.
- **Three modes** — "Cards" (Flip), "Quiz" (choose from 4 options), "Writing" (type the answer).
- **Demo mode** for guests with 5 cards, with progress carried over on sign-up.
- **Decks, cards, tags**, deck export/import.
- **Statistics and gamification** — streak, mastery percentage, charts, push reminders.
- **Public catalog** — publishing, search, ratings, deck copying.
- **Sign-in** — email/password, Google OAuth 2.0, QR code from the mobile app.
- **Administration** — users, catalog moderation, official decks, support, platform statistics.

### Roles

| Role      | Capabilities |
|-----------|--------------|
| **Guest** | info pages, public catalog, demo training |
| **User**  | everything in Guest + decks, SRS, statistics, profile, catalog, export/import, mobile app |
| **Admin** | everything in User + moderation, account management, official decks, support |

## Tech Stack

| Area       | Technologies |
|------------|--------------|
| Backend    | Go + Gin, PostgreSQL, Redis |
| Frontend   | React (JavaScript), Vite, React Router, Axios |
| Mobile     | React Native + Expo (TypeScript), Firebase Cloud Messaging |
| Auth       | Session cookie / Bearer token, Google OAuth 2.0, QR login |
| DevOps     | Docker, Nginx, Kubernetes (AWS EKS) + Helm/Helmfile, Terraform, GitHub Actions, Prometheus + Grafana |
| DevSecOps  | SAST: gosec, semgrep · SCA: govulncheck, Dependabot · Image scan: Trivy |
| QA         | Go test, Jest + React Testing Library, Playwright |
| Hosting    | AWS |

## Repository Structure

```
flashy/
├── backend/                        # REST API (Go + Gin) — source code
│   ├── cmd/
│   │   ├── api/                    #   HTTP server entry point
│   │   └── worker/                 #   background worker (reminders)
│   ├── internal/
│   │   ├── config/                 #   configuration loading
│   │   ├── server/                 #   server setup, routes
│   │   ├── middleware/             #   auth, cors, ratelimit, logger
│   │   ├── platform/               #   postgres, redis, logger
│   │   └── modules/                #   domain modules (handler/service/repository/model)
│   │       ├── auth/  user/
│   │       ├── deck/  card/  tag/
│   │       ├── study/  srs/  stats/
│   │       └── catalog/  importexport/  demo/  notification/  admin/
│   ├── migrations/                 #   SQL database migrations
│   ├── tests/integration/          #   integration tests
│   └── Dockerfile
├── frontend/                       # web client (React + Vite)
│   ├── src/                        #   app, api, components, context, features, pages, i18n
│   ├── tests/                      #   unit tests (Jest + RTL)
│   ├── e2e/                        #   e2e tests (Playwright)
│   └── Dockerfile, nginx.conf
├── mobile/                         # iOS/Android (React Native + Expo)
│   ├── src/                        #   app (routes), api, features, services, storage
│   └── tests/                      #   tests (Jest)
├── docs/swagger.yaml               # documentation: OpenAPI specification
├── deploy/                         # Helm chart, Helmfile, monitoring, kind
├── terraform/                      # AWS infrastructure
├── scripts/                        # helper scripts
├── .github/workflows/              # CI/CD: backend, frontend, mobile, security, deploy
├── docker-compose.yml              # local stack
└── README.md
```

## Quick Start

Requirements: Docker, Node.js 24, Go 1.25 (other CLIs are installed via [mise](https://mise.jdx.dev): `mise install`).

```bash
# Whole stack in Docker
cp backend/.env.example backend/.env
docker compose up -d --build
# frontend: http://localhost:3000, API: http://localhost:8080/health
```

Separately:

```bash
cd backend  && go mod tidy && make run      # API on :8080
cd frontend && npm install && npm run dev   # web on :5173
cd mobile   && npm install && npx expo start
```

Local Kubernetes:

```bash
./scripts/dev-cluster.sh    # kind create cluster + tilt up
```

## API

Documentation: [`docs/swagger.yaml`](docs/swagger.yaml) (OpenAPI 3). Base path: `/v1`.

## Team and Responsibilities

Tasks are distributed by role and area of the codebase. Each member works in their own branches and merges through pull requests with code review.

| Member   | Role                                  | Area                      | Responsibilities                                                                                                | Directories |
|----------|---------------------------------------|---------------------------|-----------------------------------------------------------------------------------------------------------------|-------------|
| Arseniy  | DevOps / Project Manager / DevSecOps  | Infrastructure, process   | Git workflow and branch rules, Docker and docker-compose, CI/CD (GitHub Actions), Kubernetes/Terraform, security scanning, Jira backlog and sprint planning | `deploy/`, `terraform/`, `.github/`, `scripts/`, `docker-compose.yml` |
| Yurii    | Full-stack developer                  | Data layer, API, mobile   | Database schema and migrations, OpenAPI contract, SRS algorithm research, React Native (Expo) app setup         | `backend/migrations/`, `docs/`, `mobile/` |
| Illia    | Backend developer                     | Backend (Go + Gin)        | Go service skeleton, registration, login and sessions, business logic, REST API                                  | `backend/` |
| Maksym   | Frontend developer / UI designer      | Web client, design        | Figma design system, React skeleton and routing, authentication UI, study screens                                | `frontend/` |

**How the work is split:** tasks are assigned by role and expertise, estimated in story points by the whole team (planning poker), and tracked on the Jira board (To Do → In Progress → Done).