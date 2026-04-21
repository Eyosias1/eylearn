# DailyTargets

Part of: [[dashboard]]
Wireframe: [[dashboard#Section 1 — Daily Targets]]

## What it renders
Two counters showing today's study progress: active recall tasks completed vs total, and spaced repetition items due. Progress bar on the recall counter.

## Props
```ts
activeRecallDone: number
activeRecallTotal: number
spacedRepDue: number
onSpacedRepClick: () => void   // navigates to /progress Due Today tab
```

## Internal state
None — pure display component.

## Child components
- shadcn `Progress` — recall task progress bar

## Data source
- `activeRecallDone` / `activeRecallTotal` — today's session completion count
- `spacedRepDue` — SR cards due today from spaced repetition schedule

## States
- Default: shows counts and progress bar
- All done: green "All caught up today ✓" replaces both counters
- SR overdue: `spacedRepDue` count renders in destructive color
