'use client'

import { useRef } from 'react'
import { CodeBlock } from '@/components/notes/renderer/CodeBlock'
import { Mermaid } from '@/components/notes/renderer/Mermaid'
import { Smiles } from '@/components/notes/renderer/Smiles'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { splitNoteHtml } from '@/lib/notes/split-note-html'
import { cn } from '@/lib/utils'
import { useInternalLinkNav } from '@/hooks/useInternalLinkNav'
import type { NoteChunk } from '@/types/NoteChunk'

interface NoteRendererProps {
  chunks?: NoteChunk[]
  html?: string
}

export function NoteRenderer({ chunks, html }: NoteRendererProps) {
  const ref = useRef<HTMLDivElement>(null)
  const resolvedChunks = chunks ?? (html ? splitNoteHtml(html) : [])
  const htmlKey = resolvedChunks.map(chunk => {
    if (chunk.type === 'html') return chunk.html
    if (chunk.type === 'table') return `${chunk.type}:${JSON.stringify(chunk)}`
    if (chunk.type === 'code') return `${chunk.type}:${chunk.language}:${chunk.preHtml}`
    return `${chunk.type}:${chunk.type === 'mermaid' ? chunk.chart : chunk.smiles}`
  }).join('\n<!--chunk-->\n')

  useInternalLinkNav(ref, htmlKey)

  return (
    <div
      ref={ref}
      className={cn(
        "prose prose-lg prose-neutral dark:prose-invert",
        "max-w-none",
        "[&_h1]:mt-10 [&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:font-bold",
        "[&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold",
        "[&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-semibold",
        "[&_p]:my-6 [&_p]:leading-8 [&_li]:my-2",
        "prose-code:before:content-none prose-code:after:content-none",
        "[&_span[data-rehype-pretty-code-figure]]:rounded [&_span[data-rehype-pretty-code-figure]]:px-1.5 [&_span[data-rehype-pretty-code-figure]]:py-0.5",
        "[&_span[data-rehype-pretty-code-figure]]:text-sm [&_span[data-rehype-pretty-code-figure]]:font-semibold",
        "[&_span[data-rehype-pretty-code-figure]]:[font-family:var(--font-mono)]",
        "[&_span[data-rehype-pretty-code-figure]]:bg-muted [&_span[data-rehype-pretty-code-figure]]:text-foreground",
      )}
    >
      {resolvedChunks.map((chunk, index) => {
        if (chunk.type === 'html') {
          return <div key={index} dangerouslySetInnerHTML={{ __html: chunk.html }} />
        }
        if (chunk.type === 'table') {
          return (
            <div key={index} className="not-prose my-6 overflow-hidden rounded-xl border border-border">
              <Table>
                {chunk.caption && <TableCaption>{chunk.caption}</TableCaption>}
                {chunk.headRows.length > 0 && (
                  <TableHeader>
                    {chunk.headRows.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {row.cells.map((cell, cellIndex) => (
                          <TableHead
                            key={cellIndex}
                            className="px-4 py-3 font-semibold"
                            align={cell.align}
                            colSpan={cell.colSpan}
                            rowSpan={cell.rowSpan}
                            dangerouslySetInnerHTML={{ __html: cell.html }}
                          />
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                )}
                <TableBody>
                  {chunk.bodyRows.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {row.cells.map((cell, cellIndex) => (
                        <TableCell
                          key={cellIndex}
                          className="px-4 py-3"
                          align={cell.align}
                          colSpan={cell.colSpan}
                          rowSpan={cell.rowSpan}
                          dangerouslySetInnerHTML={{ __html: cell.html }}
                        />
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )
        }
        if (chunk.type === 'code') {
          return <CodeBlock key={index} language={chunk.language} preHtml={chunk.preHtml} />
        }
        if (chunk.type === 'mermaid') {
          return <Mermaid key={index} chart={chunk.chart} />
        }
        return <Smiles key={index} smiles={chunk.smiles} />
      })}
    </div>
  )
}
