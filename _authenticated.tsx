import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, CalendarClock, Clock, X, RefreshCw, AlertTriangle, Check } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, SectionCard, EmptyState } from "@/components/app/page-header";
import { StatusBadge } from "@/components/app/status-badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { bookings, type Booking } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/booking")({
  component: BookingPage,
});

const resourceTypes = ["Meeting Room", "Conference Room", "Vehicle", "Projector", "Laptop", "Equipment"];
const hours = Array.from({ length: 10 }, (_, i) => 8 + i);

function BookingPage() {
  const upcoming = bookings.filter((b) => b.status === "Upcoming");
  const completed = bookings.filter((b) => b.status === "Completed");
  const cancelled = bookings.filter((b) => b.status === "Cancelled");

  return (
    <>
      <PageHeader
        title="Resource Booking"
        description="Book meeting rooms, vehicles, projectors and shared equipment."
        actions={<BookingDialog />}
      />

      <SectionCard title="Today's Schedule" description="Timeline of resource bookings">
        <div className="overflow-x-auto">
          <div className="min-w-[720px]">
            <div className="mb-2 flex gap-1 pl-40">
              {hours.map((h) => (
                <div key={h} className="flex-1 text-center text-[11px] text-muted-foreground">{h}:00</div>
              ))}
            </div>
            {["Everest Conf. Room", "Alps Meeting Room", "Fleet — Innova", "Epson Projector"].map((res, ri) => (
              <div key={res} className="mb-2 flex items-center gap-2">
                <div className="w-40 shrink-0 truncate text-sm font-medium text-foreground">{res}</div>
                <div className="relative flex h-9 flex-1 gap-1 rounded-lg bg-muted/40 p-1">
                  {hours.map((h) => <div key={h} className="flex-1 border-r border-border/40 last:border-0" />)}
                  <div
                    className="absolute top-1 bottom-1 rounded-md bg-primary/85 px-2 text-[11px] font-medium leading-7 text-primary-foreground"
                    style={{ left: `${8 + ri * 12}%`, width: `${14 + ri * 4}%` }}
                  >
                    Booked
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completed.length})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({cancelled.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-4"><BookingList items={upcoming} showActions /></TabsContent>
        <TabsContent value="completed" className="mt-4"><BookingList items={completed} /></TabsContent>
        <TabsContent value="cancelled" className="mt-4"><BookingList items={cancelled} /></TabsContent>
      </Tabs>
    </>
  );
}

function BookingList({ items, showActions }: { items: Booking[]; showActions?: boolean }) {
  if (items.length === 0)
    return <EmptyState icon={<CalendarClock className="h-6 w-6" />} title="No bookings here" description="Bookings will appear in this tab." />;
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((b) => (
        <div key={b.id} className="flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-4 shadow-soft">
          <div className="flex gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
              <CalendarClock className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate font-medium text-foreground">{b.resource}</p>
              <p className="text-xs text-muted-foreground">{b.type} · {b.bookedBy}</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" /> {b.date} · {b.start}–{b.end}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <StatusBadge status={b.status} />
            {showActions && (
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={() => toast.success("Booking rescheduled")}><RefreshCw className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => toast.success("Booking cancelled")}><X className="h-4 w-4" /></Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function BookingDialog() {
  const [open, setOpen] = useState(false);
  const [slot, setSlot] = useState("");
  const conflict = slot === "09:00";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm"><Plus className="mr-2 h-4 w-4" /> New booking</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book a resource</DialogTitle>
          <DialogDescription>Reserve a shared resource for your team.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Resource type</Label>
            <Select><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
              <SelectContent>{resourceTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2"><Label>Date</Label><Input type="date" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Start time</Label>
              <Select value={slot} onValueChange={setSlot}>
                <SelectTrigger><SelectValue placeholder="09:00" /></SelectTrigger>
                <SelectContent>{hours.map((h) => <SelectItem key={h} value={`${String(h).padStart(2, "0")}:00`}>{h}:00</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>End time</Label><Input type="time" /></div>
          </div>

          {conflict && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Time slot conflict</AlertTitle>
              <AlertDescription>This resource is already booked at 09:00. Choose a different slot.</AlertDescription>
            </Alert>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button disabled={conflict} onClick={() => { setOpen(false); toast.success("Booking confirmed"); }}>
            <Check className="mr-2 h-4 w-4" /> Confirm booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
