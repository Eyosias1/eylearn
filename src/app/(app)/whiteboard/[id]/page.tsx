import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import '@excalidraw/excalidraw/index.css'
import { ExcalidrawCanvas } from '@/components/excalidraw/ExcalidrawCanvas'
import { getWhiteboard } from '@/lib/whiteboards/queries'

interface WhiteboardDetailPageProps {
  params: Promise<{ id: string }>
}

async function WhiteboardContent({ params }: WhiteboardDetailPageProps) {
  const { id } = await params
  const board = await getWhiteboard(id)
  if (!board) notFound()

  return (
    <div className="h-full min-h-0">
      <ExcalidrawCanvas drawingId={id} initialTitle={board.title} />
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
