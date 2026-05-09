import { Suspense } from 'react'
import { WhiteboardGallery } from '@/components/whiteboard/WhiteboardGallery'
import { getAllWhiteboards } from '@/lib/whiteboards/queries'

async function WhiteboardGalleryData() {
  const boards = await getAllWhiteboards()
  return <WhiteboardGallery initialBoards={boards} />
}

export default function WhiteboardPage() {
  return (
    <Suspense>
      <WhiteboardGalleryData />
    </Suspense>
  )
}
