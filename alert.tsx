import { cn } from "@/lib/utils";

type Tone = "success" | "primary" | "warning" | "info" | "destructive" | "muted" | "accent";

const toneMap: Record<Tone, string> = {
  success: "bg-success/10 text-success border-success/20",
  primary: "bg-primary/10 text-primary border-primary/20",
  warning: "bg-warning/15 text-warning-foreground border-warning/30",
  info: "bg-info/10 text-info border-info/20",
  destructive: "bg-destructive/10 text-destructive border-destructive/20",
  muted: "bg-muted text-muted-foreground border-border",
  accent: "bg-accent text-accent-foreground border-accent",
};

const statusTone: Record<string, Tone> = {
  Available: "success",
  Allocated: "primary",
  Reserved: "info",
  "Under Maintenance": "warning",
  Lost: "destructive",
  Retired: "muted",
  Disposed: "muted",
  Active: "success",
  Inactive: "muted",
  Upcoming: "info",
  Completed: "success",
  Cancelled: "destructive",
  Pending: "warning",
  Approved: "success",
  Rejected: "destructive",
  "Technician Assigned": "info",
  "In Progress": "primary",
  Resolved: "success",
  Success: "success",
  Failed: "destructive",
  Closed: "muted",
  Low: "muted",
  Medium: "info",
  High: "warning",
  Critical: "destructive",
  Excellent: "success",
  Good: "primary",
  Fair: "warning",
  Poor: "destructive",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const tone = statusTone[status] ?? "muted";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        toneMap[tone],
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}
