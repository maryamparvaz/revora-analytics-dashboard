import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function CustomerGrowthChart({ data }: { data: { month: string; customers: number; churned: number }[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" stroke="var(--color-muted-foreground)" tickLine={false} axisLine={false} fontSize={12} />
          <YAxis stroke="var(--color-muted-foreground)" tickLine={false} axisLine={false} fontSize={12} />
          <Tooltip
            cursor={{ fill: "var(--color-muted)" }}
            contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12, color: "var(--color-foreground)" }}
          />
          <Bar dataKey="customers" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="churned" fill="var(--color-chart-5)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}