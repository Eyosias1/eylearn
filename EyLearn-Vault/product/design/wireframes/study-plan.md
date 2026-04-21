# Study Plan — Wireframe

> Before building any part of this page, read this file.
> Related: [[ai-study-plan]] · [[spaced-repetition]] · [[interleaved-practice]] · [[session-timer]]

---

## Page Overview

The Study Plan page answers: **"What should I study this week and when?"**

It is the planning and scheduling layer. Users see their week laid out, manage cognitive load across subjects, set session intentions, and see what the spaced repetition algorithm wants them to review next.

URL: `/study-plan`

---

## Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Page title: "Study Plan"                                   │
│  Subtitle: "Optimize your cognitive load by scheduling      │
│  active recall and interleaved practice sessions."          │
├────────────────────────────────────────────┬────────────────┤
│  Weekly Architecture (calendar)            │  SR Sidebar    │
│  [WEEKLY] [MONTHLY] toggle         ‹  ›   │                │
│                                            │  Retrieval     │
│  MON  TUE  WED  THU  FRI  SAT  SUN        │  Strength 82%  │
│  [sessions as time blocks per day]         │                │
│                                            │  Upcoming due  │
│                                            │  queue         │
├───────────────────────┬────────────────────┴────────────────┤
│  Interleaving Tools   │  Session Intentions                 │
└───────────────────────┴─────────────────────────────────────┘
```

---

## Section 1 — Weekly Architecture

The main calendar. Shows planned sessions as time blocks across the week.

```
┌──────────────────────────────────────────────────────────┐
│  Weekly Architecture         ‹  Oct 23 – Oct 29  ›      │
│                                          [WEEKLY][MONTHLY]│
│                                                          │
│  MON    TUE    WED    THU    FRI    SAT    SUN           │
│   23     24     25     26     27     28     29            │
│                                                          │
│  7:30   10:00  8:30                2:00                  │
│  Bio    Physics Anat              Calc                   │
│                                                          │
│  1:30          STUDY                                     │
│  Film          HERE                                      │
└──────────────────────────────────────────────────────────┘
```

- 7-column weekly grid, each column = one day
- Sessions shown as time-labeled blocks: time + subject name
- Today's column highlighted
- Clicking a session block → edit session (change time, subject, topic, mode)
- Clicking an empty slot → create new session
- Weekly ↔ Monthly toggle top right
- ‹ › navigate weeks/months

**Monthly view:**
- Condensed calendar, dots per day = sessions planned
- Clicking a day → expands to show that day's sessions

**States:**
- Session planned: block shown
- Session completed: block dimmed with ✓
- Session missed: block shown with red border
- Empty day: "+" on hover to add session

**Data needed:** planned sessions with time, subject, topic, mode; completion status

---

## Section 2 — Spaced Repetition Sidebar

Always visible on the right. Shows what the SR algorithm wants reviewed soon.

```
┌───────────────────────────────┐
│  Spaced Repetition      DUE   │
│                               │
│  RETRIEVAL STRENGTH     82%   │
│  ████████████░░░░░░░░░░       │
│  Critically expiring in 6hrs  │
│                               │
│  Neural Plasticity        11  │
│  1LF and LTD mechanisms...    │
│  Due: 3h 10m    [RECALL NOW]  │
│                               │
│  Microeconomics           11  │
│  Price elasticity and...      │
│  Due: 5h 40m    [SCHEDULE]    │
│                               │
│  Modernism in Art         11  │
│  Due: 8h 10m    [SCHEDULE]    │
│                               │
│  Python Concurrency       11  │
│  Due: Tomorrow  [SCHEDULE]    │
│                               │
│           [VIEW FULL QUEUE]   │
└───────────────────────────────┘
```

- Retrieval Strength: overall % of cards with healthy SR intervals
- Each item: topic name + box number + time until due + action
- RECALL NOW → overdue or critically expiring → launches session immediately
- SCHEDULE → not yet due → opens scheduler to add to calendar
- View Full Queue → links to `/progress` Due Today tab

**States:**
- Critically expiring (<6hrs): item highlighted with urgency color
- Overdue: LATE badge, RECALL NOW button
- Healthy: normal display

**Data needed:** SR queue with due times per card, retrieval strength score

---

## Section 3 — Interleaving Tools

Manages which subjects to mix in the next session and their cognitive load.

```
┌──────────────────────────────────┐
│  Interleaving Tools           ⓘ │
│  Shuffle topics to strengthen    │
│  neural pathways.                │
│                                  │
│  ▣  Organic Chemistry    HIGH    │
│  ▣  Macroeconomics       MID     │
│  ▣  Cognitive Psychology  LOW    │
└──────────────────────────────────┘
```

- List of enrolled subjects with cognitive load badges: HIGH / MID / LOW
- Checkboxes to select which subjects to include in the next interleaved session
- Cognitive load badge = AI estimate based on topic complexity and recent performance
- ⓘ info tooltip explains interleaving benefit
- Selecting 2+ subjects → "Start Interleaved Session" button appears

**States:**
- 0–1 selected: no session CTA
- 2+ selected: "Start Interleaved Session →" CTA appears below list
- Single subject mode: interleaving disabled, tooltip explains why

**Data needed:** enrolled subjects, AI-computed cognitive load per subject

---

## Section 4 — Session Intentions

Lightweight focus-setting before a session.

```
┌──────────────────────────────────────┐
│  Session Intentions               ✏  │
│                                      │
│  CURRENT FOCUS                       │
│  ┌────────────────────────────────┐  │
│  │ "Master Citric Acid Cycle      │  │
│  │  using Feynman Technique"      │  │
│  └────────────────────────────────┘  │
│                                      │
│  Set next intention...            ➕  │
└──────────────────────────────────────┘
```

- Shows the current session's stated intention (set before session starts)
- User can edit mid-plan with ✏
- "Set next intention" → input field for the next session's goal
- Intentions are stored and shown at session start as a focus reminder
- Past intentions shown in session history

**States:**
- Intention set: shown in card
- No intention: "Tap to set a focus for your next session"

**Data needed:** current and upcoming session intentions per user

---

## Empty State (no sessions planned)

```
┌──────────────────────────────────────┐
│  Your week is empty                  │
│                                      │
│  Let AI plan your week based on      │
│  your subjects and SR schedule.      │
│                                      │
│  [Generate AI Plan]  [Add Manually]  │
└──────────────────────────────────────┘
```

- Generate AI Plan → [[ai-study-plan]] creates a full week schedule
- Add Manually → opens session creation flow

---

## Navigation Behaviour

- Weekly/Monthly toggle persists across sessions (saved to user preferences)
- SR sidebar always visible on desktop, collapses to bottom sheet on mobile
- Creating a session from the calendar pre-fills the session setup screen

---

## Related Components to Plan

- `WeeklyCalendar` — [[components/study-plan/weekly-calendar]]
- `MonthlyCalendar` — [[components/study-plan/monthly-calendar]]
- `SpacedRepSidebar` — [[components/study-plan/spaced-rep-sidebar]]
- `InterleavingTools` — [[components/study-plan/interleaving-tools]]
- `SessionIntentions` — [[components/study-plan/session-intentions]]
