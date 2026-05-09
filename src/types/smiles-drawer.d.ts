declare module 'smiles-drawer' {
  const smilesDrawer: {
    Drawer: new (options: { width: number; height: number }) => {
      draw(tree: unknown, canvas: HTMLCanvasElement, theme: 'light' | 'dark'): void
    }
    SvgDrawer: new (options: { width: number; height: number }) => {
      draw(tree: unknown, target: SVGSVGElement, theme: 'light' | 'dark'): SVGSVGElement
    }
    parse(smiles: string, success: (tree: unknown) => void, error: (err: unknown) => void): void
  }
  export default smilesDrawer
}
