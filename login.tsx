import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Package,
  ArrowLeftRight,
  Wrench,
  CalendarCheck,
  XCircle,
  ClipboardCheck,
  Clock,
  Bell,
  CheckCheck,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader, EmptyState } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { notifications as seed, type Notification } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/notifications")({
  component: NotificationsPage,
});

const icons: Record<string, LucideIcon> = {
  package: Package,
  "arrow-left-right": ArrowLeftRight,
  wrench: Wrench,
  "calendar-check": CalendarCheck,
  "x-circle": XCircle,
  "clipboard-check": ClipboardCheck,
  clock: Clock,
  bell: Bell,
};

function NotificationsPage() {
  const [items, setItems] = useState<Notification[]>(seed);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filtered = items.filter((n) => (filter === "all" ? true : !n.read));
  const unread = items.filter((n) => !n.read).length;

  const markAll = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const markOne = (id: string) => setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  return (
    <>
      <PageHeader
        title="Notification Center"
        description={`${unread} unread notification${unread === 1 ? "" : "s"}`}
        actions={<Button variant="outline" size="sm" onClick={markAll}><CheckCheck className="mr-2 h-4 w-4" /> Mark all read</Button>}
      />

      <Tabs value={filter} onValueChange={(v) => setFilter(v as "all" | "unread")}>
        <TabsList>
          <TabsTrigger value="all">All ({items.length})</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unread})</TabsTrigger>
        </TabsList>
      </Tabs>

      {filtered.length === 0 ? (
        <EmptyState icon={<Bell className="h-6 w-6" />} title="You're all caught up" description="No notifications to show." />
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
          {filtered.map((n) => {
            const Icon = icons[n.icon] ?? Bell;
            return (
              <button
                key={n.id}
                onClick={() => markOne(n.id)}
                className={cn(
                  "flex w-full items-start gap-3 border-b border-border px-4 py-4 text-left transition-colors last:border-0 hover:bg-muted/40",
                  !n.read && "bg-primary/[0.03]",
                )}
              >
                <div className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-lg", n.read ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary")}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium text-foreground">{n.title}</p>
                    {!n.read && <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />}
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{n.body}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{n.type} · {n.time}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
