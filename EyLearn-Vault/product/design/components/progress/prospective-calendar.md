# ProspectiveCalendar

Part of: [[progress-dashboard]]
Wireframe: [[progress-dashboard#Tab 3 — Prospective]]

## What it renders
Monthly calendar showing future SR review dates. Each day with due cards shows colored dots (color = subject). Clicking a day opens a side panel listing topics due that day with subject and box number.

## Props
```ts
month: Date
dueDates: {
  date: string
  topics: {
    name: string
    subject: string
    subjectColor: string
    box: number
  }[]
}[]
onMonthChange: (direction: 'prev' | 'next') => void
```

## Internal state
- `selectedDay: string | null` — drives side panel content

## Child components
- `CalendarDay` — single day cell with dot cluster
- `DayDetailPanel` — side panel listing topics due on selected day

## Data source
- Projected next review dates per card computed from SR intervals

## States
- Default: current month, no day selected
- Day selected: side panel open with topics listed
- Dense day (5+ topics): dots shown as first 3 + "+N more"
- Empty month: all cells blank, "No reviews scheduled this month"
