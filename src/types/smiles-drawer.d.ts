declare module 'smiles-drawer' {
  class Drawer {
    constructor(options: { width: number; height: number })
    draw(tree: unknown, canvas: HTMLCanvasElement, theme: 'light' | 'dark'): void
  }
  class SvgDrawer {
    constructor(options: { width: number; height: number })
    draw(tree: unknown, target: SVGSVGElement, theme: 'light' | 'dark'): SVGSVGElement
  }
  function parse(smiles: string, success: (tree: unknown) => void, error: (err: unknown) => void): void
  export default { Drawer, SvgDrawer, parse }
}
