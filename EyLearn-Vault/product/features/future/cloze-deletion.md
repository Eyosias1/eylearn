# Cloze Deletion

**Type:** Study Session Mode (Future)
**Mode key:** `cloze_deletion`

## What it does
Key terms and phrases are blanked out from the user's own notes. User fills in the gaps from memory. Lower friction than active recall — good as a warmup mode or for vocabulary-heavy subjects.

## Flow
1. AI parses selected notes and identifies key terms, names, definitions, and values
2. Blanks are inserted: "Beta blockers competitively antagonize ___ at β-adrenergic receptors"
3. User fills in each blank — one cloze card at a time
4. Submit → correct term revealed, user self-rates: Wrong / Correct
5. Spaced repetition updated per blank

## Why it's valuable
- Lowest friction retrieval practice — faster than writing full answers
- Anki's most-used format for a reason — works well for terminology-heavy subjects (pharmacology, anatomy, law)
- Good warmup before a full active recall session

## Inputs
- Selected notes
- AI-detected key terms (user can edit which terms get blanked)

## Outputs
- Per-blank correct/wrong rating
- Updated spaced repetition schedule

## Edge cases
- AI blanks wrong terms → user can tap to un-blank before starting
- Multiple valid answers → AI accepts synonyms and equivalent phrasings
- Very short notes with few key terms → mode card greyed out

## Related
- [[active-recall]] — cloze is a lighter version; good as warmup before active recall
- [[note-ingestion]] — key term detection happens at ingestion time
- [[spaced-repetition]] — per-blank scheduling
