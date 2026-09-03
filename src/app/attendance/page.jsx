"use client";

import { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import StatusBadge from "@/components/ui/StatusBadge";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/DataState";
import { useAsyncData } from "@/hooks/useAsyncData";
import { attendanceService } from "@/services/attendance.service";
import { formatDateTime, minutesToTime, timeToMinutes } from "@/utils/format";

export default function AttendancePage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ eventType: "", startDate: "", endDate: "" });
  const events = useAsyncData(() => attendanceService.list({ page, limit: 25, ...filters }), [page, filters.eventType, filters.startDate, filters.endDate]);
  const rules = useAsyncData(() => attendanceService.getRules(), []);
  const rows = events.data?.events || [];

  return (
    <DashboardShell>
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="panel overflow-hidden">
          <div className="border-b border-outline-variant p-4">
            <h2 className="font-display text-lg font-semibold">Attendance Analytics</h2>
            <p className="text-sm text-on-surface-variant">Review check-in/check-out history with documented filters.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <select className="field" value={filters.eventType} onChange={(e) => { setPage(1); setFilters({ ...filters, eventType: e.target.value }); }}>
                <option value="">All events</option><option value="check_in">Check in</option><option value="check_out">Check out</option>
              </select>
              <input className="field" type="date" value={filters.startDate} onChange={(e) => { setPage(1); setFilters({ ...filters, startDate: e.target.value }); }} />
              <input className="field" type="date" value={filters.endDate} onChange={(e) => { setPage(1); setFilters({ ...filters, endDate: e.target.value }); }} />
            </div>
          </div>
          {events.loading ? <LoadingState /> : events.error ? <ErrorState message={events.error} onRetry={events.reload} /> : rows.length ? (
            <>
              <div className="overflow-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead className="bg-surface-container-low text-xs font-semibold uppercase text-on-surface-variant">
                    <tr><th className="p-3">Student</th><th className="p-3">Event</th><th className="p-3">UID/Card</th><th className="p-3">Device</th><th className="p-3">Time</th><th className="p-3 text-right">Status</th></tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    {rows.map((event) => (
                      <tr className="hover:bg-surface-container-low" key={event.id}>
                        <td className="p-3 font-semibold">{event.student?.name || event.studentId || "Unknown"}</td>
                        <td className="p-3">{event.eventType}</td>
                        <td className="p-3 font-mono text-xs text-on-surface-variant">{event.uid || event.card?.uid || event.cardId || "N/A"}</td>
                        <td className="p-3 text-on-surface-variant">{event.device?.locationName || event.deviceId || "N/A"}</td>
                        <td className="p-3 font-mono text-xs text-on-surface-variant">{formatDateTime(event.createdAt || event.timestamp)}</td>
                        <td className="p-3 text-right"><StatusBadge value={event.timingStatus || event.status || event.eventType} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between border-t border-outline-variant p-3 text-sm text-on-surface-variant">
                <span>Page {events.data?.pagination?.page || page} of {events.data?.pagination?.totalPages || 1}</span>
                <div className="flex gap-2">
                  <button className="btn-secondary px-3 py-1" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
                  <button className="btn-secondary px-3 py-1" disabled={page >= (events.data?.pagination?.totalPages || 1)} onClick={() => setPage(page + 1)}>Next</button>
                </div>
              </div>
            </>
          ) : <EmptyState title="No attendance events" description="Events matching the current filters will appear here." />}
        </section>
        <AttendanceRules dataState={rules} />
      </div>
    </DashboardShell>
  );
}

function AttendanceRules({ dataState }) {
  const rule = dataState.data?.rule || dataState.data?.attendanceRule || dataState.data;
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState(null);

  if (dataState.loading) return <aside className="panel"><LoadingState /></aside>;
  if (dataState.error) return <aside className="panel"><ErrorState message={dataState.error} onRetry={dataState.reload} /></aside>;

  const values = form || {
    earlyThreshold: minutesToTime(rule?.earlyThreshold ?? 480),
    presentThreshold: minutesToTime(rule?.presentThreshold ?? 540),
    absentThreshold: minutesToTime(rule?.absentThreshold ?? 780),
    schoolDays: rule?.schoolDays || [1, 2, 3, 4, 5]
  };

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      await attendanceService.updateRules({
        earlyThreshold: timeToMinutes(values.earlyThreshold),
        presentThreshold: timeToMinutes(values.presentThreshold),
        absentThreshold: timeToMinutes(values.absentThreshold),
        schoolDays: values.schoolDays.map(Number)
      });
      setMessage("Attendance rule updated.");
      dataState.reload();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSaving(false);
    }
  }

  function setValue(key, value) {
    setForm({ ...values, [key]: value });
  }

  return (
    <aside className="panel p-4">
      <h3 className="font-display text-lg font-semibold">Attendance Rules</h3>
      <form className="mt-4 space-y-4" onSubmit={submit}>
        {["earlyThreshold", "presentThreshold", "absentThreshold"].map((field) => (
          <label className="block" key={field}><span className="label">{field.replace("Threshold", " threshold")}</span><input className="field mt-1" type="time" value={values[field]} onChange={(e) => setValue(field, e.target.value)} /></label>
        ))}
        <label className="block"><span className="label">School days</span><input className="field mt-1" value={values.schoolDays.join(",")} onChange={(e) => setValue("schoolDays", e.target.value.split(",").map((v) => v.trim()).filter(Boolean))} /></label>
        {message ? <p className="rounded-lg bg-surface-container p-3 text-sm text-on-surface-variant">{message}</p> : null}
        <button className="btn-primary" disabled={saving}>{saving ? "Saving..." : "Save rules"}</button>
      </form>
    </aside>
  );
}
