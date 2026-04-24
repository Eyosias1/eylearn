import { parseHTML } from 'linkedom'
import type { NoteChunk, NoteTableCell, NoteTableRow } from '@/types/NoteChunk'

function serializeNode(node: { nodeType?: number; outerHTML?: string; textContent?: string }): string {
  if (node.nodeType === 3) return node.textContent ?? ''
  return node.outerHTML ?? ''
}

function serializeChildren(element: Element): string {
  return Array.from(element.childNodes)
    .map(child => serializeNode(child as { nodeType?: number; outerHTML?: string; textContent?: string }))
    .join('')
}

function parseTableCell(cell: Element): NoteTableCell {
  const colSpan = cell.getAttribute('colspan')
  const rowSpan = cell.getAttribute('rowspan')
  return {
    html: serializeChildren(cell),
    align: cell.getAttribute('align') ?? undefined,
    colSpan: colSpan ? Number(colSpan) : undefined,
    rowSpan: rowSpan ? Number(rowSpan) : undefined,
  }
}

function parseTableRows(section: Element | null): NoteTableRow[] {
  if (!section) return []
  return Array.from(section.querySelectorAll(':scope > tr')).map(row => ({
    cells: Array.from(row.children)
      .filter(cell => ['th', 'td'].includes(cell.tagName.toLowerCase()))
      .map(cell => parseTableCell(cell as Element)),
  }))
}

function extractSpecialChunk(node: Element): NoteChunk | null {
  if (node.tagName.toLowerCase() === 'table') {
    const caption = node.querySelector(':scope > caption')?.textContent?.trim() || undefined
    const explicitHead = node.querySelector(':scope > thead')
    const explicitBody = node.querySelector(':scope > tbody')
    const directRows = Array.from(node.querySelectorAll(':scope > tr'))
    const inferredHeadRows = !explicitHead && directRows.length > 0 && Array.from(directRows[0].children).every(
      cell => cell.tagName.toLowerCase() === 'th',
    )

    const headRows = explicitHead
      ? parseTableRows(explicitHead)
      : inferredHeadRows
        ? [{
            cells: Array.from(directRows[0].children).map(cell => parseTableCell(cell as Element)),
          }]
        : []

    const bodyRows = explicitBody
      ? parseTableRows(explicitBody)
      : directRows.slice(inferredHeadRows ? 1 : 0).map(row => ({
          cells: Array.from(row.children)
            .filter(cell => ['th', 'td'].includes(cell.tagName.toLowerCase()))
            .map(cell => parseTableCell(cell as Element)),
        }))

    return { type: 'table', caption, headRows, bodyRows }
  }

  if (node.tagName.toLowerCase() !== 'figure') return null
  if (!node.hasAttribute('data-rehype-pretty-code-figure')) return null

  const pre = node.querySelector('pre')
  const code = pre?.querySelector('code')
  const language = pre?.getAttribute('data-language') ?? code?.getAttribute('data-language') ?? ''
  if (!pre || !code || !language) return null

  const text = code.textContent?.trim() ?? ''
  if (language === 'smiles') return { type: 'smiles', smiles: text }
  if (language === 'mermaid') return { type: 'mermaid', chart: text }
  return { type: 'code', language, preHtml: pre.outerHTML }
}

export function splitNoteHtml(html: string): NoteChunk[] {
  const { document } = parseHTML(`<!doctype html><html><body>${html}</body></html>`)
  const chunks: NoteChunk[] = []
  let htmlBuffer = ''

  const flushHtml = () => {
    if (!htmlBuffer) return
    chunks.push({ type: 'html', html: htmlBuffer })
    htmlBuffer = ''
  }

  for (const child of Array.from(document.body.childNodes)) {
    if ((child as { nodeType?: number }).nodeType === 1) {
      const chunk = extractSpecialChunk(child as Element)
      if (chunk) {
        flushHtml()
        chunks.push(chunk)
        continue
      }
    }
    htmlBuffer += serializeNode(child as { nodeType?: number; outerHTML?: string; textContent?: string })
  }

  flushHtml()
  return chunks
}
