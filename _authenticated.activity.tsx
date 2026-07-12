import {
  LayoutDashboard,
  Building2,
  Boxes,
  ArrowLeftRight,
  CalendarClock,
  Wrench,
  ClipboardCheck,
  BarChart3,
  Bell,
  ScrollText,
  Settings,
  type LucideIcon,
} from "lucide-react";
import type { Role } from "./auth";

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  roles?: Role[];
  badge?: string;
}

export interface NavGroup {
  heading: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    heading: "Overview",
    items: [{ label: "Dashboard", to: "/dashboard", icon: LayoutDashboard }],
  },
  {
    heading: "Management",
    items: [
      { label: "Organization", to: "/organization", icon: Building2, roles: ["Admin"] },
      { label: "Assets", to: "/assets", icon: Boxes },
      { label: "Asset Allocation", to: "/allocation", icon: ArrowLeftRight },
      { label: "Resource Booking", to: "/booking", icon: CalendarClock },
      { label: "Maintenance", to: "/maintenance", icon: Wrench },
      { label: "Asset Audit", to: "/audit", icon: ClipboardCheck, roles: ["Admin", "Asset Manager"] },
    ],
  },
  {
    heading: "Insights",
    items: [
      { label: "Reports & Analytics", to: "/reports", icon: BarChart3 },
      { label: "Notifications", to: "/notifications", icon: Bell, badge: "4" },
      { label: "Activity Logs", to: "/activity", icon: ScrollText, roles: ["Admin", "Asset Manager"] },
      { label: "Settings", to: "/settings", icon: Settings },
    ],
  },
];

export function visibleGroups(role: Role): NavGroup[] {
  return navGroups
    .map((g) => ({
      ...g,
      items: g.items.filter((i) => !i.roles || i.roles.includes(role)),
    }))
    .filter((g) => g.items.length > 0);
}

export const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/organization": "Organization Setup",
  "/assets": "Asset Directory",
  "/allocation": "Asset Allocation & Transfer",
  "/booking": "Resource Booking",
  "/maintenance": "Maintenance Management",
  "/audit": "Asset Audit",
  "/reports": "Reports & Analytics",
  "/notifications": "Notifications",
  "/activity": "Activity Logs",
  "/settings": "Settings",
};
