# ConsistencyChart

Part of: [[dashboard]]
Wireframe: [[dashboard#Section 2 — Consistency Chart]]

## What it renders
14-day bar chart of daily study activity. Bar height = total session duration that day. Gaps = missed days (no bar, not a zero-height bar).

## Props
```ts
data: { date: string; minutes: number }[]   // last 14 days, oldest first
```

## Internal state
- `hoveredBar: number | null` — index of hovered bar, drives tooltip

## Child components
- Recharts `BarChart` (or equivalent) for the bar visualization
- Tooltip showing date + sessions completed on hover

## Data source
- Daily session aggregates for last 14 days per user

## States
- Default: bars rendered
- Hovered bar: tooltip shown with date and duration
- No data (new user): empty bars with "Start your first session" label
- All zeros (no activity): flat baseline shown
