import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const steps = [
  "Add notes or topics",
  "AI generates questions",
  "Answer from memory",
  "Rate your confidence",
  "Review when it matters",
]

export function CoreLoopSection() {
  return (
    <section id="loop" className={cn("px-4 py-16 lg:px-10")}>
      <Card className={cn("mx-auto max-w-6xl")}>
        <CardHeader>
          <Badge className={cn("w-fit")}>The core loop</Badge>
          <CardTitle className={cn("max-w-3xl text-4xl lg:text-5xl")}>
            From messy notes to a study session that knows what to ask.
          </CardTitle>
        </CardHeader>
        <CardContent className={cn("grid gap-4 md:grid-cols-5")}>
          {steps.map((step, index) => (
            <div key={step} className={cn("flex flex-col gap-3")}>
              <div className={cn("flex items-center gap-3")}>
                <Badge variant="secondary">{index + 1}</Badge>
                {index < steps.length - 1 && <Separator className={cn("hidden flex-1 md:block")} />}
              </div>
              <p className={cn("text-sm font-medium")}>{step}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  )
}
