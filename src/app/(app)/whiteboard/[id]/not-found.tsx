import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function WhiteboardNotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
      <p className="text-lg font-semibold">Board not found</p>
      <p className="text-sm text-muted-foreground">
        This whiteboard may have been deleted or the link is invalid.
      </p>
      <Button asChild variant="outline">
        <Link href="/whiteboard">Back to boards</Link>
      </Button>
    </div>
  )
}
