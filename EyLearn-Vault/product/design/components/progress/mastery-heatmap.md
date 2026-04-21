# MasteryHeatmap

Part of: [[progress-dashboard]]
Wireframe: [[progress-dashboard#Tab 5 — Analytics]]

## What it renders
GitHub-style yearly grid showing daily study intensity × success rate over the past 12 months. Darker cells = higher combined score. Shows total sessions, peak success rate, and total active time below the grid.

## Props
```ts
data: {
  date: string
  intensity: number      // 0–1, based on session duration
  successRate: number    // 0–1, based on avg confidence that day
}[]
totalSessions: number
peakSuccessRate: number
totalActiveHours: number
onGenerateReport: () => void
```

## Internal state
- `hoveredCell: string | null` — date string, drives tooltip

## Child components
- `HeatmapCell` — single day square, color from intensity × successRate
- `HeatmapTooltip` — date, sessions count, avg confidence on hover

## Data source
- Daily session aggregates for past 12 months

## States
- Default: full year grid rendered
- Hovered cell: tooltip with date and stats
- No data (new user): empty grid with "Start studying to build your map"
