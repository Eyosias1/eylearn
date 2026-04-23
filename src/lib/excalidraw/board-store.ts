import { EMPTY_EXCALIDRAW_SCENE, type ExcalidrawSceneType } from '@/types/ExcalidrawSceneType'
import type { WhiteboardMeta } from '@/types/whiteboard'
import { buildWhiteboardPreview, getEmptyWhiteboardPreview } from '@/lib/excalidraw/preview'

const BOARDS_STORAGE_KEY = 'excalidraw:boards'
const LEGACY_DEFAULT_BOARD_ID = 'default'
const LEGACY_DEFAULT_BOARD_TITLE = 'Untitled Board 1'

function canUseStorage() {
  return typeof window !== 'undefined'
}

function isWhiteboardMeta(value: unknown): value is WhiteboardMeta {
  if (!value || typeof value !== 'object') return false

  const board = value as Partial<WhiteboardMeta>
  return typeof board.id === 'string'
    && typeof board.title === 'string'
    && typeof board.updatedAt === 'string'
    && !!board.preview
}

function readBoardsSync(): WhiteboardMeta[] {
  if (!canUseStorage()) return []

  const raw = window.localStorage.getItem(BOARDS_STORAGE_KEY)
  if (!raw) return []

  try {
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isWhiteboardMeta)
  } catch {
    window.localStorage.removeItem(BOARDS_STORAGE_KEY)
    return []
  }
}

function writeBoardsSync(boards: WhiteboardMeta[]) {
  if (!canUseStorage()) return
  window.localStorage.setItem(BOARDS_STORAGE_KEY, JSON.stringify(boards))
}

function sortBoards(boards: WhiteboardMeta[]) {
  return [...boards].sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
}

function getDrawingStorageKey(id: string) {
  return `excalidraw:drawing:${id}`
}

function hasLegacyDefaultScene() {
  if (!canUseStorage()) return false
  return window.localStorage.getItem(getDrawingStorageKey(LEGACY_DEFAULT_BOARD_ID)) !== null
}

function readSceneFromStorage(id: string): ExcalidrawSceneType | null {
  if (!canUseStorage()) return null

  const raw = window.localStorage.getItem(getDrawingStorageKey(id))
  if (!raw) return null

  try {
    return JSON.parse(raw) as ExcalidrawSceneType
  } catch {
    return null
  }
}

function ensureLegacyDefaultBoard(boards: WhiteboardMeta[]) {
  if (boards.length > 0 || !hasLegacyDefaultScene()) return boards

  const legacyScene = readSceneFromStorage(LEGACY_DEFAULT_BOARD_ID)

  return [{
    id: LEGACY_DEFAULT_BOARD_ID,
    title: LEGACY_DEFAULT_BOARD_TITLE,
    updatedAt: new Date().toISOString(),
    preview: legacyScene ? buildWhiteboardPreview(legacyScene) : getEmptyWhiteboardPreview(),
  }]
}

function getNextUntitledTitle(boards: WhiteboardMeta[]) {
  const numbers = boards.flatMap(board => {
    const match = /^Untitled Board (\d+)$/.exec(board.title)
    return match ? [Number(match[1])] : []
  })

  const nextNumber = numbers.length === 0 ? 1 : Math.max(...numbers) + 1
  return `Untitled Board ${nextNumber}`
}

export async function listBoards(): Promise<WhiteboardMeta[]> {
  const boards = ensureLegacyDefaultBoard(readBoardsSync())
  const sortedBoards = sortBoards(boards)

  if (sortedBoards.length !== readBoardsSync().length) {
    writeBoardsSync(sortedBoards)
  }

  return sortedBoards
}

export async function getBoard(id: string): Promise<WhiteboardMeta | null> {
  const boards = await listBoards()
  return boards.find(board => board.id === id) ?? null
}

export async function upsertBoardMeta(meta: WhiteboardMeta): Promise<void> {
  const boards = readBoardsSync().filter(board => board.id !== meta.id)
  writeBoardsSync(sortBoards([...boards, meta]))
}

export async function updateBoardTitle(id: string, title: string): Promise<WhiteboardMeta | null> {
  const existing = await getBoard(id)
  if (!existing) return null

  const nextTitle = title.trim()
  if (!nextTitle) return existing

  const updated: WhiteboardMeta = {
    ...existing,
    title: nextTitle,
  }

  await upsertBoardMeta(updated)
  return updated
}

export async function createBoard(): Promise<WhiteboardMeta> {
  const boards = await listBoards()
  const board: WhiteboardMeta = {
    id: crypto.randomUUID(),
    title: getNextUntitledTitle(boards),
    updatedAt: new Date().toISOString(),
    preview: getEmptyWhiteboardPreview(),
  }

  window.localStorage.setItem(getDrawingStorageKey(board.id), JSON.stringify(EMPTY_EXCALIDRAW_SCENE))
  await upsertBoardMeta(board)

  return board
}

export async function syncBoardMetaFromScene(id: string, scene: typeof EMPTY_EXCALIDRAW_SCENE): Promise<void> {
  const existing = await getBoard(id)
  const now = new Date().toISOString()

  await upsertBoardMeta({
    id,
    title: existing?.title ?? LEGACY_DEFAULT_BOARD_TITLE,
    updatedAt: now,
    preview: buildWhiteboardPreview(scene),
  })
}
