# Tech Stack

## Platform

- **Target:** Android
- **Minimum SDK:** Android 7 (API 24) — Expo SDK 54 default
- **Target SDK:** Android 14 (API 34)

---

## Language & Framework

| Layer | Choice | Version | Notes |
|-------|--------|---------|-------|
| Language | TypeScript | ~5.9 | Required by Expo SDK 54's base tsconfig (`module: preserve`) |
| UI Framework | React Native (via Expo) | 0.81 | Version bundled/tested with Expo SDK 54 |
| Runtime | Expo | 54 | Managed workflow |
| Build System | EAS Build | latest | Cloud builds for Android APK/AAB |

---

## Key Libraries

| Library | Purpose | Version |
|---------|---------|---------|
| expo-router | File-based navigation | ~6.0 |
| expo-keep-awake | Prevent screen lock during game | ~15.0 |
| @react-native-async-storage/async-storage | Persist game history | ~2.2 |
| expo-status-bar | Hide/style status bar | ~3.0 |
| expo-build-properties | Config plugin to set Android min/target SDK | ~1.0 |
| react-native-screens / react-native-safe-area-context | Peer deps required by expo-router | latest SDK-54-compatible |

---

## Architecture Pattern

Feature-based folder structure with React hooks for state. No external state manager — `useState` + `useReducer` at component/screen level is sufficient given the single-screen scope.

---

## Data Storage

- **In-memory:** current game state (life totals, active game)
- **AsyncStorage:** game history log (life change events per game)

---

## Testing

| Type | Tool | Version |
|------|------|---------|
| Unit | Jest + jest-expo | ~54 |
| Component | React Native Testing Library | ~13 |

---

## CI / CD

- **Local dev:** `npx expo start`
- **Android build:** EAS Build (`eas build --platform android`)
- **Distribution:** APK side-load or Google Play via EAS Submit
