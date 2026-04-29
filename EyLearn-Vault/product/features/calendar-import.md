# Calendar Import — ICS to Calendar Events

**Type:** Infrastructure / UI

## What it does
Lets users upload a `.ics` file (exported from Apple Calendar, Google Calendar, or any calendar app).
The app parses it, previews the events, and stores them in `calendar_events`.
These events appear on the study plan page as read-only busy blocks so the AI knows when the user is unavailable.

## Flow
1. User clicks "Import Calendar" button in the study plan header
2. Modal opens — user picks a `.ics` file
3. App parses the file client-side, shows a preview table of found events
4. User clicks "Import X events"
5. Server action inserts rows into `calendar_events` (skips duplicates via `external_id`)
6. Study plan page reloads and shows the imported events as greyed-out blocks

## Out of scope (later)
- Google Calendar API live sync
- Apple iCloud Calendar API live sync
- AI scheduling into free slots

---

## Files

### CREATE

**`src/types/studyplan.ts`** — add `CalendarEvent` type
```
CalendarEvent {
  id: string
  title: string
  scheduledDate: string   // YYYY-MM-DD
  startTime: string       // HH:MM
  durationMinutes: number
  source: 'ics' | 'google' | 'apple' | 'manual'
}
```

---

**`src/lib/studyplan/parse-ics.ts`** — pure ICS parser, no deps
```
parseIcs(raw: string): CalendarEvent[]
  - splits by BEGIN:VEVENT / END:VEVENT
  - extracts DTSTART, DTEND → scheduledDate + startTime + durationMinutes
  - extracts SUMMARY → title
  - extracts UID → externalId
  - handles DTSTART with and without time (DATE vs DATETIME)
  - skips all-day events (no time component)
```

---

**`src/lib/actions/calendar-actions.ts`** — server action
```
importCalendarEvents(events: CalendarEventInsert[]): Promise<void>
  - calls getAuthenticatedSupabase()
  - bulk inserts into calendar_events
  - ON CONFLICT (external_id) DO NOTHING
```

---

**`src/components/studyplan/import-calendar-button.tsx`** — trigger button
```
props: none
state: modalOpen (boolean)
renders: Button "Import Calendar" → opens ImportCalendarModal
```

---

**`src/components/studyplan/import-calendar-modal.tsx`** — upload + preview
```
props: onClose()
state:
  - file: File | null
  - parsed: CalendarEvent[]
  - loading: boolean
renders:
  - file input (.ics only)
  - preview table: date | time | duration | title  (once parsed)
  - "Import X events" confirm button → calls importCalendarEvents → onClose
```

---

### MODIFY

**`src/app/(app)/studyplan/page.tsx`**
- currently: fetches `getPlanEvents()` only
- add: fetch `getCalendarEvents()` in parallel
- pass `calendarEvents` to `PlanCalendar`

---

**`src/lib/studyplan/studyplan.ts`**
- add: `getCalendarEvents(): Promise<CalendarEvent[]>`
  - queries `calendar_events` table for the authenticated user
  - ordered by `scheduled_date`, `start_time`

---

**`src/components/studyplan/plan-calendar.tsx`**
- add prop: `calendarEvents: CalendarEvent[]`
- add: `ImportCalendarButton` to the header area
- pass `calendarEvents` down to `MonthView`, `WeekView`, `DayView`

---

**`src/components/studyplan/calendar-header.tsx`**
- add: slot or children prop to render `ImportCalendarButton` on the right side

---

**`src/components/studyplan/month-view.tsx`**
- add prop: `calendarEvents: CalendarEvent[]`
- in each day cell: render calendar event blocks below the date number
- style: grey bg, no color dot, no click handler, italic text

---

**`src/components/studyplan/week-view.tsx`**
- add prop: `calendarEvents: CalendarEvent[]`
- render `CalendarEventBlock` in each day column using same top/height calc as `TopicBlock`
- style: grey, semi-transparent, no ring on click

---

**`src/components/studyplan/day-view.tsx`**
- add prop: `calendarEvents: CalendarEvent[]`
- same as week-view — render blocks in the time grid
- shows full title since there is more horizontal space
