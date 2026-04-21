# SessionHistoryTable

Part of: [[progress-dashboard]]
Wireframe: [[progress-dashboard#Session History]]

## What it renders
Log of all past sessions shown at the bottom of the Progress page, below all tabs. Each row: date, mode, subject(s), duration, cards reviewed, avg confidence. Clicking a row opens a session detail modal.

## Props
```ts
sessions: {
  id: string
  date: string
  mode: string
  subjects: string[]
  durationMinutes: number
  cardsReviewed: number
  avgConfidence: number    // 0–100
}[]
onSessionClick: (id: string) => void   // opens session detail modal
onViewAll: () => void                  // navigates to full paginated history
```

## Internal state
None — pure display component.

## Child components
- shadcn `Table` — rows and columns
- `SessionDetailModal` — full session breakdown on row click

## Data source
- Session records with all metadata, most recent first

## States
- Default: last 10 sessions shown
- "View All Records" link → full paginated list
- Empty: "No sessions yet — complete your first session to see history"
- Row hovered: pointer cursor, subtle highlight
