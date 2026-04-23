'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

// lazy — only fetches when a SMILES component actually mounts, then cached
let sdPromise: Promise<typeof import('smiles-drawer')> | null = null
function getSmilesDrawer() {
  if (!sdPromise) sdPromise = import('smiles-drawer')
  return sdPromise
}

const svgCache = new Map<string, string>()

function readTheme() {
  if (typeof window === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

interface SmilesDrawerProps {
  smiles: string
}

export function SmilesDrawer({ smiles }: SmilesDrawerProps) {
  const { resolvedTheme } = useTheme()
  const cacheKey = `${resolvedTheme}:${smiles}`
  const [svg, setSvg] = useState<string>(() => svgCache.get(`${readTheme()}:${smiles}`) ?? '')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!resolvedTheme || !smiles) return
    const cached = svgCache.get(cacheKey)
    if (cached) { setSvg(cached); return }

    let cancelled = false
    getSmilesDrawer().then(({ default: SD }) => {
      if (cancelled) return
      try {
        const drawer = new SD.SvgDrawer({ width: 500, height: 300 })
        const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
        svgEl.setAttributeNS(null, 'width', '500')
        svgEl.setAttributeNS(null, 'height', '300')
        SD.parse(
          smiles,
          (tree: unknown) => {
            drawer.draw(tree, svgEl, resolvedTheme === 'dark' ? 'dark' : 'light')
            if (!cancelled) {
              const svgStr = svgEl.outerHTML
              svgCache.set(cacheKey, svgStr)
              setSvg(svgStr)
              setError(null)
            }
          },
          (err: unknown) => {
            if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to render structure')
          },
        )
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to render structure')
      }
    })
    return () => { cancelled = true }
  }, [smiles, resolvedTheme, cacheKey])

  if (error) {
    return (
      <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-400">
        <p className="font-medium">Failed to render structure</p>
        <pre className="mt-2 text-sm">{error}</pre>
      </div>
    )
  }

  if (!svg) {
    return <div className="my-6 h-48 w-full animate-pulse rounded-lg bg-muted" />
  }

  return (
    <div
      className={cn(
        // layout
        "not-prose my-6 flex justify-center",
        // border
        "rounded-xl border border-border",
        // colors
        "bg-white dark:bg-[#0a0a0a]",
        // spacing
        "p-4",
      )}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
