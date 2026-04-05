# Technical Design Document (TDD): BenchBoss PWA

## 1. Project Overview
**BenchBoss** is a high-performance Progressive Web Application (PWA) designed for ice hockey coaches to track "Time on Ice" (TOI), player statistics, and shot locations in real-time. 

### 1.1 Core Objectives
* **Zero Latency:** Immediate feedback for all touch interactions.
* **Offline-First:** Full functionality in rinks with no cellular or Wi-Fi connectivity.
* **Low Friction:** Automated screen wake and proximity-based authentication.

---

## 2. Technical Stack
* **Framework:** React 19 / Next.js (App Router) for modular UI.
* **State Management:** **Zustand** for ultra-fast local game state; **TanStack Query** for server-side sync.
* **Local Database:** **IndexedDB** (via `Dexie.js`) for persistent game logs.
* **Backend:** **Firebase** (Firestore for cloud storage, Hosting for PWA delivery).
* **Styling:** **Tailwind CSS** with a mobile-first, high-contrast OLED theme.

---

## 3. Data Architecture

### 3.1 Player Schema
```json
{
  "id": "uuid",
  "name": "string",
  "number": "integer",
  "position": "F | D | G",
  "active_stats": {
    "toi_ms": 0,
    "is_on_ice": false,
    "last_shift_start": "timestamp | null",
    "shots": [], 
    "blocked_shots": 0,
    "takeaways": 0,
    "goals": 0,
    "primary_assist": 0,
    "secondary_assist": 0
  }
}
