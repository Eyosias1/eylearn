# 003 — Self-Rating Primary, AI Grading Secondary

**Status:** Decided
**Date:** 2026

## Decision
User self-rates after each answer. AI grades in batch at end of session and suggests ratings — user can override.

## Reasons
- Self-rating keeps metacognitive load on the user (core product principle: "the struggle is the learning")
- Per-question AI grading breaks session flow and creates latency
- Batch grading at end gives AI full context across all answers — richer patterns, better feedback
- User override preserves agency and trust

## Alternatives considered
- AI grades each question immediately after submission
- AI grades only, no self-rating
- Self-rating only, no AI

## Consequences
- Session flow is uninterrupted
- AI feedback is richer and more contextual
- [[spaced-repetition]] uses final confirmed rating (self or AI-overridden)
