# Note Ingestion & Question Generator

**Type:** Content & Setup

## What it does
User pastes notes, uploads a PDF, or types raw content. AI analyzes the material and generates active recall questions — open-ended, not flashcard pairs.

## Flow
1. Select subject + topic name
2. Input content (paste text / type / upload PDF)
3. AI generates questions grouped by concept
4. User reviews, edits, deletes, or adds questions manually
5. Save → topic created, questions ready for study

## Question types generated
- Definition — "What is X?"
- Application — "How would X apply in Y scenario?"
- Comparison — "What is the difference between X and Y?"
- Process — "What are the steps involved in X?"

## Edge cases
- Content too vague → prompt user to add more detail
- Content already in question form → import directly
- Non-text content (images) → not supported in v1

## Related
- [[active-recall]] — questions used in sessions
- [[pre-test]] — requires notes before pre-test can run
- [[blurting-mode]] — source material compared against user's recall
- [[feynman-mode]] — source material used for AI evaluation
- [[second-brain]] — captured items can be converted to topics here
