'use client'

import { useRouter, usePathname } from 'next/navigation'
import { LibrarySidebar } from '@/components/library/LibrarySidebar'
import { useNotesContext } from '@/providers/notes-store-provider'
import { buildNoteFolderTree } from '@/lib/notes/folder-tree'
import { slugify } from '@/lib/slugify'
import { updateNoteAction } from '@/lib/actions/notes'

const today = () => new Date().toISOString().split('T')[0]

export function LibrarySidebarShell() {
  const router = useRouter()
  const pathname = usePathname()
  const store = useNotesContext()
  const { folders, notes, createFolder, removeFolder, moveFolder, updateFolder, updateFolderEmoji, createNote, removeNote, updateNote } = store
  const tree = buildNoteFolderTree(folders, notes)

  async function handleCreateFolder(name: string, parentId: string | null) {
    await createFolder(name, parentId)
  }

  async function handleCreateNote(title: string, folderId: string | null) {
    const folder = folders.find((item) => item.id === folderId)
    const slug = `${slugify(title)}-${Date.now().toString(36)}`
    await createNote({
      slug, title, folderId, content: '',
      subject: folder?.name ?? 'General',
      topic: 'General', tags: [], status: 'learning',
      difficulty: 'medium', date: today(), emoji: '📄',
    })
    router.push(`/notes/${slug}`)
  }

  async function handleDeleteFolder(id: string) {
    await removeFolder(id)
  }

  async function handleDeleteNote(slug: string) {
    await removeNote(slug)
  }

  async function handleMoveNote(slug: string, folderId: string | null) {
    await updateNote(slug, { folderId })
  }

  async function handleRenameNote(slug: string, title: string) {
    const newSlug = `${slugify(title)}-${Date.now().toString(36)}`
    await updateNoteAction(slug, { title, slug: newSlug })
    if (pathname === `/notes/${slug}`) router.push(`/notes/${newSlug}`)
    else router.refresh()
  }

  async function handleRenameFolder(id: string, name: string) {
    await updateFolder(id, name)
  }

  async function handleChangeNoteEmoji(slug: string, emoji: string) {
    await updateNote(slug, { emoji })
  }

  async function handleChangeFolderEmoji(id: string, emoji: string) {
    await updateFolderEmoji(id, emoji)
  }

  async function handleMoveFolder(id: string, parentId: string | null) {
    await moveFolder(id, parentId)
  }

  return (
    <LibrarySidebar
      roots={tree.roots}
      unfiled={tree.unfiled}
      onCreateFolder={handleCreateFolder}
      onCreateNote={handleCreateNote}
      onDeleteFolder={handleDeleteFolder}
      onDeleteNote={handleDeleteNote}
      onRenameNote={handleRenameNote}
      onChangeNoteEmoji={handleChangeNoteEmoji}
      onRenameFolder={handleRenameFolder}
      onChangeFolderEmoji={handleChangeFolderEmoji}
      onMoveNote={handleMoveNote}
      onMoveFolder={handleMoveFolder}
    />
  )
}
