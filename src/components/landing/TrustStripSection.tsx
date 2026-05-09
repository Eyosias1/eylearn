import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const signals = ["Active recall", "Spaced repetition", "Interleaving", "Feynman mode", "Knowledge graph"]

export function TrustStripSection() {
  return (
    <section className={cn("flex flex-col items-center gap-5 px-4 py-8 lg:px-10")}>
      <p className={cn("text-center text-sm font-medium text-muted-foreground")}>
        Built for the techniques students wish they had before exam week.
      </p>
      <div className={cn("flex max-w-4xl flex-wrap justify-center gap-2")}>
        {signals.map((signal) => (
          <Badge key={signal} variant="secondary" className={cn("h-7 px-3")}>
            {signal}
          </Badge>
        ))}
      </div>
    </section>
  )
}
