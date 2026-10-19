# Flashy — Backend

REST API сервиса Flashy на **Go + Gin**, PostgreSQL (основная БД) и Redis (кэш, сессии, rate limiting).
Контракт API описан в [`../docs/swagger.yaml`](../docs/swagger.yaml).

## Структура

```
backend/
├── cmd/
│   ├── api/                # точка входа HTTP API
│   └── worker/             # фоновые задачи: SRS-напоминания, push (FCM), email
├── internal/
│   ├── config/             # загрузка конфигурации из env
│   ├── server/             # инициализация Gin, роутинг (/health, /v1/...)
│   ├── middleware/         # auth (session/bearer), CORS, логирование, rate limit
│   ├── platform/           # инфраструктура: postgres, redis, logger
│   └── modules/            # бизнес-модули (handler → service → repository + model)
│       ├── auth/           # регистрация, логин, Google OAuth 2.0, QR-вход
│       ├── user/           # профиль, пароль, языки изучения
│       ├── deck/           # колоды пользователя
│       ├── card/           # карточки
│       ├── tag/            # теги
│       ├── study/          # сессии тренировки (Flip / Тест / Письмо)
│       ├── srs/            # алгоритм интервальных повторений
│       ├── stats/          # прогресс, streak, статистика
│       ├── catalog/        # публичный каталог, рейтинг, копирование
│       ├── importexport/   # экспорт/импорт колод
│       ├── notification/   # устройства и push-уведомления
│       ├── admin/          # пользователи, модерация, поддержка, статистика платформы
│       └── demo/           # демо-тренировка для гостей
├── pkg/httpx/              # общие HTTP-хелперы (ошибки, пагинация)
├── migrations/             # SQL-миграции (golang-migrate)
├── tests/integration/      # интеграционные тесты
├── Dockerfile
├── Makefile
└── .env.example
```

Каждый модуль устроен одинаково:

| Файл            | Ответственность                                  |
|-----------------|--------------------------------------------------|
| `handler.go`    | HTTP-слой: разбор запроса, валидация, ответ      |
| `service.go`    | бизнес-логика                                    |
| `repository.go` | доступ к PostgreSQL / Redis                      |
| `model.go`      | доменные сущности и DTO                          |

## Запуск

```bash
cp .env.example .env
go mod tidy        # первый раз: подтянуть зависимости и создать go.sum
make run           # http://localhost:8080/health
make test
```
