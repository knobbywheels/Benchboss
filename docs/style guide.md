# UI Style Guide: BenchBoss Ice Hockey Analytics

## 1. Design Philosophy
The BenchBoss interface is designed for **high-stress, low-attention environments**. The UI must be usable by a coach with cold hands, potentially wearing thin gloves, under harsh stadium lighting.

* **Speed Over Beauty:** Interactions must be instantaneous.
* **High Contrast:** Essential for legibility in bright rinks.
* **Thumb-First Design:** All critical game-time controls must be within easy reach of a thumb holding a mobile device.

---

## 2. Color Palette

| Usage | Hex Code | Preview |
| :--- | :--- | :--- |
| **Background (OLED Black)** | `#000000` | ![#000000](https://via.placeholder.com/15/000000?text=+) |
| **Primary Text (Ice White)** | `#FFFFFF` | ![#FFFFFF](https://via.placeholder.com/15/FFFFFF?text=+) |
| **Action Start (Power Play Green)** | `#27AE60` | ![#27AE60](https://via.placeholder.com/15/27AE60?text=+) |
| **Action Stop (Penalty Red)** | `#C0392B` | ![#C0392B](https://via.placeholder.com/15/C0392B?text=+) |
| **Defense / Alt (Neutral Blue)** | `#2980B9` | ![#2980B9](https://via.placeholder.com/15/2980B9?text=+) |
| **Highlight (Goal Gold)** | `#F1C40F` | ![#F1C40F](https://via.placeholder.com/15/F1C40F?text=+) |

---

## 3. Typography

**Primary Font Stack:** `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;`

* **Game Clock:** `4rem / Bold` (Centered, Monospaced numbers to prevent jitter).
* **Player Numbers:** `1.5rem / Extra Bold` (Inside tokens).
* **Section Headers:** `1.2rem / Semi-Bold / Uppercase`.
* **Labels/Stats:** `0.9rem / Medium`.

---

## 4. UI Components

### 4.1 Player Tokens (Drag-and-Drop)
* **Shape:** Circular.
* **Size:** Minimum `64px x 64px` touch target.
* **Active State (On Ice):** White border, pulsing opacity.
* **Inactive State (Bench):** Solid background, no pulse.

### 4.2 Game Controls (Sticky Footer)
* **Primary Button:** `height: 80px`.
* **Stop/Start Toggle:** Must occupy the full width of the bottom screen for "no-look" pausing.

### 4.3 The Shot Map (Canvas Overlay)
* **Interaction:** Long-press on the ice surface.
* **Visual:** Semi-transparent rink overlay with a `12px` red dot appearing at the point of contact.

---

## 5. PWA & Technical Specs

### 5.1 Icons
Provide the following in the `/public/icons` folder:
* `icon-192x192.png`
* `icon-512x512.png`
* `apple-touch-icon.png` (Maskable icons for Android and iOS splash screens).

### 5.2 Haptics (Vibration API)
* **Clock Start:** `vibrate(50)` (Short burst).
* **Clock Stop:** `vibrate([100, 50, 100])` (Double burst).
* **Stat Logged:** `vibrate(20)` (Micro burst).

### 5.3 Responsive Breakpoints
* **Mobile Portrait (Default):** Main tracking view.
* **Mobile Landscape:** Auto-switch to "Stats Table" or "Full Rink" view.

---

## 6. Wildcard: "Post-Game Analysis" Mode
While the game-time UI is high-contrast black/white, the **Analysis Mode** (Reviewing stats after the game) should transition to a **Light Mode** to reduce eye strain during prolonged data entry or review in normal lighting conditions.
