# AI Grading & Feedback

**Type:** Behavior within [[active-recall]]

## What it does
After the session ends (post [[weak-spot-requeue]] and [[mistake-review]]), AI grades all answers in one batch. It uses the user's source notes plus its own knowledge to give constructive feedback, spot patterns, and produce a confidence calibration report. The user can override any AI-suggested rating before the final summary is saved.

## Trigger
Fires once per session — after [[mistake-review]], before the final summary.

## What AI delivers
- **Per-answer verdict** — Correct / Partial / Wrong suggestion with 1-2 sentences explaining what was right, what was missing, and what was confused
- **Extra context** — pulls from source notes + broader knowledge to enrich the correct answer ("You got the mechanism right but missed that it's clinically inhibited by X")
- **Pattern observations** — cross-question insights ("You missed process-type questions consistently" / "You confused X with Y across 3 answers")
- **Confidence calibration report** — from [[confidence-rating]] data:
  - Overconfident moments: High confidence + Wrong/Partial
  - Underconfident moments: Low confidence + Correct
  - Summary pattern if recurring

## User override
- AI-suggested rating shown alongside user's self-rating
- User can confirm or override each question's final rating
- Overridden rating is what feeds [[spaced-repetition]]

## Inputs
- All question + answer pairs from the session
- User's self-ratings
- User's confidence ratings (Low / Medium / High per question)
- Source material for each topic (from [[note-ingestion]])

## Outputs
- Per-answer AI feedback (verdict + explanation)
- 2-3 session-level pattern observations
- Confidence calibration report
- Final confirmed ratings (user-confirmed or overridden) → fed to [[spaced-repetition]]

## Edge cases
- User overrides all AI ratings → overridden ratings used, AI feedback still shown
- AI confidence low on a particular answer → flagged as "hard to assess — review manually"
- Source material missing for a topic → AI grades from general knowledge only, flagged

## Related
- [[active-recall]] — the mode this lives in
- [[confidence-rating]] — data source for calibration report
- [[weak-spot-requeue]] — runs before AI grading
- [[mistake-review]] — runs before AI grading
- [[spaced-repetition]] — final confirmed ratings update intervals
- [[note-ingestion]] — source material used for grading context
