# PRD: BenchBoss - Ice Hockey Coaching & Analytics PWA

## 1. Executive Summary
**BenchBoss** is a mobile-first web application designed for ice hockey coaches to track real-time player statistics and "Time on Ice" (TOI) during games. The app prioritizes speed, offline reliability, and low-friction authentication to ensure coaches stay focused on the game, not the screen.

## 2. Target Audience
* Youth, Amateur, and Semi-Pro Ice Hockey Coaches.
* Team Managers/Statisticians operating from the bench or stands.

## 3. Functional Requirements

### 3.1 Platform & Connectivity (The "No-App-Store" Strategy)
* **PWA Architecture:** Must be installable via "Add to Home Screen" to operate in standalone mode.
* **Offline First:** Use Service Workers to cache assets and IndexedDB for local data storage. Sync with the cloud once a stable connection is restored.
* **Wake Lock API:** Implement the Screen Wake Lock API to prevent the device from sleeping during active game play.

### 3.2 Authentication & Security
* **Bluetooth Proximity Auth:** Leverage the Web Bluetooth API to ping a specific Garmin wearable. If the device is within range, the app bypasses standard re-authentication (PIN/Biometrics) to keep the interface live.

### 3.3 Roster Management
* **Input Methods:** Manual entry or CSV upload.
* **Data Points:** Player Name, Jersey Number, Position (F, D, G).
* **Storage:** Persistent local storage with cloud backup.

### 3.4 Game Setup & Clock Control
* **Configuration:** Define period lengths (default 15/20 min), Opponent Name, and Rink Location.
* **Master Clock:** Large "Start/Stop" toggle. 
    * *Logic:* Stopping the clock automatically pauses the TOI counters for all players currently marked "On Ice."

### 3.5 Live Game Tracking
* **Time on Ice (TOI):** * Visual "Ice" area vs. "Bench" area.
    * Drag-and-drop player tokens (Jersey #s) to transition between states.
* **Stat Logging:** Quick-tap actions for:
    * Shots (Taken/Blocked), Takeaways, Completed Passes.
    * Goalie Saves.
    * Goals & Assists (1st/2nd): Triggers a modal to assign credit to players currently on ice.
* **Shot Mapping:** A simplified rink overlay. A "Tap-and-Hold" on the ice area logs a shot at that specific coordinate.

## 4. Non-Functional Requirements
* **Latency:** Interaction feedback (taps/drags) must be <100ms.
* **Contrast:** UI must be legible under harsh fluorescent rink lighting (High Contrast Mode).
* **Durability:** Data must be saved locally every 5 seconds to prevent loss during browser crashes.

## 5. User Stories
* *As a coach,* I want to drag my top line onto the ice at the puck drop so their TOI starts automatically.
* *As a coach,* I want to tap a player's number and then a spot on the rink to log where a shot was taken.
* *As a coach,* I want the screen to stay on for the entire 60 minutes of game time without me having to touch it.
