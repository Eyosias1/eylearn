# WeeklyCalendar

Part of: [[study-plan]]
Wireframe: [[study-plan#Section 1 — Weekly Architecture]]

## What it renders
7-column weekly grid showing planned sessions as time-labeled blocks. Each column is one day. Today's column is highlighted. Sessions show time + subject name. Users can click blocks to edit or empty slots to create new sessions.

## Props
```ts
weekStart: Date
sessions: {
  id: string
  date: string
  time: string
  subject: string
  topic: string
  mode: string
  completed: boolean
  missed: boolean
}[]
onSessionClick: (id: string) => void      // opens edit session sheet
onSlotClick: (date: string, time: string) => void   // opens create session sheet
onWeekChange: (direction: 'prev' | 'next') => void
```

## Internal state
- `hoveredSlot: { date: string; time: string } | null` — shows "+" on hover

## Child components
- `SessionBlock` — time + subject label inside a day column
- `CalendarDayColumn` — single day column with its session blocks

## Data source
- Planned sessions from study plan with completion + missed status

## States
- Session planned: block shown normally
- Session completed: block dimmed with ✓ overlay
- Session missed: block with red border
- Empty slot hovered: "+" appears
- Today column: highlighted background
- Empty week: all columns empty, "Generate AI Plan" CTA shown
