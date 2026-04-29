export interface NoteTableCell {
  html: string
  align?: 'center' | 'right' | 'left' | 'justify' | 'char'
  colSpan?: number
  rowSpan?: number
}

export interface NoteTableRow {
  cells: NoteTableCell[]
}

export type NoteChunk =
  | { type: 'html'; html: string }
  | { type: 'table'; caption?: string; headRows: NoteTableRow[]; bodyRows: NoteTableRow[] }
  | { type: 'code'; language: string; preHtml: string }
  | { type: 'mermaid'; chart: string }
  | { type: 'smiles'; smiles: string }
