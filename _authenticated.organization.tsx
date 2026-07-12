import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeftRight, RotateCcw, Plus, AlertTriangle, Check } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { StatusBadge } from "@/components/app/status-badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { assets, employees } from "@/lib/data";

export const Route = createFileRoute("/_authenticated/allocation")({
  component: AllocationPage,
});

interface AllocationRecord {
  id: string;
  asset: string;
  tag: string;
  employee: string;
  allocated: string;
  expectedReturn: string;
  approval: "Requested" | "Approved" | "Reallocated";
  overdue: boolean;
}

const records: AllocationRecord[] = [
  { id: "AL1", asset: "MacBook Pro 16\"", tag: "AF-1000", employee: "Meera Iyer", allocated: "2026-05-02", expectedReturn: "2026-08-02", approval: "Approved", overdue: false },
  { id: "AL2", asset: "Dell Latitude 7440", tag: "AF-1001", employee: "Rohan Verma", allocated: "2026-03-15", expectedReturn: "2026-07-05", approval: "Approved", overdue: true },
  { id: "AL3", asset: "Toyota Innova Crysta", tag: "AF-1006", employee: "Sneha Kapoor", allocated: "2026-07-01", expectedReturn: "2026-07-11", approval: "Reallocated", overdue: true },
  { id: "AL4", asset: "Lenovo ThinkPad X1", tag: "AF-1008", employee: "Divya Menon", allocated: "2026-06-20", expectedReturn: "2026-09-20", approval: "Requested", overdue: false },
  { id: "AL5", asset: "Epson Projector EB-2250U", tag: "AF-1004", employee: "Aditya Joshi", allocated: "2026-07-08", expectedReturn: "2026-07-15", approval: "Approved", overdue: false },
];

const workflow = ["Requested", "Approved", "Reallocated"];

function AllocationPage() {
  return (
    <>
      <PageHeader
        title="Asset Allocation & Transfer"
        description="Allocate, transfer and return assets with approval workflows."
        actions={<AllocateDialog />}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Active allocations", value: "684", tone: "primary" },
          { label: "Pending transfers", value: "9", tone: "warning" },
          { label: "Overdue returns", value: "5", tone: "destructive" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4 shadow-soft">
            <p className={cn("text-2xl font-bold", s.tone === "destructive" ? "text-destructive" : s.tone === "warning" ? "text-warning-foreground" : "text-primary")}>{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <SectionCard title="Transfer Workflow">
        <div className="flex flex-wrap items-center gap-2">
          {workflow.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-sm font-medium text-primary">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-[11px] text-primary-foreground">{i + 1}</span>
                {step}
              </div>
              {i < workflow.length - 1 && <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />}
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Allocated</TableHead>
                <TableHead>Expected Return</TableHead>
                <TableHead>Approval</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((r) => (
                <TableRow key={r.id} className={cn(r.overdue && "bg-destructive/5")}>
                  <TableCell>
                    <p className="font-medium whitespace-nowrap">{r.asset}</p>
                    <p className="font-mono text-xs text-muted-foreground">{r.tag}</p>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{r.employee}</TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">{r.allocated}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <span className={cn(r.overdue && "font-medium text-destructive")}>{r.expectedReturn}</span>
                    {r.overdue && <span className="ml-2 text-xs text-destructive">Overdue</span>}
                  </TableCell>
                  <TableCell><StatusBadge status={r.approval} /></TableCell>
                  <TableCell className="text-right">
                    <TransferDialog asset={r.asset} />
                    <ReturnDialog asset={r.asset} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}

function AllocateDialog() {
  const [open, setOpen] = useState(false);
  const [assetId, setAssetId] = useState("");
  const chosen = assets.find((a) => a.id === assetId);
  const blocked = chosen?.status === "Allocated";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm"><Plus className="mr-2 h-4 w-4" /> Allocate asset</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Allocate asset</DialogTitle>
          <DialogDescription>Assign an available asset to an employee.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Asset</Label>
            <Select value={assetId} onValueChange={setAssetId}>
              <SelectTrigger><SelectValue placeholder="Select asset" /></SelectTrigger>
              <SelectContent>
                {assets.slice(0, 20).map((a) => (
                  <SelectItem key={a.id} value={a.id}>{a.tag} — {a.name} ({a.status})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {blocked && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>This asset is currently allocated.</AlertTitle>
              <AlertDescription>
                You cannot allocate it directly. Raise a transfer request instead.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label>Assign to employee</Label>
            <Select><SelectTrigger><SelectValue placeholder="Select employee" /></SelectTrigger>
              <SelectContent>{employees.map((e) => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2"><Label>Expected return date</Label><Input type="date" /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          {blocked ? (
            <Button onClick={() => { setOpen(false); toast.success("Transfer request raised"); }}>
              <ArrowLeftRight className="mr-2 h-4 w-4" /> Request transfer
            </Button>
          ) : (
            <Button disabled={!assetId} onClick={() => { setOpen(false); toast.success("Asset allocated"); }}>
              <Check className="mr-2 h-4 w-4" /> Allocate
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function TransferDialog({ asset }: { asset: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm"><ArrowLeftRight className="mr-1.5 h-4 w-4" /> Transfer</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transfer asset</DialogTitle>
          <DialogDescription>Reassign “{asset}” to another employee.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Transfer to</Label>
            <Select><SelectTrigger><SelectValue placeholder="Select employee" /></SelectTrigger>
              <SelectContent>{employees.map((e) => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2"><Label>Reason</Label><Textarea placeholder="Reason for transfer…" /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => { setOpen(false); toast.success("Transfer request submitted for approval"); }}>Submit request</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ReturnDialog({ asset }: { asset: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm"><RotateCcw className="mr-1.5 h-4 w-4" /> Return</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Return asset</DialogTitle>
          <DialogDescription>Record the return of “{asset}”. It will become Available.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Condition check</Label>
            <Select defaultValue="Good"><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{["Excellent", "Good", "Fair", "Poor"].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2"><Label>Damage notes</Label><Textarea placeholder="Any damage observed…" /></div>
          <div className="space-y-2"><Label>Return notes</Label><Textarea placeholder="Additional notes…" /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => { setOpen(false); toast.success("Asset returned — now Available"); }}>Confirm return</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
