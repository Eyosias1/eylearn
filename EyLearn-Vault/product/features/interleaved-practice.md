# Interleaved Practice

**Type:** Behavior within [[active-recall]] and [[pre-test]]

## What it does
When a session includes multiple subjects, questions are mixed across topics rather than exhausting one subject at a time. Also adds a block-level timer prompt to switch subjects after a set interval.

## Two layers
1. **Question-level** — shuffled queue rotates across all selected topics
2. **Block-level** — timer fires every 25–90 min prompting the user to switch active subject

## Inputs
- 2+ subjects selected in session setup
- Interleave toggle (on by default)
- Block interval: 25–90 min (default 25 min)

## Outputs
- Shuffled question queue across subjects
- Subject label shown on each question card
- Timer overlay: "Switch to [Subject]?" prompt at interval

## Related
- [[active-recall]] — primary mode this applies to
- [[pre-test]] — also benefits from interleaving across subjects
- [[session-timer]] — block-level switch prompt is a separate timer from Pomodoro
