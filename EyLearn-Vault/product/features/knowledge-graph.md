# Knowledge Graph

**Type:** Page / Visualization
**Route:** `/graph`

## What it does
Renders all of the user's topics as an interactive node graph. Nodes are topics, edges are relationships extracted from notes during ingestion. Node color shows mastery health at a glance. Users can explore how concepts connect, identify isolated weak areas, and launch sessions directly from a node.

## What makes it useful
Active recall and spaced repetition operate on individual cards. The graph shows the *structure* of knowledge — which topics are well-connected (strong conceptual understanding) vs isolated (memorized in a vacuum). A topic with many connections but low mastery (red + large) is a high-priority target.

## Flow
1. User opens `/graph`
2. All topics rendered as nodes on a canvas — positions computed by force-directed layout
3. User pans and zooms to explore
4. Clicking a node → side panel: topic name, subject, mastery %, last reviewed, connected topics, Start Session CTA
5. Subject filter → dims topics from other subjects
6. Mastery filter → dims nodes above a threshold (focus on weak areas only)
7. Start Session from side panel → launches session pre-loaded with that topic

## Node properties
- **Color:** 🟢 ≥75% mastery · 🟡 50–74% · 🔴 <50% · ⬪ not yet studied
- **Size:** proportional to number of connections (more connected = bigger node)
- **Label:** topic name, shown on hover or always (toggleable)

## Edge properties
- Edges = relationships extracted by AI during [[note-ingestion]]
- Edge weight = strength of relationship (co-occurrence + semantic similarity)
- Strong edges = thicker lines

## Inputs
- All enrolled topics with mastery % and subject
- Topic relationships from note ingestion

## Outputs
- No data written — read-only visualization
- Navigation: clicking "Start Session" in side panel routes to session with topic pre-loaded

## Edge cases
- No notes ingested yet → empty canvas with "Add notes to build your graph"
- Single topic → lone node, no edges, prompt to add more content
- Very large graph (200+ nodes) → clusters by subject automatically, zoom to expand
- Two topics with same name in different subjects → disambiguated with subject label

## Related
- [[note-ingestion]] — relationship extraction happens at ingestion time
- [[spaced-repetition]] — mastery % per topic drives node color
- [[progress-dashboard]] — graph complements Progress (spatial vs temporal view)
- [[active-recall]] — sessions can be launched directly from a node
