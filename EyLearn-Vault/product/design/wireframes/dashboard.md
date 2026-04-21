# Dashboard — Wireframe

> Before building any part of this page, read this file.
> Related: [[progress-dashboard]] · [[spaced-repetition]] · [[session-timer]] · [[active-recall]]

---

## Page Overview

The Dashboard is the user's daily command center. It answers one question: **"What do I do right now?"**

Every element either tells the user what to act on today or shows them how they're tracking. No deep analytics — that lives in Progress.

URL: `/`

---

## Layout

```
┌─────────────────────────────────────────────────────┐
│  Page title: "Study Control"                        │
│  Subtitle: motivational quote (rotates daily)       │
├──────────────────────┬──────────────────────────────┤
│  Daily Targets       │  Consistency Chart (14d)     │
├──────────────────────┴──────────┬───────────────────┤
│  Today's Sequence               │  Next Session Card │
├─────────────────────────────────┴───────────────────┤
│  Active Subjects Grid                               │
├─────────────────────────────────────────────────────┤
│  Global Stats Bar                                   │
└─────────────────────────────────────────────────────┘
```

---

## Section 1 — Daily Targets

```
┌─────────────────────────┐
│  DAILY TARGETS       ⚡  │
│                          │
│  Active Recall Tasks  4/10│
│  ████████░░░░░░░░░░░░    │
│                          │
│  Spaced Repetition Due 12│
└─────────────────────────┘
```

- Two counters: tasks completed today vs total, SR items due
- Progress bar on Active Recall Tasks
- SR Due count links directly to `/progress` Due Today tab
- Both reset at midnight

**States:**
- All done → "All caught up today ✓" green state
- SR overdue → SR count turns red

**Data needed:** today's session progress, SR due count for current user

---

## Section 2 — Consistency Chart

```
┌─────────────────────────────┐
│  CONSISTENCY (14D)    📅    │
│                             │
│  ▁▃▅▇▅▃▁▅▇█▇▅▃▅            │
│  14 days ago        Today   │
└─────────────────────────────┘
```

- Bar chart of daily study activity over last 14 days
- Bar height = session duration or cards reviewed
- Hovering a bar → date + sessions completed that day
- Gap in bars = missed day (bar absent, not zero-height)

**Data needed:** daily session activity for last 14 days

---

## Section 3 — Next Session Card

```
┌──────────────────────────────┐
│  STATUS: READY               │
│                              │
│  Next Session:               │
│  Biochemistry                │  ← subject name, large
│                              │
│  Focus on "Metabolic         │
│  Pathways" for 45 minutes    │  ← AI-recommended topic + duration
│  to maintain your streak.    │
│                              │
│  ▶  Launch Session           │
└──────────────────────────────┘
```

- Dark card, high contrast — most prominent element on page
- Subject and topic determined by [[spaced-repetition]] schedule + [[ai-study-plan]]
- Duration = AI-recommended based on workload and time available
- Launch Session → goes directly to session setup with subject/topic pre-filled
- If no session recommended → "You're ahead of schedule. Rest or explore a new topic."

**States:**
- Ready → dark card with launch CTA
- Ahead of schedule → muted card with optional explore CTA
- Overdue (missed yesterday) → warning color, shows how many days behind

**Data needed:** next recommended subject/topic from SR schedule, AI study plan

---

## Section 4 — Today's Sequence

```
┌──────────────────────────────────┐
│  TODAY'S SEQUENCE    ADJUST PLAN │
│                                  │
│  09:00 AM  Biochemistry          │
│            Reviewing Citric Acid │
│                                  │
│  10:30 AM  Neuroanatomy          │
│            Limbic System         │
│                                  │
│  01:00 PM  Organic Chemistry     │
│            Hydration Reactions   │
└──────────────────────────────────┘
```

- Time-blocked list of today's planned sessions from [[ai-study-plan]]
- Each row: time · subject · topic
- "Adjust Plan" → links to `/study-plan`
- Clicking a row → launches session for that subject/topic
- Completed sessions shown with strikethrough + checkmark
- Empty state: "No sessions planned — Go to Study Plan to schedule your day"

**States:**
- Planned: upcoming sessions shown normally
- In progress: current session highlighted
- Completed: struck through
- Empty: empty state with CTA to Study Plan

**Data needed:** today's scheduled sessions from study plan

---

## Section 5 — Active Subjects Grid

```
┌───────────────────────────────────────┐
│  ACTIVE SUBJECTS          4 Enrolled  │
│                                       │
│  ┌──────────────┐  ┌───────────────┐  │
│  │ Microbiology │  │ Pharmacology  │  │
│  │  88%         │  │  62%          │  │
│  │  MASTERY     │  │  MASTERY      │  │
│  └──────────────┘  └───────────────┘  │
│  ┌──────────────┐  ┌───────────────┐  │
│  │ Pathology    │  │ Genetics      │  │
│  │  45%         │  │  74%          │  │
│  │  MASTERY     │  │  MASTERY      │  │
│  └──────────────┘  └───────────────┘  │
└───────────────────────────────────────┘
```

- 2-column grid (desktop), 1-column (mobile)
- Each card: subject name + mastery % + health color
- Mastery color: 🟢 ≥75% · 🟡 50–74% · 🔴 <50%
- Clicking a card → `/progress` filtered to that subject
- "# Enrolled" count top right

**States:**
- No subjects → "Add your first subject" empty state with CTA to `/subjects`

**Data needed:** enrolled subjects, mastery % per subject

---

## Section 6 — Global Stats Bar

```
┌───────────────────────────────────────────────────┐
│  TOTAL FOCUS TIME   CURRENT STREAK   ITEMS MEMORIZED│
│  142h 12m           18 Days          3,492          │
└───────────────────────────────────────────────────┘
```

- Three stats: total focus time (all time), current streak (consecutive days), items memorized (Leitner Box 5)
- Streak broken → shows "Streak ended · Best: 18 days"
- Read-only, no interactions

**Data needed:** cumulative session time, consecutive day streak, Box 5 card count

---

## Empty State (new user, no data)

Shown when user has no subjects or sessions yet.

```
┌─────────────────────────────────────┐
│  Welcome to eyLearn                 │
│                                     │
│  Start by adding your notes         │
│  or enrolling in a subject.         │
│                                     │
│  [Add Content]   [Browse Subjects]  │
└─────────────────────────────────────┘
```

---

## Navigation Behaviour

- Dashboard is the default landing page after login
- Next Session card is the primary CTA — always above the fold
- All secondary sections link out to their detail pages (Progress, Study Plan, Subjects)

---

## Related Components to Plan

- `DailyTargets` — [[components/dashboard/daily-targets]]
- `ConsistencyChart` — [[components/dashboard/consistency-chart]]
- `NextSessionCard` — [[components/dashboard/next-session-card]]
- `TodaySequence` — [[components/dashboard/today-sequence]]
- `ActiveSubjectsGrid` — [[components/dashboard/active-subjects-grid]]
- `GlobalStatsBar` — [[components/dashboard/global-stats-bar]]
