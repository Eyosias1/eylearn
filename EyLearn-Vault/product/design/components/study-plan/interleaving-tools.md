# InterleavingTools

Part of: [[study-plan]]
Wireframe: [[study-plan#Section 3 — Interleaving Tools]]

## What it renders
Panel for selecting which subjects to mix in the next interleaved session. Each subject shows a cognitive load badge (HIGH / MID / LOW). Selecting 2+ subjects reveals a Start Interleaved Session CTA.

## Props
```ts
subjects: {
  id: string
  name: string
  cognitiveLoad: 'high' | 'mid' | 'low'
}[]
selectedIds: string[]
onToggle: (id: string) => void
onStartInterleaved: (selectedIds: string[]) => void
```

## Internal state
None — selection state owned by parent page.

## Child components
- shadcn `Checkbox` — per subject row
- shadcn `Badge` — cognitive load label (HIGH / MID / LOW)
- shadcn `Button` — Start Interleaved Session (conditional)

## Data source
- Enrolled subjects with AI-computed cognitive load per subject

## States
- 0–1 subjects selected: no CTA shown
- 2+ subjects selected: "Start Interleaved Session →" CTA appears
- All subjects selected: CTA active
- Single subject enrolled: panel disabled with tooltip "Enroll in more subjects to interleave"
