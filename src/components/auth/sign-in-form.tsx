"use client"

import type { ComponentProps } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import { signIn } from "@/lib/actions/auth"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const signInSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
})

type SignInValues = z.infer<typeof signInSchema>

export function SignInForm({ className, ...props }: ComponentProps<"form">) {
  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: SignInValues) {
    const result = await signIn(data)
    if (result?.error) form.setError("root", { message: result.error })
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={form.handleSubmit(onSubmit)}
      {...props}
    >
      <FieldGroup>
        <div className={cn("flex flex-col items-center gap-1 text-center")}>
          <h1 className={cn("text-2xl font-bold")}>Sign in to your account</h1>
          <p className={cn("text-balance text-sm text-muted-foreground")}>
            Enter your email and password to sign in to your account
          </p>
        </div>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field}
                id="email"
                type="email"
                placeholder="m@example.com"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className={cn("flex items-center")}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <a href="/forgot" className={cn("ml-auto text-sm underline-offset-4 hover:underline")}>
                  Forgot your password?
                </a>
              </div>
              <Input {...field} id="password" type="password" aria-invalid={fieldState.invalid} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {form.formState.errors.root && (
          <FieldError errors={[form.formState.errors.root]} />
        )}
        <Field>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Sign In
          </Button>
        </Field>
        <FieldDescription className={cn("text-center")}>
          Don&apos;t have an account? <a href="/sign-up">Sign up</a>
        </FieldDescription>
      </FieldGroup>
    </form>
  )
}
