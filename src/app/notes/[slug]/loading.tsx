import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export default function NoteLoading() {
  return (
    <main className={cn("container mx-auto", "py-10 px-8", "max-w-6xl")}>
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-1/4" />
        <div className="mt-10 space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-3/6" />
        </div>
      </div>
    </main>
  )
}
