# GlobalStatsBar

Part of: [[dashboard]]
Wireframe: [[dashboard#Section 6 — Global Stats Bar]]

## What it renders
Three all-time stats in a horizontal bar at the bottom of the dashboard: total focus time, current streak, and items memorized (cards in Leitner Box 5).

## Props
```ts
totalFocusMinutes: number    // rendered as "142h 12m"
currentStreakDays: number
bestStreakDays: number
itemsMemorized: number       // Leitner Box 5 count
streakBroken: boolean
```

## Internal state
None — pure display component.

## Child components
None — three stat blocks rendered inline.

## Data source
- `totalFocusMinutes` — sum of all session durations
- `currentStreakDays` — consecutive days with at least one session
- `itemsMemorized` — count of cards in Leitner Box 5
- `streakBroken` — true if no session yesterday

## States
- Active streak: shows current streak days
- Broken streak: shows "Streak ended · Best: N days" in muted color
- Read-only — no interactions
