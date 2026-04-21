# Peak Window Tracker

**Type:** Progress & Tracking

## What it does
During onboarding, the user logs their energy level (1–5) up to 3 times a day for 7 days. The app identifies their peak productivity window and uses it to schedule the hardest sessions at the right time.

## Flow
1. Onboarding prompt to log energy 3x/day for 7 days
2. User logs: energy level (1–5) + time of day
3. After 7 days → AI identifies peak window
4. "Your peak focus window is 6AM–8AM"
5. Peak window saved to profile
6. [[ai-study-plan]] schedules hardest sessions during this window

## Edge cases
- User skips logging days → app uses available data, defaults to morning
- Pattern changes over time → option to re-run from settings
- Irregular schedule → manual override available in settings

## Related
- [[ai-study-plan]] — consumes peak window to schedule hard sessions
