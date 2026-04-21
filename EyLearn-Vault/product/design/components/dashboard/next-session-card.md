# NextSessionCard

Part of: [[dashboard]]
Wireframe: [[dashboard#Section 3 — Next Session Card]]

## What it renders
High-contrast card (dark background) showing the AI-recommended next session. Most prominent element on the dashboard. Shows subject, topic, recommended duration, and a launch CTA.

## Props
```ts
subject: string
topic: string
durationMinutes: number
status: 'ready' | 'ahead' | 'overdue'
daysOverdue?: number
onLaunch: () => void   // navigates to /session with subject+topic pre-filled
```

## Internal state
None — pure display component.

## Child components
- shadcn `Button` — Launch Session CTA

## Data source
- Next recommended session computed from [[spaced-repetition]] schedule + [[ai-study-plan]]

## States
- `ready`: dark card, "STATUS: READY", full launch CTA
- `ahead`: muted card, "You're ahead of schedule", optional explore CTA
- `overdue`: warning color border, "X days behind", urgent launch CTA
