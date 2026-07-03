# User Stories

## Format
Each story follows: **As a** [role], **I want to** [action], **so that** [benefit].

---

## Players

<!-- Add user stories here -->

## Game Setup

### US-1 — Start a New Game

**As a** player, **I want to** start a new game, **so that** I can reset life totals and begin a fresh game.

**Main flow:**
1. On the main screen, the player taps the "New Game" button.
2. The new game screen is displayed.
3. It shows a life total suggestion field (up/down spinner) with a default value of 20.
4. Two actions are available:
   - **Cancel** — returns to the game screen with no changes.
   - **Ok** — resets both players' life totals to the chosen value and starts the new game.

## Life Tracking

### US-2 — Adjust a Player's Life Total

**As a** player, **I want to** tap the +1, +5, -1, or -5 buttons on a player's zone, **so that** I can quickly update that player's life total during the game.

**Main flow:**
1. On the main screen, the player taps one of the +1, +5, -1, or -5 buttons in a player's zone.
2. That player's life total is updated immediately by the corresponding amount.
3. After the throttling delay without any further change to that player's life total, a history entry is recorded (see US-3).

## Game History

### US-3 — Throttle History Recording

**As a** player, **I want** rapid life total taps to be grouped into a single history entry, **so that** the history reflects meaningful changes rather than every individual tap.

**Behavior:**
1. When any player's life total changes, a shared throttling timer is started (duration: throttling delay, currently 3 seconds).
2. If any player's life total changes again before the timer expires, the timer is reset to the full throttling delay.
3. When the timer expires, a new history entry is added, storing the current timestamp and both players' life totals — **if and only if** at least one life total differs from the last recorded history entry.

**Notes:**
- The throttling delay is a named constant; 3 seconds is the current value.
- There is a single shared timer; any change from either player resets it.
