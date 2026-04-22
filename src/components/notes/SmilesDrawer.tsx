'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

interface SmilesDrawerProps {
  smiles: string
}

export function SmilesDrawer({ smiles }: SmilesDrawerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (!canvasRef.current || !smiles) return

    import('smiles-drawer').then(({ default: SD }) => {
      const drawer = new SD.Drawer({ width: 500, height: 300 })
      SD.parse(
        smiles,
        (tree: unknown) => {
          drawer.draw(tree, canvasRef.current!, resolvedTheme === 'dark' ? 'dark' : 'light')
        },
        (err: unknown) => console.error('SMILES parse error:', err),
      )
    })
  }, [smiles, resolvedTheme])

  return (
    <div className={cn(
      // layout
      "not-prose my-6 flex justify-center",
      // border
      "rounded-xl border border-border",
      // colors
      "bg-white dark:bg-[#0a0a0a]",
      // spacing
      "p-4",
    )}>
      <canvas ref={canvasRef} width={500} height={300} />
    </div>
  )
}
