# AI Strategy

---

## Core Philosophy

> **AI handles setup and evaluation. The user handles retrieval and thinking.**

AI is never used to:
- Summarize content for passive reading
- Answer questions the user is supposed to figure out
- Give hints before the user has genuinely attempted recall
- Generate "pretty notes" or do the cognitive work

AI is always used to:
- Remove friction from setting up active recall (generating questions)
- Evaluate the quality of the user's own thinking (not replace it)
- Optimize scheduling so the user studies the right thing at the right time

---

## AI Use Cases

---

### 1. Question Generation

**Where:** Note Ingestion → Question Generator

**What AI does:**
Reads the user's notes or uploaded content and generates open-ended active recall questions — not cued flashcard pairs.

**Prompt strategy:**
- Instruct the model to generate questions that require synthesis, not just recognition
- Include question types: definition, application, comparison, process
- Avoid yes/no questions
- Generate 1 question per key concept, not per sentence

**Model:** Claude (claude-sonnet-4-6)

**Sample prompt:**
```
You are a study assistant helping a student prepare for an exam.

Given the following notes, generate active recall questions that require the student to retrieve, synthesize, and apply the information — not just recognize it.

Generate questions of these types:
- Definition: "What is X?"
- Application: "How would X apply in [scenario]?"
- Comparison: "What is the difference between X and Y?"
- Process: "What are the steps involved in X?"

Do NOT generate yes/no questions or questions answerable with a single word.

Notes:
{user_notes}

Return a JSON array of question objects: { "question": string, "type": string, "concept": string }
```

---

### 2. Blurting Feedback

**Where:** Blurting Mode → After user submits recall

**What AI does:**
Compares the user's free-recall text against the source material. Returns a structured breakdown of what was recalled correctly, partially, or missed entirely.

**Important constraint:** AI matches by **meaning**, not exact wording. A student who explains a concept correctly in their own words should not be penalized.

**Model:** Claude (claude-sonnet-4-6)

**Sample prompt:**
```
A student was asked to recall everything they know about the following topic from memory.

Source material:
{source_material}

Student's recall:
{user_recall}

Evaluate the student's recall and return a JSON object with three arrays:
- "recalled_well": concepts the student got right (even if phrased differently)
- "partially_recalled": concepts mentioned but incomplete or unclear
- "missed": key concepts from the source that the student did not mention

Match by meaning, not exact wording. Be encouraging but honest.
```

---

### 3. Feynman Evaluation

**Where:** Feynman Mode → After user submits explanation

**What AI does:**
Evaluates whether the user's explanation is genuinely simple, complete, and accurate. Flags jargon they couldn't break down, concepts they glossed over, and gaps they missed entirely.

**Important constraint:** If the user copies the source material verbatim, AI flags it as "not a genuine explanation."

**Model:** Claude (claude-sonnet-4-6)

**Sample prompt:**
```
A student is practicing the Feynman Technique — explaining a concept as if teaching it to a 5th grader.

The concept they were asked to explain:
{concept}

Their explanation:
{user_explanation}

Evaluate their explanation and return a JSON object with:
- "explained_well": what they communicated clearly and accurately
- "unclear_or_jargon": phrases or terms that are too complex or unexplained
- "missing": key ideas from the concept that were not addressed
- "is_genuine": boolean — false if the explanation appears copied from source material

Be specific. Reference the student's actual words in your feedback.
```

---

### 4. Study Plan Builder

**Where:** Onboarding + ongoing re-planning

**What AI does:**
Takes the user's subjects, exam dates, current topic health (green/yellow/red), and peak productivity window — and generates a structured weekly study schedule with interleaved sessions.

**Model:** Claude (claude-sonnet-4-6)

**Sample prompt:**
```
You are a study planner. Build a weekly study schedule for a student using spaced repetition and interleaved practice.

Student data:
- Subjects and topics: {subjects_and_topics}
- Exam dates: {exam_dates}
- Topic health: {topic_health_scores} (green = strong, yellow = needs work, red = weak)
- Peak productivity window: {peak_window}
- Available study hours per day: {available_hours}

Rules:
1. Prioritize red topics, then yellow, then green
2. Interleave subjects within each session — do not block one subject for the full session
3. Schedule harder sessions during the peak productivity window
4. Leave buffer days before exam dates for review
5. Each session should be 45–90 minutes

Return a JSON array of session objects:
{ "day": string, "time": string, "duration_minutes": number, "subjects": string[], "focus_topics": string[] }
```

---

### 5. Pre-Test Question Generation

**Where:** Before a new study session on unseen material

**What AI does:**
Generates questions on material the user hasn't studied yet. The goal is to activate the hypercorrection effect — not to test existing knowledge but to prime the brain for correction.

**Distinction from standard question generation:**
- Pre-test questions are intentionally harder and broader
- No scaffolding — user gets no hints or context
- Wrong answers are expected and valuable

**Model:** Claude (claude-sonnet-4-6)

**Sample prompt:**
```
Generate a 5-question pre-test on the following topic for a student who has NOT yet studied it.

The goal is to activate the hypercorrection effect — the student is expected to get most questions wrong. These wrong answers will make them more likely to remember the correct information when they study it.

Topic:
{topic_and_material}

Generate questions that are challenging and require genuine understanding to answer. Return as a JSON array: { "question": string, "concept": string }
```

---

## Model Selection

| Use Case | Model | Why |
|---|---|---|
| Question Generation | claude-sonnet-4-6 | Strong instruction-following, structured output |
| Blurting Feedback | claude-sonnet-4-6 | Nuanced meaning-matching, not just keyword match |
| Feynman Evaluation | claude-sonnet-4-6 | Requires genuine language understanding |
| Study Plan Builder | claude-sonnet-4-6 | Structured scheduling logic |
| Pre-Test Generation | claude-sonnet-4-6 | Calibrated difficulty without answers |

---

## Guardrails

| Risk | Guardrail |
|---|---|
| AI gives away answers | AI never responds to "what is the answer to..." during a session |
| AI summarizes passively | No "summarize this for me" feature exists in the app |
| AI makes recall too easy | Hints are blocked until after the user submits their answer |
| Feynman copied verbatim | `is_genuine` flag triggers a "try in your own words" prompt |
| Over-reliance on AI plan | User can always override and manually adjust the schedule |
