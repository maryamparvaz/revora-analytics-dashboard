import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: string;
  delta?: number;
  helper?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function MetricCard({ label, value, delta, helper, icon, className }: Props) {
  const positive = (delta ?? 0) >= 0;
  return (
    <div className={cn("rounded-xl border bg-card p-4 sm:p-5 shadow-xs", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight tabular-nums">{value}</p>
        </div>
        {icon && (
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
            {icon}
          </div>
        )}
      </div>
      {(delta !== undefined || helper) && (
        <div className="mt-3 flex items-center gap-2 text-xs">
          {delta !== undefined && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-medium",
                positive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive",
              )}
            >
              {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {positive ? "+" : ""}{delta.toFixed(1)}%
            </span>
          )}
          {helper && <span className="truncate text-muted-foreground">{helper}</span>}
        </div>
      )}
    </div>
  );
}