'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useDocumentTheme } from '@/hooks/useDocumentTheme'
import { darkTheme, lightTheme } from '@/lib/mermaid/mermaid-themes'

let mermaidPromise: Promise<typeof import('mermaid')> | null = null
function getMermaid() {
  if (!mermaidPromise) mermaidPromise = import('mermaid')
  return mermaidPromise
}

const svgCache = new Map<string, string>()

export function Mermaid({ chart }: { chart: string }) {
  const resolvedTheme = useDocumentTheme()
  const cacheKey = `${resolvedTheme}:${chart}`
  const [svg, setSvg] = useState<string>(() => svgCache.get(cacheKey) ?? '')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const cached = svgCache.get(cacheKey)
    if (cached) { setSvg(cached); return }

    let cancelled = false
    getMermaid().then(async ({ default: mermaid }) => {
      if (cancelled) return
      mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        themeVariables: resolvedTheme === 'dark' ? darkTheme : lightTheme,
      })
      const container = document.createElement('div')
      container.style.visibility = 'hidden'
      container.style.position = 'absolute'
      document.body.appendChild(container)
      try {
        const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`
        const { svg } = await mermaid.render(id, chart, container)
        if (!cancelled) { svgCache.set(cacheKey, svg); setSvg(svg); setError(null) }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to render diagram')
      } finally {
        document.body.removeChild(container)
      }
    })
    return () => { cancelled = true }
  }, [chart, resolvedTheme, cacheKey])

  if (error) {
    return (
      <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-400">
        <p className="font-medium">Failed to render diagram</p>
        <pre className="mt-2 text-sm">{error}</pre>
      </div>
    )
  }

  if (!svg) return <div className="my-6 h-48 w-full animate-pulse rounded-lg bg-muted" />

  return (
    <div
      className={cn(
        // layout
        "my-6 flex justify-center overflow-x-auto",
        // colors
        "bg-white dark:bg-[#0a0a0a]",
        // spacing
        "p-6",
      )}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
