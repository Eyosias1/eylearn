'use client'

import dynamic from 'next/dynamic'
import { useExcalidrawDrawing } from '@/hooks/useExcalidrawDrawing'
import { supabaseDrawingStore } from '@/lib/whiteboard/supabase-store'
import { cn } from '@/lib/utils'
import type { DrawingStore } from '@/lib/whiteboard/store'

const Excalidraw = dynamic(
  async () => (await import('@excalidraw/excalidraw')).Excalidraw,
  { ssr: false }
)

interface WhiteboardCanvasProps {
  drawingId: string
  store?: DrawingStore
}

export function WhiteboardCanvas({ drawingId, store = supabaseDrawingStore }: WhiteboardCanvasProps) {
  const {
    errorMessage,
    handleChange,
    initialScene,
    isReady,
  } = useExcalidrawDrawing({ drawingId, store })

  return (
    <section
      className={cn(
        // layout
        "flex flex-col overflow-hidden",
        // sizing
        "h-full min-h-0",
        // colors
        "bg-card",
        // border
        "rounded-none border-0",
      )}
    >
      <div className={cn(
        // sizing
        "min-h-0 flex-1",
      )}>
        {!isReady ? (
          <div
            className={cn(
              // layout
              "flex items-center justify-center",
              // sizing
              "h-full",
              // typography
              "text-sm",
              // colors
              "text-muted-foreground",
            )}
          >
            Loading whiteboard...
          </div>
        ) : (
          <div className={cn(
            // sizing
            "h-full",
          )}>
            <Excalidraw
              key={drawingId}
              initialData={initialScene}
              onChange={handleChange}
            />
          </div>
        )}
      </div>

      {errorMessage && (
        <div
          className={cn(
            // spacing
            "px-4 py-2",
            // typography
            "text-sm",
            // colors
            "text-destructive",
            // border
            "border-t",
          )}
        >
          {errorMessage}
        </div>
      )}
    </section>
  )
}
