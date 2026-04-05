# Technical Design Document: BenchBoss PWA

## 1. System Overview
BenchBoss is an offline-first Progressive Web Application (PWA) built for real-time ice hockey analytics. It prioritizes low-latency data entry, hardware-backed authentication (Garmin Bluetooth), and robust state persistence.

## 2. Technical Stack
* **Framework:** React 19 / Next.js (App Router)
* **Styling:** Tailwind CSS (High-Contrast/OLED Optimized)
* **State Management:** TanStack Query (Server State) + Zustand (Local Game State)
* **Database:** IndexedDB (via Dexie.js) for local-first; Firebase Firestore for cloud sync.
* **PWA Engine:** Vite PWA Plugin with Workbox (InjectManifest strategy).

## 3. Data Architecture (Schema)

### 3.1 Player Object
```json
{
  "id": "uuid",
  "name": "string",
  "number": "integer",
  "position": "F | D | G",
  "stats": {
    "toi_seconds": 0,
    "shots_on_goal": 0,
    "shots_blocked": 0,
    "takeaways": 0,
    "goals": 0,
    "assists_1": 0,
    "assists_2": 0
  }
}
