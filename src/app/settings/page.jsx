"use client";

import { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/DataState";
import { useAuth } from "@/context/AuthContext";
import { useAsyncData } from "@/hooks/useAsyncData";
import { calendarService } from "@/services/calendar.service";
import { termsService } from "@/services/terms.service";
import { formatDate } from "@/utils/format";

export default function SettingsPage() {
  const { user, school } = useAuth();
  const terms = useAsyncData(() => termsService.list(), []);
  const calendar = useAsyncData(() => calendarService.list(), []);

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-semibold">System Settings</h2>
          <p className="mt-1 text-sm text-on-surface-variant">Calendar, terms, and school console configuration.</p>
        </div>
        <section className="grid gap-6 xl:grid-cols-2">
          <div className="panel p-4">
            <h3 className="font-display text-lg font-semibold">General Configuration</h3>
            <div className="mt-4 grid gap-4">
              <Readonly label="School" value={school?.name || "Authenticated school"} />
              <Readonly label="Administrator" value={user?.name || "Administrator"} />
              <Readonly label="Email" value={user?.email || "No email"} />
              <Readonly label="Role" value={user?.role || "SCHOOL_ADMIN"} />
            </div>
          </div>
          <TermPanel state={terms} />
        </section>
        <CalendarPanel state={calendar} />
      </div>
    </DashboardShell>
  );
}

function Readonly({ label, value }) {
  return <label className="block"><span className="label">{label}</span><input className="field mt-1 bg-surface-container-low" value={value} readOnly /></label>;
}

function TermPanel({ state }) {
  const [form, setForm] = useState({ name: "", startDate: "", endDate: "" });
  const [message, setMessage] = useState("");
  async function submit(e) {
    e.preventDefault();
    setMessage("");
    try {
      await termsService.create(form);
      setForm({ name: "", startDate: "", endDate: "" });
      state.reload();
    } catch (err) {
      setMessage(err.message);
    }
  }
  async function remove(id) {
    if (!confirm("Delete this term?")) return;
    await termsService.remove(id);
    state.reload();
  }
  return (
    <div className="panel p-4">
      <h3 className="font-display text-lg font-semibold">Academic Terms</h3>
      <form className="mt-4 grid gap-3 sm:grid-cols-3" onSubmit={submit}>
        <input className="field" placeholder="Term name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input className="field" type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} required />
        <input className="field" type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} required />
        <button className="btn-primary sm:col-span-3">Create term</button>
      </form>
      {message ? <p className="mt-3 rounded-lg bg-error-container p-3 text-sm text-on-error-container">{message}</p> : null}
      <div className="mt-4">
        {state.loading ? <LoadingState /> : state.error ? <ErrorState message={state.error} onRetry={state.reload} /> : state.data?.terms?.length ? (
          <div className="divide-y divide-outline-variant rounded-lg border border-outline-variant">
            {state.data.terms.map((term) => (
              <div className="flex items-center justify-between gap-3 p-3 text-sm" key={term.id}>
                <div><p className="font-semibold">{term.name}</p><p className="text-on-surface-variant">{formatDate(term.startDate)} - {formatDate(term.endDate)}</p></div>
                <button className="font-semibold text-error" onClick={() => remove(term.id)}>Delete</button>
              </div>
            ))}
          </div>
        ) : <EmptyState title="No terms configured" description="Add academic terms to support attendance reporting." />}
      </div>
    </div>
  );
}

function CalendarPanel({ state }) {
  const [form, setForm] = useState({ date: "", type: "holiday", label: "" });
  const [message, setMessage] = useState("");
  async function submit(e) {
    e.preventDefault();
    setMessage("");
    try {
      await calendarService.create(form);
      setForm({ date: "", type: "holiday", label: "" });
      state.reload();
    } catch (err) {
      setMessage(err.message);
    }
  }
  async function remove(id) {
    if (!confirm("Delete this calendar exception?")) return;
    await calendarService.remove(id);
    state.reload();
  }
  return (
    <section className="panel overflow-hidden">
      <div className="border-b border-outline-variant p-4">
        <h3 className="font-display text-lg font-semibold">Calendar Exceptions</h3>
      </div>
      <form className="grid gap-3 border-b border-outline-variant p-4 sm:grid-cols-[1fr_160px_1fr_auto]" onSubmit={submit}>
        <input className="field" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
        <select className="field" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}><option value="holiday">Holiday</option><option value="makeup">Make-up day</option></select>
        <input className="field" placeholder="Label" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} required />
        <button className="btn-primary">Add</button>
      </form>
      {message ? <p className="m-4 rounded-lg bg-error-container p-3 text-sm text-on-error-container">{message}</p> : null}
      {state.loading ? <LoadingState /> : state.error ? <ErrorState message={state.error} onRetry={state.reload} /> : state.data?.exceptions?.length ? (
        <div className="overflow-auto">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="bg-surface-container-low text-xs font-semibold uppercase text-on-surface-variant"><tr><th className="p-3">Date</th><th className="p-3">Type</th><th className="p-3">Label</th><th className="p-3 text-right">Action</th></tr></thead>
            <tbody className="divide-y divide-outline-variant">
              {state.data.exceptions.map((item) => <tr key={item.id}><td className="p-3">{formatDate(item.date)}</td><td className="p-3 capitalize">{item.type}</td><td className="p-3">{item.label}</td><td className="p-3 text-right"><button className="font-semibold text-error" onClick={() => remove(item.id)}>Delete</button></td></tr>)}
            </tbody>
          </table>
        </div>
      ) : <EmptyState title="No calendar exceptions" description="Holidays and make-up days will appear here." />}
    </section>
  );
}
