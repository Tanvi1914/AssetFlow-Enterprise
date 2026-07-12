export type Role = "Admin" | "Asset Manager" | "Department Head" | "Employee";

export type AssetStatus =
  | "Available"
  | "Allocated"
  | "Reserved"
  | "Under Maintenance"
  | "Lost"
  | "Retired"
  | "Disposed";

export interface Department {
  id: string;
  name: string;
  parent: string | null;
  head: string;
  status: "Active" | "Inactive";
  employees: number;
}

export interface Category {
  id: string;
  name: string;
  warrantyMonths: number;
  description: string;
  assetCount: number;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  role: Role;
  status: "Active" | "Inactive";
  avatarColor: string;
}

export interface Asset {
  id: string;
  tag: string;
  name: string;
  category: string;
  serial: string;
  acquisitionDate: string;
  cost: number;
  condition: "Excellent" | "Good" | "Fair" | "Poor";
  department: string;
  location: string;
  assignedTo: string | null;
  shared: boolean;
  status: AssetStatus;
}

export interface Booking {
  id: string;
  resource: string;
  type: string;
  bookedBy: string;
  date: string;
  start: string;
  end: string;
  status: "Upcoming" | "Completed" | "Cancelled";
}

export interface Maintenance {
  id: string;
  asset: string;
  assetTag: string;
  issue: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  raisedBy: string;
  stage:
    | "Pending"
    | "Approved"
    | "Rejected"
    | "Technician Assigned"
    | "In Progress"
    | "Resolved";
  date: string;
  technician?: string;
}

export interface AuditCycle {
  id: string;
  name: string;
  department: string;
  location: string;
  auditor: string;
  range: string;
  progress: number;
  verified: number;
  missing: number;
  damaged: number;
  status: "Active" | "Closed";
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  icon: string;
}

export interface ActivityLog {
  id: string;
  user: string;
  role: Role;
  action: string;
  module: string;
  timestamp: string;
  status: "Success" | "Failed" | "Pending";
}

const colors = ["#6366f1", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];
const pick = (i: number) => colors[i % colors.length];

export const departments: Department[] = [
  { id: "D1", name: "Information Technology", parent: null, head: "Arjun Mehta", status: "Active", employees: 42 },
  { id: "D2", name: "Human Resources", parent: null, head: "Priya Nair", status: "Active", employees: 18 },
  { id: "D3", name: "Finance & Accounts", parent: null, head: "Rakesh Sharma", status: "Active", employees: 24 },
  { id: "D4", name: "Operations", parent: null, head: "Sneha Kapoor", status: "Active", employees: 56 },
  { id: "D5", name: "Facilities", parent: "D4", head: "Vikram Singh", status: "Active", employees: 12 },
  { id: "D6", name: "Research & Development", parent: null, head: "Ananya Rao", status: "Active", employees: 33 },
  { id: "D7", name: "Marketing", parent: null, head: "Kabir Khan", status: "Inactive", employees: 9 },
];

export const categories: Category[] = [
  { id: "C1", name: "Laptops & Computers", warrantyMonths: 36, description: "Workstations, laptops, desktops", assetCount: 312 },
  { id: "C2", name: "Networking Equipment", warrantyMonths: 24, description: "Routers, switches, access points", assetCount: 87 },
  { id: "C3", name: "Furniture", warrantyMonths: 60, description: "Desks, chairs, cabinets", assetCount: 540 },
  { id: "C4", name: "Vehicles", warrantyMonths: 48, description: "Company fleet and transport", assetCount: 21 },
  { id: "C5", name: "AV Equipment", warrantyMonths: 24, description: "Projectors, displays, conferencing", assetCount: 64 },
  { id: "C6", name: "Lab Instruments", warrantyMonths: 36, description: "Scientific and testing equipment", assetCount: 128 },
];

export const employees: Employee[] = [
  { id: "E1", name: "Arjun Mehta", email: "arjun.mehta@assetflow.io", department: "Information Technology", role: "Admin", status: "Active", avatarColor: pick(0) },
  { id: "E2", name: "Priya Nair", email: "priya.nair@assetflow.io", department: "Human Resources", role: "Department Head", status: "Active", avatarColor: pick(1) },
  { id: "E3", name: "Rakesh Sharma", email: "rakesh.sharma@assetflow.io", department: "Finance & Accounts", role: "Asset Manager", status: "Active", avatarColor: pick(2) },
  { id: "E4", name: "Sneha Kapoor", email: "sneha.kapoor@assetflow.io", department: "Operations", role: "Department Head", status: "Active", avatarColor: pick(3) },
  { id: "E5", name: "Vikram Singh", email: "vikram.singh@assetflow.io", department: "Facilities", role: "Department Head", status: "Active", avatarColor: pick(4) },
  { id: "E6", name: "Ananya Rao", email: "ananya.rao@assetflow.io", department: "Research & Development", role: "Asset Manager", status: "Active", avatarColor: pick(5) },
  { id: "E7", name: "Kabir Khan", email: "kabir.khan@assetflow.io", department: "Marketing", role: "Employee", status: "Inactive", avatarColor: pick(6) },
  { id: "E8", name: "Meera Iyer", email: "meera.iyer@assetflow.io", department: "Information Technology", role: "Employee", status: "Active", avatarColor: pick(0) },
  { id: "E9", name: "Rohan Verma", email: "rohan.verma@assetflow.io", department: "Operations", role: "Employee", status: "Active", avatarColor: pick(1) },
  { id: "E10", name: "Divya Menon", email: "divya.menon@assetflow.io", department: "Finance & Accounts", role: "Employee", status: "Active", avatarColor: pick(2) },
  { id: "E11", name: "Aditya Joshi", email: "aditya.joshi@assetflow.io", department: "Research & Development", role: "Employee", status: "Active", avatarColor: pick(3) },
  { id: "E12", name: "Sara Ali", email: "sara.ali@assetflow.io", department: "Human Resources", role: "Employee", status: "Active", avatarColor: pick(4) },
];

const locations = ["HQ – Floor 3", "HQ – Floor 5", "Warehouse A", "Data Center", "Lab Wing B", "Branch – Pune"];
const conditions: Asset["condition"][] = ["Excellent", "Good", "Fair", "Poor"];
const statuses: AssetStatus[] = ["Available", "Allocated", "Reserved", "Under Maintenance", "Lost", "Retired", "Disposed"];
const assetNames = [
  "MacBook Pro 16\"", "Dell Latitude 7440", "HP EliteBook 840", "Cisco Catalyst 9200", "Epson Projector EB-2250U",
  "Herman Miller Aeron", "Toyota Innova Crysta", "Logitech Rally Bar", "Lenovo ThinkPad X1", "Ubiquiti UniFi AP",
  "Standing Desk Pro", "Microscope Olympus CX23", "iPad Pro 12.9\"", "Samsung Flip 2", "Zebra Barcode Scanner",
];

export const assets: Asset[] = Array.from({ length: 48 }, (_, i) => {
  const cat = categories[i % categories.length];
  const emp = employees[i % employees.length];
  const status = statuses[i % 5 === 0 ? (i % statuses.length) : (i % 4)];
  return {
    id: `A${i + 1}`,
    tag: `AF-${String(1000 + i)}`,
    name: assetNames[i % assetNames.length],
    category: cat.name,
    serial: `SN${(928471 + i * 137).toString()}`,
    acquisitionDate: `202${2 + (i % 3)}-0${(i % 9) + 1}-1${i % 9}`,
    cost: 15000 + (i % 12) * 8500,
    condition: conditions[i % conditions.length],
    department: departments[i % departments.length].name,
    location: locations[i % locations.length],
    assignedTo: status === "Allocated" ? emp.name : null,
    shared: i % 6 === 0,
    status,
  };
});

export const bookings: Booking[] = [
  { id: "B1", resource: "Everest Conference Room", type: "Conference Room", bookedBy: "Priya Nair", date: "2026-07-12", start: "09:00", end: "10:30", status: "Upcoming" },
  { id: "B2", resource: "Fleet Vehicle – Innova", type: "Vehicle", bookedBy: "Rohan Verma", date: "2026-07-12", start: "11:00", end: "17:00", status: "Upcoming" },
  { id: "B3", resource: "Epson Projector EB-2250U", type: "Projector", bookedBy: "Meera Iyer", date: "2026-07-13", start: "14:00", end: "15:00", status: "Upcoming" },
  { id: "B4", resource: "Alps Meeting Room", type: "Meeting Room", bookedBy: "Aditya Joshi", date: "2026-07-10", start: "10:00", end: "11:00", status: "Completed" },
  { id: "B5", resource: "Loaner Laptop – ThinkPad", type: "Laptop", bookedBy: "Divya Menon", date: "2026-07-09", start: "09:00", end: "18:00", status: "Completed" },
  { id: "B6", resource: "Andes Board Room", type: "Conference Room", bookedBy: "Kabir Khan", date: "2026-07-08", start: "16:00", end: "17:00", status: "Cancelled" },
  { id: "B7", resource: "Rally Bar Kit", type: "Equipment", bookedBy: "Sara Ali", date: "2026-07-14", start: "13:00", end: "14:30", status: "Upcoming" },
];

export const maintenance: Maintenance[] = [
  { id: "M1", asset: "Dell Latitude 7440", assetTag: "AF-1001", issue: "Battery drains within an hour", priority: "High", raisedBy: "Meera Iyer", stage: "Pending", date: "2026-07-11" },
  { id: "M2", asset: "Epson Projector EB-2250U", assetTag: "AF-1004", issue: "Lamp flickering during presentations", priority: "Medium", raisedBy: "Aditya Joshi", stage: "Approved", date: "2026-07-10" },
  { id: "M3", asset: "Toyota Innova Crysta", assetTag: "AF-1006", issue: "Scheduled 40,000 km service", priority: "Low", raisedBy: "Rohan Verma", stage: "Technician Assigned", date: "2026-07-09", technician: "AutoCare Services" },
  { id: "M4", asset: "Cisco Catalyst 9200", assetTag: "AF-1003", issue: "Port 12 not responding", priority: "Critical", raisedBy: "Arjun Mehta", stage: "In Progress", date: "2026-07-08", technician: "NetOps Team" },
  { id: "M5", asset: "Herman Miller Aeron", assetTag: "AF-1005", issue: "Armrest broken", priority: "Low", raisedBy: "Divya Menon", stage: "Resolved", date: "2026-07-05", technician: "Facilities" },
  { id: "M6", asset: "MacBook Pro 16\"", assetTag: "AF-1000", issue: "Keyboard keys sticking", priority: "Medium", raisedBy: "Sara Ali", stage: "Rejected", date: "2026-07-04" },
  { id: "M7", asset: "Lenovo ThinkPad X1", assetTag: "AF-1008", issue: "Screen has dead pixels", priority: "High", raisedBy: "Rohan Verma", stage: "Pending", date: "2026-07-11" },
  { id: "M8", asset: "Microscope Olympus CX23", assetTag: "AF-1011", issue: "Focus knob loose", priority: "Medium", raisedBy: "Ananya Rao", stage: "In Progress", date: "2026-07-07", technician: "LabTech" },
];

export const audits: AuditCycle[] = [
  { id: "AU1", name: "Q3 IT Assets Audit", department: "Information Technology", location: "HQ – Floor 3", auditor: "Rakesh Sharma", range: "Jul 1 – Jul 15, 2026", progress: 68, verified: 210, missing: 4, damaged: 11, status: "Active" },
  { id: "AU2", name: "Facilities Furniture Audit", department: "Facilities", location: "HQ – Floor 5", auditor: "Vikram Singh", range: "Jun 15 – Jun 30, 2026", progress: 100, verified: 498, missing: 7, damaged: 35, status: "Closed" },
  { id: "AU3", name: "R&D Lab Instruments", department: "Research & Development", location: "Lab Wing B", auditor: "Ananya Rao", range: "Jul 5 – Jul 20, 2026", progress: 41, verified: 52, missing: 1, damaged: 3, status: "Active" },
];

export const notifications: Notification[] = [
  { id: "N1", type: "Asset Assigned", title: "New asset assigned", body: "MacBook Pro 16\" (AF-1000) has been allocated to you.", time: "5m ago", read: false, icon: "package" },
  { id: "N2", type: "Transfer Approved", title: "Transfer approved", body: "Your transfer request for AF-1008 was approved.", time: "1h ago", read: false, icon: "arrow-left-right" },
  { id: "N3", type: "Maintenance Approved", title: "Maintenance approved", body: "Ticket M2 for Epson Projector approved.", time: "3h ago", read: false, icon: "wrench" },
  { id: "N4", type: "Booking Confirmed", title: "Booking confirmed", body: "Everest Conference Room booked for 09:00–10:30.", time: "Yesterday", read: true, icon: "calendar-check" },
  { id: "N5", type: "Maintenance Rejected", title: "Maintenance rejected", body: "Ticket M6 was rejected: not reproducible.", time: "Yesterday", read: true, icon: "x-circle" },
  { id: "N6", type: "Audit Discrepancy", title: "Audit discrepancy found", body: "4 assets missing in Q3 IT Assets Audit.", time: "2d ago", read: true, icon: "clipboard-check" },
  { id: "N7", type: "Overdue Return", title: "Overdue return", body: "Loaner ThinkPad is 3 days overdue.", time: "2d ago", read: false, icon: "clock" },
  { id: "N8", type: "Booking Reminder", title: "Upcoming booking", body: "Rally Bar Kit reserved tomorrow at 13:00.", time: "3d ago", read: true, icon: "bell" },
];

export const activityLogs: ActivityLog[] = Array.from({ length: 34 }, (_, i) => {
  const emp = employees[i % employees.length];
  const actions = [
    ["Allocated asset AF-1002", "Assets", "Success"],
    ["Approved transfer request", "Allocation", "Success"],
    ["Created audit cycle", "Audit", "Success"],
    ["Failed login attempt", "Auth", "Failed"],
    ["Booked conference room", "Booking", "Success"],
    ["Raised maintenance ticket", "Maintenance", "Pending"],
    ["Promoted employee role", "Organization", "Success"],
    ["Exported report (PDF)", "Reports", "Success"],
    ["Deactivated department", "Organization", "Success"],
    ["Returned asset AF-1005", "Allocation", "Success"],
  ];
  const a = actions[i % actions.length];
  return {
    id: `L${i + 1}`,
    user: emp.name,
    role: emp.role,
    action: a[0],
    module: a[1],
    timestamp: `2026-07-${String(12 - (i % 10)).padStart(2, "0")} ${String(9 + (i % 8)).padStart(2, "0")}:${String((i * 7) % 60).padStart(2, "0")}`,
    status: a[2] as ActivityLog["status"],
  };
});

// Chart datasets
export const assetStatusData = [
  { name: "Available", value: 512, color: "var(--color-chart-3)" },
  { name: "Allocated", value: 684, color: "var(--color-chart-1)" },
  { name: "Reserved", value: 96, color: "var(--color-chart-2)" },
  { name: "Maintenance", value: 74, color: "var(--color-chart-4)" },
  { name: "Retired", value: 58, color: "var(--color-chart-5)" },
];

export const departmentAllocationData = departments
  .filter((d) => d.status === "Active")
  .map((d) => ({ name: d.name.split(" ")[0], allocated: 40 + ((d.employees * 3) % 180), available: 20 + (d.employees % 60) }));

export const maintenanceTrendData = [
  { month: "Jan", requests: 24, resolved: 20 },
  { month: "Feb", requests: 31, resolved: 28 },
  { month: "Mar", requests: 28, resolved: 27 },
  { month: "Apr", requests: 42, resolved: 38 },
  { month: "May", requests: 37, resolved: 35 },
  { month: "Jun", requests: 45, resolved: 41 },
  { month: "Jul", requests: 33, resolved: 22 },
];

export const utilizationData = [
  { name: "Laptops", utilization: 88 },
  { name: "Vehicles", utilization: 62 },
  { name: "AV Equip", utilization: 74 },
  { name: "Furniture", utilization: 91 },
  { name: "Lab", utilization: 55 },
  { name: "Network", utilization: 80 },
];

export const kpis = [
  { label: "Assets Available", value: "512", delta: "+4.2%", up: true, icon: "package-check", tone: "success" },
  { label: "Assets Allocated", value: "684", delta: "+1.8%", up: true, icon: "package", tone: "primary" },
  { label: "Maintenance Today", value: "17", delta: "-3", up: false, icon: "wrench", tone: "warning" },
  { label: "Active Bookings", value: "43", delta: "+6", up: true, icon: "calendar-check", tone: "info" },
  { label: "Pending Transfers", value: "9", delta: "+2", up: true, icon: "arrow-left-right", tone: "primary" },
  { label: "Upcoming Returns", value: "12", delta: "5 overdue", up: false, icon: "clock", tone: "destructive" },
];
