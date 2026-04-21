# Session — Pre-Test Wireframe

Mode key: `pretest`
Layout: [[session-layout]]
Feature: [[pre-test]]

---

## What's different from Active Recall

Pre-test reuses the Active Recall question/reveal UI with three changes:
1. No confidence rating — user hasn't studied yet, confidence is meaningless
2. No hint button — defeats the purpose of the hypercorrection effect
3. Wrong answers are **not penalized** — getting things wrong is the point
4. Wrong answers flagged → surfaced first in the subsequent Active Recall session

---

## Sub-state 1: Questioning

```
┌─────────────────────────────────┐
│  ⚡ Pre-Test                    │  ← mode label, reminds user this is pre-study
│  Try to answer — it's okay      │
│  to get these wrong             │
│                                 │
│  ┌───────────────────────────┐  │
│  │  What is the mechanism    │  │
│  │  of action of beta        │  │
│  │  blockers?                │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │ Type your answer...       │  │
│  │                           │  │
│  └───────────────────────────┘  │
│                                 │
│  [Skip]            [Submit →]   │
└─────────────────────────────────┘
```
- No confidence rating
- No hint button
- Skip available — skipped = flagged as Wrong for surfacing later
- Reminder strip at top: "it's okay to get these wrong"

---

## Sub-state 2: Revealing

```
┌─────────────────────────────────┐
│  Your answer                    │
│  ┌───────────────────────────┐  │
│  │ [user's answer text]      │  │
│  └───────────────────────────┘  │
│                                 │
│  Correct answer                 │
│  ┌───────────────────────────┐  │
│  │ Beta blockers competitively│ │
│  │ antagonize catecholamines..│ │
│  └───────────────────────────┘  │
│                                 │
│  ✗ Flagged for your next        │
│    study session                │  ← shown if Wrong
│                                 │
│                     [Next →]    │
└─────────────────────────────────┘
```
- No self-rating — AI auto-determines correct / wrong
- Wrong answers show "Flagged for your next session" message
- No micro-reflection (user hasn't studied yet, nothing to reflect on)

---

## Post Pre-Test

After all questions answered:
```
┌─────────────────────────────────┐
│  Pre-Test Complete              │
│                                 │
│  7 / 10 flagged for study       │
│                                 │
│  These will appear first in     │
│  your Active Recall session     │
│                                 │
│  [Start Study Session →]        │
│  [Back to Dashboard]            │
└─────────────────────────────────┘
```
- CTA directly into Active Recall with flagged questions pre-loaded
- Pre-test score saved as baseline (not used for spaced repetition scheduling)

---

## Mode-specific Components

- `PreTestLabel` — mode reminder strip at top of question card
- `PreTestSummary` — flagged count + CTA into Active Recall
- Reuses `QuestionCard`, `AnswerInput`, `AnswerReveal` from Active Recall
