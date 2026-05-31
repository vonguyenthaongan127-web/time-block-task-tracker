# Time Block Task Tracker

A production-ready React + Tailwind productivity app with Firebase Authentication, Cloud Firestore real-time sync, offline-first caching, and deployment config for Netlify, Vercel, and Firebase Hosting.

## Architecture

The app keeps the interface calm while the data layer scales by user:

```text
users/{uid}
  preferences: { darkMode, density, focusMinutes }
  stats: { streak, focusSessions }
  tasks/{taskId}
  timeBlocks/{blockId}
  focusSessions/{sessionId}
  backups/{backupId}
```

Why this structure:

- Every query is scoped to the signed-in user, so reads stay small and security rules stay simple.
- Tasks are ordered by `blockRank` and `order`, which keeps time blocks fast even with many tasks.
- Preferences and streak stats live on the user document for one fast profile read.
- Focus history and backups are append-only subcollections so they do not slow down the daily task screen.
- Firestore persistent local cache is enabled, so the app opens from cached data and syncs when the connection returns.

## Firebase Setup

1. Create a Firebase project at <https://console.firebase.google.com>.
2. Enable **Authentication** and add **Google** as a sign-in provider.
3. Enable **Cloud Firestore** in production mode.
4. Create a web app in Firebase project settings.
5. Copy `.env.example` to `.env` and fill in the Firebase web config values.
6. Deploy security rules:

```bash
firebase deploy --only firestore:rules,firestore:indexes
```

## Local Development

```bash
npm install
npm run dev
```

If `.env` is missing, the app runs in local-only preview mode with local storage. Once Firebase values exist, Google login and cloud sync activate automatically.

## Production Build

```bash
npm run build
npm run preview
```

## Deploy

Netlify:

- Build command: `npm run build`
- Publish directory: `dist`
- Add the `VITE_FIREBASE_*` variables in Site settings.

Vercel:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Add the `VITE_FIREBASE_*` variables in Project settings.

Firebase Hosting:

```bash
npm run build
firebase deploy --only hosting
```

## Cognitive UX Notes

- Time blocks chunk work to respect Miller's Law.
- Each task stores a `why` cue to support retrieval before starting.
- Focus mode hides unrelated context and records focus session history.
- Completion updates progress instantly and gives a small micro-win animation.
- Search and filters reveal detail progressively instead of overloading the task list.
