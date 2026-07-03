# MtgCounter

A focused, no-frills life-point counter for two-player Magic: The Gathering games.

Two players share one phone across a table. The screen is split into two mirrored halves — one per player — so each person can read their own life total without turning the device; the opponent's half is rotated 180°. Each half has four tap zones (−1, −5, +1, +5) around the life total. A "New Game" button resets both totals, with a confirmation prompt and a choice of starting life.

This app is **not published on the Google Play Store**. It's distributed as a sideloaded APK — see below for how to install it.

## Installing on your Android phone

Since this isn't on the Play Store, Android will warn you it's from an "unknown source." That's expected for any app installed outside a store — as long as you trust where you got the APK from (built it yourself, or got it from someone you trust), it's safe to proceed.

### 1. Get the APK

Either:
- **[Download the latest APK (v1.0.1)](https://github.com/ChezMose/MtgCounter/releases/download/v1.0.1/MtgCounter-1.0.1.apk)** from GitHub Releases, or
- **Build it yourself** — see [specs/README.md](specs/README.md#how-to-build-this-app) for build instructions (requires a free Expo account and `eas-cli`, or a local Android SDK setup).

### 2. Transfer it to your phone

Copy the `.apk` file to your Android device — via USB cable, a cloud drive (Google Drive, Dropbox), email, or a messaging app.

### 3. Allow installs from this source

On the phone, open the APK file with a file manager. Android will prompt you to allow installs from that source (the exact wording depends on your Android version, e.g. "Install unknown apps"). Enable it for the app you used to open the file (browser, file manager, etc.), then continue the install.

### 4. Install and open

Confirm the install prompt. Once installed, open **MtgCounter** like any other app.

### Updating

There's no auto-update mechanism. To get a newer version, repeat the steps above with the new APK — it will install over the existing one as long as the version is newer.

## For developers

See [CLAUDE.md](CLAUDE.md) for the stack overview and [specs/](specs/) for the full design specs, including [specs/README.md](specs/README.md) for local dev, testing, and build instructions.
