import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowUpRight, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/dashboard/Logo";

const schema = z.object({
  email: z.string().trim().email("Enter a valid work email").max(255),
  password: z.string().min(6, "Use at least 6 characters").max(120),
  remember: z.boolean().optional(),
});
type FormValues = z.infer<typeof schema>;

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Revora" },
      { name: "description", content: "Know what moved your business today. Sign in to your Revora workspace." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "demo@revora.app", password: "demo1234", remember: true },
  });

  const onSubmit = form.handleSubmit(() => {
    navigate({ to: "/dashboard" });
  });

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative hidden flex-col justify-between border-r bg-muted/40 p-10 lg:flex">
        <Logo />
        <div className="max-w-md space-y-6">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight">
            Know what moved your business today.
          </h1>
          <p className="text-sm text-muted-foreground">
            Track revenue, customers, invoices, and team performance from one focused workspace.
          </p>
          <div className="rounded-xl border bg-card p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Net revenue · June
                </p>
                <p className="mt-1 text-2xl font-semibold tracking-tight tabular-nums">$118,420</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-md bg-success/10 px-2 py-1 text-xs font-medium text-success">
                <ArrowUpRight className="h-3 w-3" /> 12.4%
              </span>
            </div>
            <div className="mt-5 flex h-20 items-end gap-1.5">
              {[28, 36, 30, 42, 38, 48, 44, 56, 52, 64, 70, 82].map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-sm bg-foreground/80 dark:bg-foreground/70"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><TrendingUp className="h-3 w-3" /> Above forecast</span>
              <span>Updated 9:42 AM</span>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>· Revenue, MRR, and customer health in one view</li>
            <li>· Invoices, projects, and team activity together</li>
            <li>· Calm interface built for daily operations</li>
          </ul>
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Revora Analytics</p>
      </aside>

      <main className="flex flex-col">
        <div className="flex items-center justify-between border-b px-6 py-4 lg:hidden">
          <Logo />
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">Back</Link>
        </div>
        <div className="flex flex-1 items-center justify-center px-6 py-12">
          <div className="w-full max-w-sm">
            <h2 className="text-xl font-semibold tracking-tight">Sign in to Revora</h2>
            <p className="mt-1 text-sm text-muted-foreground">Use your work email to access the workspace.</p>

            <Button variant="outline" className="mt-6 w-full gap-2 font-medium" type="button">
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                <path fill="#EA4335" d="M12 11v3.6h5.1c-.2 1.3-1.5 3.9-5.1 3.9-3.1 0-5.6-2.6-5.6-5.7s2.5-5.7 5.6-5.7c1.8 0 2.9.8 3.5 1.4l2.4-2.3C16.5 4.9 14.5 4 12 4 7 4 3 8 3 13s4 9 9 9c5.2 0 8.6-3.7 8.6-8.8 0-.6-.1-1-.1-1.5H12z" />
              </svg>
              Continue with Google
            </Button>

            <div className="my-5 flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground">or with email</span>
              <Separator className="flex-1" />
            </div>

            <form className="space-y-4" onSubmit={onSubmit} noValidate>
              <div className="space-y-1.5">
                <Label htmlFor="email">Work email</Label>
                <Input id="email" type="email" autoComplete="email" {...form.register("email")} />
                {form.formState.errors.email && (
                  <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button type="button" className="text-xs text-muted-foreground hover:text-foreground">Forgot?</button>
                </div>
                <Input id="password" type="password" autoComplete="current-password" {...form.register("password")} />
                {form.formState.errors.password && (
                  <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>
                )}
              </div>
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <Checkbox
                  checked={!!form.watch("remember")}
                  onCheckedChange={(v) => form.setValue("remember", !!v)}
                />
                Keep me signed in on this device
              </label>
              <Button type="submit" className="w-full">Sign in</Button>
            </form>

            <div className="mt-6 rounded-lg border bg-muted/40 p-3 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Demo access:</span> demo@revora.app · demo1234
            </div>
            <p className="mt-6 text-center text-xs text-muted-foreground">
              No account?{" "}
              <Link to="/" className="font-medium text-foreground underline-offset-4 hover:underline">
                Back to home
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}