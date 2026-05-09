import { GraduationCap, ScrollText, Sparkles, type LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const audiences: [string, string, LucideIcon][] = [
  ["Students", "For people who study hard but still forget.", GraduationCap],
  ["Exam prep", "For high-stakes material with too many moving parts.", ScrollText],
  ["Self-learners", "For turning reading and notes into usable knowledge.", Sparkles],
]

export function AudienceSection() {
  return (
    <section className={cn("flex flex-col items-center gap-8 px-4 py-16 lg:px-10")}>
      <div className={cn("max-w-3xl text-center")}>
        <h2 className={cn("text-4xl font-bold lg:text-5xl")}>Made for serious learners.</h2>
        <p className={cn("mt-4 text-lg text-muted-foreground")}>
          Start with school, exams, and independent study. Grow into anything you need to retain.
        </p>
      </div>
      <div className={cn("grid w-full max-w-6xl gap-4 md:grid-cols-3")}>
        {audiences.map(([title, body, Icon]) => (
          <Card key={title as string}>
            <CardHeader>
              <Icon className="size-5" />
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className={cn("text-muted-foreground")}>{body}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
