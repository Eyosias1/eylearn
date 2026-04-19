# Feature Specifications

---

## 1. Note Ingestion & Question Generator

**What it does:**
User pastes notes, uploads a PDF/document, or types raw content. AI analyzes the material and generates active recall questions (not cued flashcard pairs — open-ended questions that require synthesis and application).

**Inputs:**
- Raw text, pasted notes, or uploaded document
- Subject and topic label

**Outputs:**
- List of AI-generated questions grouped by concept
- User can edit, delete, or add questions before saving

**Question types generated:**
- Definition ("What is X?")
- Application ("How would X apply in Y scenario?")
- Comparison ("What is the difference between X and Y?")
- Process ("What are the steps involved in X?")

**Edge cases:**
- Content too vague → prompt user to add more detail
- Content already in question form → import directly
- Non-text content (images) → not supported in v1

---

## 2. Active Recall Study Session

**What it does:**
Presents questions one at a time with no hints or cues. User types their answer, submits, then sees the correct answer and self-rates their recall quality.

**Inputs:**
- Selected subjects / topics
- Session length (user-defined or AI-recommended)

**Outputs:**
- Per-question rating (correct / partial / wrong)
- Session summary with accuracy per topic
- Updated spaced repetition schedule based on ratings

**Session behavior:**
- Questions are interleaved across topics by default
- Timer visible but not enforced
- No hints available until after submission

**Edge cases:**
- User submits blank answer → counts as wrong, still shows correct answer
- Session interrupted mid-way → progress saved, resumes where left off

---

## 3. Blurting Mode

**What it does:**
User sees only a topic title. They write everything they can remember about it from scratch. When done, they reveal the source material and AI highlights what they missed.

**Inputs:**
- Selected topic
- User's free-recall text

**Outputs:**
- Side-by-side comparison: user's recall vs. source
- Color-highlighted gaps (what was missing or incorrect)
- Completeness score (% of key concepts recalled)

**Edge cases:**
- User writes something correct that's phrased differently → AI matches by meaning, not exact wording
- Very short or blank submission → flagged as "not attempted," topic marked red

---

## 4. Pre-Test Engine

**What it does:**
Before a study session on new material, the app quizzes the user on the upcoming topic. They are expected to get most questions wrong — the point is to prime the brain for correction (hypercorrection effect).

**Inputs:**
- Upcoming topic/subject for the session
- Questions generated from that topic's material

**Outputs:**
- Questions the user got wrong are flagged and surfaced first during the actual study session
- Pre-test score saved as a baseline to measure improvement

**Edge cases:**
- User hasn't added material for the topic yet → prompt them to add notes first

---

## 5. Feynman Mode

**What it does:**
User selects a concept and types an explanation as if teaching it to a 5th grader. AI evaluates the explanation for clarity, completeness, and jargon — then returns specific feedback on gaps.

**Inputs:**
- Selected concept/topic
- User's written explanation

**Outputs:**
- Feedback broken into three categories:
  - ✅ What you explained well
  - ⚠️ Concepts present but unclear or jargon-heavy
  - ❌ Key concepts missing entirely
- Option to re-attempt after reviewing flagged gaps

**Edge cases:**
- User writes a very short explanation → AI asks clarifying questions before evaluating
- User copies the source material verbatim → flagged as not a genuine explanation

---

## 6. Spaced Repetition System

**What it does:**
Tracks how well the user knows each topic based on session performance and schedules the next review at the optimal interval — just before the brain would forget it.

**Logic:**
- Correct answer → interval doubles (e.g., review in 1 day → 2 days → 4 days → 8 days)
- Partial answer → interval stays the same
- Wrong answer → interval resets to 1 day

**Visual:**
- Color-coded topic board: 🟢 green / 🟡 yellow / 🔴 red
- Forgetting curve graph per topic showing projected retention over time
- "Due today" queue surfaced on the home dashboard

---

## 7. Interleaved Study Scheduler

**What it does:**
When a user starts a session with multiple subjects, the app mixes questions across subjects rather than grouping them by topic.

**Inputs:**
- Selected subjects for the session
- Session length

**Outputs:**
- A shuffled question queue that rotates between subjects
- Timer prompt to switch topics after user-set interval (25–90 min default)

---

## 8. Study Session Timer with Gap Effects

**What it does:**
A Pomodoro-style timer that runs during study sessions. At random intervals, it fires a 10-second "gap prompt" — a visual cue to pause and let the brain idle briefly.

**Timer options:**
- Work interval: 25 min (default), adjustable up to 90 min
- Short break: 5 min
- Long break: 15–30 min after 4 sessions

**Gap effect behavior:**
- Random prompt fires 3–6 times per session
- Prompt says: "Pause for 10 seconds — let your mind rest"
- User clicks "Resume" to continue

---

## 9. AI Study Plan Builder

**What it does:**
AI generates a prospective revision timetable based on the user's subjects, exam dates, current performance (color-coded topic scores), and peak productivity window.

**Inputs:**
- List of subjects and topics
- Exam dates
- Weak areas (red/yellow topics)
- Peak productivity window (from onboarding energy tracker)

**Outputs:**
- Weekly calendar with scheduled study sessions
- Each session specifies: subjects, estimated duration, focus areas
- Plan updates dynamically as performance data changes

---

## 10. Progress Dashboard

**What it does:**
Gives the user a clear, honest picture of where they stand across all subjects.

**Displays:**
- Topic health board (green / yellow / red per topic)
- Retention score per topic over time (line graph)
- Topics overdue for review
- Study streak and total sessions completed
- Projected retention for upcoming exam dates

---

## 11. Peak Window Tracker

**What it does:**
During onboarding, the user logs their energy level (1–5) up to 3 times a day for 7 days. The app identifies their peak productivity window and uses it to schedule the hardest study sessions at the right time.

**Inputs:**
- Energy level (1–5 scale)
- Time of day logged
- 7 days of data minimum

**Outputs:**
- Detected peak window (e.g., "Your peak focus is 6AM–8AM")
- Peak window saved to profile
- AI Study Plan automatically schedules hardest sessions during this window

**Edge cases:**
- User skips logging days → app uses available data, defaults to morning if insufficient
- User's pattern changes over time → option to re-run tracking from settings
- Irregular schedule (shift workers) → manual override available in settings

---

## 12. Second Brain Capture

**What it does:**
A quick-capture tool available from anywhere in the app. Users save ideas, links, voice notes, or images on the go. All captured content is organized, tagged, and searchable — and can be converted into study material later.

**Inputs:**
- Text snippet
- URL / web link
- Voice note (transcribed automatically)
- Image

**Outputs:**
- Item saved to Second Brain inbox
- Auto-tagged by subject if detected
- Searchable via keyword or tag
- Option to convert any item into a topic + questions for studying

**Edge cases:**
- Voice note too noisy to transcribe → save audio file, flag for manual review
- URL no longer accessible → save a cached excerpt at time of capture
- Inbox grows too large → prompt user to organize or convert items older than 30 days

---

## 13. Forgetting Curve Visualizer

**What it does:**
Shows the user a live graph of their predicted memory retention for each topic over time — based on Ebbinghaus's forgetting curve and their actual review history. Makes the cost of not reviewing visible before it's too late.

**Inputs:**
- Last review date per topic
- Retention score from last session
- Spaced repetition interval history

**Outputs:**
- Line graph per topic showing retention % over time
- Current retention score marked on the curve
- Projected drop-off if the user does not review
- "Review Now" prompt when retention is predicted to fall below 50%

**Displayed on:**
- Topic detail view (individual curve per topic)
- Progress Dashboard (summary curves for all topics at risk)

**Edge cases:**
- Topic never reviewed → shows default steep forgetting curve as a warning
- Topic reviewed today → curve starts at 100% and projects forward
- Multiple topics at risk → dashboard highlights the most urgent ones first
