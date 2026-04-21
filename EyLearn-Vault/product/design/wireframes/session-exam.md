# Session — Exam Simulation Wireframe

Mode key: `exam`
Layout: [[session-layout]]
Feature: [[exam-simulation]]

---

## What's different from all other modes

- All questions shown at once — not one at a time
- Free navigation between questions
- No hints, no confidence rating, no gap prompts, no checkpoints
- No feedback until submission
- Countdown timer (not Pomodoro)
- AI verdict is final — no self-rating override

---

## Sub-state 1: Exam in Progress

### Header (replaces standard session header)
```
┌─────────────────────────────────────┐
│ ← Exit        Exam · Biology    42:17│  ← countdown timer
│ No hints · No feedback until submit  │  ← reminder strip
└─────────────────────────────────────┘
```

### Question Navigation Bar
```
┌─────────────────────────────────┐
│  Q1 ●  Q2 ●  Q3 ○  Q4 ○  Q5 ○ │
│  Q6 ○  Q7 ○  Q8 ○  Q9 ○  Q10 ○│
└─────────────────────────────────┘
```
- ● = answered (user has typed something)
- ○ = unanswered
- Clicking any number jumps directly to that question

### Question Card
```
┌─────────────────────────────────┐
│  Question 3 of 10               │
│                                 │
│  ┌───────────────────────────┐  │
│  │ Explain how spaced        │  │
│  │ repetition combats the    │  │
│  │ forgetting curve.         │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │ Type your answer...       │  │
│  │                           │  │
│  │                           │  │
│  └───────────────────────────┘  │
│                                 │
│  [← Prev]              [Next →] │
│                                 │
│              [Submit Exam ⚠]    │  ← destructive color
└─────────────────────────────────┘
```
- No hint button
- No confidence rating
- Answer text persists as user navigates between questions
- Submit Exam → confirmation dialog before locking

### Submit Confirmation Dialog
```
┌─────────────────────────────────┐
│  Submit exam?                   │
│                                 │
│  6 / 10 questions answered.     │
│  Unanswered = marked Wrong.     │
│                                 │
│  Once submitted you can't       │
│  go back.                       │
│                                 │
│  [Cancel]        [Submit →]     │
└─────────────────────────────────┘
```

---

## Sub-state 2: Auto-Submit Warning (30s remaining)

Non-blocking banner at bottom — does not interrupt the current answer.

```
┌─────────────────────────────────┐
│  ⚠ 30 seconds remaining        │
│  6 / 10 questions answered      │
│  [Keep Going]    [Submit Now]   │
└─────────────────────────────────┘
```
- Appears at bottom of screen
- Does not replace the question card
- Timer hits 0 → auto-submits with no dialog

---

## Sub-state 3: AI Grading

Same AI Grading Loading and Results states as [[session-layout]], with two differences:
- No self-rating step (AI verdict is final, no override)
- No confidence calibration section (confidence rating was not collected)

```
┌─────────────────────────────────┐
│  Exam Results                   │
│                                 │
│  Score: 7 / 10                  │
│                                 │
│  By topic                       │
│  ┌───────────────────────────┐  │
│  │ 🟢 Biology      88%       │  │
│  │ 🔴 Pharmacology 40%       │  │
│  └───────────────────────────┘  │
│                                 │
│  Per-question feedback          │
│  ┌───────────────────────────┐  │
│  │ Q1  ✓  "Well explained"   │  │
│  ├───────────────────────────┤  │
│  │ Q3  ✗  "Missed the role   │  │
│  │        of acetylcholine"  │  │
│  └───────────────────────────┘  │
│                                 │
│              [Done →]           │
└─────────────────────────────────┘
```

---

## Mode-specific Components

- `ExamHeader` — countdown timer + reminder strip (replaces `SessionHeader`)
- `ExamQuestionNav` — numbered nav bar (● answered / ○ unanswered)
- `ExamQuestionCard` — question + answer textarea + prev/next + submit button
- `ExamConfirmDialog` — submit confirmation with unanswered count
- `ExamSubmitWarning` — 30s countdown banner (non-blocking)
- `ExamResults` — score + topic breakdown + per-question feedback (no override)
