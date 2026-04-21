# Knowledge Graph — Wireframe

> Before building any part of this page, read this file.
> Related: [[knowledge-graph]] · [[note-ingestion]] · [[spaced-repetition]]

---

## Page Overview

Full-screen interactive node graph of all user topics. Spatial, explorative, read-only. Answers: **"How does my knowledge connect and where are the weak spots?"**

URL: `/graph`

---

## Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Toolbar (top)                                              │
│  [Subject filter ▾]  [Mastery filter ▾]  [Labels toggle]   │
├──────────────────────────────────────┬──────────────────────┤
│                                      │                      │
│                                      │   Node Side Panel   │
│         Graph Canvas                 │   (shown on click)  │
│         (full height, pannable       │                      │
│          and zoomable)               │                      │
│                                      │                      │
│                                      │                      │
├──────────────────────────────────────┴──────────────────────┤
│  Legend (bottom left, overlaid on canvas)                   │
└─────────────────────────────────────────────────────────────┘
```

---

## Graph Canvas

```
         ○ Genetics
        / \
🟢 Biochemistry ─── 🟡 Pharmacology
        \               \
    🔴 Pathology ─── ⬪ Immunology
              \
           🟢 Microbiology
```

- Force-directed layout — nodes repel each other, edges pull connected nodes together
- Nodes: circles, color = mastery health, size = connection count
- Edges: lines between related topics, thickness = relationship strength
- Labels: topic name shown on hover (default) or always (toggle)
- Pan: click and drag canvas
- Zoom: scroll wheel or pinch

**Node colors:**
- 🟢 Green — mastery ≥75%
- 🟡 Yellow — mastery 50–74%
- 🔴 Red — mastery <50%
- ⬪ Grey — not yet studied

**Interactions:**
- Hover node → label appears + connected edges highlight
- Click node → side panel opens
- Click canvas (empty) → side panel closes
- Scroll → zoom in/out
- Drag → pan

---

## Toolbar

```
┌─────────────────────────────────────────────┐
│  [All Subjects ▾]  [All Mastery ▾]  [Labels]│
└─────────────────────────────────────────────┘
```

- **Subject filter** dropdown → dims nodes from other subjects, keeps selected subject full opacity
- **Mastery filter** dropdown → options: All / Weak only (<50%) / Needs work (<75%)
- **Labels toggle** → show topic name labels always vs on hover only

---

## Node Side Panel

Opens on the right when a node is clicked. Closes when canvas is clicked.

```
┌──────────────────────────────┐
│  Beta Blockers               │  ← topic name
│  Pharmacology                │  ← subject tag
│                              │
│  Mastery        62%          │
│  ████████████░░░░░░          │
│                              │
│  Last reviewed   3 days ago  │
│  Leitner box     Box 2       │
│                              │
│  Connected to (4)            │
│  · Adrenergic Receptors      │
│  · Cardiac Output            │
│  · Hypertension              │
│  · ACE Inhibitors            │
│                              │
│  [Start Session →]           │
└──────────────────────────────┘
```

- Topic name + subject tag
- Mastery % with progress bar + health color
- Last reviewed + Leitner box
- Connected topics list — clicking one selects that node
- Start Session → launches session pre-loaded with this topic

---

## Legend (overlaid bottom-left)

```
┌──────────────────────┐
│  ● Mastered (≥75%)  │
│  ● Developing       │
│  ● Weak (<50%)      │
│  ○ Not studied      │
└──────────────────────┘
```

---

## Empty States

**No notes ingested:**
```
┌──────────────────────────────────┐
│  Your graph is empty             │
│                                  │
│  Add notes to build your         │
│  knowledge graph.                │
│                                  │
│  [Add Content →]                 │
└──────────────────────────────────┘
```

**Single topic (no edges):**
- Node shown alone with prompt: "Add more notes to see how topics connect"

**Very large graph (200+ nodes):**
- Auto-clusters by subject on load
- Clicking a cluster expands it

---

## Related Components to Plan

- `GraphCanvas` — [[components/knowledge-graph/graph-canvas]]
- `GraphToolbar` — [[components/knowledge-graph/graph-toolbar]]
- `NodeSidePanel` — [[components/knowledge-graph/node-side-panel]]
- `GraphLegend` — [[components/knowledge-graph/graph-legend]]
