# SpacedRepSidebar

Part of: [[study-plan]]
Wireframe: [[study-plan#Section 2 — Spaced Repetition Sidebar]]

## What it renders
Right sidebar always visible on the Study Plan page. Shows overall retrieval strength as a percentage + progress bar, then a list of upcoming due cards sorted by urgency. Each card has a RECALL NOW or SCHEDULE action.

## Props
```ts
retrievalStrength: number    // 0–100, overall SR health score
criticalExpiryHours: number  // hours until first card expires
queue: {
  id: string
  topic: string
  box: number
  dueIn: string            // e.g. "3h 10m", "Tomorrow"
  isOverdue: boolean
  isCritical: boolean      // due within 6 hours
}[]
onRecallNow: (id: string) => void     // launches session immediately
onSchedule: (id: string) => void      // opens slot picker to add to calendar
onViewFullQueue: () => void           // navigates to /progress Due Today tab
```

## Internal state
None — pure display component.

## Child components
- shadcn `Progress` — retrieval strength bar
- `QueueItem` — single due card row (topic + box + due time + action button)

## Data source
- SR queue with due times per card, retrieval strength score computed server-side

## States
- Critical item: row highlighted, RECALL NOW button in urgent color
- Overdue item: LATE badge, RECALL NOW button
- Healthy item: SCHEDULE button
- Empty queue: "All caught up · Nothing due soon"
- Mobile: collapses to bottom sheet
