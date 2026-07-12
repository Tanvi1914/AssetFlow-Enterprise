import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Wrench, Paperclip, Info, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/app/page-header";
import { StatusBadge } from "@/components/app/status-badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { maintenance, assets, type Maintenance } from "@/lib/data";

export const Route = createFileRoute("/_authenticated/maintenance")({
  component: MaintenancePage,
});

const stages: Maintenance["stage"][] = [
  "Pending",
  "Approved",
  "Technician Assigned",
  "In Progress",
  "Resolved",
  "Rejected",
];

function MaintenancePage() {
  return (
    <>
      <PageHeader
        title="Maintenance Management"
        description="Track maintenance tickets through the approval and repair workflow."
        actions={<RequestDialog />}
      />

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Automated status rules</AlertTitle>
        <AlertDescription>
          On approval the asset becomes <strong>Under Maintenance</strong>; once resolved it
          automatically returns to <strong>Available</strong>. Full history is retained per asset.
        </AlertDescription>
      </Alert>

      <div className="overflow-x-auto pb-2">
        <div className="grid min-w-[1100px] grid-cols-6 gap-4">
          {stages.map((stage) => {
            const items = maintenance.filter((m) => m.stage === stage);
            return (
              <div key={stage} className="flex flex-col rounded-xl border border-border bg-muted/30">
                <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
                  <span className="text-sm font-semibold text-foreground">{stage}</span>
                  <span className="grid h-5 min-w-5 place-items-center rounded-full bg-background px-1.5 text-xs text-muted-foreground">
                    {items.length}
                  </span>
                </div>
                <div className="flex flex-col gap-2 p-2">
                  {items.map((m) => (
                    <div key={m.id} className="rounded-lg border border-border bg-card p-3 shadow-soft">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-mono text-[11px] text-muted-foreground">{m.assetTag}</span>
                        <StatusBadge status={m.priority} />
                      </div>
                      <p className="mt-1.5 text-sm font-medium text-foreground">{m.asset}</p>
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{m.issue}</p>
                      {m.technician && (
                        <p className="mt-2 flex items-center gap-1 text-[11px] text-info">
                          <Wrench className="h-3 w-3" /> {m.technician}
                        </p>
                      )}
                      <div className="mt-2 flex items-center justify-between border-t border-border/60 pt-2 text-[11px] text-muted-foreground">
                        <span>{m.raisedBy}</span>
                        <span>{m.date}</span>
                      </div>
                      {stage === "Pending" && (
                        <div className="mt-2 flex gap-1.5">
                          <Button size="sm" className="h-7 flex-1 text-xs" onClick={() => toast.success("Ticket approved — asset now Under Maintenance")}>Approve</Button>
                          <Button size="sm" variant="outline" className="h-7 flex-1 text-xs" onClick={() => toast.error("Ticket rejected")}>Reject</Button>
                        </div>
                      )}
                      {stage === "In Progress" && (
                        <Button size="sm" className="mt-2 h-7 w-full text-xs" onClick={() => toast.success("Resolved — asset now Available")}>Mark resolved</Button>
                      )}
                    </div>
                  ))}
                  {items.length === 0 && <p className="px-2 py-6 text-center text-xs text-muted-foreground">No tickets</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function RequestDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm"><Plus className="mr-2 h-4 w-4" /> Raise request</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Raise maintenance request</DialogTitle>
          <DialogDescription>Report an issue with an asset.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Asset</Label>
            <Select><SelectTrigger><SelectValue placeholder="Select asset" /></SelectTrigger>
              <SelectContent>{assets.slice(0, 15).map((a) => <SelectItem key={a.id} value={a.id}>{a.tag} — {a.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2"><Label>Issue description</Label><Textarea placeholder="Describe the problem…" /></div>
          <div className="space-y-2">
            <Label>Priority</Label>
            <Select defaultValue="Medium"><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{["Low", "Medium", "High", "Critical"].map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Attachment</Label>
            <button className="flex w-full items-center gap-2 rounded-lg border border-dashed border-border px-3 py-3 text-sm text-muted-foreground hover:bg-muted">
              <Paperclip className="h-4 w-4" /> Attach image
            </button>
          </div>
          <div className="space-y-2"><Label className="flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" /> Comments</Label><Textarea placeholder="Optional comments…" /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => { setOpen(false); toast.success("Maintenance request submitted"); }}>Submit request</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
