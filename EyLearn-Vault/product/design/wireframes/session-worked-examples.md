# Session — Worked Examples Wireframe

Mode key: `worked_examples`
Layout: [[session-layout]]
Feature: [[worked-examples]]

---

## Sub-state 1: Study

```
┌─────────────────────────────────┐
│  Study this example             │
│                                 │
│  ┌───────────────────────────┐  │
│  │  Mechanism of Action:     │  │
│  │  Beta Blockers            │  │
│  │                           │  │
│  │  Step 1. Beta blockers    │  │
│  │  bind competitively to    │  │
│  │  β1/β2 adrenergic         │  │
│  │  receptors...             │  │
│  │                           │  │
│  │  Step 2. Displacement of  │  │
│  │  catecholamines           │  │
│  │  (norepinephrine,         │  │
│  │  epinephrine)...          │  │
│  │                           │  │
│  │  Step 3. ↓ cAMP →        │  │
│  │  ↓ heart rate, ↓ BP...   │  │
│  └───────────────────────────┘  │
│                                 │
│           [Hide & Reproduce →]  │
└─────────────────────────────────┘
```
- Full example shown, no time limit
- User controls when to proceed
- Source material pulled directly from notes

---

## Sub-state 2: Reproduction

```
┌─────────────────────────────────┐
│  Now reproduce the reasoning    │
│                                 │
│  Beta Blockers — Mechanism      │
│  of Action                      │  ← title only, no steps shown
│                                 │
│  ┌───────────────────────────┐  │
│  │ Write each step...        │  │
│  │                           │  │
│  │                           │  │
│  │                           │  │
│  └───────────────────────────┘  │
│                                 │
│                   [Submit →]    │
└─────────────────────────────────┘
```
- Solution fully hidden
- Title shown as the only cue
- Blank submit → counts as Weak, solution re-shown

---

## Sub-state 3: Comparison

```
┌──────────────────┬──────────────┐
│  Your version    │ Original     │
│  ─────────────   │ ──────────   │
│  [user text]     │ ✅ Step 1    │
│                  │ ✅ Step 2    │
│                  │ ⚠️ Step 3   │
│                  │ ❌ Step 4    │
└──────────────────┴──────────────┘
│  Completeness: 7 / 9 steps      │
│                                 │
│  [Weak]    [OK]    [Strong]     │
└─────────────────────────────────┘
```
- Side by side on desktop, stacked on mobile
- ✅ reproduced correctly
- ⚠️ reproduced but incomplete or imprecise
- ❌ missed entirely
- AI matches by meaning, not exact wording or order
- User self-rates: Weak / OK / Strong → updates spaced repetition

---

## Mode-specific Components

- `WorkedExampleViewer` — full example display + hide button
- `ReproductionInput` — title cue + free-text textarea + submit
- `StepComparison` — two-column layout with ✅ ⚠️ ❌ per step
- `CompletenessScore` — X / Y steps + Weak / OK / Strong rating buttons
