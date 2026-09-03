"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import StatusBadge from "@/components/ui/StatusBadge";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/DataState";
import { useAsyncData } from "@/hooks/useAsyncData";
import { devicesService } from "@/services/devices.service";

export default function ZonesPage() {
  const devices = useAsyncData(() => devicesService.list(), []);
  const rows = devices.data?.devices || [];
  const active = rows.filter((device) => device.status === "active").length;

  return (
    <DashboardShell>
      <section className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-semibold">Access Control Zones</h2>
          <p className="mt-1 text-sm text-on-surface-variant">Zone coverage is derived from registered reader locations in the backend.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <Metric label="Total zones" value={rows.length} />
          <Metric label="Online zones" value={active} />
          <Metric label="Attention needed" value={rows.length - active} />
        </div>
        <div className="panel overflow-hidden">
          <div className="border-b border-outline-variant p-4">
            <h3 className="font-display text-lg font-semibold">Reader Zones</h3>
          </div>
          {devices.loading ? <LoadingState /> : devices.error ? <ErrorState message={devices.error} onRetry={devices.reload} /> : rows.length ? (
            <div className="grid gap-4 p-4 md:grid-cols-2 xl:grid-cols-3">
              {rows.map((zone) => (
                <article className="rounded-xl border border-outline-variant bg-white p-4" key={zone.id}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-display font-semibold text-on-surface">{zone.locationName}</h4>
                      <p className="mt-1 font-mono text-xs text-on-surface-variant">{zone.id}</p>
                    </div>
                    <StatusBadge value={zone.status} />
                  </div>
                  <div className="mt-5 h-24 rounded-lg border border-dashed border-outline-variant bg-surface-container-low p-3 text-xs text-on-surface-variant">
                    {zone.latitude && zone.longitude ? `Coordinates: ${zone.latitude}, ${zone.longitude}` : "Coordinates not configured"}
                  </div>
                </article>
              ))}
            </div>
          ) : <EmptyState title="No access zones yet" description="Register devices on the Hardware page to populate zones." />}
        </div>
      </section>
    </DashboardShell>
  );
}

function Metric({ label, value }) {
  return <div className="panel p-4"><p className="label">{label}</p><p className="mt-2 font-display text-3xl font-semibold">{value}</p></div>;
}
