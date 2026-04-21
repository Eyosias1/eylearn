# EyLearn Vault — Claude Guide

This vault is the single source of truth for the eyLearn product. It covers business strategy, product design, research, architecture, and build decisions. Read this file before doing anything in this vault.

---

## Vault Structure

```
EyLearn-Vault/
  business/          ← why we're building this
  product/           ← what we're building and how
    specs/           ← requirements and pages
    design/          ← UX, UI, wireframes, components, design system
      flows/         ← user flows and stories
      wireframes/    ← page-level UI plans (before building)
      components/    ← component-level plans (before building)
      system/        ← design system and shared components
    ai/              ← AI strategy and prompts
    architecture/    ← data model, tech stack, system design
    features/        ← one file per feature, linked with [[wiki links]]
    modes/           ← study session modes and their behaviors
  research/          ← evidence base behind every learning technique
  decisions/         ← Architecture Decision Records (ADRs) by type
    product/         ← feature, UX, methodology decisions
    technical/       ← stack, infrastructure decisions
    business/        ← pricing, positioning decisions
    design/          ← UI patterns, component decisions
  legal/             ← privacy policy, terms
  Learning Framework/ ← source research and learning methodology docs
```

Every folder has a `_[folder]-index.md` file that acts as a map of content for that folder. These are the hub nodes in Obsidian's graph view.

---

## How Features Are Documented

Every feature has its own file in `product/features/`. Each file follows this structure:

```
# Feature Name
**Type:** Mode / Behavior / Infrastructure / etc.

## What it does
## Flow (step by step)
## Inputs
## Outputs
## Edge cases
## Related (wiki links to connected features)
```

Features are connected via `[[wiki links]]`. Never rename a feature file from the terminal — always rename inside Obsidian so links update automatically.

---

## How to Build a Page or Component

Follow these steps in order. Never skip to code without completing the plan.

### Step 1 — Page Wireframe
File: `product/design/wireframes/[page-name].md`

Document:
- What states does this page have (e.g. setup / session / summary)
- What is on screen in each state
- What data does each state need
- How does the user move between states

### Step 2 — Component Plan
File: `product/design/components/[page]/[component-name].md`

Document for each component:
- What does it render
- What props does it take
- What state does it own internally
- Which child components does it use
- Which state/context does it read from

### Step 3 — Build
Write the code following the component plan. One component per file. Files under 100 lines. Logic in hooks, not components.

### Step 4 — Record Non-Obvious Decisions
If you made a choice during the build that isn't obvious from the code — a tradeoff, a rejected alternative, a constraint — add an ADR to `decisions/design/`.

---

## How Decisions Are Recorded

Every non-obvious decision gets an ADR in `decisions/[type]/[number]-[slug].md`.

Types:
- `product/` — feature behaviour, UX, learning methodology
- `technical/` — stack, architecture, infrastructure
- `business/` — pricing, positioning, market
- `design/` — UI patterns, component choices

ADR structure:
```
# [number] — [Title]
**Status:** Decided / Proposed / Superseded
**Date:** YYYY

## Decision
## Reasons
## Alternatives considered
## Consequences
```

Number resets to 001 within each type folder.

---

## How Research Is Used

Every learning technique in the app has a corresponding file in `research/`. Each file documents:
- The core concept
- Key studies (add citations as you find them)
- How it maps to a specific eyLearn feature via `[[wiki links]]`

When building a feature, read its research file first so the implementation decisions are grounded in the evidence.

---

## Obsidian Graph View

The vault is designed to be navigated visually in Obsidian. Key rules:
- `[[wiki links]]` connect related files — use them liberally
- `_[folder]-index.md` files are hub nodes — every file in a folder should be linked from its index
- Always rename files inside Obsidian, never in the terminal — Obsidian auto-updates all links on rename
- Folders are for your navigation comfort — the graph ignores folder depth and connects by filename

---

## Study Session — Current State

The study session page (`/session`) is the most complex page in the app. It has:

- **4 modes:** `active_recall` / `blurting` / `feynman` / `pretest`
- **3 phases:** setup → session → summary
- **Active recall behaviors:** confidence rating, hint penalty, micro-reflection, weak spot re-queue, session checkpoint, mistake review, AI grading (batch, end of session)
- **Session infrastructure:** Pomodoro timer, gap effect prompts, interleaved practice (2+ subjects)

See `product/features/features-index.md` and `product/modes/modes-index.md` for the full picture.
Before building any part of the session page, read `product/design/wireframes/session-layout.md` first, then the mode-specific file: `session-active-recall.md`, `session-blurting.md`, `session-feynman.md`, `session-pretest.md`, or `session-exam.md`.
