import Link from "next/link"
import { ArrowRight, Brain, CheckCircle2, Clock3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

export function HeroSection() {
  return (
    <section className={cn("flex flex-col items-center gap-10 px-4 py-16 text-center lg:px-10 lg:py-24")}>
      <div className={cn("flex max-w-5xl flex-col items-center gap-6")}>
        <Badge variant="outline" className={cn("h-7 px-3")}>AI sets up. You do the learning.</Badge>
        <h1 className={cn("text-5xl font-bold tracking-normal text-balance lg:text-8xl")}>
          The study workspace for remembering what matters.
        </h1>
        <p className={cn("max-w-3xl text-lg leading-8 text-muted-foreground lg:text-xl")}>
          eyLearn turns notes into retrieval practice, spaced reviews, topic health, and study plans
          that know what your brain is about to forget.
        </p>
        <div className={cn("flex flex-col gap-3 sm:flex-row")}>
          <Button asChild size="lg">
            <Link href="/sign-up">Get eyLearn free <ArrowRight className="size-4" /></Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#loop">Watch the loop</Link>
          </Button>
        </div>
        <div className={cn("flex flex-wrap justify-center gap-2")}>
          {["Notes", "Questions", "Reviews", "Graph"].map((item, index) => (
            <Badge
              key={item}
              variant="secondary"
              className={cn(
                "h-7 px-3",
                index === 0 && "bg-amber-100 dark:bg-amber-950/40",
                index === 1 && "bg-emerald-100 dark:bg-emerald-950/40",
                index === 2 && "bg-sky-100 dark:bg-sky-950/40",
                index === 3 && "bg-rose-100 dark:bg-rose-950/40",
              )}
            >
              {item}
            </Badge>
          ))}
        </div>
      </div>
      <Card className={cn("w-full max-w-6xl bg-sky-50 text-left shadow-sm dark:bg-sky-950/30")}>
        <CardHeader className={cn("border-b")}>
          <div className={cn("flex flex-wrap items-center justify-between gap-3")}>
            <CardTitle>Study Control</CardTitle>
            <div className={cn("flex gap-2")}>
              <Badge variant="secondary">18 day streak</Badge>
              <Badge>Due now</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className={cn("grid gap-4 p-4 lg:grid-cols-[1.2fr_0.8fr]")}>
          <div className={cn("flex flex-col gap-4 rounded-lg border bg-background p-5")}>
            <div className={cn("flex items-start justify-between gap-4")}>
              <div>
                <p className={cn("text-sm text-muted-foreground")}>Next session</p>
                <h2 className={cn("text-3xl font-bold")}>Metabolic pathways</h2>
              </div>
              <Clock3 className="size-5" />
            </div>
            <Progress value={78} />
            <p className={cn("text-sm text-muted-foreground")}>
              14 questions, 3 weak spots, one whiteboard prompt, and a confidence check.
            </p>
          </div>
          <div className={cn("grid gap-3")}>
            {["Recall first", "Explain the gap", "Schedule the return"].map((item, index) => (
              <div key={item} className={cn("flex items-center justify-between rounded-lg border bg-background p-4")}>
                <span className={cn("flex items-center gap-2 text-sm font-medium")}>
                  {index === 1 ? <Brain className="size-4" /> : <CheckCircle2 className="size-4" />}
                  {item}
                </span>
                <Badge variant="outline">Step {index + 1}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
