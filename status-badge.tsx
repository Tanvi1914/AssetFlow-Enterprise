import type { ReactNode } from "react";
import { Boxes, ShieldCheck, Zap, BarChart3 } from "lucide-react";

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-primary p-12 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary-foreground/15">
            <Boxes className="h-6 w-6" />
          </div>
          <span className="text-lg font-bold">AssetFlow</span>
        </div>
        <div className="relative z-10 max-w-md">
          <h2 className="text-3xl font-bold leading-tight">
            Enterprise asset & resource management, reimagined.
          </h2>
          <p className="mt-4 text-primary-foreground/80">
            Track assets, allocations, bookings, maintenance and audits across your entire
            organization — from one premium platform.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              { icon: ShieldCheck, text: "Role-based access & approval workflows" },
              { icon: Zap, text: "Real-time allocation, transfers & returns" },
              { icon: BarChart3, text: "Analytics, audits & discrepancy reports" },
            ].map((f) => (
              <li key={f.text} className="flex items-center gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-foreground/15">
                  <f.icon className="h-4.5 w-4.5" />
                </div>
                <span className="text-sm text-primary-foreground/90">{f.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-primary-foreground/60">© 2026 AssetFlow. Enterprise ERP suite.</p>
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-primary-foreground/10 blur-3xl" />
        <div className="pointer-events-none absolute -top-16 right-16 h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl" />
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-background px-4 py-10 sm:px-8">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Boxes className="h-6 w-6" />
            </div>
            <span className="text-lg font-bold text-foreground">AssetFlow</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
