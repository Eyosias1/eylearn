# MasteryBySubject

Part of: [[progress-dashboard]]
Wireframe: [[progress-dashboard#Tab 5 — Analytics]]

## What it renders
Vertical list of subjects with mastery percentage and a filled progress bar per subject. Sits in the Analytics tab alongside EvidenceOfWork.

## Props
```ts
subjects: {
  name: string
  masteryPercent: number
}[]
```

## Internal state
None — pure display component.

## Child components
- shadcn `Progress` — filled bar per subject

## Data source
- Mastery % per enrolled subject computed from session ratings + SR data

## States
- Default: all subjects listed, sorted highest to lowest
- Empty: "No subjects enrolled yet"
