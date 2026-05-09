import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const techniques = [
  ["recall", "Active Recall", "Pull the answer from memory before checking yourself."],
  ["spacing", "Spacing", "Review after time has passed, when retrieval takes effort again."],
  ["interleave", "Interleaving", "Mix related topics so you learn when to use each idea."],
  ["feynman", "Feynman", "Explain a concept simply enough to expose the gaps."],
]

export function ScienceSection() {
  return (
    <section id="science" className={cn("flex flex-col items-center gap-8 px-4 py-16 lg:px-10")}>
      <div className={cn("max-w-3xl text-center")}>
        <h2 className={cn("text-4xl font-bold lg:text-5xl")}>Built from learning science, not study vibes.</h2>
        <p className={cn("mt-4 text-lg text-muted-foreground")}>
          The app favors techniques that make knowledge usable after the session ends.
        </p>
      </div>
      <Tabs defaultValue="recall" className={cn("w-full max-w-4xl")}>
        <TabsList className={cn("flex h-auto w-full flex-wrap justify-start")}>
          {techniques.map(([value, label]) => (
            <TabsTrigger key={value} value={value}>{label}</TabsTrigger>
          ))}
        </TabsList>
        {techniques.map(([value, label, body]) => (
          <TabsContent key={value} value={value}>
            <Card>
              <CardContent className={cn("flex flex-col gap-3 py-6")}>
                <h3 className={cn("text-xl font-semibold")}>{label}</h3>
                <p className={cn("max-w-2xl text-muted-foreground")}>{body}</p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}
