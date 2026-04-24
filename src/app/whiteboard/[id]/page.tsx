import { Suspense } from 'react'
import '@excalidraw/excalidraw/index.css'
import { ExcalidrawCanvas } from '@/components/excalidraw/ExcalidrawCanvas'

interface WhiteboardDetailPageProps {
  params: Promise<{ id: string }>
}

async function WhiteboardContent({ params }: WhiteboardDetailPageProps) {
  const { id } = await params
  return (
    <div className="h-full min-h-0">
      <ExcalidrawCanvas drawingId={id} />
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
