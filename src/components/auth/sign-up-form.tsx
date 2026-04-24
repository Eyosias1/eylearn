import { FieldDescription } from "@/components/ui/field"
import { cn } from "@/lib/utils"

export function SignUpForm() {
  return (
    <div className={cn("flex flex-col gap-6 text-center")}>
      <div className={cn("flex flex-col items-center gap-1")}>
        <h1 className={cn("text-2xl font-bold")}>Create your account</h1>
        <p className={cn("text-balance text-sm text-muted-foreground")}>
          Sign up logic will be added next.
        </p>
      </div>
      <FieldDescription className={cn("text-center")}>
        Already have an account? <a href="/sign-in">Sign in</a>
      </FieldDescription>
    </div>
  )
}
