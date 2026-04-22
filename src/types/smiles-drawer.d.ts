declare module 'smiles-drawer' {
  class Drawer {
    constructor(options: { width: number; height: number })
    draw(tree: unknown, canvas: HTMLCanvasElement, theme: 'light' | 'dark'): void
  }
  function parse(smiles: string, success: (tree: unknown) => void, error: (err: unknown) => void): void
  export default { Drawer, parse }
}
