# Lib Review

## Critical: Admin Client Misuse

The admin client (`createAdminClient`) bypasses RLS entirely. Every query below either reads
user-scoped data without a user filter, or writes data without establishing who the acting user
is. If any of these tables have RLS enabled, the bypass means all rows from all users are
visible/mutable to server code that should only touch the current user's data.

| File | Problem | Fix |
|------|---------|-----|
| `lib/notes/queries.ts` | Uses admin client inside `'use cache'` functions — Next.js forbids `cookies()` in cached functions, so server client cannot be used directly | ⚠️ Admin client kept intentionally; `server-only` added; comment documents the constraint. Revisit if notes become per-user (requires replacing `'use cache'` with `unstable_cache` keyed per user) |
| ~~`lib/actions/note-actions.ts`~~ | ~~Admin client, no auth check~~ | ✅ Switched to `getAuthenticatedSupabase()`; auth guard now on every function |
| ~~`lib/actions/note-folder-actions.ts`~~ | ~~Admin client, no auth check~~ | ✅ Switched to `getAuthenticatedSupabase()`; authenticated client passed into `getFolderTreeIds` helper |
| ~~`lib/notes/sync-references.ts`~~ | ~~Uses admin client to read/write `note_references`~~ | ✅ Switched to server client + `cookies()` |
| ~~`lib/notes/get-incoming-references.ts`~~ | ~~Uses admin client to query `note_references`~~ | ✅ Switched to server client + `cookies()` |
| `lib/notes/supabase-note-store.ts` | **Dead code** — exported but never imported anywhere; all five CRUD methods use admin client | Delete or replace when data layer is consolidated in step 3 |
| ~~`lib/graph/graph-data.ts`~~ | ~~Admin client bypassing RLS for all user-scoped tables~~ | ✅ Switched to `getAuthenticatedSupabase()`; added `server-only` |
| ~~`lib/subtopics/actions.ts`~~ | ~~`getNotesForPicker` and `getLinkedNotes` used admin client~~ | ✅ Fixed; file moved to `lib/actions/subtopics.ts` |

---

## File Placement Issues

| File | Current location | Should be in | Reason |
|------|-----------------|--------------|--------|
| ~~`lib/subjects/actions.ts`~~ | ~~`lib/subjects/`~~ | ✅ Moved to `lib/actions/subjects.ts`; all import sites updated |
| ~~`lib/topics/actions.ts`~~ | ~~`lib/topics/`~~ | ✅ Moved to `lib/actions/topics.ts`; all import sites updated |
| ~~`lib/subtopics/actions.ts`~~ | ~~`lib/subtopics/`~~ | ✅ Moved to `lib/actions/subtopics.ts`; admin client removed; all import sites updated |
| `lib/notes/get-incoming-references.ts` | `lib/notes/` | `lib/data/note-references.ts` | Pure raw DB query; belongs in the data layer |
| `lib/notes/supabase-note-store.ts` | `lib/notes/` | `lib/data/notes.ts` | Raw CRUD against the `notes` table; data layer file |
| `lib/notes/get-note.ts` | `lib/notes/` | `lib/data/notes-fs.ts` (or remove if superseded by Supabase) | Reads notes from the local filesystem via `gray-matter`; it is a data-source file and conflicts in naming with the Supabase `getAllNotes` in `lib/notes/queries.ts` |
| `lib/graph/graph-data.ts` | `lib/graph/` | DB queries → `lib/data/graph.ts`; keep transformation logic in `lib/graph/` | Mixes raw multi-table queries with graph node/edge construction (see Separation of Concerns) |
| ~~`lib/dashboard/dashboard.ts`~~ | ~~`lib/dashboard/`~~ | ✅ Moved to `lib/mock/dashboard.ts`; dashboard page import updated |
| `lib/studyplan/studyplan.ts` | `lib/studyplan/` | No longer purely mock — now contains real `getCalendarEvents` Supabase query alongside mock `getPlanEvents`; leave until `getPlanEvents` is replaced with a real query |
| ~~`lib/whiteboards/auth.ts`~~ | ~~`lib/whiteboards/`~~ | ✅ Moved to `lib/supabase/auth.ts` | All 5 import sites updated; old file deleted |

---

## Separation of Concerns

| File | Problem | Suggested split |
|------|---------|-----------------|
| `lib/notes/queries.ts` | `getRenderedNote` does a DB fetch **and** runs `renderMarkdown` + `splitNoteHtml` — data retrieval mixed with rendering pipeline | Move rendering fallback into a feature helper (e.g. `lib/notes/render-stored-note.ts`); queries should return raw rows only |
| `lib/notes/queries.ts` | `toNoteMeta` and `toNoteFolder` row-to-type mappers live in the same file as queries | Minor: acceptable in a data file, but move to `lib/notes/mappers.ts` if they grow |
| `lib/graph/graph-data.ts` | Fetches six tables **and** builds nodes, edges, health aggregation, and summary stats (138 lines) | Split into `lib/data/graph.ts` (raw multi-table fetch) and `lib/graph/build-graph-data.ts` (transformation + health logic) |
| `lib/progress/progress.ts` | `getRetroSubjectGroups` calls `getRetroTopics` (data) then drives `computeHealthScore` and `lastStudiedDate` (business logic); also at 196 lines (over limit) | Once real queries replace mock data: `lib/data/progress.ts` for DB reads, `lib/progress/aggregate.ts` for computation |
| `lib/actions/note-actions.ts` | `toNoteRow` mapper and direct `createAdminClient()` queries live inside the actions file | Move `toNoteRow` to `lib/notes/mappers.ts`; extract DB calls to `lib/data/notes.ts`; action should only validate + call data layer |
| `lib/actions/note-folder-actions.ts` | `getFolderTreeIds` (recursive DB traversal) and cycle-detection logic embedded directly in the actions file (96 lines) | Move `getFolderTreeIds` and cycle check to `lib/notes/folder-tree.ts` or `lib/data/note-folders.ts`; action becomes a thin wrapper |
| `lib/notes/sync-references.ts` | Performs two DB reads (source note id, target note ids) **and** the business logic of diffing/replacing references | Acceptable as a feature module since the two concerns are tightly coupled, but should use server client not admin |

---

## Files Over 100 Lines

| File | Lines | Suggested split |
|------|-------|-----------------|
| ~~`lib/progress/progress.ts`~~ | ~~196~~ | ✅ Split: mock data → `lib/mock/progress.ts` (123 lines, inert data); logic → `lib/progress/progress.ts` (72 lines) |
| ~~`lib/graph/graph-data.ts`~~ | ~~138~~ | ✅ Split: DB fetch → `lib/data/graph.ts` (24 lines); transformation stays in `lib/graph/graph-data.ts` (102 lines) |
| `lib/mock/mock-data.ts` | 121 | Accepted as a single mock data module — all inert constants, no logic |

---

## Duplicate Queries

| Query | Files | Consolidate into |
|-------|-------|-----------------|
| `notes` by slug — `select('*').eq('slug', slug).single()` | `lib/notes/queries.ts:getRenderedNote`, `lib/notes/supabase-note-store.ts:get` | `lib/data/notes.ts:getNoteBySlug` |
| `notes` by slug — `select('id').eq('slug', slug).single()` | `lib/actions/note-actions.ts:getIncomingReferencesAction`, `lib/notes/sync-references.ts` | `lib/data/notes.ts:getNoteIdBySlug` |
| All notes metadata select | `lib/notes/queries.ts:getAllNotes` (supabase), `lib/notes/get-note.ts:getAllNotes` (filesystem) | Two separate sources: unify naming or remove the filesystem version if Supabase is the active store |
| `notes` — `select('id, title, subject, slug')` | `lib/subtopics/actions.ts:getNotesForPicker`, `lib/graph/graph-data.ts` (selects `id, title, slug, subject`) | `lib/data/notes.ts:getNotesForPicker` |
| `note_folders` full list | `lib/notes/queries.ts:getNoteFolders`, traversed ad-hoc in `lib/actions/note-folder-actions.ts` | `lib/data/note-folders.ts:getNoteFolders` |
| `note_references` — replace outgoing refs pattern | `lib/notes/sync-references.ts` (delete then insert) | Keep in `lib/notes/sync-references.ts` but use server client; no duplication yet, but `getIncomingReferencesAction` repeats the join pattern |

---

## Files That Look Correct

These files follow the project rules and need no changes:

- `lib/supabase/admin.ts` — admin client factory; correctly gated on env vars
- `lib/supabase/client.ts` — browser client factory
- `lib/supabase/server.ts` — server client factory
- `lib/supabase/proxy.ts` — proxy utility
- `lib/data/profile.ts` — uses server client + `getAuthContext`; correct data layer pattern
- `lib/utils.ts` — pure utility (`cn`)
- `lib/slugify.ts` — pure utility
- `lib/actions/auth.ts` — correctly uses server client for sign-in
- `lib/actions/render-note.ts` — thin action wrapper, no DB
- `lib/supabase/auth.ts` — `getAuthenticatedSupabase` helper; server client + redirect guard ✅ (moved from `lib/whiteboards/auth.ts`)
- `lib/actions/whiteboard-actions.ts` — uses server client via `getAuthenticatedSupabase`; no admin client
- `lib/whiteboards/queries.ts` — uses server client via auth helper; RLS-respecting
- `lib/whiteboards/shape.ts` — pure transformation, no DB
- `lib/excalidraw/preview.ts` — pure computation
- `lib/excalidraw/scene.ts` — pure transformation
- `lib/excalidraw/store.ts` — interface definition only
- `lib/excalidraw/supabase-store.ts` — uses browser client (correct for client-side real-time updates)
- `lib/graph/build-graph.ts` — pure graph layout computation
- `lib/notes/folder-tree.ts` — pure tree construction, no DB
- `lib/notes/extract-wikilinks.ts` — pure regex utility
- `lib/notes/group-notes.ts` — pure grouping utility
- `lib/notes/note-store.ts` — interface definition only
- `lib/notes/split-note-html.ts` — HTML processing utility
- `lib/markdown/*` — markdown pipeline utilities, no DB
- `lib/mermaid/*` — theme utilities, no DB
- `lib/language/language-icon.ts` — static icon map
- `lib/assistant/chat-client.ts` — client-side fetch wrapper
- `lib/assistant/chat-prompts.ts` — prompt formatting
- `lib/assistant/context-selectors.ts` — URL parsing utility
- `lib/assistant/limit-assistant-context-text.ts` — text utility
- `lib/assistant/model-map.ts` — third-party model ID mapping

---

## Summary

The biggest priority is **admin client misuse**. `lib/graph/graph-data.ts` is the most severe: it queries `subjects`, `topics`, `subtopics`, `notes`, and junction tables via the service role key, bypassing RLS entirely — if those tables have per-user RLS policies, every authenticated user currently sees every other user's data through the graph view. `lib/notes/queries.ts`, `lib/notes/supabase-note-store.ts`, and the note/folder action files have the same problem. Fix these first by switching to `createClient(await cookies())` and scoping queries with the result of `getAuthContext()`.

Second priority is **file placement and layering**: `lib/subjects/actions.ts`, `lib/topics/actions.ts`, and `lib/subtopics/actions.ts` are misnamed and mislocated — they carry `"use server"` but live in feature folders and embed direct DB queries that should live in a `lib/data/` layer. Extracting the raw queries into `lib/data/` files would also eliminate several of the duplicate queries flagged above.

Third, `lib/progress/progress.ts` (196 lines) and `lib/graph/graph-data.ts` (138 lines) both exceed the 100-line rule and should be split as described. The two mock-data-only files (`lib/dashboard/dashboard.ts`, `lib/studyplan/studyplan.ts`) should move into `lib/mock/` or be replaced with real queries before the project ships.
