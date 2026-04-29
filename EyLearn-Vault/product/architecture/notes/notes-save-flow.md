# Notes Save Flow

**Type:** Product architecture

## Main Idea

There are two save paths: page-level content saving and sidebar/list metadata mutations. Both write through server actions, then refresh cached server data.

## Page Content Save

- `src/components/notes/page/NotePageClient.tsx` owns the editable markdown textarea state.
- `NotePageClient` tracks whether the content is dirty by comparing local `content` to `note.content`.
- Autosave waits `AUTOSAVE_DELAY_MS` before calling `onAutosave(content)`.
- Manual save calls `onSave(content)` inside `startTransition`.

## Page Shell Coordination

- `src/components/notes/page/NotePageShell.tsx` receives the server note and server-rendered note content.
- `handleAutosave` calls `updateNoteAction(note.slug, { content })`, updates local note state, and marks the status saved.
- `handleSave` calls `updateNoteAction`, then calls `renderNote(content)` to get fresh chunks for the preview.
- `handleSave` also calls `router.refresh()` so the server-rendered route catches up with the saved content.

## Server Action Write

- `src/lib/actions/note-actions.ts` owns `createNoteAction`, `updateNoteAction`, and `deleteNoteAction`.
- `updateNoteAction` maps app fields to database columns through `toNoteRow`.
- When content changes, `updateNoteAction` also stores fresh `rendered_html` by calling `renderMarkdown`.
- After writing, it invalidates `note:${slug}` and `notes` with `updateTag`.

## Cached Reads After Save

- `src/lib/notes/queries.ts` marks note reads with `cacheTag`.
- `getAllNotes()` uses the `notes` tag.
- `getRenderedNote(slug)` uses both `notes` and `note:${slug}`.
- This is why `updateTag('notes')` updates lists/sidebar, while ``updateTag(`note:${slug}`)`` updates the opened note.

## Preview Rendering

- `src/lib/actions/render-note.ts` provides `renderNote(content)` as a server action.
- `renderNote` calls `renderMarkdown`, then `splitNoteHtml`.
- `src/components/notes/page/NotePageClient.tsx` uses this for dirty preview and post-save preview chunks.

## Sidebar/List Mutations

- `src/hooks/useNotesStore.ts` wraps mutations in a `run()` helper.
- `run()` sets status to saving, awaits the server action, marks saved, then calls `router.refresh()`.
- The store delegates note mutations to `src/lib/actions/note-actions.ts`.
- The store delegates folder mutations to `src/lib/actions/note-folder-actions.ts`.

## Why The Terminal Logs Server Actions

In dev mode, Next.js logs server action calls. Updating note content triggers `updateNoteAction`, so the terminal can print the action name, arguments, and timing.

## Related

- [[notes-architecture]]
- [[notes-sidebar-architecture]]
