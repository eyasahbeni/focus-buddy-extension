# Focus Buddy 🧠

Your ultimate ADHD focus companion Chrome Extension. Speak your tasks, set a timer, and get it done — one thing at a time.

![Focus Buddy Architecture](./public/architecture.png)

## Overview
Focus Buddy is a premium, beautifully designed Chrome Extension built to help individuals with ADHD (or anyone who wants to stay locked in) manage their workflow. It abandons the cluttered "everything on one page" layout in favor of a sleek, two-screen push navigation system. You plan your tasks in **State 1**, and then lock into a focused timer in **State 2**.

## 🎨 Deep Space Violet Design System
The entire application is built on a custom, gender-neutral "Deep Space Violet" design system:
- **Base:** Near-black deep violet (`#0D0D12` and `#16161F`)
- **Primary Accent:** Violet (`#7C3AED`)
- **Counterpoint:** Teal (`#2DD4BF`) for positive actions and high-contrast indicators.
- **Typography:** Space Grotesk (for numbers/headers) and DM Sans (for UI copy).

## 🚀 Features & Architecture Flow

The extension features a smooth, horizontal push navigation (sliding left/right) to create a distinct mental shift between "Planning Mode" and "Focus Mode".

### Screen 0 — Onboarding & Auth
- **Frictionless Entry:** Google OAuth as the primary CTA, with a ghost button fallback for email. 
- **Persistence:** Session state persists via `chrome.storage.sync`.

### Screen 1 — Planning (The Task List)
- **Brain Dump Zone:** A unified input row that combines a microphone button and a text field. You can speak a stream of consciousness (*"Write the client email high priority, clean the desk low priority"*) and the app offline-parses it, or you can just type it out manually.
- **Smart Priorities:** Tasks are automatically categorized into P1 (Red), P2 (Amber), P3 (Violet), and P4 (Teal).
- **Satisfying Checkboxes:** Checkboxes live directly in the list. Completed tasks dim to 45% opacity with a strikethrough so you can visually feel your progress without them disappearing.

### Screen 2 — Active Focus
- **Task Context Strip:** Anchors the timer to a specific purpose. It features a left-border color that matches the priority (e.g., Red for P1) to subconsciously remind you of the urgency while the timer runs.
- **Time Tracking Row:** Three pills display `Planned` | `Spent so far` | `Remaining`. If you go over your planned time, the "Spent" value turns amber as a gentle warning (no alarms, no panic).
- **Nudge Banner:** At 50% and 80% of your elapsed time, a violet-tinted, dismissable banner slides in with human, encouraging copy (e.g., *"7 minutes left — you've got this. Stay locked in."*).
- **Animated SVG Timer Ring:** A large, elegant 150x150 countdown ring with a trailing ghost effect.

### Screen 3 — Completion & Review
- **Dopamine Hit:** A dedicated reward screen showing your session stats, actual vs. planned time, and your updated daily streak.
- **Exit Paths:** Choose to jump back to the Task List or take a 5-minute break.

## 🛠 Tech Stack
- **Framework:** React + Vite
- **Styling:** Vanilla CSS Custom Properties (Zero bloated frameworks)
- **Voice Parsing:** Native Chrome Web Speech API (`window.SpeechRecognition`) — completely offline, no paid LLMs required!
- **State Management:** React Hooks + Local Storage / Chrome Storage API.

---
*Note: Make sure to drop your architecture screenshot into the `public/` folder and name it `architecture.png` so it renders beautifully above!*
