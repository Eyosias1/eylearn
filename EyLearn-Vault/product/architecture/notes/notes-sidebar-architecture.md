# Notes Sidebar Architecture

**Type:** Product architecture

## Main Idea

The sidebar is a client-side tree UI backed by server-provided notes and folders. It supports creating, renaming, deleting, emoji changes, collapsing, and drag-moving notes or folders.

## Mounting

- `src/app/(app)/notes/layout.tsx` renders `NotesSidebarPortal` inside the notes layout.
- `src/components/notes/sidebar/NotesSidebarPortal.tsx` finds the DOM slot with id `notes-sidebar-slot` and portals the sidebar into it.
- `src/components/layout/app-shell-content.tsx` provides the app shell area that the portal targets.

## Data Source

- `src/app/(app)/notes/layout.tsx` fetches `getAllNotes()` and `getNoteFolders()` before rendering children.
- `src/providers/notes-store-provider.tsx` passes those values into context.
- `src/components/notes/sidebar/NotesSidebarShell.tsx` reads context through `useNotesContext()`.

## Tree Building

- `src/lib/notes/folder-tree.ts` turns flat `NoteFolder[]` and `NoteMeta[]` arrays into nested `NoteFolderNode` objects.
- `buildNoteFolderTree` returns `roots` for real folders and `unfiled` for notes without a valid folder.
- `NotesSidebarShell` passes `roots` and `unfiled` into `NotesSidebar`.

## Sidebar Shell

- `src/components/notes/sidebar/NotesSidebar.tsx` owns the expanded/collapsed sidebar frame.
- `src/components/notes/sidebar/notes-sidebar-panel-context.tsx` stores whether the panel is open.
- `src/components/notes/sidebar/CollapsedNotesNav.tsx` renders the compact view when the panel is closed.
- `src/components/notes/sidebar/NotesSidebarNav.tsx` renders the full folder tree when the panel is open.

## Folder UI

- `src/components/notes/sidebar/NotesFolder.tsx` recursively renders folders, child folders, and notes.
- `src/components/notes/sidebar/NotesFolderRow.tsx` renders one folder row and its controls.
- `src/components/notes/sidebar/NotesFolderActions.tsx` owns folder action buttons.
- `src/components/notes/sidebar/NewFolderInput.tsx` and `src/components/notes/sidebar/NewNoteInput.tsx` handle inline creation states.

## Note UI

- `src/components/notes/sidebar/NoteSidebarLink.tsx` renders one note link, rename input, emoji picker, and drag payload.
- `src/components/notes/sidebar/NoteSidebarActions.tsx` renders note edit/delete controls.
- `src/components/notes/sidebar/NotesDeleteDialog.tsx` confirms destructive note/folder deletion.
- `src/components/notes/sidebar/SidebarEmojiPicker.tsx` is shared for note and folder emoji changes.

## Mutations

- `src/components/notes/sidebar/NotesSidebarShell.tsx` translates UI actions into store calls like `createNote`, `removeNote`, `updateNote`, `createFolder`, and `moveFolder`.
- `src/hooks/useNotesStore.ts` calls the relevant server actions and refreshes the route.
- Folder writes live in `src/lib/actions/note-folder-actions.ts`.
- Note writes live in `src/lib/actions/note-actions.ts`.

## Drag And Drop

- Notes use the drag type `application/x-note-slug` from `src/components/notes/sidebar/NoteSidebarLink.tsx`.
- Folders use the drag type `application/x-folder-id` from folder row components.
- `src/components/notes/sidebar/NotesSidebarNav.tsx` handles dropping items at the root level.
- `src/components/notes/sidebar/NotesFolder.tsx` handles dropping notes or folders into a specific folder.

## Related

- [[notes-architecture]]
- [[notes-save-flow]]
