# Session — Blurting Mode Wireframe

Mode key: `blurting`
Layout: [[session-layout]]
Feature: [[blurting-mode]]

---

## Sub-state 1: Recall

```
┌─────────────────────────────────┐
│  Write everything you know      │
│  about:                         │
│                                 │
│  ┌───────────────────────────┐  │
│  │                           │  │
│  │   Beta Blockers           │  │  ← topic title, large
│  │                           │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │ Start writing...          │  │
│  │                           │  │
│  │                           │  │
│  │                           │  │
│  └───────────────────────────┘  │
│                                 │
│                   [Reveal →]    │
└─────────────────────────────────┘
```
- Source material fully hidden
- No time limit
- Blank submit → flagged as "not attempted", topic marked red

---

## Sub-state 2: Comparison

```
┌──────────────────┬──────────────┐
│  Your recall     │ Source       │
│  ─────────────   │ ──────────   │
│  [user text]     │ ✅ recalled  │
│                  │ ⚠️ partial   │
│                  │ ❌ missed    │
└──────────────────┴──────────────┘
│  Completeness: 67%              │
│  [Weak]  [OK]  [Strong]         │
```
- Side by side on desktop, stacked on mobile
- Color highlights on source side only
- AI matches by meaning, not exact wording
- User self-rates overall: Weak / OK / Strong → updates spaced repetition

---

## Mode-specific Components

- `BlurtingPrompt` — topic title + free recall textarea + reveal button
- `BlurtingCompare` — two-column comparison with color-coded gap highlights
- `CompletenessScore` — percentage + Weak / OK / Strong rating buttons
