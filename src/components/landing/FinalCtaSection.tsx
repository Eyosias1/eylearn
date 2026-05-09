import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function FinalCtaSection() {
  return (
    <section className={cn("px-4 py-16 lg:px-10")}>
      <Card className={cn("mx-auto max-w-6xl")}>
        <CardContent className={cn("flex flex-col items-center gap-6 py-12 text-center")}>
          <div className={cn("max-w-3xl")}>
            <h2 className={cn("text-4xl font-bold lg:text-6xl")}>
              Your next study session should know what you are about to forget.
            </h2>
            <p className={cn("mt-4 text-lg text-muted-foreground")}>
              Build sessions from your notes, practice from memory, and let eyLearn bring back the
              right material at the right time.
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/sign-up">Create your account <ArrowRight className="size-4" /></Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  )
}
