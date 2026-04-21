# Blurting Mode

**Type:** Study Session Mode
**Mode key:** `blurting`

## What it does
User sees only a topic title. They write everything they can remember from scratch. When done, source material is revealed and AI highlights what they missed.

## Flow
1. Topic title shown — source material hidden
2. User writes everything they remember (no time limit)
3. Submit
4. Source material revealed side by side
5. AI highlights gaps: ✅ recalled / ⚠️ partial / ❌ missed
6. User rates overall: Strong / OK / Weak
7. [[spaced-repetition]] interval updated

## Behaviors active in this mode
- [[session-timer]] — Pomodoro + gap effect prompts

## Inputs
- Selected topic
- User's free-recall text

## Outputs
- Side-by-side comparison: user recall vs. source
- Completeness score (% of key concepts recalled)
- Color-highlighted gaps
- Updated [[spaced-repetition]] schedule

## Edge cases
- Correct but differently phrased → AI matches by meaning, not exact wording
- Very short or blank submission → flagged as "not attempted," topic marked red

## Related
- [[active-recall]] — question-based alternative to blurting
- [[feynman-mode]] — similar free-recall but evaluates explanation quality
- [[spaced-repetition]] — drives next review dates
- [[note-ingestion]] — source material compared against
