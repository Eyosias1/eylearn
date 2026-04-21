# Session — Active Recall Wireframe

Mode key: `active_recall`
Layout: [[session-layout]]
Feature: [[active-recall]] · [[elaborative-interrogation]]

---

## Sub-state 1: Questioning

```
┌─────────────────────────────────┐
│  How confident are you?         │
│  [Low]  [Medium]  [High]        │
│                                 │
│  ┌───────────────────────────┐  │
│  │                           │  │
│  │  What is the mechanism    │  │
│  │  of action of beta        │  │
│  │  blockers?                │  │
│  │                           │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │ Type your answer...       │  │
│  │                           │  │
│  │                           │  │
│  └───────────────────────────┘  │
│                                 │
│  [Hint ⚠]          [Submit →]  │
└─────────────────────────────────┘
```
- Confidence buttons shown ABOVE question
- Hint button subtle, destructive-colored (warns of penalty)
- Submit disabled until confidence is picked
- Blank submit → auto Wrong, correct answer still shown

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
│  │ antagonize catecholamines  │ │
│  │ at β-adrenergic receptors..│ │
│  └───────────────────────────┘  │
│                                 │
│  How did you do?                │
│  [✗ Wrong] [~ Partial] [✓ Correct]│
└─────────────────────────────────┘
```
- Both answers shown in cards
- Rating buttons large and clear
- If hint used → "Hint used — max Partial" shown, Correct button disabled

---

## Sub-state 2b: Elaborative Follow-up (toggle ON only)

Fires immediately after Sub-state 2, before moving to next question.

```
┌─────────────────────────────────┐
│  Go deeper                      │
│                                 │
│  Why does this work?            │  ← AI-generated follow-up
│  (or "How does this connect     │
│   to [related concept]?")       │
│                                 │
│  ┌───────────────────────────┐  │
│  │ Type your explanation...  │  │
│  │                           │  │
│  └───────────────────────────┘  │
│                                 │
│  [Skip]            [Submit →]   │
└─────────────────────────────────┘
```
- Only shown when elaborative toggle is ON in setup
- Skippable — skip = Surface depth rating
- No correct answer shown — AI evaluates freely
- Depth rating (Surface / Functional / Deep) added to end-of-session batch

---

## Sub-state 3: Micro-Reflection (Wrong only)

```
┌─────────────────────────────────┐
│  What did you confuse           │
│  this with?                     │
│                                 │
│  ┌───────────────────────────┐  │
│  │ Type a quick note...      │  │
│  └───────────────────────────┘  │
│                                 │
│  [Skip]            [Save & Next]│
└─────────────────────────────────┘
```
- Lightweight, skippable
- No penalty for skipping
- Saved entries feed into exam simulation question targeting

---

## Mode-specific Components

- `QuestionCard` — question text + subject badge
- `ConfidenceRating` — Low / Medium / High buttons
- `AnswerInput` — textarea + hint button + submit
- `AnswerReveal` — user answer + correct answer + rating buttons
- `ElaborativePrompt` — why/how follow-up + textarea + skip
- `MicroReflection` — confusion prompt + textarea + skip
