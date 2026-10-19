# Flashy — Mobile

The native Flashy app for iOS (15+) and Android (10+), built with **React Native + Expo** (Expo Router, TypeScript).
Push notifications use Firebase Cloud Messaging. Builds and publishing go through EAS.

## Structure

```
mobile/
├── app.json                # Expo configuration
├── assets/                 # icons, splash, images
├── src/
│   ├── app/                # Expo Router routes (each file is a screen, _layout.tsx is a navigator)
│   ├── api/                # REST client (session Bearer token)
│   ├── features/           # screens and components by domain
│   │   ├── auth/           # sign in, sign up, Google OAuth
│   │   ├── qr-login/       # QR scanning to sign in to the web version
│   │   ├── decks/  cards/  # decks and cards
│   │   ├── study/          # training (Flip / Quiz / Writing), Again–Easy ratings
│   │   ├── catalog/        # public catalog
│   │   ├── stats/          # progress, streak
│   │   └── profile/        # profile, languages, notification settings
│   ├── components/         # shared UI components (themed-text, themed-view...)
│   ├── hooks/              # shared hooks (theme, etc.)
│   ├── store/              # global state (session, user)
│   ├── services/
│   │   └── notifications/  # FCM: device registration, reminders
│   ├── storage/            # local storage for the token and session progress (offline)
│   ├── i18n/               # localization (uk, en)
│   ├── constants/          # theme (light/dark), spacing
│   └── utils/
├── tests/                  # tests (Jest)
└── .env.example
```

Code that is not a route is kept outside `src/app/`. Screens are written in `src/features/<domain>/screens`,
and the files in `src/app/` only re-export them.

## Planned Routes

```
src/app/
├── _layout.tsx
├── (auth)/login.tsx, register.tsx
├── (tabs)/index.tsx (dashboard), decks.tsx, catalog.tsx, stats.tsx, profile.tsx
├── deck/[deckId].tsx
├── study/[deckId].tsx
└── qr-scan.tsx
```

## Running

```bash
cp .env.example .env
npm install
npx expo start
npx expo lint
npx tsc --noEmit
```

For more on working with Expo, see [AGENTS.md](AGENTS.md).