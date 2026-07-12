import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { StatusBadge } from "@/components/app/status-badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { activityLogs } from "@/lib/data";

export const Route = createFileRoute("/_authenticated/activity")({
  component: ActivityPage,
});

const PER_PAGE = 10;
const modules = ["Assets", "Allocation", "Audit", "Auth", "Booking", "Maintenance", "Organization", "Reports"];

function initials(n: string) {
  return n.split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();
}

function ActivityPage() {
  const [q, setQ] = useState("");
  const [mod, setMod] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = activityLogs.filter(
    (l) =>
      (mod === "all" || l.module === mod) &&
      (l.user.toLowerCase().includes(q.toLowerCase()) || l.action.toLowerCase().includes(q.toLowerCase())),
  );
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pages);
  const rows = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  return (
    <>
      <PageHeader title="Activity Logs" description="Full audit trail of user actions across modules." />

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} className="pl-9" placeholder="Search by user or action…" />
        </div>
        <Select value={mod} onValueChange={(v) => { setMod(v); setPage(1); }}>
          <SelectTrigger className="w-full sm:w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All modules</SelectItem>
            {modules.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((l) => (
                <TableRow key={l.id}>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar className="h-7 w-7"><AvatarFallback className="bg-primary text-[10px] font-semibold text-primary-foreground">{initials(l.user)}</AvatarFallback></Avatar>
                      <span className="whitespace-nowrap font-medium">{l.user}</span>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">{l.role}</TableCell>
                  <TableCell className="whitespace-nowrap">{l.action}</TableCell>
                  <TableCell className="text-muted-foreground">{l.module}</TableCell>
                  <TableCell className="whitespace-nowrap font-mono text-xs text-muted-foreground">{l.timestamp}</TableCell>
                  <TableCell><StatusBadge status={l.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between gap-2 border-t border-border px-4 py-3">
          <p className="text-xs text-muted-foreground">
            Showing {(current - 1) * PER_PAGE + 1}–{Math.min(current * PER_PAGE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" disabled={current === 1} onClick={() => setPage(current - 1)}><ChevronLeft className="h-4 w-4" /></Button>
            <span className="px-2 text-sm text-muted-foreground">{current} / {pages}</span>
            <Button variant="outline" size="icon" disabled={current === pages} onClick={() => setPage(current + 1)}><ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>
      </div>
    </>
  );
}
