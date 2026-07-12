import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Plus,
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileDown,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { StatusBadge } from "@/components/app/status-badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { audits, departments, employees } from "@/lib/data";

export const Route = createFileRoute("/_authenticated/audit")({
  component: AuditPage,
});

const checklist = [
  { asset: "AF-1000 · MacBook Pro 16\"", state: "Verified" },
  { asset: "AF-1001 · Dell Latitude 7440", state: "Verified" },
  { asset: "AF-1003 · Cisco Catalyst 9200", state: "Damaged" },
  { asset: "AF-1006 · Toyota Innova Crysta", state: "Missing" },
  { asset: "AF-1008 · Lenovo ThinkPad X1", state: "Verified" },
];

const stateIcon: Record<string, typeof CheckCircle2> = {
  Verified: CheckCircle2,
  Missing: XCircle,
  Damaged: AlertTriangle,
};

function AuditPage() {
  return (
    <>
      <PageHeader
        title="Asset Audit"
        description="Run audit cycles, verify assets and generate discrepancy reports."
        actions={<AuditDialog />}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {audits.map((a) => (
          <div key={a.id} className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate font-semibold text-foreground">{a.name}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{a.department} · {a.location}</p>
              </div>
              <StatusBadge status={a.status} />
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Users className="h-3.5 w-3.5" /> {a.auditor} · {a.range}
            </div>
            <div className="mt-4">
              <div className="mb-1.5 flex justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-foreground">{a.progress}%</span>
              </div>
              <Progress value={a.progress} />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-success/10 py-2">
                <p className="text-lg font-bold text-success">{a.verified}</p>
                <p className="text-[11px] text-muted-foreground">Verified</p>
              </div>
              <div className="rounded-lg bg-destructive/10 py-2">
                <p className="text-lg font-bold text-destructive">{a.missing}</p>
                <p className="text-[11px] text-muted-foreground">Missing</p>
              </div>
              <div className="rounded-lg bg-warning/15 py-2">
                <p className="text-lg font-bold text-warning-foreground">{a.damaged}</p>
                <p className="text-[11px] text-muted-foreground">Damaged</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => toast.success("Discrepancy report generated")}>
                <FileDown className="mr-1.5 h-4 w-4" /> Report
              </Button>
              {a.status === "Active" && (
                <Button size="sm" className="flex-1" onClick={() => toast.success("Audit closed")}>Close audit</Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <SectionCard title="Audit Checklist" description="Q3 IT Assets Audit — verify each asset">
        <div className="space-y-2">
          {checklist.map((c) => {
            const Icon = stateIcon[c.state];
            return (
              <div key={c.asset} className="flex items-center justify-between gap-3 rounded-lg border border-border p-3">
                <span className="min-w-0 truncate text-sm text-foreground">{c.asset}</span>
                <div className="flex items-center gap-2">
                  <Icon className={c.state === "Verified" ? "h-4 w-4 text-success" : c.state === "Missing" ? "h-4 w-4 text-destructive" : "h-4 w-4 text-warning-foreground"} />
                  <StatusBadge status={c.state === "Verified" ? "Approved" : c.state === "Missing" ? "Rejected" : "High"} className="!min-w-0" />
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>

      <SectionCard title="Audit History">
        <div className="space-y-4">
          {audits.map((a, i) => (
            <div key={a.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-accent text-accent-foreground">
                  <ClipboardCheck className="h-4 w-4" />
                </div>
                {i < audits.length - 1 && <div className="w-px flex-1 bg-border" />}
              </div>
              <div className="pb-4">
                <p className="text-sm font-medium text-foreground">{a.name}</p>
                <p className="text-xs text-muted-foreground">{a.range} · {a.status}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </>
  );
}

function AuditDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm"><Plus className="mr-2 h-4 w-4" /> New audit cycle</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create audit cycle</DialogTitle>
          <DialogDescription>Define scope and assign auditors.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2"><Label>Audit name</Label><Input placeholder="e.g. Q4 Network Audit" /></div>
          <div className="space-y-2">
            <Label>Department</Label>
            <Select><SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
              <SelectContent>{departments.map((d) => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Assign auditor</Label>
            <Select><SelectTrigger><SelectValue placeholder="Select auditor" /></SelectTrigger>
              <SelectContent>{employees.map((e) => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2"><Label>Start date</Label><Input type="date" /></div>
            <div className="space-y-2"><Label>End date</Label><Input type="date" /></div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => { setOpen(false); toast.success("Audit cycle created"); }}>Create cycle</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
