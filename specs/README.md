# Developer Guide

## How to test this app

### Manual testing (current)

No automated test suite is configured yet. Testing is done by running the app in Expo Go or an emulator.

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the dev server:
   ```bash
   npx expo start --tunnel
   ```

3. Open the app in **Expo Go** (scan the QR code) or press `a` to launch an Android emulator.

Key flows to exercise manually:
- Tap +1 / -1 / +5 / -5 on each player zone and verify the life total updates immediately.
- Tap quickly several times, then wait 3 seconds — confirm a single history entry is recorded (not one per tap).
- Tap on both players before the 3-second window closes — confirm the shared timer resets and a single entry captures both changes.
- Tap "New Game", change the starting life, confirm both totals reset. Tap "New Game" then Cancel, confirm nothing changes.
- Verify the screen stays awake during a game.

### Automated tests (planned)

Jest + jest-expo and React Native Testing Library are listed in the stack but not yet installed. When added:

```bash
npm test
```

---

## How to build this app

Builds are cloud-based via **EAS Build**. A free Expo account is required.

### Prerequisites

```bash
npm install -g eas-cli
eas login
```

### Debug APK (side-loadable)

```bash
eas build --platform android --profile preview
```

The build output is a `.apk` file downloadable from the Expo dashboard. Install it directly on an Android device with USB debugging or via file transfer.

### Production AAB (Google Play)

```bash
eas build --platform android --profile production
```

Outputs an `.aab` for submission to Google Play via `eas submit`.

### Local build (requires Android SDK)

```bash
npx expo run:android
```

Compiles and installs directly on a connected device or running emulator without going through EAS.
