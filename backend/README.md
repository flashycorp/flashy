<<<<<<< HEAD
# Flashy Backend

Монолітний серверний застосунок на Go для сервісу вивчення карток за методом інтервальних повторень (SRS). Обслуговує Web (React JS) і Mobile (React Native) клієнти через єдине REST API по HTTPS.

## Стек

| Компонент | Технологія |
|---|---|
| Мова | Go |
| API | REST (HTTP/JSON), контракт у `api/openapi.yaml` |
| База даних | PostgreSQL |
| Кеш / тимчасовий стан | Redis (QR-токени, стан тренування, кеш каталогу) |
| Зовнішні сервіси | Google OAuth 2.0, SMTP, Firebase Cloud Messaging |
| Розгортання | Docker, Kubernetes, Nginx Ingress |

## Архітектура

Один бінарник, три шари. Залежності йдуть лише в один бік:

```
handler  →  service  →  repository / adapter  →  domain
```

- **handler** (`internal/transport/http`): приймає запит, валідує, делегує сервісу, формує відповідь.
- **service** (`internal/service`): бізнес-логіка (SRS, колоди, тренування, статистика, нагадування).
- **repository / adapter** (`internal/repository`, `internal/adapter`): PostgreSQL, Redis, Google, SMTP, FCM.
- **domain** (`internal/domain`): сутності та переліки, не залежить від інших шарів.
- **scheduler** (`internal/scheduler`): фонова горутина для розсилки нагадувань у тому ж процесі.

## Структура проєкту

```
flashy-backend/
├── cmd/server/main.go            # точка входу
├── internal/
│   ├── config/                   # конфігурація з env
│   ├── domain/                   # сутності, переліки, помилки
│   ├── transport/http/
│   │   ├── router.go
│   │   ├── middleware/           # auth, role, logging, recover
│   │   ├── handler/              # Auth, User, Deck, Study, Stats, Catalog, Notification, Support, Admin
│   │   ├── dto/                  # request/response структури
│   │   └── response/             # JSON-відповіді, мапінг помилок у HTTP-коди
│   ├── service/                  # бізнес-логіка
│   │   └── srs/                  # SRSScheduler (чиста логіка без I/O)
│   ├── repository/
│   │   ├── interfaces.go
│   │   ├── postgres/
│   │   └── redis/
│   ├── adapter/                  # google, email (SMTP), fcm
│   └── scheduler/
├── migrations/                   # SQL-міграції
├── api/openapi.yaml              # контракт API для Web/Mobile
├── deploy/                       # Dockerfile, docker-compose, k8s
├── .github/workflows/ci.yml
=======
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
>>>>>>> 5a1462d (1)
├── Makefile
└── .env.example
```

<<<<<<< HEAD
## Швидкий старт

### Створення структури (Linux / macOS)

```bash
chmod +x setup.sh
./setup.sh flashy-backend
cd flashy-backend
```

Назву Go-модуля можна змінити через змінну:

```bash
MODULE=github.com/your-org/flashy-backend ./setup.sh
```

### Запуск (після реалізації)

```bash
cp .env.example .env
docker compose -f deploy/docker-compose.yml up -d   # PostgreSQL + Redis
make migrate-up
make run
```

## Змінні середовища

Приклад для `.env.example`:

```env
HTTP_ADDR=:8080

DATABASE_URL=postgres://flashy:flashy@localhost:5432/flashy?sslmode=disable
REDIS_ADDR=localhost:6379

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URL=

SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=

FCM_CREDENTIALS_FILE=
```

## Основні команди (Makefile)

```makefile
run:
	go run ./cmd/server

build:
	go build -o bin/flashy ./cmd/server

test:
	go test ./... -race -cover

lint:
	golangci-lint run

migrate-up:
	migrate -path migrations -database "$(DATABASE_URL)" up

migrate-down:
	migrate -path migrations -database "$(DATABASE_URL)" down 1
```

## Основні сценарії

- **Вхід через QR-код**: токен у Redis (одноразовий, з TTL), підтвердження з мобільного застосунку, сесія створюється після опитування.
- **SRS-тренування**: черга карток, сесія, оцінки Again / Hard / Good / Easy з ідемпотентністю за `clientReviewId`, оновлення прогресу й журналу в одній транзакції.
- **Push-нагадування**: `Scheduler` запускає `NotificationService`, який надсилає повідомлення через FCM і, за потреби, e-mail; недійсні FCM-токени видаляються.

## Правила розробки

1. Нова сутність: `domain` → інтерфейс репозиторію → реалізація в `repository/postgres` → сервіс → хендлер + DTO → запис в `openapi.yaml`.
2. Сервіси залежать від інтерфейсів, а не від конкретних реалізацій (це дає змогу тестувати з моками).
3. Хендлери не містять бізнес-логіки.
4. Будь-яка зміна схеми БД оформлюється новою міграцією (`up` + `down`).
5. Бекенд не зберігає стан користувача в пам'яті процесу: це потрібно для горизонтального масштабування.

## Команда

- ІА-42 Дмитрієв Арсеній
- ІА-42 Євтушенко Юрій
- ІА-42 Пінчук Максим
- ІМ-42 Буханцов Ілля
=======
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
>>>>>>> 5a1462d (1)
