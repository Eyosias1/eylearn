# Session — Feynman Mode Wireframe

Mode key: `feynman`
Layout: [[session-layout]]
Feature: [[feynman-mode]]

---

## Sub-state 1: Explanation

```
┌─────────────────────────────────┐
│  Explain this concept as if     │
│  teaching a 5th grader:         │
│                                 │
│  Beta Blockers                  │  ← concept name, prominent
│                                 │
│  ┌───────────────────────────┐  │
│  │ Start explaining...       │  │
│  │                           │  │
│  │                           │  │
│  └───────────────────────────┘  │
│                   [Submit →]    │
└─────────────────────────────────┘
```
- Source material fully hidden
- No hints, no cues
- Very short submission → AI asks clarifying questions before evaluating
- Verbatim copy of source → flagged, user prompted to rephrase in own words

---

## Sub-state 2: Feedback

```
┌─────────────────────────────────┐
│  AI Feedback                    │
│                                 │
│  ✅ Explained well              │
│  ─────────────────              │
│  [list of concepts]             │
│                                 │
│  ⚠️ Unclear or jargon-heavy    │
│  ─────────────────              │
│  [list of concepts]             │
│                                 │
│  ❌ Missing entirely            │
│  ─────────────────              │
│  [list of concepts]             │
│                                 │
│  [Re-attempt]    [Done →]       │
└─────────────────────────────────┘
```
- Three fixed categories, always shown (empty category = collapsed)
- Re-attempt → returns to Sub-state 1, explanation textarea cleared
- Done → updates spaced repetition and exits

---

## Mode-specific Components

- `FeynmanPrompt` — concept name + explanation textarea + submit
- `FeynmanFeedback` — three-category AI feedback (✅ ⚠️ ❌) + re-attempt / done
