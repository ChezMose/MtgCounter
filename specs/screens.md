# Screens

Each screen section describes its purpose, UI elements, and behavior.

---

## Screen List

- [Game Screen](#game-screen) — main playing screen, tracks life totals for two players
- [History Screen](#history-screen) — chronological log of life-total snapshots
- [Share Screen](#share-screen) — QR code and link to the app's GitHub repository

---

## Game Screen

**Route / navigation target:** `/game` (default / home screen)

**Purpose:**
Active game companion screen. Lets two players track their life totals face-to-face on a single shared device — one player holds the top of the phone, the other holds the bottom.

**Layout:**

The screen is split into three horizontal zones:

| Zone | Height | Content |
|------|--------|---------|
| Top | ~45% | Opponent's life total — rendered **upside-down** so the opponent can read it from across the table |
| Middle | ~10% | Action bar |
| Bottom | ~45% | Current player's life total |

**UI Elements:**

*Top zone (opponent — upside-down):*
- Player zone (see layout below), rotated 180° so the opponent can read it from across the table

*Middle zone (action bar):*

Three text-label buttons (no icons), each a distinct color and all the same width, in order left to right:
- **New Game** (left) — resets both players' life totals to the starting value and starts a fresh game
- **History** (middle) — opens the [History Screen](#history-screen)
- **Share** (right) — opens the [Share Screen](#share-screen)

*Bottom zone (current player):*
- Player zone (see layout below)

**Player zone layout:**

Each player zone has a full-bleed background image behind its content (see [Player Card](design-specs.md#player-card) in the design specs): the current player's zone uses `starry-player.png`, the opponent's zone uses `starry-opponent.png`. The image is scaled proportionally to match the zone's width, centered vertically, and cropped top/bottom to fit the zone's height — its aspect ratio is never distorted. A 50%-opacity black scrim sits between the image and the zone's text so the life total and tap labels stay readable.

Each player zone is subdivided into 5 tap regions arranged as follows:

```
┌─────────────┬───────────────┬─────────────┐
│             │               │             │
│    −1       │               │    +1       │
│  (top-left) │  Life total   │ (top-right) │
│             │    display    │             │
│    −5       │               │    +5       │
│ (bot-left)  │               │ (bot-right) │
│             │               │             │
└─────────────┴───────────────┴─────────────┘
```

| Region | Position | Action |
|--------|----------|--------|
| Top-left | upper-left quarter | −1 life |
| Bottom-left | lower-left quarter | −5 life |
| Top-right | upper-right quarter | +1 life |
| Bottom-right | lower-right quarter | +5 life |
| Center | middle column | Life total display (not a tap target) |

**Behavior:**

- Tapping a `−1` region decrements that player's life total by 1.
- Tapping a `−5` region decrements that player's life total by 5.
- Tapping a `+1` region increments that player's life total by 1.
- Tapping a `+5` region increments that player's life total by 5.
- Life totals may go negative (a player can be brought below 0).
- **New Game**: resets both life totals to the default starting value (20 in standard MTG). A confirmation prompt is shown before resetting to prevent accidental resets.
- The screen stays awake (screen lock disabled) while the Game Screen is active.
- No navigation away from this screen during a game other than the explicit **New Game** action.

**Edge Cases:**

- Life total at 0 or below: display as-is (no special blocking behavior); the players decide when the game is over.
- Very large or very small numbers (e.g. Commander games climbing into the hundreds, or negative life): the life total number must scale / truncate gracefully without overflowing its zone.
- Accidental tap: tapping `+` then immediately `−` (or vice versa) should not trigger any undo flow — changes are immediate and intentional.

---

## History Screen

**Route / navigation target:** `/history` (modal, pushed from Game Screen)

**Purpose:**
Shows a chronological timeline of life-total snapshots for the current game, so players can review how life totals changed over time.

**Layout:**

A full-height scrollable table with a fixed header row and one data row per recorded snapshot.

| Column | Width | Content |
|--------|-------|---------|
| Time | ~25% | Time elapsed since game start (formatted as `M:SS`) |
| Opponent | ~37.5% | Top player's life total at that moment |
| You | ~37.5% | Bottom player's life total at that moment |

**Navigation:**

- Opened by tapping the **History** button in the middle action bar on the Game Screen.
- A "Back" button (stack header) returns to the Game Screen.
- The Game Screen is preserved while History is open — life changes made during this time are still recorded.

**Behavior:**

- The first row always shows the starting snapshot (time `0:00`, both players at starting life total).
- A new row is appended every time either player's 3-second inactivity timer fires.
- Rows are shown in chronological order (oldest at top, newest at bottom).
- "Opponent" = top player (P2, the rotated zone). "You" = bottom player (P1, the normal zone).
- If no changes have been committed yet (only the starting row exists), the table still shows that one row.

**Edge Cases:**

- Very many rows (long game with frequent changes): the list is scrollable; no truncation.
- Negative life totals: displayed as-is (e.g., `−3`).

---

## Share Screen

**Route / navigation target:** `/share` (modal, pushed from Game Screen)

**Purpose:**
Lets a player share the app with others at the table so they can get or update it themselves.

**Layout:**

A centered column of content:

| Element | Content |
|---------|---------|
| QR code | Encodes the app's GitHub repository URL |
| Link text | The sentence "or follow this link to update", styled as a link, pointing to the same GitHub repository URL |

**Navigation:**

- Opened by tapping the **Share** button in the middle action bar on the Game Screen.
- A "Back" button (stack header) returns to the Game Screen.

**Behavior:**

- The QR code, when scanned, opens the GitHub repository URL in the device's browser.
- Tapping the link text opens the same GitHub repository URL in the device's browser.

---

<!-- Duplicate the block above for each screen -->
