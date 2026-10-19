# Flashy

**Flashy** — сервис для изучения иностранной лексики и грамматики с помощью карточек и интервальных
повторений (SRS). Веб-версия, нативное мобильное приложение (iOS/Android) и общий REST API.

## Возможности

- **SRS-тренировки** — расчёт следующего показа карточки по оценке: `Again → 5 мин`, `Hard → 15 мин`, `Good → 1 ч`, `Easy → 4 дня`.
- **Три режима** — «Картки» (Flip), «Тест» (выбор из 4 вариантов), «Письмо» (ввод с клавиатуры).
- **Демо-режим** для гостей на 5 карточках с переносом прогресса при регистрации.
- **Колоды, карточки, теги**, экспорт/импорт колод.
- **Статистика и геймификация** — streak, процент усвоения, графики, push-напоминания.
- **Публичный каталог** — публикация, поиск, рейтинг, копирование колод.
- **Вход** — email/пароль, Google OAuth 2.0, QR-код из мобильного приложения.
- **Администрирование** — пользователи, модерация каталога, официальные колоды, поддержка, статистика платформы.

### Роли

| Роль      | Возможности |
|-----------|-------------|
| **Guest** | инфо-страницы, публичный каталог, демо-тренировка |
| **User**  | всё из Guest + колоды, SRS, статистика, профиль, каталог, экспорт/импорт, мобильное приложение |
| **Admin** | всё из User + модерация, управление аккаунтами, официальные колоды, поддержка |

## Технологический стек

| Часть      | Технологии |
|------------|------------|
| Backend    | Go + Gin, PostgreSQL, Redis |
| Frontend   | React (JavaScript), Vite, React Router, Axios |
| Mobile     | React Native + Expo (TypeScript), Firebase Cloud Messaging |
| Auth       | Session cookie / Bearer token, Google OAuth 2.0, QR-login |
| DevOps     | Docker, Nginx, Kubernetes (AWS EKS) + Helm/Helmfile, Terraform, GitHub Actions, Prometheus + Grafana |
| DevSecOps  | SAST: gosec, semgrep · SCA: govulncheck, Dependabot · Image scan: Trivy |
| QA         | Go test, Jest + React Testing Library, Playwright |
| Хостинг    | AWS |

## Структура репозитория

```
flashy/
├── backend/                    # REST API (Go + Gin)          → backend/README.md
│   ├── cmd/                    #   api, worker
│   ├── internal/               #   config, server, middleware, platform, modules/*
│   ├── migrations/             #   SQL-миграции
│   └── Dockerfile
├── frontend/                   # Веб-клиент (React + Vite)    → frontend/README.md
│   ├── src/                    #   app, api, components, features, pages, i18n, styles
│   ├── e2e/                    #   Playwright
│   ├── Dockerfile, nginx.conf
├── mobile/                     # iOS/Android (React Native + Expo) → mobile/README.md
│   ├── src/                    #   app (роуты), api, features, services, storage, i18n
│   └── app.json
├── deploy/                     # Kubernetes-деплой
│   ├── helm/flashy/            #   Helm-чарт: backend, frontend, ingress, HPA
│   ├── helmfile.yaml           #   ingress-nginx + kube-prometheus-stack + flashy
│   ├── monitoring/             #   Prometheus / Grafana values и дашборды
│   └── kind/                   #   локальный кластер kind
├── terraform/                  # Инфраструктура AWS
│   ├── eks/                    #   EKS-кластер
│   ├── ecs/, apprunner/        #   альтернативные варианты деплоя
│   └── libs/                   #   модули: vpc, rds, elasticache, ecr
├── samples/monitoring/         # примеры конфигурации Alertmanager
├── docs/swagger.yaml           # OpenAPI-спецификация API
├── scripts/                    # вспомогательные скрипты
├── .github/
│   ├── workflows/              # backend-ci, frontend-ci, mobile-ci, security, deploy
│   └── dependabot.yml
├── docker-compose.yml          # локальный стек: postgres, redis, backend, frontend
├── Tiltfile                    # dev-цикл в локальном k8s (kind + tilt)
└── .mise.toml                  # версии CLI-инструментов
```

## Быстрый старт

Требования: Docker, Node.js 24, Go 1.25 (остальные CLI ставятся через [mise](https://mise.jdx.dev): `mise install`).

```bash
# Весь стек в Docker
cp backend/.env.example backend/.env
docker compose up -d --build
# frontend: http://localhost:3000, API: http://localhost:8080/health
```

По отдельности:

```bash
cd backend  && go mod tidy && make run      # API на :8080
cd frontend && npm install && npm run dev   # веб на :5173
cd mobile   && npm install && npx expo start
```

Локальный Kubernetes:

```bash
./scripts/dev-cluster.sh    # kind create cluster + tilt up
```

## API

Документация — [`docs/swagger.yaml`](docs/swagger.yaml) (OpenAPI 3). Базовый путь — `/v1`.

## CI/CD

| Workflow        | Что делает |
|-----------------|------------|
| `backend-ci`    | vet, тесты, golangci-lint, сборка образа |
| `frontend-ci`   | lint, build |
| `mobile-ci`     | expo lint, typecheck |
| `security`      | gosec, semgrep, govulncheck, Trivy |
| `deploy`        | сборка образов → ECR → EKS (helmfile), запуск вручную |

## Git-flow

- `develop` — основная ветка разработки, `main` — релизы.
- Ветки: `feature/<scope>-<name>`, `fix/<scope>-<name>`.
- Коммиты по [Conventional Commits](https://www.conventionalcommits.org): `feat(backend): ...`, `fix(frontend): ...`, `chore(devops): ...`.

## Команда

| Участник            | Роль |
|---------------------|------|
| Дмитрієв Арсеній    | DevOps / Project Manager / DevSecOps |
| Євтушенко Юрій      | Tech Lead / iOS & Android Engineer / DB Architect |
| Буханцов Ілля       | Backend Developer / DB Architect |
| Пінчук Максим       | Frontend Developer / UI/UX Designer |
