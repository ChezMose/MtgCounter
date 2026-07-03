# Design Specs

## Visual Identity

### Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Primary | | |
| Secondary | | |
| Background | | |
| Surface | | |
| Error | | |
| On Primary | | |
| On Background | | |

### Typography

| Style | Font | Size | Weight |
|-------|------|------|--------|
| Display | | | |
| Headline | | | |
| Body | | | |
| Label | | | |

### Spacing & Grid

<!-- Base unit, margins, gutters -->

### Iconography

<!-- Icon set / source -->

---

## Components

### Buttons

The Game Screen's middle action bar (New Game, History, Share) has three buttons of **equal width**, filling the bar evenly regardless of label length — no button is sized to its text.

### Life Counter Widget

<!-- Design of the main counter element -->

### Player Zone

Each player zone has a full-bleed background image, distinct per side:

| Zone | Background image |
|------|-------------------|
| Bottom (current player) | `assets/starry-player.png` |
| Top (opponent) | `assets/starry-opponent.png` |

- The image is scaled proportionally to fully cover the zone — scaling to whichever dimension (width or height) requires the larger scale factor (aspect ratio preserved, never stretched).
- The image is centered within the zone; any overflow beyond the zone's bounds is cropped off evenly on the overflowing axis.
- The opponent's zone (rotated 180°) rotates its background image along with the rest of the zone content.
- The `−1`/`−5`/`+1`/`+5` tap labels use a large font size (28sp) so they stay easily legible against the background image.
- Each piece of text (the life total and each of the `−1`/`−5`/`+1`/`+5` tap labels) sits on its own dark box (black, 50% opacity) sized to the text plus a small padding, rather than a scrim covering the whole zone. This keeps text legible regardless of how light or busy the underlying image is, while leaving most of the background image visible.

---

## Animations & Transitions

<!-- Screen transitions, counter increment/decrement feedback -->

---

## Dark / Light Mode

<!-- Supported modes -->
