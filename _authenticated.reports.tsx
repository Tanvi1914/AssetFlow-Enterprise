import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Plus,
  Search,
  QrCode,
  Eye,
  SlidersHorizontal,
  Package,
  FileText,
  History,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader, EmptyState } from "@/components/app/page-header";
import { StatusBadge } from "@/components/app/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { assets, categories, departments, type Asset } from "@/lib/data";

export const Route = createFileRoute("/_authenticated/assets")({
  component: AssetsPage,
});

const statuses = ["Available", "Allocated", "Reserved", "Under Maintenance", "Lost", "Retired", "Disposed"];

function AssetsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [status, setStatus] = useState("all");
  const [selected, setSelected] = useState<Asset | null>(null);

  const filtered = assets.filter(
    (a) =>
      (cat === "all" || a.category === cat) &&
      (status === "all" || a.status === status) &&
      (a.name.toLowerCase().includes(q.toLowerCase()) ||
        a.tag.toLowerCase().includes(q.toLowerCase()) ||
        a.serial.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <>
      <PageHeader
        title="Asset Directory"
        description={`${assets.length} registered assets across the organization`}
        actions={
          <>
            <Button variant="outline" size="sm"><QrCode className="mr-2 h-4 w-4" /> Scan QR</Button>
            <Button size="sm"><Plus className="mr-2 h-4 w-4" /> Register asset</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" placeholder="Search by tag, name or serial…" />
        </div>
        <Select value={cat} onValueChange={setCat}>
          <SelectTrigger className="w-full sm:w-52"><SlidersHorizontal className="mr-2 h-4 w-4" /><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((c) => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full sm:w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Package className="h-6 w-6" />}
          title="No assets found"
          description="Try adjusting your search or filters."
          action={<Button variant="outline" onClick={() => { setQ(""); setCat("all"); setStatus("all"); }}>Clear filters</Button>}
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Tag</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Serial</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Assigned</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">View</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((a) => (
                  <TableRow key={a.id} className="cursor-pointer" onClick={() => setSelected(a)}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                          <Package className="h-4 w-4" />
                        </div>
                        <span className="font-medium whitespace-nowrap">{a.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{a.tag}</TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">{a.category}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{a.serial}</TableCell>
                    <TableCell><StatusBadge status={a.condition} /></TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">{a.department}</TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">{a.assignedTo ?? "—"}</TableCell>
                    <TableCell><StatusBadge status={a.status} /></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      <AssetDrawer asset={selected} onClose={() => setSelected(null)} />
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border/60 py-2.5 text-sm last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium text-foreground">{value}</span>
    </div>
  );
}

function AssetDrawer({ asset, onClose }: { asset: Asset | null; onClose: () => void }) {
  return (
    <Sheet open={!!asset} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
        {asset && (
          <>
            <SheetHeader>
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <Package className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <SheetTitle className="truncate">{asset.name}</SheetTitle>
                  <SheetDescription className="font-mono">{asset.tag}</SheetDescription>
                </div>
              </div>
              <div className="mt-2"><StatusBadge status={asset.status} /></div>
            </SheetHeader>

            <Tabs defaultValue="general" className="mt-6 px-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="allocation">Allocation</TabsTrigger>
              </TabsList>
              <TabsList className="mt-2 grid w-full grid-cols-2">
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                <TabsTrigger value="docs">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="mt-4">
                <Row label="Category" value={asset.category} />
                <Row label="Serial number" value={asset.serial} />
                <Row label="Acquisition date" value={asset.acquisitionDate} />
                <Row label="Acquisition cost" value={`₹${asset.cost.toLocaleString()}`} />
                <Row label="Condition" value={asset.condition} />
                <Row label="Department" value={asset.department} />
                <Row label="Location" value={asset.location} />
                <Row label="Assigned to" value={asset.assignedTo ?? "Unassigned"} />
                <Row label="Shared resource" value={asset.shared ? "Yes" : "No"} />
              </TabsContent>

              <TabsContent value="allocation" className="mt-4 space-y-4">
                {[
                  { who: "Meera Iyer", when: "May 2026 – present", tone: "primary" },
                  { who: "Rohan Verma", when: "Jan 2026 – May 2026", tone: "muted" },
                  { who: "IT Store", when: "Registered Dec 2025", tone: "muted" },
                ].map((h, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                      {i < 2 && <div className="w-px flex-1 bg-border" />}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-medium text-foreground">{h.who}</p>
                      <p className="text-xs text-muted-foreground">{h.when}</p>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="maintenance" className="mt-4 space-y-3">
                {[
                  { t: "Battery replacement", d: "Apr 2026 · Resolved" },
                  { t: "Screen calibration", d: "Feb 2026 · Resolved" },
                ].map((m, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-lg border border-border p-3">
                    <Wrench className="mt-0.5 h-4 w-4 text-warning-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{m.t}</p>
                      <p className="text-xs text-muted-foreground">{m.d}</p>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="docs" className="mt-4 space-y-2">
                {["Invoice.pdf", "Warranty-card.pdf", "Handover-form.pdf"].map((f) => (
                  <button
                    key={f}
                    onClick={() => toast.info(`Opening ${f}`)}
                    className="flex w-full items-center gap-3 rounded-lg border border-border p-3 text-left transition-colors hover:bg-muted"
                  >
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{f}</span>
                  </button>
                ))}
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex gap-2 px-4">
              <Button className="flex-1" onClick={() => toast.success("Allocation flow opened")}>Allocate</Button>
              <Button variant="outline" className="flex-1" onClick={() => toast.info("Edit asset")}>Edit</Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
