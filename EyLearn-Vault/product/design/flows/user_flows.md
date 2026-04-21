# User Flows

---

## 1. Onboarding Flow

```
Sign Up
  │
  ▼
Welcome Screen — "This app works differently than flashcards"
  │  (brief explanation of active recall vs. passive study)
  ▼
Add Your First Subject
  │  (name + optional exam date)
  ▼
Energy Tracking Setup
  │  "Log your energy level 3x a day for 7 days so we can find your peak window"
  │  (can skip — defaults to morning)
  ▼
Home Dashboard
```

---

## 2. Adding Content Flow

```
Home Dashboard → "Add Notes"
  │
  ▼
Select Subject + Topic Name
  │
  ▼
Input Content
  │  (paste text / type notes / upload PDF)
  ▼
AI Generates Questions
  │  (user sees draft questions)
  ▼
Review & Edit Questions
  │  (edit, delete, or add manually)
  ▼
Save → Topic created, questions ready for study
```

---

## 3. Standard Active Recall Session

```
Home Dashboard → "Study Now" (or scheduled session from plan)
  │
  ▼
Select Subjects / Topics
  │  (interleave toggle on by default with 2+ subjects)
  ▼
Optional: Run Pre-Test
  │  (AI generates questions on material — user expected to get most wrong)
  ▼
Session Begins
  │
  ├── Question shown (no hints)
  │     │
  │     ▼
  │   Confidence rating: Low / Medium / High
  │     │
  │     ▼
  │   User types answer
  │     │  (optional: request hint → caps rating at Partial)
  │     ▼
  │   Submit → Correct answer revealed
  │     │
  │     ▼
  │   User self-rates: Correct / Partial / Wrong
  │     │
  │     ▼
  │   If Wrong → Micro-reflection prompt: "What did you confuse this with?"
  │     │  (skippable)
  │     ▼
  │   Next question (different topic if interleaving is on)
  │
  ├── Every 10 questions → Session Checkpoint
  │     │  (accuracy snapshot per topic, option to end early)
  │     ▼
  │   Continue or end session
  │
  ├── Gap Effect Prompt fires randomly
  │     │  "Pause for 10 seconds — let your mind rest"
  │     ▼
  │   User resumes
  │
  ├── Interleave Switch Prompt (if 2+ subjects, every 25–90 min)
  │     │  "Switch to [Subject]?"
  │     ▼
  │   User continues with next subject
  │
  ▼
Main Pass Complete
  │
  ▼
Weak Spot Re-Queue
  │  (Wrong + Partial questions get one more pass)
  │  (second-pass ratings recorded separately)
  │
  ▼
Mistake Review
  │  (still-wrong answers shown read-only — question + correct answer)
  │  (no rating, pure re-exposure)
  │
  ▼
AI Grading
  │  (AI grades all answers in batch using source notes + own knowledge)
  │  ├── Per-answer verdict + 1-2 sentence feedback
  │  ├── Pattern observations across session
  │  ├── Confidence calibration report (overconfident / underconfident moments)
  │  └── User confirms or overrides each AI-suggested rating
  │
  ▼
Session Summary
  │  (per-topic accuracy, updated health colors, next review dates)
  ▼
Home Dashboard (updated)
```

---

## 4. Blurting Mode Flow

```
Home Dashboard → "Blurting Mode"
  │
  ▼
Select Topic
  │
  ▼
Topic title shown — source material hidden
  │
  ▼
User writes everything they remember (no time limit)
  │
  ▼
Submit
  │
  ▼
Source material revealed
  │
  ▼
AI comparison shown
  │  ✅ Recalled well
  │  ⚠️ Partially recalled
  │  ❌ Missed
  │
  ▼
User rates overall session: Strong / OK / Weak
  │
  ▼
Topic health updated → next review scheduled
```

---

## 5. Feynman Mode Flow

```
Home Dashboard → "Feynman Mode"
  │
  ▼
Select Concept
  │
  ▼
Prompt: "Explain this as if teaching a 5th grader"
  │
  ▼
User types explanation (no source visible)
  │
  ▼
Submit
  │
  ▼
AI Evaluation returned
  │  ✅ Explained well
  │  ⚠️ Unclear / jargon
  │  ❌ Missing concepts
  │
  ├── If is_genuine = false:
  │     "It looks like this might be copied — try explaining it in your own words"
  │
  ▼
User reviews gaps → option to re-attempt
  │
  ▼
Concept health updated
```

---

## 6. Study Plan Flow

```
Home Dashboard → "My Study Plan"
  │
  ▼
If no plan exists:
  │  AI generates plan based on:
  │  - Subjects + exam dates
  │  - Topic health scores (red/yellow/green)
  │  - Peak productivity window
  │
  ▼
Weekly calendar view
  │  (each day shows scheduled sessions with subject + duration)
  │
  ▼
User taps a session → session details
  │  (which topics, estimated time, mode recommended)
  │
  ▼
"Start Session" → enters Active Recall flow
  │
  ▼
Session marked complete → plan updates
```

---

## 7. Progress Dashboard Flow

```
Home Dashboard → "Progress"
  │
  ▼
Topic Health Board
  │  (grid of all topics colored green / yellow / red)
  │
  ├── Tap a topic → topic detail view
  │     - Retention score over time (line graph)
  │     - Forgetting curve projection
  │     - Last reviewed date
  │     - Next review due date
  │     - All questions for this topic
  │
  ▼
Study Stats
  │  - Total sessions completed
  │  - Total study time
  │  - Current streak
  │  - Topics overdue for review
```

---

## 8. Exam Simulation Flow

```
Home Dashboard → "Exam Simulation"
  │
  ▼
Select Topics + Set Duration (30 / 60 / 90 min)
  │
  ▼
AI generates questions
  │  - Pulls from course notes (note-ingestion)
  │  - Weights 60% toward weak/red/yellow topics
  │  - Uses error history and micro-reflections for question targeting
  │
  ▼
"Start Exam" → session locks
  │
  ▼
All questions shown at once, numbered
  │
  ├── User navigates freely (Q1 → Q4 → Q2 etc.)
  │
  ├── User fills in answers in any order
  │
  ├── 30s warning banner when timer is nearly up
  │
  ├── Timer hits 0 → auto-submit
  │     OR
  │   User submits early → confirmation dialog
  │
  ▼
All answers locked
  │
  ▼
AI grades all answers in batch
  │  ├── Per-question verdict + feedback
  │  ├── Overall score
  │  └── Topic breakdown
  │
  ▼
Results shown → spaced repetition updated
  │
  ▼
Home Dashboard (updated)
```

---

## 9. Active Recall + Elaborative Interrogation Flow

Same as Standard Active Recall flow (Flow 3) with one addition after each answer reveal:

```
  ...
  │   User self-rates: Correct / Partial / Wrong
  │     │
  │     ▼
  │   Elaborative follow-up (if toggle ON):
  │     "Why does this work?" / "How does this connect to X?"
  │     │
  │     ├── User types explanation → Submit
  │     │     AI adds depth rating (Surface / Functional / Deep) to batch
  │     │
  │     └── User skips → rated Surface
  │     │
  │     ▼
  │   Next question
  ...
```

---

## 10. Peak Window Detection Flow (Onboarding + Ongoing)

```
Onboarding → Energy Tracking prompt
  │
  ▼
User logs energy level (1–5) up to 3x per day for 7 days
  │  (morning / afternoon / evening — takes 5 seconds)
  │
  ▼
After 7 days → AI identifies peak window
  │  "Your peak focus window appears to be 6AM–8AM"
  │
  ▼
Peak window saved to profile
  │
  ▼
AI Study Plan schedules hardest sessions during peak window
```
