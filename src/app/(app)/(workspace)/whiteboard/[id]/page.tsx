import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import '@excalidraw/excalidraw/index.css'
import { BreadcrumbLabel } from '@/components/layout/breadcrumb-label'
import { WhiteboardCanvas } from '@/components/whiteboard/WhiteboardCanvas'
import { getWhiteboard } from '@/lib/whiteboards/queries'
import { cn } from '@/lib/utils'

interface WhiteboardDetailPageProps {
  params: Promise<{ id: string }>
}

async function WhiteboardContent({ params }: WhiteboardDetailPageProps) {
  const { id } = await params
  const board = await getWhiteboard(id)
  if (!board) notFound()

  return (
    <div
      className={cn(
        // sizing
        "h-full min-h-0 w-full",
      )}
    >
      <BreadcrumbLabel label={board.title} fallback="Board" />
      <WhiteboardCanvas drawingId={id} />
    </div>
  )
}

export default function WhiteboardDetailPage({ params }: WhiteboardDetailPageProps) {
  return (
    <Suspense>
      <WhiteboardContent params={params} />
    </Suspense>
  )
}
