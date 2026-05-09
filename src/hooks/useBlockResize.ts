"use client"

import { useState, useRef } from "react"

export function useBlockResize(
  initialDuration: number,
  hourPx: number,
  onCommit: (newDuration: number) => void,
) {
  const [prevInitial, setPrevInitial] = useState(initialDuration)
  const [duration,    setDuration]    = useState(initialDuration)
  const startYRef     = useRef(0)
  const startDurRef   = useRef(initialDuration)
  const currentDurRef = useRef(initialDuration)

  if (prevInitial !== initialDuration) {
    setPrevInitial(initialDuration)
    setDuration(initialDuration)
  }

  function onMouseDown(e: React.MouseEvent) {
    e.stopPropagation()
    e.preventDefault()
    startYRef.current   = e.clientY
    startDurRef.current = duration

    function onMouseMove(ev: MouseEvent) {
      const deltaMins = ((ev.clientY - startYRef.current) / hourPx) * 60
      const snapped   = Math.max(15, Math.round((startDurRef.current + deltaMins) / 5) * 5)
      currentDurRef.current = snapped
      setDuration(snapped)
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
      if (currentDurRef.current !== startDurRef.current) {
        onCommit(currentDurRef.current)
      }
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  return { duration, onMouseDown }
}
