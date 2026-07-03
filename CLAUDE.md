# MtgCounter

A focused, no-frills life-point counter for two-player Magic: The Gathering games, built as an Android app with React Native / Expo.

## What it does

Two players share one phone across a table. The screen is split into two mirrored halves — one per player — so each person can read their own life total without turning the device. The top half is rotated 180° for the opponent.

Each half has four tap zones (−1, −5, +1, +5) around a central life total display. Life changes are immediate; after 3 seconds of inactivity a history entry is committed. A "New Game" button in the middle bar resets both totals (with a confirmation prompt) and lets players choose the starting value.

## Specs

All design decisions live under [specs/](specs/). See [specs/index.md](specs/index.md) for the full list of spec files, and [specs/CLAUDE.md](specs/CLAUDE.md) for instructions on keeping code in sync with specs.

## Stack at a glance

- **Language:** TypeScript
- **Framework:** React Native via Expo SDK 54 (managed workflow)
- **Navigation:** expo-router (file-based)
- **State:** `useState` / `useReducer` — no external store needed
- **Persistence:** AsyncStorage for game history; current game is in-memory only
- **Build:** EAS Build → Android APK / AAB
- **Min Android:** API 24 (Android 7)

## Development

```bash
npx expo start          # start the dev server
eas build --platform android   # cloud build
```

## Key constraints

- Screen must stay awake while the game is active (`expo-keep-awake`).
- Life totals may go negative — no floor is enforced.
- Life changes are throttled before being committed to history (single shared timer, see US-3).
- The specs folder is the source of truth — update it before changing behavior.

## User interaction triggers

- When the user says anything matching "I built a new version" (or variants like "new build", "new APK", "I have a new version"), immediately invoke the `/release` command without waiting for further instruction.
