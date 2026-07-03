# Data Model

---

## Entities

### Game

Represents a single game session. Lives in memory only; not persisted across app restarts.

| Field | Type | Description |
|-------|------|-------------|
| startingLife | number | Life total both players started with |
| startTime | number | Unix timestamp (ms) when the game started |
| p1Life | number | Bottom player's current life total |
| p2Life | number | Top player's current life total |
| history | HistoryEntry[] | Ordered list of committed life-total snapshots |

### HistoryEntry

A snapshot of both players' life totals at a recorded moment, committed after 3 seconds of inactivity per player.

| Field | Type | Description |
|-------|------|-------------|
| timestamp | number | Milliseconds elapsed since `Game.startTime` |
| p1Life | number | Bottom player's life total at this moment |
| p2Life | number | Top player's life total at this moment |

---

## Relationships

- A `Game` owns an ordered array of `HistoryEntry` records.
- The first `HistoryEntry` is always the starting snapshot (`timestamp: 0`, both players at `startingLife`).
- New entries are appended when either player's 3-second timer fires. The entry captures the current life totals of **both** players at commit time.

---

## Persistence

| Data | Storage | Notes |
|------|---------|-------|
| Current game state | In-memory (React state) | Lost when the app is closed |
| Game history (current game) | In-memory (React state) | Reset on "New Game" |
| Past game records | AsyncStorage | Not yet implemented — reserved for future multi-game history |

---

## Default Values

| Setting | Default |
|---------|---------|
| Starting life total | 20 |
| Number of players | 2 (fixed) |
