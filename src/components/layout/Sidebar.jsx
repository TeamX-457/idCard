"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, CalendarDays, GraduationCap, LayoutDashboard, LogOut, Router, Settings, ShieldCheck, Users } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const items = [
  { href: "/dashboard", label: "Live Gate Feed", icon: LayoutDashboard },
  { href: "/attendance", label: "Attendance", icon: Activity },
  { href: "/students", label: "Students", icon: GraduationCap },
  { href: "/hardware", label: "Hardware", icon: Router },
  { href: "/zones", label: "Zones", icon: ShieldCheck },
  { href: "/settings", label: "Settings", icon: Settings }
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout, user, school } = useAuth();

  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-64 flex-col border-r border-outline-variant bg-surface-container-lowest py-6 md:flex">
      <div className="mb-8 px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
            <Users size={19} />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold leading-6 text-primary">SmartTrack IoT</h1>
            <p className="text-xs font-semibold text-on-surface-variant">Admin Console</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-2">
        {items.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg border-l-2 px-4 py-2.5 text-sm font-semibold transition ${
                active
                  ? "border-primary bg-surface-container-high text-primary"
                  : "border-transparent text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-4">
        <div className="rounded-lg border border-outline-variant bg-surface-container-low p-3">
          <p className="truncate text-sm font-semibold text-on-surface">{user?.name || "System Administrator"}</p>
          <p className="truncate text-xs text-on-surface-variant">{school?.name || user?.role || "School console"}</p>
          <button className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-error" onClick={logout}>
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
