'use client'

import { useEffect, useRef, useState } from 'react'
import { useDocumentTheme } from '@/hooks/useDocumentTheme'

let sdPromise: Promise<typeof import('smiles-drawer')['default']> | null = null
function getSD() {
  if (!sdPromise) sdPromise = import('smiles-drawer').then(m => m.default)
  return sdPromise
}

export function Smiles({ smiles }: { smiles: string }) {
  const theme = useDocumentTheme()
  const svgRef = useRef<SVGSVGElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    setError(null)
    setReady(false)

    getSD().then(SD => {
      if (cancelled || !svgRef.current) return
      SD.parse(
        smiles,
        (tree) => {
          if (cancelled || !svgRef.current) return
          try {
            const drawer = new SD.SvgDrawer({ width: 500, height: 300 })
            drawer.draw(tree, svgRef.current, theme === 'dark' ? 'dark' : 'light')
            if (!cancelled) setReady(true)
          } catch (e) {
            if (!cancelled) setError(e instanceof Error ? e.message : 'Render failed')
          }
        },
        (e) => { if (!cancelled) setError(String(e)) },
      )
    })

    return () => { cancelled = true }
  }, [smiles, theme])

  if (error) {
    return (
      <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-400">
        <p className="font-medium">Failed to render structure</p>
        <pre className="mt-2 text-sm">{smiles}</pre>
      </div>
    )
  }

  return (
    <div className="not-prose my-6 flex justify-center overflow-x-auto rounded-xl border border-border bg-white p-4 dark:bg-[#0a0a0a]">
      {!ready && <div className="h-[300px] w-[500px] animate-pulse rounded-lg bg-muted" />}
      <svg
        ref={svgRef}
        width={500}
        height={300}
        style={{ display: ready ? 'block' : 'none' }}
      />
    </div>
  )
}
