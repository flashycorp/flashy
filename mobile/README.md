# Flashy — Mobile

Нативное приложение Flashy для iOS (15+) и Android (10+) на **React Native + Expo** (Expo Router, TypeScript).
Push-уведомления — Firebase Cloud Messaging. Сборка и публикация — EAS.

## Структура

```
mobile/
├── app.json                # конфигурация Expo
├── assets/                 # иконки, splash, изображения
├── src/
│   ├── app/                # маршруты Expo Router (каждый файл — экран, _layout.tsx — навигатор)
│   ├── api/                # REST-клиент (Bearer-токен сессии)
│   ├── features/           # экраны и компоненты по доменам
│   │   ├── auth/           # вход, регистрация, Google OAuth
│   │   ├── qr-login/       # сканирование QR для входа в веб-версию
│   │   ├── decks/  cards/  # колоды и карточки
│   │   ├── study/          # тренировка (Flip / Тест / Письмо), оценки Again–Easy
│   │   ├── catalog/        # публичный каталог
│   │   ├── stats/          # прогресс, streak
│   │   └── profile/        # профиль, языки, настройки уведомлений
│   ├── components/         # общие UI-компоненты (themed-text, themed-view...)
│   ├── hooks/              # общие хуки (тема и т.п.)
│   ├── store/              # глобальное состояние (сессия, пользователь)
│   ├── services/
│   │   └── notifications/  # FCM: регистрация устройства, напоминания
│   ├── storage/            # локальное хранение токена и прогресса сессии (офлайн)
│   ├── i18n/               # локализация (uk, en)
│   ├── constants/          # тема (светлая/тёмная), отступы
│   └── utils/
├── tests/                  # тесты (Jest)
└── .env.example
```

Код, не являющийся маршрутом, держим вне `src/app/`. Экраны пишутся в `src/features/<домен>/screens`,
а файлы в `src/app/` только реэкспортируют их.

## Планируемые маршруты

```
src/app/
├── _layout.tsx
├── (auth)/login.tsx, register.tsx
├── (tabs)/index.tsx (дашборд), decks.tsx, catalog.tsx, stats.tsx, profile.tsx
├── deck/[deckId].tsx
├── study/[deckId].tsx
└── qr-scan.tsx
```

## Запуск

```bash
cp .env.example .env
npm install
npx expo start
npx expo lint
npx tsc --noEmit
```

Подробнее про правила работы с Expo — в [AGENTS.md](AGENTS.md).
