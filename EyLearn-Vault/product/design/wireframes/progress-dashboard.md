# Progress — Wireframe

> Before building any part of this page, read this file.
> Related: [[progress-dashboard]] · [[spaced-repetition]] · [[forgetting-curve]]

---

## Page Overview

The Progress page answers: **"How am I doing?"**

It has two concerns: operational (what's due, where my cards are, past sessions) and analytical (am I actually retaining things, which techniques work best). These are split into two tab groups.

URL: `/progress`

---

## Layout

```
┌─────────────────────────────────────────────────────┐
│  Page title: "Progress & Analytics"                 │
├─────────────────────────────────────────────────────┤
│  Due Today (pinned header — always visible)         │
│  [topic pill] [topic pill] [topic pill]  [Start →]  │
├─────────────────────────────────────────────────────┤
│  [Leitner] [Retrospective] [Prospective] [Due Today]│  ← tab row 1: SR views
│  [Analytics]                                        │  ← tab row 2: analytics
├─────────────────────────────────────────────────────┤
│  Tab content area                                   │
├─────────────────────────────────────────────────────┤
│  Session History (bottom, always visible)           │
└─────────────────────────────────────────────────────┘
```

---

## Pinned Header — Due Today

Always visible above all tabs regardless of active tab.

```
┌─────────────────────────────────────────────────────┐
│  5 cards due for review today                       │
│  ● Quantum Electrodynamics  LATE                    │
│  ● Epigenetic Markers       LATE                    │
│  ● Cognitive Biases         LATE                    │
│                      [Start Review Session →]       │
└─────────────────────────────────────────────────────┘
```

- Topic pills: colored dot (subject color) + topic name + LATE badge if overdue
- Start Review Session → launches active recall pre-loaded with due cards
- If nothing due → "You're all caught up · Next review: tomorrow"

**Data needed:** SR due cards for today, overdue status per card

---

## Tab 1 — Leitner

Visual distribution of all cards across the 5 Leitner boxes.

```
┌──────────────────────────────────────────────────────┐
│  BOX 1        BOX 2        BOX 3     BOX 4    BOX 5  │
│  Daily        Every 3d     Weekly    Bi-week  Mastered│
│                                                      │
│   12            08           24        04      156   │
│                                                      │
│  ● ● ● ●      ● ● ●        ● ● ●     ● ●     ● ● ● │
│  ● ● ● ●      ● ● ●        ● ● ●     ● ●     ● ● ● │
│  ● ● ● ●                   ● ● ●             ● ● ● │
└──────────────────────────────────────────────────────┘
```

- 5 columns, one per box with count and interval label
- Each dot = one card, color = subject
- Clicking a dot → card detail tooltip (topic, subject, last reviewed)
- Clicking a box column → pre-loads session with cards from that box only
- Subject filter (top right) → dims other subjects, highlights selected

**States:**
- Default: all subjects shown
- Filtered: selected subject highlighted, others dimmed
- Empty box: dashed outline, "No cards here yet"

**Data needed:** box assignment per card, subject per card

---

## Tab 2 — Retrospective

30-day recall performance grid per topic.

```
┌──────────────────────────────────────────────────────────┐
│  30-DAY RECALL PERFORMANCE          ● Strong ● OK ● Weak │
│                                                          │
│                   [dates across →]                       │
│  Photosynthesis   ● ● ● ○ ● ● ● ● ● ● ● ● ● ● ● ● ● ●  │
│  Newton's Laws    ● ● ○ ● ● ● ● ● ○ ● ● ● ● ● ● ● ● ●  │
│  Cell Division    ○ ● ● ● ● ● ○ ● ● ● ● ● ● ● ○ ● ● ●  │
│  Organic Chem     ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ●  │
└──────────────────────────────────────────────────────────┘
```

- Rows = topics, columns = days (most recent right)
- Dot color: 🟢 strong · 🟡 partial · 🔴 poor · ⬜ not studied
- Topics sorted: weakest (most red) at top
- Hovering a cell → tooltip: date, session mode, confidence rating
- Clicking a topic row → launches session for that topic

**States:**
- Default: all topics, last 30 days
- Filtered by subject

**Data needed:** per-session confidence ratings per topic, session dates

---

## Tab 3 — Prospective

Calendar showing future review dates.

```
┌──────────────────────────────┬───────────────────────┐
│  November 2024    ‹   ›      │  Tuesday, Nov 5       │
│                              │  ─────────────────    │
│  M  T  W  T  F  S  S        │  Neurobiology   BOX 7 │
│        ●●              ●     │  Heuristic Analysis   │
│  ●● ●●●●  ●  ●  ●● ●●  ●   │  Post-Structuralism   │
│  ●  ●  ●  ●  ●              │  Functional React.    │
│                              │                       │
└──────────────────────────────┴───────────────────────┘
```

- Month calendar, colored dots per day = topics due
- Dense days visually show review overload at a glance
- Clicking a day → side panel lists topics due with subject + box number
- Navigate month with ‹ ›

**States:**
- Default: current month
- Day selected: side panel opens with topics due
- Overloaded day: dot cluster shown as "+N more"

**Data needed:** projected next review date per card from SR intervals

---

## Tab 4 — Due Today

Full table view of today's due cards. More detail than the pinned header.

```
┌────────────────────────────────────────────────────────────┐
│  ☐  TOPIC                    SUBJECT    BOX  LAST    CONF  │
│  ☐  Memory Consolidation     Cog Sci    1    2d ago  ●●●○○ │
│  ☐  Synaptic Pruning         Neuro      2    5d ago  ●●○○○ │
│  ☐  The Zeigarnik Effect     Psych      1    Yesterday●●●●○│
│                                                            │
│                              [Start Session with Selected] │
└────────────────────────────────────────────────────────────┘
```

- Columns: checkbox, topic, subject tag, box number, last reviewed, confidence history dots
- Sortable by subject, box, last reviewed
- Bulk select → Start Session with Selected
- Select all shortcut

**Data needed:** due cards with full metadata

---

## Tab 5 — Analytics

Deep performance analysis. Answers: "Am I actually retaining things? Which techniques work best?"

### Mastery Heatmap

```
┌──────────────────────────────────────────────────────┐
│  MASTERY HEATMAP                     ■ LOW   ■ HIGH  │
│  STUDY INTENSITY × SUCCESS RATE (PAST 12 MONTHS)    │
│                                                      │
│  [GitHub-style yearly grid — darker = more mastery] │
│                                                      │
│  Total Sessions: 1,204   Peak: 94.2%   Active: 482h │
│                                    [Generate Report] │
└──────────────────────────────────────────────────────┘
```

- GitHub-style yearly grid: each cell = one day
- Color intensity = study intensity × success rate combined
- Hover → date, sessions, avg confidence
- Generate Report → exports PDF summary

### Evidence of Work

```
┌───────────────────┐
│  EVIDENCE OF WORK │
│                   │
│  124              │
│  Consecutive Days │
│  ✓ Verified by    │
│    Activity Log   │
└───────────────────┘
```

### Mastery by Subject

```
┌──────────────────────────────┐
│  MASTERY BY SUBJECT          │
│  Organic Chemistry    88% ██ │
│  Neuroscience         74% ██ │
│  Statistical Models   91% ██ │
└──────────────────────────────┘
```

### Retention Curves

```
┌──────────────────────────────────────────────────────┐
│  RETENTION CURVES                                    │
│  EBBINGHAUS FORGETTING VS. ACTUAL PERFORMANCE        │
│                                                      │
│  100% ─────────────────────────────────────          │
│        ╲  theoretical                                │
│         ╲─────  your performance                    │
│   0%                              30 DAY INTERVAL   │
│  ── Theoretical Forgetting  ── Your Performance     │
└──────────────────────────────────────────────────────┘
```

- Two lines: Ebbinghaus theoretical forgetting curve vs user's actual retention
- Beating the curve = spaced repetition working
- Falling below = flag to increase review frequency

### Technique Efficiency

```
┌──────────────────────────────────────────────────────┐
│  TECHNIQUE EFFICIENCY                                │
│  MASTERY GAINS PER HOUR OF APPLICATION              │
│                                                      │
│  Spaced Repetition   18.5%/hr  ████████████         │
│  Feynman Technique   14.2%/hr  █████████            │
│  Blurting            11.8%/hr  ████████             │
│  Active Recall        9.4%/hr  ██████               │
│                                                      │
│  "Spaced Repetition continues to show highest ROI   │
│   for long-term retention..."  — AI insight         │
└──────────────────────────────────────────────────────┘
```

- Bars ranked by efficiency (mastery gain per hour)
- AI insight at bottom: 1–2 sentence recommendation based on data

---

## Session History (bottom, always visible)

Log of all past sessions, shown below whichever tab is active.

```
┌────────────────────────────────────────────────────────────────┐
│  SESSION HISTORY                              View All Records  │
│                                                                │
│  DATE        MODE          SUBJECT        DUR    CARDS  CONF   │
│  Oct 24      Active Recall Theoretical Phys 42m  84    92%    │
│  Oct 23      Spaced Rep    Molecular Bio    18m  32    88%    │
│  Oct 22      Deep Dive     Neuroplasticity  58m  112   95%    │
└────────────────────────────────────────────────────────────────┘
```

- Clicking a row → session detail modal
- "View All Records" → full paginated history

**Data needed:** session records with all metadata

---

## Navigation Behaviour

- Tabs switch without page reload
- Due Today header pinned above tabs always
- Subject filter (top right, all tabs) applies across Leitner, Retrospective, Prospective simultaneously
- Analytics tab has no subject filter — shows all subjects

---

## Related Components to Plan

- `DueTodayHeader` — [[components/progress/due-today-header]]
- `LeitnerBoard` — [[components/progress/leitner-board]]
- `RetrospectiveGrid` — [[components/progress/retrospective-grid]]
- `ProspectiveCalendar` — [[components/progress/prospective-calendar]]
- `DueTodayTable` — [[components/progress/due-today-table]]
- `MasteryHeatmap` — [[components/progress/mastery-heatmap]]
- `EvidenceOfWork` — [[components/progress/evidence-of-work]]
- `MasteryBySubject` — [[components/progress/mastery-by-subject]]
- `RetentionCurves` — [[components/progress/retention-curves]]
- `TechniqueEfficiency` — [[components/progress/technique-efficiency]]
- `SessionHistoryTable` — [[components/progress/session-history-table]]
