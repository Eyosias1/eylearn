# 004 — One Question at a Time

**Status:** Decided
**Date:** 2026

## Decision
Show one question at a time during active recall sessions, not grouped or paginated.

## Reasons
- [[confidence-rating]] only works with full attention on a single question
- Multiple visible questions create unintentional cross-question hints (violates "no cues" rule)
- Self-rating requires isolation — adjacent questions bias the judgment
- Gap effect and interleave prompts need a clean firing moment between questions

## Alternatives considered
- 5–6 questions per group
- Paginated (10 per page)
- All questions visible, user works through at own pace

## Consequences
- Session feels focused and deliberate
- [[session-checkpoint]] every 10 questions provides the natural pause point
- No "endless treadmill" feeling — checkpoints give progress visibility
