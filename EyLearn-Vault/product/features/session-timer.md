# Session Timer with Gap Effects

**Type:** Session Infrastructure (all modes)

## What it does
A Pomodoro-style timer that runs during all study sessions. At random intervals it fires a 10-second gap prompt — a visual cue to pause and let the brain idle briefly.

## Timer options
- Work interval: 25 min (default), adjustable up to 90 min
- Short break: 5 min
- Long break: 15–30 min after 4 sessions

## Gap effect behavior
- Fires randomly 3–6 times per session
- Prompt: "Pause for 10 seconds — let your mind rest"
- User clicks Resume to continue

## Three timers in a session
| Timer | Purpose | Trigger |
|---|---|---|
| Pomodoro | Work/break cycles | Fixed interval |
| Gap effect | 10s brain rest | Random |
| Interleave switch | Switch subject | Fixed interval (if [[interleaved-practice]] on) |

## Related
- [[active-recall]] — runs during session
- [[blurting-mode]] — runs during session
- [[feynman-mode]] — runs during session
- [[pre-test]] — runs during session
- [[interleaved-practice]] — separate subject-switch timer
