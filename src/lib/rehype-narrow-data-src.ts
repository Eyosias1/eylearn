import type { Plugin } from 'unified'
import type { Root, Element } from 'hast'
import { visit } from 'unist-util-visit'

// rehype-sanitize allows data: in protocols.src broadly; this plugin tightens it
// to SMILES SVG data URLs only — any other data: src is stripped
export const rehypeNarrowDataSrc: Plugin<[], Root> = () => (tree) => {
  visit(tree, 'element', (node: Element) => {
    if (node.tagName !== 'img') return
    const src = node.properties?.src
    if (typeof src !== 'string') return
    if (src.startsWith('data:') && !src.startsWith('data:image/svg+xml;base64,')) {
      delete node.properties!.src
    }
  })
}
