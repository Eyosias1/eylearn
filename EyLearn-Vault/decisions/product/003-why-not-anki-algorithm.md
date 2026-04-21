# 002 — Why Not the Anki Algorithm (SM-2)

**Status:** Decided
**Date:** 2026

## Decision
Use a simplified spaced repetition model instead of Anki's SM-2 algorithm.

## Reasons
- SM-2 requires precise ease factors and interval multipliers that create friction for self-rating
- Our model (correct → double, partial → same, wrong → reset) is simpler, more intuitive, and still evidence-based
- SM-2 optimizes for individual card recall; our model optimizes for topic-level health

## Alternatives considered
- SM-2 (Anki)
- FSRS (newer algorithm used in Anki v3)

## Consequences
- Less granular interval tuning per card
- Easier to explain to users ("correct doubles your interval")
- [[ai-grading]] calibration data could inform smarter intervals in a future version
