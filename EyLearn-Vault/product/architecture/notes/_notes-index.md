# Notes Architecture Index

The notes system is documented as architecture, not only as a feature, because it includes routing, server actions, cached reads, markdown rendering, sidebar state, and Supabase writes.

## Docs

- [[notes-architecture]]
- [[notes-save-flow]]
- [[notes-sidebar-architecture]]

## Main Code Areas

- Routes: `src/app/(app)/notes/`
- Page components: `src/components/notes/page/`
- Sidebar components: `src/components/notes/sidebar/`
- Store/provider: `src/hooks/useNotesStore.ts`, `src/providers/notes-store-provider.tsx`
- Server actions: `src/lib/actions/note-actions.ts`, `src/lib/actions/note-folder-actions.ts`
- Queries/rendering: `src/lib/notes/queries.ts`, `src/lib/actions/render-note.ts`, `src/lib/markdown/render-markdown.ts`
- Types: `src/types/NoteRecordType.ts`, `src/types/NoteFolderType.ts`, `src/types/NoteChunk.ts`
