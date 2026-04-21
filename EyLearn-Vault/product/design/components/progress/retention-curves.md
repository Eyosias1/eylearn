# RetentionCurves

Part of: [[progress-dashboard]]
Wireframe: [[progress-dashboard#Tab 5 — Analytics]]

## What it renders
Line chart with two curves over a 30-day interval: Ebbinghaus theoretical forgetting curve and the user's actual retention performance. Beating the theoretical curve means spaced repetition is working.

## Props
```ts
theoretical: { day: number; retention: number }[]   // Ebbinghaus curve points
actual: { day: number; retention: number }[]        // user's measured retention
intervalDays: number                                 // x-axis max (default 30)
```

## Internal state
- `hoveredPoint: number | null` — day index, drives tooltip

## Child components
- Recharts `LineChart` (or equivalent) with two `Line` series

## Data source
- Theoretical: static Ebbinghaus formula (no API needed)
- Actual: per-card retention measured at each review interval

## States
- Default: both lines rendered
- User above theoretical: positive framing ("You're beating the curve")
- User below theoretical: warning framing ("Increase review frequency")
- Insufficient data (<7 days of history): placeholder with "Keep studying to see your curve"
