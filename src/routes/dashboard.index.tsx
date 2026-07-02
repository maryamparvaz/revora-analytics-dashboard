import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight, DollarSign, Users, FileText, FolderKanban, TrendingUp, AlertTriangle, Lightbulb, CheckCircle2, Wallet,
} from "lucide-react";

import { PageHeader, SectionCard } from "@/components/dashboard/PageHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { StatusBadge, statusLabel, statusTone } from "@/components/dashboard/StatusBadge";
import { DateRangePicker } from "@/components/dashboard/DateRangePicker";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RevenueAreaChart } from "@/components/charts/RevenueAreaChart";
import { CustomerGrowthChart } from "@/components/charts/CustomerGrowthChart";
import {
  activity, conversionFunnel, customerGrowth, insights, revenueByMonth, services, transactions,
} from "@/data/mock";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({ meta: [{ title: "Business overview — Revora" }] }),
  component: Overview,
});

function Overview() {
  const totalFunnel = conversionFunnel[0].value;
  return (
    <div className="space-y-6">
      <PageHeader
        title="Business overview"
        description="A clear view of revenue, customers, cash flow, and team activity."
        actions={
          <>
            <DateRangePicker />
            <Button size="sm" className="gap-1.5">
              <ArrowUpRight className="h-4 w-4" /> Export
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <MetricCard label="Total revenue" value="$542,860" delta={12.4} helper="vs. previous 30 days" icon={<DollarSign className="h-4 w-4" />} />
        <MetricCard label="MRR" value="$118,420" delta={4.8} helper="net new $9.2k" icon={<TrendingUp className="h-4 w-4" />} />
        <MetricCard label="New customers" value="38" delta={9.1} helper="3 from referral" icon={<Users className="h-4 w-4" />} />
        <MetricCard label="Outstanding" value="$24,180" delta={-3.2} helper="across 11 invoices" icon={<FileText className="h-4 w-4" />} />
        <MetricCard label="Conversion" value="8.4%" delta={1.6} helper="trial to paid" icon={<CheckCircle2 className="h-4 w-4" />} />
        <MetricCard label="Active projects" value="14" helper="3 in review" icon={<FolderKanban className="h-4 w-4" />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <SectionCard
          title="Revenue & expenses"
          description="Monthly net revenue compared with operating expenses."
          className="lg:col-span-2"
          actions={
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-chart-1" /> Revenue</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-chart-3" /> Expenses</span>
            </div>
          }
        >
          <RevenueAreaChart data={revenueByMonth} />
        </SectionCard>

        <SectionCard title="Cash flow" description="Net cash position this month.">
          <div className="space-y-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Net cash</p>
                <p className="mt-1 text-2xl font-semibold tabular-nums">$68,820</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-md bg-success/10 px-2 py-1 text-xs font-medium text-success">
                <ArrowUpRight className="h-3 w-3" /> 8.2%
              </span>
            </div>
            <div className="space-y-3 text-sm">
              <Row label="Money in" value="$118,420" tone="success" />
              <Row label="Money out" value="$49,600" tone="destructive" />
              <Row label="Pending in" value="$24,180" tone="info" />
            </div>
            <div className="rounded-lg border bg-muted/40 p-3 text-xs text-muted-foreground">
              <Wallet className="mr-1.5 inline h-3.5 w-3.5" />
              Operating runway projected at 9.4 months at current burn.
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <SectionCard title="Customer growth" description="New and churned customers per month." className="lg:col-span-2">
          <CustomerGrowthChart data={customerGrowth} />
        </SectionCard>

        <SectionCard title="Conversion funnel" description="Trial conversion across the last 30 days.">
          <div className="space-y-3">
            {conversionFunnel.map((s) => {
              const pct = (s.value / totalFunnel) * 100;
              return (
                <div key={s.stage}>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{s.stage}</span>
                    <span className="font-medium tabular-nums">{s.value.toLocaleString()}</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-foreground/80" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <SectionCard
          title="Recent transactions"
          description="Latest payments and refunds across all accounts."
          className="lg:col-span-2"
          actions={<Button variant="ghost" size="sm" className="text-xs">View all</Button>}
        >
          <div className="-mx-5 -my-2 overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                <tr className="border-b">
                  <th className="px-5 py-2.5 text-left font-medium">Customer</th>
                  <th className="px-5 py-2.5 text-left font-medium">Type</th>
                  <th className="px-5 py-2.5 text-left font-medium">Date</th>
                  <th className="px-5 py-2.5 text-left font-medium">Status</th>
                  <th className="px-5 py-2.5 text-right font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t.id} className="border-b last:border-b-0 hover:bg-muted/40">
                    <td className="px-5 py-3 font-medium">{t.customer}</td>
                    <td className="px-5 py-3 capitalize text-muted-foreground">{t.type}</td>
                    <td className="px-5 py-3 text-muted-foreground">{t.date}</td>
                    <td className="px-5 py-3"><StatusBadge tone={statusTone(t.status)}>{statusLabel(t.status)}</StatusBadge></td>
                    <td className={cn("px-5 py-3 text-right tabular-nums font-medium", t.amount < 0 && "text-destructive")}>
                      {t.amount < 0 ? "-" : ""}{formatCurrency(Math.abs(t.amount))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Top services" description="Revenue contribution this quarter.">
          <ul className="space-y-3">
            {services.map((s) => {
              const top = services[0].revenue;
              const pct = (s.revenue / top) * 100;
              return (
                <li key={s.id} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="truncate">{s.name}</span>
                    <span className="tabular-nums font-medium">{formatCurrency(s.revenue)}</span>
                  </div>
                  <Progress value={pct} className="h-1.5" />
                  <div className="text-xs text-muted-foreground">{s.customers} customers</div>
                </li>
              );
            })}
          </ul>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <SectionCard title="Team activity" description="What your team has been doing today." className="lg:col-span-2">
          <ol className="relative space-y-4 pl-4 before:absolute before:left-1.5 before:top-1 before:h-[calc(100%-0.5rem)] before:w-px before:bg-border">
            {activity.map((a) => (
              <li key={a.id} className="relative">
                <span className="absolute -left-[10px] top-1.5 h-2 w-2 rounded-full bg-foreground" />
                <p className="text-sm">
                  <span className="font-medium">{a.actor}</span>{" "}
                  <span className="text-muted-foreground">{a.action}</span>{" "}
                  <span className="font-medium">{a.target}</span>
                </p>
                <p className="text-xs text-muted-foreground">{a.time}</p>
              </li>
            ))}
          </ol>
        </SectionCard>

        <SectionCard title="Insights" description="Three things worth your attention.">
          <ul className="space-y-3">
            {insights.map((i) => {
              const Icon = i.tone === "positive" ? TrendingUp : i.tone === "warning" ? AlertTriangle : Lightbulb;
              const tone = i.tone === "positive" ? "text-success" : i.tone === "warning" ? "text-warning" : "text-info";
              return (
                <li key={i.id} className="rounded-lg border bg-muted/30 p-3">
                  <div className="flex items-start gap-2.5">
                    <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", tone)} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{i.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{i.body}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}

function Row({ label, value, tone }: { label: string; value: string; tone: "success" | "destructive" | "info" }) {
  const cls = tone === "success" ? "text-success" : tone === "destructive" ? "text-destructive" : "text-info";
  const dot = tone === "success" ? "bg-success" : tone === "destructive" ? "bg-destructive" : "bg-info";
  return (
    <div className="flex items-center justify-between border-b pb-2 last:border-b-0 last:pb-0">
      <div className="flex items-center gap-2">
        <span className={cn("inline-block h-1.5 w-1.5 rounded-full", dot)} />
        <span className="text-muted-foreground">{label}</span>
      </div>
      <span className={cn("tabular-nums font-medium", cls)}>{value}</span>
    </div>
  );
}
