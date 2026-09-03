"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/DataState";
import StatusBadge from "@/components/ui/StatusBadge";
import { useAsyncData } from "@/hooks/useAsyncData";
import { dashboardService } from "@/services/dashboard.service";
import { devicesService } from "@/services/devices.service";
import { attendanceService } from "@/services/attendance.service";
import { formatDateTime } from "@/utils/format";

export default function DashboardPage() {
  const today = useAsyncData(() => dashboardService.today(), []);
  const devices = useAsyncData(() => devicesService.list(), []);
  const events = useAsyncData(() => attendanceService.list({ page: 1, limit: 10 }), []);
  const counts = today.data?.counts || {};
  const students = today.data?.students || [];
  const total = students.length || Object.values(counts).reduce((sum, value) => sum + Number(value || 0), 0);

  return (
    <DashboardShell>
      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <section className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Kpi label="Total Campus Headcount" value={total} helper={`${counts.present || 0} present`} />
            <Kpi label="Late Arrivals" value={counts.late || 0} helper="Requires follow-up" tone="warning" />
            <Kpi label="Connected Readers" value={(devices.data?.devices || []).filter((d) => d.status === "active").length} helper={`${devices.data?.devices?.length || 0} registered`} />
            <Kpi label="Absent / Unknown" value={(counts.absent || 0) + (counts.unknown || 0)} helper="Today" tone="danger" />
          </div>
          <div className="panel overflow-hidden">
            <div className="flex items-center justify-between border-b border-outline-variant bg-surface-bright p-4">
              <h2 className="font-display text-lg font-semibold text-on-surface">Live Gate Scan Stream</h2>
              <span className="text-xs font-semibold text-on-surface-variant">{today.data?.date ? formatDateTime(today.data.date) : "Today"}</span>
            </div>
            {events.loading ? <LoadingState /> : events.error ? <ErrorState message={events.error} onRetry={events.reload} /> : events.data?.events?.length ? (
              <div className="overflow-auto">
                <table className="w-full min-w-[680px] text-left text-sm">
                  <thead className="bg-surface-container-low text-xs font-semibold uppercase text-on-surface-variant">
                    <tr><th className="p-3">Student</th><th className="p-3">Event</th><th className="p-3">Card</th><th className="p-3">Time</th><th className="p-3 text-right">Status</th></tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    {events.data.events.map((event) => (
                      <tr className="hover:bg-surface-container-low" key={event.id}>
                        <td className="p-3 font-semibold">{event.student?.name || event.studentId || "Unknown ID"}</td>
                        <td className="p-3 text-on-surface-variant">{event.eventType}</td>
                        <td className="p-3 font-mono text-xs text-on-surface-variant">{event.card?.uid || event.cardId || "N/A"}</td>
                        <td className="p-3 font-mono text-xs text-on-surface-variant">{formatDateTime(event.createdAt || event.timestamp)}</td>
                        <td className="p-3 text-right"><StatusBadge value={event.timingStatus || event.status || event.eventType} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : <EmptyState title="No scan events yet" description="Reader activity will appear here after devices submit attendance events." />}
          </div>
        </section>
        <aside className="panel p-4">
          <h3 className="font-display text-lg font-semibold text-on-surface">Reader Status & Movement</h3>
          <div className="mt-4 space-y-3">
            {devices.loading ? <LoadingState /> : devices.error ? <ErrorState message={devices.error} onRetry={devices.reload} /> : (devices.data?.devices || []).length ? devices.data.devices.map((device) => (
              <div className="rounded-lg border border-outline-variant bg-surface p-3" key={device.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-on-surface">{device.locationName}</p>
                    <p className="font-mono text-xs text-on-surface-variant">{device.id}</p>
                  </div>
                  <StatusBadge value={device.status} />
                </div>
                <p className="mt-3 text-xs text-on-surface-variant">{device.latitude && device.longitude ? `${device.latitude}, ${device.longitude}` : "No coordinates set"}</p>
              </div>
            )) : <EmptyState title="No readers registered" description="Register hardware readers from the Hardware page." />}
          </div>
        </aside>
      </div>
    </DashboardShell>
  );
}

function Kpi({ label, value, helper, tone = "normal" }) {
  const toneClass = tone === "danger" ? "text-error bg-error-container" : tone === "warning" ? "text-amber-700 bg-amber-50" : "text-tertiary-container bg-tertiary-container/10";
  return (
    <div className="panel p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.03em] text-on-surface-variant">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold text-on-surface">{value}</p>
      <span className={`mt-3 inline-flex rounded-full px-2 py-1 text-xs font-semibold ${toneClass}`}>{helper}</span>
    </div>
  );
}
