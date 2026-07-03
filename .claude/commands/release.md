---
description: Bump the version, publish a new APK to GitHub Releases, and update the README download link
---

Release a new build of MtgCounter (GitHub repo: `ChezMose/MtgCounter`, artifact folder: `release/`, artifact type: `.apk`).

## Steps

1. Ask two questions at once (AskUserQuestion):
   - "Where is the new build artifact?" — a file path on disk to the new `.apk`.
   - "Release type?" — options:
     - "Minor (X.Y.Z → X.Y.Z+1)"
     - "Major (X.Y.Z → X.Y+1.0)"

2. Read the current version from the README's download-link line (search `README.md` for `releases/download/`). Extract the version string (e.g. `1.0.0`) from it.

3. Compute the new version:
   - Parse `X.Y.Z` from the current version.
   - Minor bump → `Z+1`, keep `X.Y`.
   - Major bump → `Y+1`, `Z=0`, keep `X`.
   - New tag: `v<newVersion>`.
   - New filename: `MtgCounter-<newVersion>.apk`.

4. Update the release artifacts folder:
   - Delete any existing `.apk` file(s) in `release/` (keep `.gitkeep`).
   - Copy the user's artifact file to `release/MtgCounter-<newVersion>.apk`.

5. Create the GitHub release without asking for confirmation:
   ```
   gh release create v<newVersion> "release/MtgCounter-<newVersion>.apk" --title "v<newVersion>" --notes "Version <newVersion>"
   ```

6. Update the README's download-link line, replacing both occurrences of the old version string (the display text and the URL) with the new version.

7. Ask what to commit (AskUserQuestion):
   - "Only the build (README.md)" — `git add README.md`, commit with message `Release v<newVersion>`, and push.
   - "Everything (README + all uncommitted changes)" — stage all modified/untracked files (excluding gitignored), commit with message `Release v<newVersion>`, and push.

8. Report the new GitHub release URL: `https://github.com/ChezMose/MtgCounter/releases/tag/v<newVersion>`.
