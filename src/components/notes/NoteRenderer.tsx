import Link from 'next/link'
import type { JSX } from 'react'
import parse, { domToReact, type DOMNode, type Element } from 'html-react-parser'
import { cn } from '@/lib/utils'
import { CodeBlock } from './CodeBlock'
import { Mermaid } from './Mermaid'
import { SmilesDrawer } from './SmilesDrawer'
import { InlineCode } from './InlineCode'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'

const tableMap: Record<string, (children: React.ReactNode) => JSX.Element> = {
  table: (c) => <div className="not-prose my-6 overflow-hidden rounded-xl border border-border"><Table>{c}</Table></div>,
  thead: (c) => <TableHeader>{c}</TableHeader>,
  tbody: (c) => <TableBody>{c}</TableBody>,
  tr: (c) => <TableRow>{c}</TableRow>,
  th: (c) => <TableHead className="px-4 py-3 font-semibold">{c}</TableHead>,
  td: (c) => <TableCell className="px-4 py-3">{c}</TableCell>,
}

function asElement(node: DOMNode): Element | null {
  return node.type === 'tag' ? (node as unknown as Element) : null
}

function extractText(nodes: DOMNode[]): string {
  return nodes.map(node => {
    if (node.type === 'text') return (node as unknown as { data: string }).data
    const el = asElement(node)
    if (el) return extractText(el.children as DOMNode[])
    return ''
  }).join('')
}

function replace(node: DOMNode): JSX.Element | undefined {
  const el = asElement(node)
  if (!el) return undefined
  const children = domToReact(el.children as DOMNode[], { replace })
  if (el.name in tableMap) return tableMap[el.name](children)

  if (el.name === 'a') {
    const { href = '', class: className, ...props } = el.attribs
    if (href.startsWith('/notes/')) return <Link href={href} className={className} {...props}>{children}</Link>
    return undefined
  }

  // inline code: <span data-rehype-pretty-code-figure>
  if (el.name === 'span' && 'data-rehype-pretty-code-figure' in el.attribs) {
    const code = (el.children as DOMNode[]).map(asElement).find(c => c?.name === 'code') ?? null
    const text = code ? extractText(code.children as DOMNode[]) : ''
    return <InlineCode>{text}</InlineCode>
  }

  if (el.name !== 'figure') return undefined
  if (!('data-rehype-pretty-code-figure' in el.attribs)) return undefined

  const pre = (el.children as DOMNode[]).map(asElement).find(c => c?.name === 'pre') ?? null
  if (!pre) {
    const code = (el.children as DOMNode[]).map(asElement).find(c => c?.name === 'code') ?? null
    const text = code ? extractText(code.children as DOMNode[]) : ''
    return <InlineCode>{text}</InlineCode>
  }
  const lang = pre.attribs['data-language'] ?? 'plaintext'

  if (lang === 'smiles') {
    const code = (pre.children as DOMNode[]).map(asElement).find(c => c?.name === 'code') ?? null
    const smilesStr = code ? extractText(code.children as DOMNode[]) : ''
    return <SmilesDrawer smiles={smilesStr} />
  }

  if (lang === 'mermaid') {
    const code = (pre?.children as DOMNode[] | undefined)?.map(asElement).find(c => c?.name === 'code') ?? null
    const chart = code ? extractText(code.children as DOMNode[]) : ''
    return <Mermaid chart={chart} />
  }

  return <CodeBlock language={lang}>{children}</CodeBlock>
}

export function NoteRenderer({ html }: { html: string }) {
  return (
    <div className={cn(
      "prose prose-lg prose-neutral dark:prose-invert",
      "max-w-none",
      "[&_h1]:mt-10 [&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:font-bold",
      "[&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold",
      "[&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-semibold",
      "[&_p]:my-6 [&_p]:leading-8 [&_li]:my-2",
      "prose-code:before:content-none prose-code:after:content-none",
    )}>
      {parse(html, { replace })}
    </div>
  )
}
