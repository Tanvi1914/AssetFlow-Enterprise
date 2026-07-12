import { createFileRoute } from "@tanstack/react-router";
import {
  PackageCheck,
  Package,
  Wrench,
  CalendarCheck,
  ArrowLeftRight,
  Clock,
  TrendingUp,
  TrendingDown,
  Plus,
  Bell,
  Activity,
  type LucideIcon,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { StatusBadge } from "@/components/app/status-badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  kpis,
  assetStatusData,
  departmentAllocationData,
  maintenanceTrendData,
  notifications,
  activityLogs,
  maintenance,
} from "@/lib/data";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
});

const icons: Record<string, LucideIcon> = {
  "package-check": PackageCheck,
  package: Package,
  wrench: Wrench,
  "calendar-check": CalendarCheck,
  "arrow-left-right": ArrowLeftRight,
  clock: Clock,
};

const toneBg: Record<string, string> = {
  success: "bg-success/10 text-success",
  primary: "bg-primary/10 text-primary",
  warning: "bg-warning/15 text-warning-foreground",
  info: "bg-info/10 text-info",
  destructive: "bg-destructive/10 text-destructive",
};

const heat = Array.from({ length: 7 }, (_, d) =>
  Array.from({ length: 10 }, (_, h) => Math.floor(Math.abs(Math.sin(d * 1.3 + h) * 5))),
);
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Organization-wide overview of assets, resources and activity."
        actions={
          <>
            <Button variant="outline" size="sm">
              <CalendarCheck className="mr-2 h-4 w-4" /> This week
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" /> Register asset
            </Button>
          </>
        }
      />

      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {kpis.map((k) => {
          const Icon = icons[k.icon] ?? Package;
          return (
            <div key={k.label} className="rounded-xl border border-border bg-card p-4 shadow-soft">
              <div className={cn("mb-3 grid h-9 w-9 place-items-center rounded-lg", toneBg[k.tone])}>
                <Icon className="h-4.5 w-4.5" />
              </div>
              <p className="text-2xl font-bold text-foreground">{k.value}</p>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">{k.label}</p>
              <div
                className={cn(
                  "mt-2 inline-flex items-center gap-1 text-[11px] font-medium",
                  k.up ? "text-success" : "text-destructive",
                )}
              >
                {k.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {k.delta}
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title="Asset Status Distribution" description="Across all departments">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={assetStatusData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                  {assetStatusData.map((e, i) => (
                    <Cell key={i} fill={e.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Department Allocation" description="Allocated vs available" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentAllocationData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-muted)" }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="allocated" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="available" fill="var(--color-chart-3)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title="Monthly Maintenance" description="Requests vs resolved" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={maintenanceTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="requests" stroke="var(--color-chart-1)" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="resolved" stroke="var(--color-chart-3)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Booking Heatmap" description="Resource usage by day / hour">
          <div className="space-y-1.5">
            {heat.map((row, d) => (
              <div key={d} className="flex items-center gap-1.5">
                <span className="w-8 text-[11px] text-muted-foreground">{days[d]}</span>
                <div className="flex flex-1 gap-1">
                  {row.map((v, h) => (
                    <div
                      key={h}
                      title={`${v} bookings`}
                      className="h-4 flex-1 rounded-sm"
                      style={{ backgroundColor: `color-mix(in oklab, var(--color-primary) ${v * 20 + 6}%, transparent)` }}
                    />
                  ))}
                </div>
              </div>
            ))}
            <div className="flex items-center justify-end gap-1 pt-2 text-[10px] text-muted-foreground">
              Less
              {[6, 26, 46, 66, 86].map((o) => (
                <div key={o} className="h-3 w-3 rounded-sm" style={{ backgroundColor: `color-mix(in oklab, var(--color-primary) ${o}%, transparent)` }} />
              ))}
              More
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Widgets row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title="Recent Activity" action={<Activity className="h-4 w-4 text-muted-foreground" />}>
          <ul className="space-y-4">
            {activityLogs.slice(0, 5).map((a) => (
              <li key={a.id} className="flex gap-3">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div className="min-w-0">
                  <p className="truncate text-sm text-foreground">{a.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {a.user} · {a.timestamp}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Notifications" action={<Bell className="h-4 w-4 text-muted-foreground" />}>
          <ul className="space-y-4">
            {notifications.slice(0, 5).map((n) => (
              <li key={n.id} className="flex gap-3">
                <div className={cn("mt-1 h-2 w-2 shrink-0 rounded-full", n.read ? "bg-muted-foreground/30" : "bg-primary")} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{n.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{n.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Upcoming Maintenance">
          <ul className="space-y-3">
            {maintenance.filter((m) => m.stage !== "Resolved" && m.stage !== "Rejected").slice(0, 5).map((m) => (
              <li key={m.id} className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm text-foreground">{m.asset}</p>
                  <p className="truncate text-xs text-muted-foreground">{m.assetTag} · {m.issue}</p>
                </div>
                <StatusBadge status={m.priority} />
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </>
  );
}

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-popover)",
  color: "var(--color-popover-foreground)",
  fontSize: 12,
};
