import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/dashboard/Logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Revora — Revenue analytics for small teams" },
      { name: "description", content: "Revenue, customers, invoices, and team work in one calm dashboard." },
      { property: "og:title", content: "Revora Analytics" },
      { property: "og:description", content: "Revenue, customers, invoices, and team work in one calm dashboard." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex h-14 items-center justify-between border-b px-5">
        <Logo />
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild size="sm"><Link to="/login">Sign in</Link></Button>
          <Button asChild size="sm"><Link to="/dashboard">Open dashboard</Link></Button>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-start justify-center gap-6 px-6 py-16">
        <span className="rounded-full border bg-muted/50 px-2.5 py-1 text-xs font-medium text-muted-foreground">
          Revora Analytics · Portfolio demo
        </span>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
          Revenue, customers, invoices, and team work in one calm dashboard.
        </h1>
        <p className="max-w-xl text-base text-muted-foreground">
          Revora is a revenue operations workspace for founders, agencies, and small revenue teams. Track what moved this week, who needs attention, and what to invoice next.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Button asChild size="lg" className="gap-2">
            <Link to="/dashboard">Open the dashboard <ArrowRight className="h-4 w-4" /></Link>
          </Button>
          <Button asChild variant="outline" size="lg"><Link to="/login">View login</Link></Button>
        </div>
      </main>
      <footer className="border-t px-5 py-4 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Revora Analytics. Demo project — no real data.
      </footer>
    </div>
  );
}
