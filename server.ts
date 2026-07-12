import { createFileRoute } from "@tanstack/react-router";
import { FileText, FileSpreadsheet, FileDown } from "lucide-react";
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  utilizationData,
  departmentAllocationData,
  maintenanceTrendData,
  departments,
  categories,
} from "@/lib/data";

export const Route = createFileRoute("/_authenticated/reports")({
  component: ReportsPage,
});

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-popover)",
  color: "var(--color-popover-foreground)",
  fontSize: 12,
};

const idleAssets = [
  { name: "Samsung Flip 2", tag: "AF-1013", days: 92 },
  { name: "Zebra Scanner", tag: "AF-1014", days: 78 },
  { name: "Standing Desk Pro", tag: "AF-1010", days: 64 },
  { name: "iPad Pro 12.9\"", tag: "AF-1012", days: 51 },
];

const nearRetirement = [
  { name: "Cisco Catalyst 9200", tag: "AF-1003", eol: "Nov 2026" },
  { name: "HP EliteBook 840", tag: "AF-1002", eol: "Jan 2027" },
  { name: "Epson Projector", tag: "AF-1004", eol: "Mar 2027" },
];

function ReportsPage() {
  return (
    <>
      <PageHeader
        title="Reports & Analytics"
        description="Deep insights into asset utilization, allocation and maintenance."
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => toast.success("Exported as PDF")}><FileText className="mr-2 h-4 w-4" /> PDF</Button>
            <Button variant="outline" size="sm" onClick={() => toast.success("Exported as Excel")}><FileSpreadsheet className="mr-2 h-4 w-4" /> Excel</Button>
            <Button variant="outline" size="sm" onClick={() => toast.success("Exported as CSV")}><FileDown className="mr-2 h-4 w-4" /> CSV</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <Select defaultValue="30"><SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="7">Last 7 days</SelectItem><SelectItem value="30">Last 30 days</SelectItem><SelectItem value="90">Last quarter</SelectItem></SelectContent>
        </Select>
        <Select defaultValue="all"><SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="all">All departments</SelectItem>{departments.map((d) => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}</SelectContent>
        </Select>
        <Select defaultValue="all"><SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="all">All categories</SelectItem>{categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Asset Utilization" description="Utilization rate by category">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={utilizationData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--color-border)" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" width={70} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-muted)" }} />
                <Bar dataKey="utilization" fill="var(--color-chart-1)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Department Allocation" description="Allocated assets by department">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={departmentAllocationData}>
                <defs>
                  <linearGradient id="alloc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="allocated" stroke="var(--color-chart-1)" strokeWidth={2.5} fill="url(#alloc)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Maintenance Frequency" description="Monthly maintenance requests">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={maintenanceTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="requests" stroke="var(--color-chart-4)" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Overall Utilization" description="Fleet-wide efficiency">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="55%" outerRadius="100%" data={[{ name: "Utilization", value: 78, fill: "var(--color-chart-3)" }]} startAngle={90} endAngle={-270}>
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar background dataKey="value" cornerRadius={12} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <p className="-mt-32 text-center text-3xl font-bold text-foreground">78%</p>
        </SectionCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Idle Assets" description="Unused for extended periods">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader><TableRow><TableHead>Asset</TableHead><TableHead>Tag</TableHead><TableHead className="text-right">Idle days</TableHead></TableRow></TableHeader>
              <TableBody>
                {idleAssets.map((a) => (
                  <TableRow key={a.tag}>
                    <TableCell className="font-medium">{a.name}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{a.tag}</TableCell>
                    <TableCell className="text-right font-medium text-destructive">{a.days}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </SectionCard>

        <SectionCard title="Assets Near Retirement" description="Approaching end-of-life">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader><TableRow><TableHead>Asset</TableHead><TableHead>Tag</TableHead><TableHead className="text-right">EOL</TableHead></TableRow></TableHeader>
              <TableBody>
                {nearRetirement.map((a) => (
                  <TableRow key={a.tag}>
                    <TableCell className="font-medium">{a.name}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{a.tag}</TableCell>
                    <TableCell className="text-right font-medium text-warning-foreground">{a.eol}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </SectionCard>
      </div>
    </>
  );
}
