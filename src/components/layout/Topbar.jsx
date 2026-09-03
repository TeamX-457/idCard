"use client";

import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const links = [
    ["/dashboard", "Dashboard"],
    ["/attendance", "Attendance"],
    ["/students", "Students"],
    ["/hardware", "Hardware"],
    ["/zones", "Zones"],
    ["/settings", "Settings"]
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-outline-variant bg-surface px-4 py-3 md:fixed md:right-0 md:w-[calc(100%-16rem)] md:px-6">
      <div className="flex items-center justify-between gap-4">
        <button className="rounded-lg border border-outline-variant p-2 md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Menu">
          <Menu size={18} />
        </button>
        <div className="relative hidden w-full max-w-md sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={16} />
          <input className="field pl-9" placeholder="Search students, hardware, or zones..." />
        </div>
        <div className="ml-auto flex items-center gap-3">
          <span className="hidden text-sm font-semibold text-on-surface sm:inline">{user?.name || "Admin"}</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-fixed text-xs font-bold text-on-primary-fixed">
            {(user?.name || "AD").slice(0, 2).toUpperCase()}
          </div>
        </div>
      </div>
      {open ? (
        <div className="mt-3 grid gap-1 border-t border-outline-variant pt-3 md:hidden">
          {links.map(([href, label]) => (
            <Link className="rounded-lg px-3 py-2 text-sm font-semibold text-on-surface-variant hover:bg-surface-container" href={href} key={href}>
              {label}
            </Link>
          ))}
        </div>
      ) : null}
    </header>
  );
}
