import type { Plugin } from 'unified'
import type { Root, Element, Text } from 'hast'
import { visit } from 'unist-util-visit'
import { renderSmilesToSvg } from '@/lib/markdown/smiles-server'

function extractText(nodes: Array<Element | Text | { type: string }>): string {
  return nodes.map(n => {
    if (n.type === 'text') return (n as Text).value
    if (n.type === 'element') return extractText((n as Element).children as typeof nodes)
    return ''
  }).join('')
}

export const rehypeSmiles: Plugin<[], Root> = () => (tree) => {
  visit(tree, 'element', (node: Element, index, parent) => {
    // handle both bare <pre> and <figure>-wrapped <pre> from rehype-pretty-code
    let pre: Element | undefined
    if (node.tagName === 'pre' && node.properties?.dataLanguage === 'smiles') {
      pre = node
    } else if (node.tagName === 'figure' && 'dataRehypePrettyCodeFigure' in (node.properties ?? {})) {
      pre = node.children.find(
        (c): c is Element => c.type === 'element' && (c as Element).tagName === 'pre' && (c as Element).properties?.dataLanguage === 'smiles',
      )
    }
    if (!pre || index == null || !parent) return

    const code = pre.children.find(
      (c): c is Element => c.type === 'element' && (c as Element).tagName === 'code',
    )
    if (!code) return

    const smiles = extractText(code.children as (Element | Text)[]).trim()
    const svg = renderSmilesToSvg(smiles)
    if (!svg) return

    const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
    ;(parent.children as unknown[])[index] = {
      type: 'element',
      tagName: 'div',
      properties: { className: 'not-prose my-6 flex justify-center overflow-x-auto rounded-xl border border-border bg-white p-4 dark:bg-[#0a0a0a]' },
      children: [{
        type: 'element',
        tagName: 'img',
        properties: { src: dataUrl, alt: smiles, width: 500, height: 300 },
        children: [],
      }],
    }
  })
}
