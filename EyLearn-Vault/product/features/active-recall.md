# Active Recall

**Type:** Study Session Mode
**Mode key:** `active_recall`

## What it does
Presents questions one at a time with no hints or cues. User types their answer, submits, then sees the correct answer and self-rates their recall quality. At the end, AI grades all answers in batch, surfaces patterns, and delivers a calibration report.

## Per-Question Flow
1. Question shown — no hints, no cues
2. User picks confidence: Low / Medium / High → [[confidence-rating]]
3. User types answer freely
4. Submit (blank = auto Wrong)
5. Correct answer revealed
6. If [[elaborative-interrogation]] is ON → follow-up "why/how" prompt shown, user types causal explanation, submit
7. User self-rates: Correct / Partial / Wrong
8. Next question (interleaved across topics if [[interleaved-practice]] is on)

## End-of-Session Flow
1. Last question answered
2. [[weak-spot-requeue]] — Wrong/Partial questions get one more pass
3. [[mistake-review]] — still-wrong answers shown read-only
4. [[ai-grading]] — AI grades all answers in batch:
   - Per-answer verdict + 1-2 sentence feedback
   - Pattern observations across questions
   - "Dig deeper" insights from notes + AI knowledge
   - Confidence calibration report (overconfident / underconfident moments)
   - User can override any AI-suggested rating
5. Session summary — per-topic accuracy, updated health colors, next review dates

## Behaviors active in this mode
- [[confidence-rating]] — pre-answer confidence check
- [[hint-penalty]] — hint available, caps rating at Partial
- [[micro-reflection]] — "What did you confuse this with?" after Wrong
- [[weak-spot-requeue]] — Wrong/Partial re-run at end of session
- [[session-checkpoint]] — accuracy snapshot every 10 questions
- [[mistake-review]] — read-only re-exposure before AI grading
- [[ai-grading]] — batch grading + feedback at end of session
- [[interleaved-practice]] — shuffled queue across subjects
- [[session-timer]] — Pomodoro + gap effect prompts
- [[elaborative-interrogation]] — optional toggle; adds "why/how" follow-up after each answer

## Inputs
- Selected subjects / topics
- Session length (user-defined or AI-recommended)
- Interleave toggle (on by default with 2+ subjects)
- Elaborative interrogation toggle (off by default)

## Outputs
- Per-question self-rating (user confirmed or AI-suggested)
- AI feedback per answer
- Calibration report (confidence vs. actual performance)
- Pattern observations across the session
- Depth rating per question if [[elaborative-interrogation]] is ON (Surface / Functional / Deep)
- Updated [[spaced-repetition]] schedule

## Edge cases
- Blank submission → counts as Wrong, correct answer still shown
- Session interrupted → progress saved, resumes where left off
- User overrides AI rating → overridden rating used for spaced repetition

## Related
- [[pre-test]] — can run before this session to prime the brain
- [[spaced-repetition]] — drives next review dates
- [[progress-dashboard]] — updated after session ends
- [[ai-grading]] — end-of-session batch analysis
