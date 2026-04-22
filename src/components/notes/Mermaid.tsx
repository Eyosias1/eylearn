'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

interface MermaidProps {
  chart: string
}

const darkTheme = {
  primaryColor: '#1e3a5f',
  primaryTextColor: '#ffffff',
  primaryBorderColor: '#60a5fa',
  lineColor: '#94a3b8',
  secondaryColor: '#3b1f5e',
  tertiaryColor: '#14432a',
  background: '#0a0a0a',
  mainBkg: '#1e3a5f',
  border1: '#60a5fa',
  arrowheadColor: '#94a3b8',
  textColor: '#e2e8f0',
  titleColor: '#f1f5f9',
  noteBkgColor: '#1e293b',
  noteTextColor: '#f1f5f9',
}

const lightTheme = {
  primaryColor: '#eef2ff',
  primaryTextColor: '#1e1b4b',
  primaryBorderColor: '#6366f1',
  lineColor: '#94a3b8',
  secondaryColor: '#fdf4ff',
  tertiaryColor: '#ecfdf5',
  background: '#ffffff',
  mainBkg: '#eef2ff',
  border1: '#6366f1',
  arrowheadColor: '#6366f1',
  textColor: '#1e293b',
  titleColor: '#1e1b4b',
  noteBkgColor: '#eef2ff',
  noteTextColor: '#1e1b4b',
}

const svgCache = new Map<string, string>()

export function Mermaid({ chart }: MermaidProps) {
  const { resolvedTheme } = useTheme()
  const cacheKey = `${resolvedTheme}:${chart}`
  const [svg, setSvg] = useState<string>(() => svgCache.get(cacheKey) ?? '')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!resolvedTheme) return
    const cached = svgCache.get(cacheKey)
    if (cached) { setSvg(cached); return }

    let cancelled = false
    import('mermaid').then(async ({ default: mermaid }) => {
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

  if (!svg) {
    return <div className="my-6 h-48 w-full animate-pulse rounded-lg bg-muted" />
  }

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
