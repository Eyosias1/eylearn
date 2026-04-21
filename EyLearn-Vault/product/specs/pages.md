# App Pages

**Total: 12 pages**

---

## Public Pages (logged out)

| # | Page | Description |
|---|---|---|
| 1 | **Landing Page** | Hero, how it works, comparison to flashcards, CTA to sign up |
| 2 | **Sign Up** | Email + password |
| 3 | **Log In** | Email + password |

---

## Onboarding (first-time only)

| # | Page | Description |
|---|---|---|
| 4 | **Onboarding Step 1** | Add first subject + optional exam date |
| 5 | **Onboarding Step 2** | Energy tracking explanation + 7-day logging setup |

---

## Core App Pages (logged in)

| # | Page | Description |
|---|---|---|
| 6 | **Home / Dashboard** | Topics due today, streak, quick-start session button |
| 7 | **Progress View** | Knowledge graph — nodes colored by health, subject clusters, side panel on click |
| 8 | **Study Session** | One page, four modes: active recall / blurting / feynman / pretest |
| 9 | **Add Content** | Paste notes → AI generates questions → user reviews and edits |
| 10 | **Study Plan** | Weekly calendar of AI-scheduled study sessions |
| 11 | **Subject / Topic View** | All topics in a subject, health per topic, add new topics |

---

## Settings

| # | Page | Description |
|---|---|---|
| 12 | **Settings** | Profile, peak productivity window, notification preferences |

---

## Notes

- **Page 8 (Study Session)** is the heaviest to build — one page with four distinct modes (active recall, blurting, feynman, pretest), each with different UI states and AI interactions
- **Page 7 (Progress View)** is the most visually complex — interactive knowledge graph with floating nodes, health colors, zoom, filters, and a slide-in side panel
- Pages 2–3 can use a simple auth provider (Supabase Auth) to avoid building from scratch
- Pages 4–5 only appear once per user — skip on all subsequent logins
