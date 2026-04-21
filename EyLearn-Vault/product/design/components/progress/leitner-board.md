# LeitnerBoard

Part of: [[progress-dashboard]]
Wireframe: [[progress-dashboard#Tab 1 — Leitner]]

## What it renders
5-column visual showing all cards distributed across Leitner boxes. Each card is a colored dot (color = subject). Columns show box number, interval label, and card count.

## Props
```ts
cards: {
  id: string
  topic: string
  subject: string
  subjectColor: string
  box: 1 | 2 | 3 | 4 | 5
  lastReviewed: string
}[]
activeSubjectFilter: string | null
onCardClick: (id: string) => void        // shows card detail tooltip
onBoxClick: (box: number) => void        // pre-loads session with that box's cards
onSubjectFilter: (subject: string | null) => void
```

## Internal state
- `hoveredCard: string | null` — card id, drives detail tooltip position and content

## Child components
- `LeitnerBox` — single column (label + count + dot grid)
- `CardDetailTooltip` — topic, subject, last reviewed on dot hover

## Data source
- All user cards with box assignment and subject

## States
- Default: all subjects, all boxes
- Filtered: selected subject dots full opacity, others dimmed
- Empty box: dashed outline placeholder, "No cards here yet"
- Hovered dot: tooltip shown with card detail
