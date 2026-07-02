import { createFileRoute } from "@tanstack/react-router";
import {
  Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { ArrowUpRight, TrendingUp, Users, Percent, Wallet } from "lucide-react";

import { PageHeader, SectionCard } from "@/components/dashboard/PageHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { DateRangePicker } from "@/components/dashboard/DateRangePicker";
import { RevenueAreaChart } from "@/components/charts/RevenueAreaChart";
import { CategoryDonut } from "@/components/charts/CategoryDonut";
import { Button } from "@/components/ui/button";
import {
  customerGrowth, invoiceStatusBreakdown, leadSources, revenueByCategory, revenueByMonth,
} from "@/data/mock";
import { formatCurrency } from "@/lib/format";

export const Route = createFileRoute("/dashboard/analytics")({
  head: () => ({ meta: [{ title: "Revenue analytics — Revora" }] }),
  component: AnalyticsPage,
});

const conversionTrend = [
  { month: "Jan", rate: 6.2 },
  { month: "Feb", rate: 6.9 },
  { month: "Mar", rate: 7.1 },
  { month: "Apr", rate: 7.6 },
  { month: "May", rate: 8.0 },
  { month: "Jun", rate: 8.4 },
];

const CHART_COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)"];

function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Revenue analytics"
        description="Trend lines, channel mix, and conversion across the last 6 months."
        actions={
          <>
            <DateRangePicker />
            <Button size="sm" variant="outline" className="gap-1.5"><ArrowUpRight className="h-4 w-4" /> Export</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="Net revenue" value={formatCurrency(564600)} delta={12.4} helper="Last 6 months" icon={<Wallet className="h-4 w-4" />} />
        <MetricCard label="Active customers" value="129" delta={6.1} helper="+12 net new" icon={<Users className="h-4 w-4" />} />
        <MetricCard label="Trial → Paid" value="8.4%" delta={1.6} helper="vs. 6.8% prior" icon={<Percent className="h-4 w-4" />} />
        <MetricCard label="Avg. order value" value={formatCurrency(4380)} delta={2.2} helper="Across paid invoices" icon={<TrendingUp className="h-4 w-4" />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <SectionCard title="Revenue by month" description="Net revenue and operating expenses." className="lg:col-span-2">
          <RevenueAreaChart data={revenueByMonth} />
        </SectionCard>
        <SectionCard title="Revenue by category" description="Where revenue came from.">
          <CategoryDonut data={revenueByCategory} />
          <ul className="mt-3 space-y-1.5 text-xs">
            {revenueByCategory.map((c, i) => (
              <li key={c.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-2 w-2 rounded-full" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                  {c.name}
                </span>
                <span className="tabular-nums font-medium">{formatCurrency(c.value)}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <SectionCard title="Customer growth" description="Net customers per month." className="lg:col-span-2">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={customerGrowth} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" tickLine={false} axisLine={false} fontSize={12} width={36} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12, color: "var(--color-foreground)" }} cursor={{ fill: "var(--color-muted)" }} />
                <Legend wrapperStyle={{ fontSize: 12, color: "var(--color-muted-foreground)" }} iconType="circle" />
                <Bar dataKey="customers" name="New customers" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="churned" name="Churned" fill="var(--color-chart-4)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Conversion rate" description="Trial to paid, last 6 months.">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conversionTrend} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" tickLine={false} axisLine={false} fontSize={12} tickFormatter={(v) => `${v}%`} width={36} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12, color: "var(--color-foreground)" }} formatter={(v: number) => [`${v}%`, "Conversion"]} />
                <Line type="monotone" dataKey="rate" stroke="var(--color-chart-2)" strokeWidth={2} dot={{ r: 3, fill: "var(--color-chart-2)" }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <SectionCard title="Lead source distribution" description="How new accounts found you." className="lg:col-span-2">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadSources} layout="vertical" margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" stroke="var(--color-muted-foreground)" tickLine={false} axisLine={false} fontSize={12} tickFormatter={(v) => `${v}%`} />
                <YAxis type="category" dataKey="name" stroke="var(--color-muted-foreground)" tickLine={false} axisLine={false} fontSize={12} width={110} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12, color: "var(--color-foreground)" }} formatter={(v: number) => [`${v}%`, "Share"]} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {leadSources.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Invoice status" description="Share of invoices by current status.">
          <CategoryDonut data={invoiceStatusBreakdown} />
          <ul className="mt-3 space-y-1.5 text-xs">
            {invoiceStatusBreakdown.map((s, i) => (
              <li key={s.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-2 w-2 rounded-full" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                  {s.name}
                </span>
                <span className="tabular-nums font-medium">{s.value}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
