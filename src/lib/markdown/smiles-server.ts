import { readFileSync } from 'fs'
import { join } from 'path'
import { parseHTML } from 'linkedom'

type SmilesDrawer = {
  SvgDrawer: new (opts: { width: number; height: number }) => {
    draw(tree: unknown, el: unknown, theme: string): void
  }
  parse(smiles: string, ok: (tree: unknown) => void, err: (e: unknown) => void): void
}

// Lazy — nothing runs at import time. First call to renderSmilesToSvg initializes once.
let doc: ReturnType<typeof parseHTML>['document'] | null = null
let SD: SmilesDrawer | null = null

function init() {
  if (SD) return
  const { document } = parseHTML('<!doctype html><html><body></body></html>')
  doc = document
  const bundleCode = readFileSync(
    join(process.cwd(), 'node_modules/smiles-drawer/dist/smiles-drawer.js'),
    'utf-8',
  )
  // eslint-disable-next-line no-new-func
  SD = new Function('window', 'document', `${bundleCode}\nreturn window.SmilesDrawer`)(
    { document: doc, devicePixelRatio: 1 },
    doc,
  ) as SmilesDrawer
}

export function renderSmilesToSvg(smiles: string): string | null {
  try {
    init()
    const svgEl = doc!.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    svgEl.setAttributeNS(null, 'width', '500')
    svgEl.setAttributeNS(null, 'height', '300')
    const drawer = new SD!.SvgDrawer({ width: 500, height: 300 })
    let result: string | null = null
    SD!.parse(
      smiles,
      (tree) => { drawer.draw(tree, svgEl, 'light'); result = String(svgEl.outerHTML) },
      (err) => console.error('SMILES server render error:', err),
    )
    return result
  } catch (err) {
    console.error('SMILES server render error:', err)
    return null
  }
}
