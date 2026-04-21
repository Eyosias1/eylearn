# DueTodayTable

Part of: [[progress-dashboard]]
Wireframe: [[progress-dashboard#Tab 4 — Due Today]]

## What it renders
Full table of today's due cards with checkboxes for bulk selection. More detail than the pinned DueTodayHeader. Columns: checkbox, topic, subject tag, Leitner box, last reviewed, confidence history dots.

## Props
```ts
cards: {
  id: string
  topic: string
  subject: string
  subjectColor: string
  box: number
  lastReviewed: string
  confidenceHistory: ('strong' | 'partial' | 'poor')[]   // last 5 sessions
}[]
onStartSession: (selectedIds: string[]) => void
```

## Internal state
- `selectedIds: string[]` — tracks checked rows for bulk action
- `sortKey: 'subject' | 'box' | 'lastReviewed'` — active sort column
- `sortDir: 'asc' | 'desc'`

## Child components
- `ConfidenceDots` — row of 5 colored dots showing recent confidence history
- shadcn `Checkbox` — per-row and select-all
- shadcn `Button` — "Start Session with Selected" (shown only when selection > 0)

## Data source
- SR due cards for today with full metadata

## States
- Default: all due cards, no selection
- Row selected: checkbox checked, CTA appears
- All selected: "Start Session with Selected" CTA active
- Empty: "Nothing due today" empty state
