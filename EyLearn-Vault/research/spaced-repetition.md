# Spaced Repetition Research

> The evidence base behind [[spaced-repetition]].

## Core concept

Memories decay over time following Ebbinghaus's forgetting curve. Without reviewing newly learned information, research suggests you could lose up to 70% of retention in just one day. If material is reviewed at spaced intervals after initial learning, the forgetting curve flattens out and long-term retention improves significantly.

The key insight is **desirable difficulty**: the harder your brain has to work to retrieve information, the stronger it gets encoded into long-term memory. This means you should revise material *just as your brain starts to forget it* — the extra effort required to retrieve slightly lost information promotes durable learning.

In practice: shorter intervals early on when material is new, then progressively wider intervals as it becomes familiar. Example schedule: today → tomorrow → 5 days → 2 weeks → 1 month.

## Key studies

### Karpicke & Bauernschmidt (2011) — Spaced vs. Massed Retrieval

Investigated recall of a new language under various study conditions:

- Study once → 1% retention
- Recall once → significantly better than study-only
- Recall 3x in a row (massed) → 25–26% retention
- Recall 3x with spacing → up to 75% retention (best: intervals every 30 words)

**Critical finding:** Recalling three times in a row produced *no advantage* over recalling once. Spacing between the repetitions was the variable that drove the dramatic retention gain. The study also found no evidence that expanding, equal, or contracting interval schedules differ — absolute total spacing matters more than how it is distributed.

**Citation:** Karpicke, J. D., & Bauernschmidt, A. (2011). Spaced retrieval: Absolute spacing enhances learning regardless of relative spacing. *Journal of Experimental Psychology: Learning, Memory, and Cognition*, 37(5), 1250–1257. DOI: 10.1037/a0023436. PMID: 21574747.
- [PubMed](https://pubmed.ncbi.nlm.nih.gov/21574747/)
- [PDF — Purdue Learning Lab](https://learninglab.psych.purdue.edu/downloads/2011/2011_Karpicke_Bauernschmidt_JEPLMC.pdf)

## Application methods (from the framework)

### 1. Leitner system
Five boxes labeled by review interval:
- Box 1: Every Day
- Box 2: Every Three Days
- Box 3: Every Week
- Box 4: Every Other Week
- Box 5: Day Before Exam

Successfully recalled concept → move to next box. Failed recall → back to Box 1. Intervals are customizable per individual learning pace.

### 2. End of day review
Dedicate 20 minutes before bed to retrieve all newly learned information from the day. Based on Ebbinghaus's finding that the steepest drop in the forgetting curve occurs in the first 24 hours. Even partial review significantly reduces the percentage of information lost overnight and reduces revision needed in subsequent sessions.

### 3. Prospective revision timetable
Created 6+ weeks before an exam. First column: available study dates. Subsequent columns: topics from the syllabus, spaced using a doubling interval (day 1 → day 2 → day 4 → day 8 → day 16). Eliminates decision fatigue about what to study each day.

### 4. Retrospective revision timetable
Topics in the first column, dates studied in subsequent columns. Each session highlighted by recall quality:
- Green = sufficient knowledge
- Yellow = adequate knowledge
- Red = poor knowledge

Study priority: concepts studied least recently + colored red or yellow. Goal by exam day: all concepts in green. When a date is highlighted red or yellow, note the key missed questions directly in the spreadsheet for a quick pre-exam reference.

### 5. Spaced repetition algorithms (Anki, Supermemo)
Algorithmic flashcard software that surfaces cards based on past performance. Useful as a supplement to free recall practice — but not a replacement, since flashcards rely on cued recall rather than the free synthesis that exams require.

## How it applies to eyLearn

- Correct answer → interval doubles
- Partial answer → interval stays the same
- Wrong answer → interval resets to 1 day
- Overconfident wrong answers (from [[confidence-rating]]) reviewed sooner than the algorithm would normally schedule them
- Retrospective timetable view in [[progress]] shows recall quality by topic over time

## Further reading

- [[active-recall]] — spaced practice only works if each review uses active retrieval, not re-reading
- [[metacognition]] — students systematically overestimate how much they'll retain without spacing
