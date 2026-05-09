import { BarChart3, Bot, Brain, CalendarDays, GitBranch, PenTool } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { LandingKnowledgeGraphPreview } from "@/components/landing/LandingKnowledgeGraphPreview"
import { LandingMasteryHeatmap } from "@/components/landing/LandingMasteryHeatmap"
import { LandingModelStrip } from "@/components/landing/LandingModelStrip"
import { cn } from "@/lib/utils"

const largeTile = "bg-violet-50 dark:bg-violet-950/30"
const mediumTile = "bg-sky-50 dark:bg-sky-950/30"
const smallTile = "bg-emerald-50 dark:bg-emerald-950/30"

export function FeaturesSection() {
  return (
    <section id="features" className={cn("flex flex-col items-center gap-8 px-4 py-16 lg:px-10")}>
      <div className={cn("max-w-3xl text-center")}>
        <h2 className={cn("text-4xl font-bold lg:text-6xl")}>One place to learn, draw, ask, and return.</h2>
        <p className={cn("mt-4 text-lg text-muted-foreground")}>
          eyLearn brings your notes, whiteboards, knowledge graph, AI models, and mastery metrics
          into one study workspace.
        </p>
      </div>
      <div className={cn("grid w-full max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3")}>
        <Card className={cn(largeTile, "lg:col-span-2")}>
          <CardHeader>
            <GitBranch className="size-5" />
            <CardTitle>Knowledge graph in real time</CardTitle>
          </CardHeader>
          <CardContent className={cn("flex flex-col gap-4 text-muted-foreground")}>
            <p>Click through subjects, topics, notes, and weak spots as your learning map updates.</p>
            <LandingKnowledgeGraphPreview />
          </CardContent>
        </Card>
        <Card className={cn(mediumTile)}>
          <CardHeader>
            <PenTool className="size-5" />
            <CardTitle>Whiteboard thinking</CardTitle>
          </CardHeader>
          <CardContent className={cn("flex flex-col gap-4 text-muted-foreground")}>
            <p>Sketch pathways, redraw diagrams, and reconstruct concepts from memory.</p>
            <div className={cn("rounded-lg border bg-background p-4")}>
              <p className={cn("text-sm font-medium text-foreground")}>Citric acid cycle</p>
              <div className={cn("mt-4 grid grid-cols-3 gap-2 text-xs")}>
                {["Acetyl-CoA", "Citrate", "ATP"].map((item) => (
                  <span key={item} className={cn("rounded-md border px-2 py-1")}>{item}</span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={cn(largeTile, "lg:col-span-2")}>
          <CardHeader>
            <BarChart3 className="size-5" />
            <CardTitle>Visible mastery metrics</CardTitle>
          </CardHeader>
          <CardContent className={cn("flex flex-col gap-4 text-muted-foreground")}>
            <p>Hover the heatmap to see which subjects are getting stronger.</p>
            <LandingMasteryHeatmap />
          </CardContent>
        </Card>
        <Card className={cn(smallTile)}>
          <CardHeader>
            <Brain className="size-5" />
            <CardTitle>Active recall</CardTitle>
          </CardHeader>
          <CardContent className={cn("flex flex-col gap-4 text-muted-foreground")}>
            <p>Answer first, reveal second, then rate confidence.</p>
            <Progress value={68} />
          </CardContent>
        </Card>
        <Card className={cn(mediumTile, "lg:col-span-2")}>
          <CardHeader>
            <Bot className="size-5" />
            <CardTitle>Agentic AI with frontier models</CardTitle>
          </CardHeader>
          <CardContent className={cn("flex flex-col gap-4 text-muted-foreground")}>
            <p>Ask an AI study partner to explain gaps, generate practice, or reason from your notes.</p>
            <LandingModelStrip />
          </CardContent>
        </Card>
        <Card className={cn(smallTile)}>
          <CardHeader>
            <CalendarDays className="size-5" />
            <CardTitle>Spaced returns</CardTitle>
          </CardHeader>
          <CardContent className={cn("flex flex-col gap-4 text-muted-foreground")}>
            <p>The next session is scheduled by what is slipping, not by vibes.</p>
            <Badge className={cn("w-fit")}>Due today</Badge>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
