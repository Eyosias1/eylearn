# TodaySequence

Part of: [[dashboard]]
Wireframe: [[dashboard#Section 4 — Today's Sequence]]

## What it renders
Time-blocked list of today's planned sessions from the study plan. Each row shows time, subject, and topic. Completed sessions are struck through. Links to /study-plan for editing.

## Props
```ts
sessions: {
  id: string
  time: string           // e.g. "09:00 AM"
  subject: string
  topic: string
  completed: boolean
  inProgress: boolean
}[]
onSessionClick: (id: string) => void   // launches that session
onAdjustPlan: () => void               // navigates to /study-plan
```

## Internal state
None — pure display component.

## Child components
- `TodaySequenceRow` — single session row (time + subject + topic + status)

## Data source
- Today's sessions from study plan, with completion status from session records

## States
- Upcoming session: normal display
- In progress: row highlighted
- Completed: strikethrough + checkmark
- Empty: "No sessions planned" with CTA to /study-plan
