'use client'

import { cn } from '@/lib/utils'
import type { WhiteboardPreview as WhiteboardPreviewData } from '@/types/whiteboard'

interface WhiteboardPreviewProps {
  preview: WhiteboardPreviewData
  className?: string
}

function getShapeClasses(type: string) {
  if (type === 'ellipse') return 'rounded-full'
  if (type === 'diamond') return 'rotate-45 rounded-sm'
  if (type === 'line' || type === 'arrow') return 'rounded-full'
  if (type === 'freedraw') return 'rounded-full'
  if (type === 'text') return 'rounded-full'
  return 'rounded-md'
}

export function WhiteboardPreview({ preview, className }: WhiteboardPreviewProps) {
  return (
    <div className={cn(
      'relative h-40 overflow-hidden rounded-xl border bg-linear-to-br from-muted/60 via-background to-muted/30',
      className
    )}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(15,23,42,0.07),transparent_40%),linear-gradient(135deg,rgba(148,163,184,0.12),transparent_50%)]" />

      {preview.shapes.length === 0 ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center text-muted-foreground">
          <div className="h-10 w-10 rounded-2xl border border-dashed border-border/80 bg-background/70" />
          <p className="text-xs font-medium">Empty board</p>
        </div>
      ) : (
        <div className="absolute inset-0">
          {preview.shapes.map(shape => {
            const isStrokeOnly = shape.type === 'line' || shape.type === 'arrow'

            return (
              <div
                key={shape.id}
                className={cn('absolute border shadow-sm', getShapeClasses(shape.type))}
                style={{
                  left: `${shape.x}%`,
                  top: `${shape.y}%`,
                  width: `${shape.width}%`,
                  height: `${shape.type === 'line' || shape.type === 'arrow' ? 3 : shape.height}%`,
                  opacity: shape.opacity / 100,
                  borderColor: shape.strokeColor,
                  backgroundColor: isStrokeOnly ? 'transparent' : shape.backgroundColor || 'rgba(255,255,255,0.75)',
                  transform: `rotate(${shape.angle}rad)`,
                  transformOrigin: 'center',
                }}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
