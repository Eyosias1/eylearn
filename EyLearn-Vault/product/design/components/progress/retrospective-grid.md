# RetrospectiveGrid

Part of: [[progress-dashboard]]
Wireframe: [[progress-dashboard#Tab 2 — Retrospective]]

## What it renders
30-day recall performance grid. Rows = topics, columns = days (most recent on right). Each cell is a colored dot showing recall quality for that session. Weakest topics sorted to the top.

## Props
```ts
data: {
  topic: string
  subject: string
  sessions: {
    date: string
    rating: 'strong' | 'partial' | 'poor' | null   // null = not studied
  }[]
}[]
activeSubjectFilter: string | null
```

## Internal state
- `hoveredCell: { topic: string; date: string } | null` — drives tooltip

## Child components
- `GridCell` — single dot with color based on rating
- `GridTooltip` — date, session mode, confidence rating on cell hover

## Data source
- Per-session confidence ratings per topic, last 30 days

## States
- Default: all topics, sorted weakest first (most red at top)
- Filtered by subject: only that subject's topics shown
- Hovered cell: tooltip with date, mode, rating
- No data for a cell: empty (⬜ / no dot)
