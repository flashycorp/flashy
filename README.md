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
├── backend/                    # REST API (Go + Gin)          → backend/README.md
│   ├── cmd/                    #   api, worker
│   ├── internal/               #   config, server, middleware, platform, modules/*
│   ├── migrations/             #   SQL migrations
│   └── Dockerfile
├── frontend/                   # Web client (React + Vite)    → frontend/README.md
│   ├── src/                    #   app, api, components, features, pages, i18n, styles
│   ├── e2e/                    #   Playwright
│   ├── Dockerfile, nginx.conf
├── mobile/                     # iOS/Android (React Native + Expo) → mobile/README.md
│   ├── src/                    #   app (routes), api, features, services, storage, i18n
│   └── app.json
├── deploy/                     # Kubernetes deployment
│   ├── helm/flashy/            #   Helm chart: backend, frontend, ingress, HPA
│   ├── helmfile.yaml           #   ingress-nginx + kube-prometheus-stack + flashy
│   ├── monitoring/             #   Prometheus / Grafana values and dashboards
│   └── kind/                   #   local kind cluster
├── terraform/                  # AWS infrastructure
│   ├── eks/                    #   EKS cluster
│   ├── ecs/, apprunner/        #   alternative deployment options
│   └── libs/                   #   modules: vpc, rds, elasticache, ecr
├── samples/monitoring/         # Alertmanager configuration examples
├── docs/swagger.yaml           # OpenAPI specification
├── scripts/                    # helper scripts
├── .github/
│   ├── workflows/              # backend-ci, frontend-ci, mobile-ci, security, deploy
│   └── dependabot.yml
├── docker-compose.yml          # local stack: postgres, redis, backend, frontend
├── Tiltfile                    # dev loop in local k8s (kind + tilt)
└── .mise.toml                  # CLI tool versions
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