# GraphToolbar

Part of: [[knowledge-graph]]
Wireframe: [[knowledge-graph#Toolbar]]

## What it renders
Top bar with three controls: subject filter dropdown, mastery filter dropdown, and labels toggle. Controls filter and display of the graph canvas.

## Props
```ts
subjects: string[]
activeSubjectFilter: string | null
activeMasteryFilter: 'all' | 'weak' | 'needs-work'
showLabels: boolean
onSubjectChange: (subject: string | null) => void
onMasteryChange: (filter: 'all' | 'weak' | 'needs-work') => void
onLabelsToggle: () => void
```

## Internal state
None — all state owned by parent page.

## Child components
- shadcn `Select` — subject filter dropdown
- shadcn `Select` — mastery filter dropdown
- shadcn `Switch` — labels toggle

## States
- Default: "All Subjects", "All Mastery", labels off
- Subject filtered: dropdown shows selected subject name
- Mastery filtered: dropdown shows active filter label
