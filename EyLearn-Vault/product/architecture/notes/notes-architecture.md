# Notes Architecture

**Type:** Product architecture

## Mental Model

Notes are stored in Supabase as markdown plus metadata. Reads prefer cached server data, while writes go through server actions that update Supabase and invalidate cache tags.

The UI is split into three major surfaces: the notes list, the individual note page, and the notes sidebar.

## Route Layer

- `src/app/(app)/notes/layout.tsx` fetches all note metadata and folders, then wraps notes pages in `NotesStoreProvider`.
- `src/app/(app)/notes/layout.tsx` also mounts `NotesSidebarPortal`, so the notes sidebar can render into the app shell slot.
- `src/app/(app)/notes/page.tsx` stays thin and only renders `NotesShell`.
- `src/app/(app)/notes/[slug]/page.tsx` fetches one rendered note with `getRenderedNote`, then composes `NotePageShell` and `NoteRenderer`.

## Shared Store

- `src/providers/notes-store-provider.tsx` creates the context used by list/sidebar components.
- `src/hooks/useNotesStore.ts` exposes note and folder commands like `createNote`, `updateNote`, `removeNote`, `createFolder`, and `moveFolder`.
- `src/hooks/useNotesStore.ts` centralizes mutation status and calls `router.refresh()` after successful mutations.
- Provider boundary decision: `NotesStoreProvider` lives in `src/providers/notes-store-provider.tsx` and should only be mounted in `src/app/(app)/notes/layout.tsx`; feature components should call `useNotesContext()` instead of creating another provider.

## Data Model

- `src/types/NoteRecordType.ts` defines `NoteMeta` for list/sidebar usage and `NoteRecord` for full note content.
- `src/types/NoteFolderType.ts` defines the folder records used by the sidebar tree.
- `src/types/NoteChunk.ts` defines render chunks for normal HTML, tables, code, Mermaid, and SMILES blocks.

## Read Path

- `src/lib/notes/queries.ts` owns cached reads from Supabase.
- `getAllNotes()` returns lightweight note metadata for list/sidebar views.
- `getNoteFolders()` returns folder metadata.
- `getRenderedNote(slug)` returns a full note plus render chunks for the note page.

## Rendering Path

- `src/lib/markdown/render-markdown.ts` converts markdown into sanitized HTML.
- `src/lib/notes/split-note-html.ts` converts HTML into typed chunks.
- `src/components/notes/renderer/NoteRenderer.tsx` renders those chunks in React.
- Specialized renderers live beside it: `src/components/notes/renderer/CodeBlock.tsx`, `src/components/notes/renderer/Mermaid.tsx`, `src/components/notes/renderer/Smiles.tsx`, and `src/components/notes/renderer/SmilesDrawer.tsx`.

## Key Decision

The route layer stays thin. Data fetching lives in query utilities, mutations live in server actions, client coordination lives in hooks/providers, and rendering lives in note renderer components.

## Related

- [[notes-save-flow]]
- [[notes-sidebar-architecture]]
