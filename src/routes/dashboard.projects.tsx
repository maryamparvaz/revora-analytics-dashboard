import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Calendar, DollarSign } from "lucide-react";

import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import { projects, team } from "@/data/mock";
import type { Priority, Project, ProjectStatus } from "@/types";
import { formatCurrency, formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/projects")({
  head: () => ({ meta: [{ title: "Projects — Revora" }] }),
  component: ProjectsPage,
});

const columns: { id: ProjectStatus; title: string; hint: string }[] = [
  { id: "discovery", title: "Discovery", hint: "Scoping and intake" },
  { id: "in_progress", title: "In progress", hint: "Active delivery" },
  { id: "review", title: "Review", hint: "Awaiting sign-off" },
  { id: "completed", title: "Completed", hint: "Shipped this quarter" },
];

const priorityTone: Record<Priority, "success" | "warning" | "destructive"> = {
  low: "success",
  medium: "warning",
  high: "destructive",
};

function ProjectsPage() {
  const [selected, setSelected] = React.useState<Project | null>(null);

  const grouped = React.useMemo(() => {
    return columns.reduce<Record<ProjectStatus, Project[]>>((acc, c) => {
      acc[c.id] = projects.filter((p) => p.status === c.id);
      return acc;
    }, { discovery: [], in_progress: [], review: [], completed: [] });
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects"
        description="Track client work across discovery, delivery, and review."
        actions={<Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> New project</Button>}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {columns.map((col) => (
          <div key={col.id} className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <div>
                <h2 className="text-sm font-semibold">{col.title}</h2>
                <p className="text-xs text-muted-foreground">{col.hint}</p>
              </div>
              <span className="rounded-full border bg-muted/40 px-2 py-0.5 text-xs tabular-nums text-muted-foreground">
                {grouped[col.id].length}
              </span>
            </div>
            <div className="space-y-3">
              {grouped[col.id].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelected(p)}
                  className="w-full rounded-xl border bg-card p-4 text-left shadow-xs transition hover:border-foreground/20 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">{p.client}</p>
                      <h3 className="mt-0.5 line-clamp-2 text-sm font-medium">{p.title}</h3>
                    </div>
                    <StatusBadge tone={priorityTone[p.priority]} className="capitalize">{p.priority}</StatusBadge>
                  </div>
                  <div className="mt-3 space-y-1.5">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progress</span>
                      <span className="tabular-nums">{p.progress}%</span>
                    </div>
                    <Progress value={p.progress} className="h-1.5" />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><DollarSign className="h-3 w-3" />{formatCurrency(p.budget)}</span>
                    <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(p.dueDate)}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="rounded border bg-muted/40 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">{p.type}</span>
                    <TeamStack ids={p.assignedTeam} />
                  </div>
                </button>
              ))}
              {grouped[col.id].length === 0 && (
                <div className="rounded-xl border border-dashed bg-muted/20 p-6 text-center text-xs text-muted-foreground">
                  Nothing here yet
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-lg">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>{selected.title}</SheetTitle>
                <SheetDescription>{selected.client} · {selected.type}</SheetDescription>
              </SheetHeader>
              <div className="space-y-4 px-4 pb-4">
                <p className="text-sm text-muted-foreground">{selected.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  <KV label="Budget" value={formatCurrency(selected.budget)} />
                  <KV label="Due" value={formatDate(selected.dueDate)} />
                  <KV label="Priority" value={selected.priority} className="capitalize" />
                  <KV label="Progress" value={`${selected.progress}%`} />
                </div>
                <div>
                  <div className="mb-1.5 text-xs uppercase tracking-wider text-muted-foreground">Team</div>
                  <div className="flex flex-wrap gap-2">
                    {selected.assignedTeam.map((id) => {
                      const m = team.find((t) => t.id === id);
                      if (!m) return null;
                      return (
                        <div key={id} className="flex items-center gap-2 rounded-full border bg-muted/30 py-1 pl-1 pr-3">
                          <Avatar className="h-6 w-6"><AvatarFallback className="text-[10px]">{m.initials}</AvatarFallback></Avatar>
                          <span className="text-xs"><span className="font-medium">{m.name}</span> · <span className="text-muted-foreground">{m.role}</span></span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function TeamStack({ ids }: { ids: string[] }) {
  return (
    <div className="flex -space-x-2">
      {ids.slice(0, 3).map((id) => {
        const m = team.find((t) => t.id === id);
        if (!m) return null;
        return (
          <Avatar key={id} className="h-6 w-6 ring-2 ring-card">
            <AvatarFallback className="text-[10px]">{m.initials}</AvatarFallback>
          </Avatar>
        );
      })}
      {ids.length > 3 && (
        <span className="flex h-6 w-6 items-center justify-center rounded-full border bg-muted text-[10px] ring-2 ring-card">
          +{ids.length - 3}
        </span>
      )}
    </div>
  );
}

function KV({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className="rounded-lg border bg-muted/30 px-3 py-2.5">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={cn("mt-0.5 text-sm font-medium", className)}>{value}</div>
    </div>
  );
}
