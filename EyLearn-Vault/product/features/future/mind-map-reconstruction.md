# Mind Map Reconstruction

**Type:** Study Session Mode (Future)
**Mode key:** `mind_map`

## What it does
AI generates a concept map from the user's notes showing how key ideas connect. The map is shown briefly, then hidden. User rebuilds the connections from memory — adding nodes and linking them. AI compares the rebuilt map against the original and highlights missing or wrong connections.

## Why it's lower priority
Research (Karpicke & Blunt, 2011) shows concept mapping is significantly weaker than retrieval practice for long-term retention. Best used for understanding *relationships* between concepts, not for memorization. Blurting covers much of the same ground with less implementation complexity.

## Flow
1. AI generates a concept map from selected notes (nodes = key concepts, edges = relationships)
2. Map shown for 30–60 seconds (study phase)
3. Map hidden — user rebuilds from memory using a visual node editor
4. Submit → AI overlays original map on user's map:
   - ✅ connections reproduced correctly
   - ❌ connections missed
   - ⚠️ connections added that aren't in the source
5. Completeness score (e.g. 8 / 12 connections)
6. User self-rates: Weak / OK / Strong → updates spaced repetition

## Inputs
- Selected notes / topic
- Study time before hiding (30s / 60s / unlimited)

## Outputs
- Rebuilt concept map
- Comparison against original (correct / missed / extra connections)
- Completeness score
- Self-rating → updates spaced repetition

## Edge cases
- Notes have too few concepts for a meaningful map → mode greyed out
- User adds connections not in notes but conceptually valid → AI marks as "extra" not "wrong"
- Requires a node editor UI — highest implementation cost of any mode

## Related
- [[blurting-mode]] — similar "write what you know" mechanic, lower implementation cost
- [[note-ingestion]] — concept and relationship extraction needed at ingestion time
- [[spaced-repetition]] — missed connections re-queued sooner
