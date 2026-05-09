import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

export function ProductPreviewSection() {
  return (
    <section className={cn("flex flex-col items-center gap-8 px-4 py-16 lg:px-10")}>
      <div className={cn("max-w-3xl text-center")}>
        <h2 className={cn("text-4xl font-bold lg:text-5xl")}>A calmer way to know what comes next.</h2>
        <p className={cn("mt-4 text-lg text-muted-foreground")}>
          The dashboard is less command center, more study desk: what is due, why it matters, and
          where your memory is getting stronger.
        </p>
      </div>
      <div className={cn("grid w-full max-w-6xl gap-4 lg:grid-cols-3")}>
        <Card className={cn("bg-emerald-50 dark:bg-emerald-950/30 lg:col-span-2")}>
          <CardHeader>
            <CardTitle>Topic health</CardTitle>
          </CardHeader>
          <CardContent className={cn("grid gap-4 sm:grid-cols-3")}>
            {["Microbiology", "Pharmacology", "Pathology"].map((topic, index) => (
              <div key={topic} className={cn("flex flex-col gap-3 rounded-lg border bg-background p-4")}>
                <Badge variant="secondary" className={cn("w-fit")}>Box {index + 2}</Badge>
                <p className={cn("font-medium")}>{topic}</p>
                <Progress value={[88, 62, 45][index]} />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className={cn("bg-amber-50 dark:bg-amber-950/30")}>
          <CardHeader>
            <CardTitle>Today&apos;s rhythm</CardTitle>
          </CardHeader>
          <CardContent className={cn("flex flex-col gap-3")}>
            {["Active recall", "Whiteboard review", "Weak spot requeue"].map((item) => (
              <div key={item} className={cn("flex items-center justify-between rounded-lg border bg-background p-3")}>
                <span className={cn("text-sm")}>{item}</span>
                <Badge>Ready</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
