import type { NoteFolder } from '@/types/NoteFolderType'
import type { NoteMeta } from '@/types/NoteRecordType'

export interface NoteFolderNode {
  folder: NoteFolder
  notes: NoteMeta[]
  children: NoteFolderNode[]
}

export function buildNoteFolderTree(folders: NoteFolder[], notes: NoteMeta[]) {
  const nodes = new Map<string, NoteFolderNode>()
  const roots: NoteFolderNode[] = []

  for (const folder of folders) {
    nodes.set(folder.id, { folder, notes: [], children: [] })
  }

  for (const node of nodes.values()) {
    const parent = node.folder.parentId ? nodes.get(node.folder.parentId) : null
    if (parent) parent.children.push(node)
    else roots.push(node)
  }

  for (const note of notes) {
    const folder = note.folderId ? nodes.get(note.folderId) : null
    if (folder) folder.notes.push(note)
  }

  roots.sort(sortNode)
  for (const node of nodes.values()) sortNested(node)

  return {
    roots,
    unfiled: notes.filter(note => !note.folderId || !nodes.has(note.folderId)),
  }
}

function sortNested(node: NoteFolderNode) {
  node.children.sort(sortNode)
  node.notes.sort(sortNote)
  node.children.forEach(sortNested)
}

function sortNode(a: NoteFolderNode, b: NoteFolderNode) {
  return a.folder.name.localeCompare(b.folder.name)
}

function sortNote(a: NoteMeta, b: NoteMeta) {
  return a.title.localeCompare(b.title)
}
