# Flashy — Frontend

Веб-клиент Flashy на **React (JavaScript) + Vite**, роутинг — `react-router-dom`, HTTP — `axios`.

## Структура

```
frontend/
├── public/                 # статика, отдаётся как есть
├── src/
│   ├── app/                # App.jsx, router.jsx — корень приложения и маршруты
│   ├── api/                # axios-клиент и обёртки над REST API (client.js)
│   ├── components/
│   │   ├── layout/         # Layout, Header, ProtectedRoute
│   │   └── ui/             # переиспользуемые UI-компоненты (Button, Modal, Card...)
│   ├── context/            # React-контексты (AuthContext, тема, язык)
│   ├── features/           # компоненты и хуки по доменам
│   │   ├── auth/  decks/  cards/  study/  catalog/
│   │   └── stats/ profile/ admin/ demo/
│   ├── pages/              # страницы-маршруты (Home, Login, Decks, Study, Admin...)
│   ├── hooks/              # общие хуки
│   ├── i18n/               # локализация (uk, en)
│   ├── styles/             # глобальные стили, светлая/тёмная тема
│   ├── constants/          # константы, пути маршрутов
│   ├── utils/              # утилиты
│   ├── assets/             # картинки, иконки
│   └── main.jsx            # точка входа
├── tests/                  # unit-тесты (Jest + React Testing Library)
├── e2e/                    # e2e-тесты (Playwright)
├── Dockerfile              # сборка + nginx
├── nginx.conf              # SPA-fallback, кэширование ассетов
└── .env.example
```

## Маршруты

| Путь              | Доступ | Страница      |
|-------------------|--------|---------------|
| `/`               | Guest  | Home (+ демо) |
| `/login`, `/register` | Guest | Вход / регистрация (email, Google, QR) |
| `/catalog`        | Guest  | Публичный каталог колод |
| `/decks`, `/decks/:deckId` | User | Мои колоды, карточки |
| `/study/:deckId`  | User   | Тренировка (Картки / Тест / Письмо) |
| `/stats`          | User   | Прогресс и streak |
| `/profile`        | User   | Профиль и настройки |
| `/admin/*`        | Admin  | Пользователи, модерация, поддержка |

## Запуск

```bash
cp .env.example .env
npm install
npm run dev        # http://localhost:5173
npm run build
npm run lint
```
