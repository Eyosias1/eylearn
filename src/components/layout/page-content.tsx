import { cn } from "@/lib/utils"

interface PageContentProps {
  children: React.ReactNode
  flush?: boolean
}

export function PageContent({ children, flush = false }: PageContentProps) {
  return (
    <main
      className={cn(
        // layout
        "relative flex flex-col items-center overflow-auto",
        // sizing
        "h-full",
        // spacing
        flush ? "p-0" : "p-6",
      )}
    >
      {children}
    </main>
  )
}
