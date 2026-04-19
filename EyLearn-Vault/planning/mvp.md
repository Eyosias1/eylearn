# MVP Scope

---

## Guiding Principle

Ship the smallest version that proves the core thesis: **active recall + spaced repetition beats flashcards**. Everything else can come after users experience that.

---

## What Ships in v1

### Must-Have (Core Loop)

| Feature | Why It's in v1 |
|---|---|
| **Note Ingestion + AI Question Generator** | Without this, users have no content to study — it's the entry point |
| **Active Recall Study Session** | This is the core differentiator — the whole app is built around this |
| **Self-Rating (correct / partial / wrong)** | Required to power spaced repetition |
| **Spaced Repetition Scheduling** | What separates this from Quizlet — next review dates per topic |
| **Topic Health Board (green/yellow/red)** | Users need to see progress to stay motivated |
| **Pomodoro Timer with Gap Effects** | Low effort to build, high impact on session quality |
| **Basic Progress Dashboard** | Users need feedback to trust the system |

### Nice-to-Have in v1 (if time allows)

| Feature | Why It Could Wait |
|---|---|
| **Blurting Mode** | High value but adds complexity — include if build time allows |
| **AI Study Plan Builder** | Can be replaced by manual scheduling in v1 |

---

## What Ships in v2

| Feature | Why It's Post-v1 |
|---|---|
| **Feynman Mode** | Powerful but requires mature AI evaluation + UI — worth getting right |
| **Pre-Test Engine** | Depends on having a solid question bank first |
| **Interleaved Practice Scheduler** | Needs enough topics across subjects to be meaningful |
| **Energy Tracker + Peak Window** | Valuable but not core to the learning loop |
| **AI Study Plan Builder** | Needs performance data to generate a good plan — v2 has that |
| **Forgetting Curve Visualizer** | Polished analytics — users need a reason to care first |

---

## What's Never in Scope (v1 or v2)

| Feature | Why It's Out |
|---|---|
| Social / collaborative study | Scope creep — focus on individual learning first |
| Gamification (badges, leaderboards) | Distracts from the core thesis |
| Passive summarization by AI | Contradicts the app's philosophy |
| Native mobile app | Web first — validate before investing in native |
| Third-party integrations (Notion, Drive) | Complexity without proven need |

---

## v1 User Journey (End-to-End)

```
1. Sign up
2. Add a subject + paste notes
3. AI generates questions → user reviews them
4. Start a study session → answer questions → self-rate
5. See topic health update (green/yellow/red)
6. Return next day → app surfaces due topics
7. Repeat → watch retention scores improve
```

This loop alone is more effective than anything Anki or Quizlet offers today.

---

## v1 Tech Stack Recommendation

| Layer | Choice | Reason |
|---|---|---|
| **Frontend** | Next.js (React) | Fast to build, great for web app |
| **Backend** | Node.js + Express or Next.js API routes | Keeps stack consistent |
| **Database** | PostgreSQL (via Supabase) | Relational data, built-in auth, free tier |
| **AI** | Claude API (claude-sonnet-4-6) | Best instruction-following for structured outputs |
| **Hosting** | Vercel | Free tier, zero-config Next.js deployment |

---

## v1 Success Criteria

Before moving to v2, the following should be true:

- [ ] Users complete at least 3 study sessions in their first week
- [ ] Users report better retention compared to their previous study method
- [ ] Topic health scores visibly improve over 2 weeks of consistent use
- [ ] AI-generated questions are rated as "useful" by 80%+ of users
- [ ] Average session length is 25–45 minutes (healthy engagement, not too short or too long)
