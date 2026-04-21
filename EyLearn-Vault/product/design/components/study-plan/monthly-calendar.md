# MonthlyCalendar

Part of: [[study-plan]]
Wireframe: [[study-plan#Section 1 — Weekly Architecture]]

## What it renders
Condensed monthly calendar view. Each day cell shows dot indicators for sessions planned that day. Clicking a day expands to show that day's sessions in a popover. Toggled from WeeklyCalendar via the WEEKLY / MONTHLY switch.

## Props
```ts
month: Date
sessions: {
  id: string
  date: string
  subject: string
  subjectColor: string
  completed: boolean
}[]
onMonthChange: (direction: 'prev' | 'next') => void
onDayClick: (date: string) => void    // opens day detail popover
```

## Internal state
- `selectedDay: string | null` — drives day detail popover

## Child components
- `MonthDayCell` — single day cell with session dots
- `DaySessionPopover` — list of sessions for selected day

## Data source
- Planned sessions per day for the current month

## States
- Default: month grid with dots per day
- Day selected: popover shows sessions for that day
- Day with no sessions: empty cell
- Today: highlighted border
