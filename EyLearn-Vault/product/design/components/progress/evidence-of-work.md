# EvidenceOfWork

Part of: [[progress-dashboard]]
Wireframe: [[progress-dashboard#Tab 5 — Analytics]]

## What it renders
Small stat card showing consecutive study days with a "Verified by Activity Log" badge. Sits alongside the MasteryHeatmap in the Analytics tab.

## Props
```ts
consecutiveDays: number
isVerified: boolean
```

## Internal state
None — pure display component.

## Child components
None.

## Data source
- Consecutive days with at least one session from session records

## States
- Active streak: shows count + verified badge
- Streak broken: shows last streak count in muted color
