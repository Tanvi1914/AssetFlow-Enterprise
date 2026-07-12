import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Search, Pencil, Trash2, ShieldCheck, Ban, Building2, Tags, Users } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/app/page-header";
import { StatusBadge } from "@/components/app/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { departments, categories, employees } from "@/lib/data";

export const Route = createFileRoute("/_authenticated/organization")({
  component: OrganizationPage,
});

function initials(n: string) {
  return n.split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();
}

function OrganizationPage() {
  const [empSearch, setEmpSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredEmps = employees.filter(
    (e) =>
      (roleFilter === "all" || e.role === roleFilter) &&
      (e.name.toLowerCase().includes(empSearch.toLowerCase()) ||
        e.email.toLowerCase().includes(empSearch.toLowerCase())),
  );

  return (
    <>
      <PageHeader
        title="Organization Setup"
        description="Manage departments, asset categories and the employee directory."
      />

      <Tabs defaultValue="departments">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="departments">
            <Building2 className="mr-1.5 h-4 w-4" /> Departments
          </TabsTrigger>
          <TabsTrigger value="categories">
            <Tags className="mr-1.5 h-4 w-4" /> Categories
          </TabsTrigger>
          <TabsTrigger value="employees">
            <Users className="mr-1.5 h-4 w-4" /> Employees
          </TabsTrigger>
        </TabsList>

        {/* Departments */}
        <TabsContent value="departments" className="mt-5">
          <div className="mb-4 flex justify-end">
            <DepartmentDialog />
          </div>
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Parent</TableHead>
                    <TableHead>Head</TableHead>
                    <TableHead>Employees</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departments.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell className="font-medium">{d.name}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {d.parent ? departments.find((p) => p.id === d.parent)?.name : "—"}
                      </TableCell>
                      <TableCell>{d.head}</TableCell>
                      <TableCell>{d.employees}</TableCell>
                      <TableCell><StatusBadge status={d.status} /></TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => toast.info(`Editing ${d.name}`)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => toast.success(`${d.name} deactivated`)}>
                          <Ban className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        {/* Categories */}
        <TabsContent value="categories" className="mt-5">
          <div className="mb-4 flex justify-end">
            <CategoryDialog />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <div key={c.id} className="rounded-xl border border-border bg-card p-5 shadow-soft">
                <div className="flex items-start justify-between">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-accent-foreground">
                    <Tags className="h-5 w-5" />
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => toast.info(`Editing ${c.name}`)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete category?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will remove “{c.name}”. Assets in this category must be reassigned.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => toast.success(`${c.name} deleted`)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                <h3 className="mt-4 font-semibold text-foreground">{c.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Warranty: {c.warrantyMonths} mo</span>
                  <span className="font-medium text-foreground">{c.assetCount} assets</span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Employees */}
        <TabsContent value="employees" className="mt-5">
          <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={empSearch} onChange={(e) => setEmpSearch(e.target.value)} className="pl-9" placeholder="Search employees…" />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-48"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All roles</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Asset Manager">Asset Manager</SelectItem>
                <SelectItem value="Department Head">Department Head</SelectItem>
                <SelectItem value="Employee">Employee</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmps.map((e) => (
                    <TableRow key={e.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback style={{ backgroundColor: e.avatarColor }} className="text-xs font-semibold text-white">
                              {initials(e.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="truncate font-medium text-foreground">{e.name}</p>
                            <p className="truncate text-xs text-muted-foreground">{e.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{e.department}</TableCell>
                      <TableCell><StatusBadge status={e.role === "Employee" ? "Good" : "Approved"} className="!bg-accent !text-accent-foreground !border-accent" /></TableCell>
                      <TableCell><StatusBadge status={e.status} /></TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => toast.success(`${e.name} promoted`)}>
                          <ShieldCheck className="mr-1.5 h-4 w-4" /> Promote
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => toast.success(`${e.name} deactivated`)}>
                          <Ban className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}

function DepartmentDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm"><Plus className="mr-2 h-4 w-4" /> New Department</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create department</DialogTitle>
          <DialogDescription>Add a new department to your organization.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2"><Label>Department name</Label><Input placeholder="e.g. Legal" /></div>
          <div className="space-y-2">
            <Label>Parent department</Label>
            <Select><SelectTrigger><SelectValue placeholder="None" /></SelectTrigger>
              <SelectContent>{departments.map((d) => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Department head</Label>
            <Select><SelectTrigger><SelectValue placeholder="Select head" /></SelectTrigger>
              <SelectContent>{employees.map((e) => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => { setOpen(false); toast.success("Department created"); }}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CategoryDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm"><Plus className="mr-2 h-4 w-4" /> New Category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create category</DialogTitle>
          <DialogDescription>Define a new asset category.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2"><Label>Category name</Label><Input placeholder="e.g. Printers" /></div>
          <div className="space-y-2"><Label>Warranty period (months)</Label><Input type="number" placeholder="24" /></div>
          <div className="space-y-2"><Label>Description</Label><Textarea placeholder="Short description…" /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => { setOpen(false); toast.success("Category created"); }}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
