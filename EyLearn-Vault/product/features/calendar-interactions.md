# Calendar Interactions

Drag-to-reschedule, inline editing, deletion, and creation for both calendar events and study plan events.

---

## Event Types

| Type | Source | Table |
|---|---|---|
| Calendar event | Imported ICS / future Google sync | `calendar_events` |
| Scheduled study | User-created study blocks | `scheduled_study` |

---

## Feature 1 — Create Scheduled Study ← START HERE

Click an empty time slot on day/week view to open a "New Study Block" panel.

### Fields
| Field | Input |
|---|---|
| Topic | Select from `subtopics` (grouped by subject) |
| Date | Pre-filled from the clicked slot |
| Start time | Pre-filled from the clicked slot, editable |
| Duration | Number input (default 30 min) |

### Todos
- [ ] `src/lib/actions/study-plan-actions.ts` — `createScheduledStudy(data)`, `getScheduledStudy()` server actions
- [ ] `src/lib/studyplan/studyplan.ts` — replace mock `getPlanEvents()` with real `getScheduledStudy()` query
- [ ] `src/types/studyplan.ts` — add `ScheduledStudy` type matching DB row
- [ ] `src/components/studyplan/create-study-panel.tsx` — slide-in panel with topic select, date, time, duration
- [ ] `src/hooks/useSubjectTopics.ts` — fetch subjects → subtopics for the select
- [ ] `src/components/studyplan/week-day-column.tsx` — onClick on empty slot → open panel pre-filled with date/time
- [ ] `src/components/studyplan/day-view.tsx` — onClick on empty slot → open panel
- [ ] `src/app/(app)/studyplan/page.tsx` — fetch real scheduled study alongside calendar events

---

## Feature 2 — Edit Panel (click a block)

Clicking a block opens a side panel with editable fields.

### Calendar event fields
| Field | Input |
|---|---|
| Title | Text input |
| Date | Date picker |
| Start time | Time input |
| Duration | Number input (minutes) |

### Scheduled study fields
| Field | Input |
|---|---|
| Topic | Select (subtopics grouped by subject) |
| Date | Date picker |
| Start time | Time input |
| Duration | Number input |

### Todos
- [ ] `src/lib/actions/calendar-actions.ts` — add `updateCalendarEvent(id, patch)`
- [ ] `src/lib/actions/study-plan-actions.ts` — add `updateScheduledStudy(id, patch)`
- [ ] `src/components/studyplan/calendar-event-panel.tsx` — edit panel for calendar events
- [ ] `src/components/studyplan/study-event-panel.tsx` — edit panel for scheduled study
- [ ] `src/components/studyplan/calendar-event-block.tsx` — onClick → open panel (if not dragging)
- [ ] `src/components/studyplan/week-topic-block.tsx` — onClick → open panel
- [ ] `src/components/studyplan/day-topic-block.tsx` — onClick → open panel
- [ ] Wire panels into `week-day-column.tsx` and `day-view.tsx`

---

## Feature 3 — Delete

Delete button inside edit panel with inline "Are you sure?" confirmation.

### Todos
- [ ] `src/lib/actions/calendar-actions.ts` — add `deleteCalendarEvent(id)`
- [ ] `src/lib/actions/study-plan-actions.ts` — add `deleteScheduledStudy(id)`
- [ ] Add delete button + confirmation to `calendar-event-panel.tsx`
- [ ] Add delete button + confirmation to `study-event-panel.tsx`

---

## Feature 4 — Drag to Reschedule

### Day view (vertical only)
- Drag block up/down to change `start_time`, snap to 15-min increments

### Week view (vertical + horizontal)
- Drag block across columns to change `scheduled_date` + `start_time`

### Todos
- [ ] `src/hooks/useCalendarDrag.ts` — pointer events, snap logic, drag state
- [ ] `src/components/studyplan/week-day-column.tsx` — attach drag handlers to blocks
- [ ] `src/components/studyplan/day-view.tsx` — attach drag handlers
- [ ] `src/lib/actions/calendar-actions.ts` — `updateCalendarEvent` handles date+time patch
- [ ] `src/lib/actions/study-plan-actions.ts` — `updateScheduledStudy` handles date+time patch
- [ ] Click vs drag: only open edit panel if pointer moved < 5px

---

## Implementation Order

1. ✅ Calendar import (done)
2. ⬜ Create scheduled study (Feature 1)
3. ⬜ Edit panel — calendar events (Feature 2, partial)
4. ⬜ Delete (Feature 3)
5. ⬜ Edit panel — scheduled study (Feature 2, full)
6. ⬜ Drag day view (Feature 4, partial)
7. ⬜ Drag week view (Feature 4, full)
