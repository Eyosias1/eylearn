import { BookOpen, Clock, Layers3 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const problems = [
  ["Passive review feels productive", "Highlighting and rereading can hide what you cannot recall."],
  ["Flashcards stay shallow", "Recognition is easier than explaining an idea from memory."],
  ["Cramming leaks fast", "Last-minute sessions often fade before the material becomes durable."],
]

const icons = [BookOpen, Layers3, Clock]
const accents = [
  "bg-amber-50 dark:bg-amber-950/30",
  "bg-sky-50 dark:bg-sky-950/30",
  "bg-rose-50 dark:bg-rose-950/30",
]

export function ProblemSection() {
  return (
    <section className={cn("flex flex-col items-center gap-8 px-4 py-16 lg:px-10")}>
      <div className={cn("max-w-3xl text-center")}>
        <h2 className={cn("text-4xl font-bold lg:text-5xl")}>Most study apps make learning feel easier.</h2>
        <p className={cn("mt-4 text-lg text-muted-foreground")}>
          eyLearn is built around the useful struggle: retrieval, spacing, reflection, and visible
          mastery.
        </p>
      </div>
      <div className={cn("grid w-full max-w-6xl gap-4 md:grid-cols-3")}>
        {problems.map(([title, body], index) => {
          const Icon = icons[index]
          return (
            <Card key={title} className={cn(accents[index])}>
              <CardHeader>
                <Icon className="size-5" />
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent className={cn("text-muted-foreground")}>{body}</CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
