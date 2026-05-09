'use client'

import { useEffect, useRef, type RefObject } from 'react'
import type { PanelImperativeHandle } from 'react-resizable-panels'

export function useAnimatedPanelResize(
  panelRef: RefObject<PanelImperativeHandle | null>,
  expanded: boolean,
  collapsedPixels: number,
  defaultPixels: number,
) {
  const frameRef = useRef<number | null>(null)
  const lastExpandedPixelsRef = useRef(defaultPixels)

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return

    cancelCurrentFrame(frameRef)

    const { inPixels } = panel.getSize()
    if (inPixels > collapsedPixels) lastExpandedPixelsRef.current = inPixels
    const endPixels = expanded ? lastExpandedPixelsRef.current : collapsedPixels
    animatePanel(panel, inPixels, endPixels, frameRef)

    return () => cancelCurrentFrame(frameRef)
  }, [collapsedPixels, expanded, panelRef])
}

function cancelCurrentFrame(frameRef: RefObject<number | null>) {
  const frame = frameRef.current
  if (frame === null) return
  cancelAnimationFrame(frame)
  frameRef.current = null
}

function animatePanel(
  panel: PanelImperativeHandle,
  startPixels: number,
  endPixels: number,
  frameRef: RefObject<number | null>,
) {
  const durationMs = 180
  const startedAt = performance.now()

  function step(now: number) {
    const progress = Math.min((now - startedAt) / durationMs, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    const nextPixels = startPixels + (endPixels - startPixels) * eased

    panel.resize(`${nextPixels}px`)

    if (progress < 1) {
      frameRef.current = requestAnimationFrame(step)
      return
    }

    panel.resize(`${endPixels}px`)
    frameRef.current = null
  }

  frameRef.current = requestAnimationFrame(step)
}
