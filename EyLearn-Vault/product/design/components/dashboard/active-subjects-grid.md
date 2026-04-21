# ActiveSubjectsGrid

Part of: [[dashboard]]
Wireframe: [[dashboard#Section 5 — Active Subjects Grid]]

## What it renders
2-column grid of enrolled subjects, each showing subject name and mastery percentage with a health color indicator. Clicking a subject navigates to /progress filtered to that subject.

## Props
```ts
subjects: {
  id: string
  name: string
  masteryPercent: number   // 0–100
}[]
totalEnrolled: number
onSubjectClick: (id: string) => void   // navigates to /progress?subject=id
```

## Internal state
None — pure display component.

## Child components
- `SubjectMasteryCard` — individual subject card (name + % + health color)

## Data source
- Enrolled subjects with mastery % computed from session ratings + SR data

## States
- Default: 2-column grid
- Mobile: 1-column stack
- Empty: "Add your first subject" CTA linking to /subjects
- Mastery colors: green ≥75% · yellow 50–74% · red <50%
