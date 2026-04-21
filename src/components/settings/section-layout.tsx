import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface Block {
  title: string
  description?: string
  children: React.ReactNode
}

export function SectionLayout({
  title,
  description,
  blocks,
}: {
  title: string
  description: string
  blocks: Block[]
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="flex flex-col gap-8">
        {blocks.map((block, i) => (
          <div
            key={i}
            className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4 lg:gap-8"
          >
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-foreground">{block.title}</p>
              {block.description && (
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {block.description}
                </p>
              )}
            </div>
            <Card>
              <CardContent className="py-1">{block.children}</CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

export function SettingRow({
  label,
  description,
  children,
  className,
}: {
  label: string
  description?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex items-start justify-between gap-6 py-4", className)}>
      <div className="flex flex-col gap-0.5 min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && (
          <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-2 shrink-0">{children}</div>
    </div>
  )
}
