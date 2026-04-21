# Session Layout Wireframe

Route: `/session`
Shared across all modes: [[session-active-recall]] · [[session-blurting]] · [[session-feynman]] · [[session-pretest]] · [[session-exam]]

---

## Page State Machine

```
setup → session → summary → /dashboard
                ↑
         (overlays fire on top of session)
```

The page has 3 top-level phases. Within session, overlays fire on top without leaving the session state.

---

## Phase 1 — Setup

### Layout
Full centered column, max-width md. No distractions.

```
┌─────────────────────────────────┐
│  Start a session                │  ← page title
│  Choose a mode to begin         │  ← subtitle
│                                 │
│  ┌──────────┐  ┌──────────┐    │
│  │  Active  │  │ Blurting │    │  ← row 1
│  │  Recall  │  │   Mode   │    │
│  └──────────┘  └──────────┘    │
│  ┌──────────┐  ┌──────────┐    │
│  │ Feynman  │  │ Pre-Test │    │  ← row 2
│  │   Mode   │  │          │    │
│  └──────────┘  └──────────┘    │
│  ┌──────────┐                  │
│  │   Exam   │                  │  ← row 3
│  │ Simulation│                 │
│  └──────────┘                  │
│                                 │
│  Topics                         │
│  ┌─────────────────────────┐   │
│  │ [subject chips]         │   │
│  └─────────────────────────┘   │
│                                 │
│  ○ Interleave topics (default on)│  ← only if 2+ subjects
│  ○ Go deep — elaborative mode  │  ← only if Active Recall selected
│                                 │
│  Session length                 │
│  [25 min] [50 min] [Custom]    │  ← hidden in Exam mode
│                                 │
│  Exam duration (Exam mode only) │
│  [30 min] [60 min] [90 min]    │  ← hidden in all other modes
│                                 │
│  [Start Session]                │
└─────────────────────────────────┘
```

### Mode Card
Each card shows:
- Icon
- Mode name
- One-line description
- Selected state (ring + checkmark)

---

## Phase 2 — Persistent Session Header (all modes)

```
┌─────────────────────────────────────┐
│ ← Exit  [Biology · Topic name]  12:34│
│ ████████████░░░░░░░░  8 / 24        │
└─────────────────────────────────────┘
```
- Exit button → confirms before leaving
- Subject + topic label (updates as questions interleave)
- Timer top right — Pomodoro for all modes except Exam (countdown)
- Progress bar + question count — hidden in Exam mode (replaced by question nav bar)

---

## Overlays (fire on top of any session state, except Exam)

### Gap Prompt
```
┌─────────────────────────────────┐
│                                 │
│       🧠                        │
│  Pause for 10 seconds           │
│  Let your mind rest             │
│                                 │
│  [██████████] 10s               │  ← auto countdown
│                                 │
│              [Resume]           │
└─────────────────────────────────┘
```
- Full screen dimmed overlay
- Auto-dismisses after 10s or on Resume
- Does NOT fire in Exam mode

### Session Checkpoint (every 10 questions, Active Recall only)
```
┌─────────────────────────────────┐
│  Checkpoint — 10 questions      │
│                                 │
│  Biology      ✓8  ~1  ✗1       │
│  Chemistry    ✓5  ~3  ✗2       │
│                                 │
│  [End Session]   [Keep Going →] │
└─────────────────────────────────┘
```

### Interleave Switch Prompt (Active Recall + Pre-Test only)
```
┌─────────────────────────────────┐
│  Time to switch subjects        │
│                                 │
│  Next up: Chemistry             │
│                                 │
│              [Continue →]       │
└─────────────────────────────────┘
```

---

## End-of-Session States (Active Recall only)

### Weak Spot Re-Queue
Same UI as Active Recall questioning/revealing sub-states.
Header shows: "Re-queue — 5 questions to revisit"

### Mistake Review
```
┌─────────────────────────────────┐
│  Mistake Review  3 / 5          │
│                                 │
│  Question                       │
│  ┌───────────────────────────┐  │
│  │ What is the mechanism...  │  │
│  └───────────────────────────┘  │
│                                 │
│  Correct answer                 │
│  ┌───────────────────────────┐  │
│  │ Beta blockers competitively│ │
│  │ antagonize...             │  │
│  └───────────────────────────┘  │
│                                 │
│  [Your reflection if any]       │
│                                 │
│                     [Next →]    │
└─────────────────────────────────┘
```
- Read only, no rating
- Reflection shown if user wrote one

### AI Grading — Loading
```
┌─────────────────────────────────┐
│                                 │
│  Analysing your session...      │
│  [spinner]                      │
│                                 │
│  Reviewing 24 answers           │
│  Comparing against your notes   │
│  Building calibration report    │
│                                 │
└─────────────────────────────────┘
```
- Animated steps so user knows what's happening

### AI Grading — Results
```
┌─────────────────────────────────┐
│  AI Feedback                    │
│                                 │
│  Patterns observed              │
│  ┌───────────────────────────┐  │
│  │ You confused X with Y     │  │
│  │ across 3 questions        │  │
│  └───────────────────────────┘  │
│                                 │
│  Confidence calibration         │
│  ┌───────────────────────────┐  │
│  │ 4× overconfident (H+Wrong)│  │
│  │ 2× underconfident (L+Right)│ │
│  └───────────────────────────┘  │
│                                 │
│  Per-answer review              │
│  ┌───────────────────────────┐  │
│  │ Q1  AI: Partial  You: ✓   │  │
│  │ "You got X but missed Y"  │  │
│  │ [Override →]              │  │
│  ├───────────────────────────┤  │
│  │ Q2  AI: ✓  You: ✓        │  │
│  │ "Well explained"          │  │
│  └───────────────────────────┘  │
│                                 │
│              [Confirm & Finish] │
└─────────────────────────────────┘
```

---

## Phase 3 — Summary (all modes)

```
┌─────────────────────────────────┐
│  Session Complete               │
│  25 min · 24 questions          │
│                                 │
│  Overall  ✓14  ~6  ✗4          │
│                                 │
│  By topic                       │
│  ┌───────────────────────────┐  │
│  │ 🟢 Biology      88%       │  │
│  │ 🟡 Chemistry    61%       │  │
│  │ 🔴 Pharmacology 40%       │  │
│  └───────────────────────────┘  │
│                                 │
│  Next reviews                   │
│  Biology → in 4 days            │
│  Chemistry → tomorrow           │
│  Pharmacology → tomorrow        │
│                                 │
│  [Back to Dashboard]            │
└─────────────────────────────────┘
```

---

## Shared Components

- `SessionShell` — top-level state machine (setup / session / summary)
- `SessionSetup` — full setup screen
- `ModeCard` — mode option card
- `TopicPicker` — subject + topic multi-select
- `SessionLengthPicker` — 25 / 50 / custom
- `ExamDurationPicker` — 30 / 60 / 90 min (exam mode only)
- `InterleaveToggle` — shown only with 2+ subjects
- `ElaborativeToggle` — shown only with Active Recall selected
- `SessionHeader` — progress bar, timer, subject label, exit button
- `GapPrompt` — 10s pause overlay
- `SessionCheckpoint` — accuracy snapshot overlay
- `InterleavePrompt` — subject switch overlay
- `WeakSpotHeader` — re-queue banner
- `MistakeReviewCard` — read-only question + answer + reflection
- `AIGradingLoader` — animated loading state
- `AIGradingResults` — patterns + calibration + per-answer list
- `AIFeedbackCard` — individual answer feedback row
- `SessionSummary` — summary screen
- `TopicResultCard` — per-topic accuracy + health + next review
