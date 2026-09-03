"use client";

import { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/DataState";
import { useAsyncData } from "@/hooks/useAsyncData";
import { devicesService } from "@/services/devices.service";
import { formatDateTime } from "@/utils/format";

export default function HardwarePage() {
  const [modal, setModal] = useState(false);
  const [secret, setSecret] = useState("");
  const devices = useAsyncData(() => devicesService.list(), []);
  const rows = devices.data?.devices || [];

  async function disable(device) {
    if (!confirm(`Disable reader at ${device.locationName}?`)) return;
    await devicesService.disable(device.id);
    devices.reload();
  }

  async function reset(device) {
    if (!confirm(`Reset secret for ${device.locationName}? The old physical device secret will stop working.`)) return;
    const data = await devicesService.resetSecret(device.id);
    setSecret(data.secret);
    devices.reload();
  }

  return (
    <DashboardShell>
      <section className="panel overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-outline-variant p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-lg font-semibold">Hardware Readers</h2>
            <p className="text-sm text-on-surface-variant">Register, disable, and rotate secrets for access devices.</p>
          </div>
          <button className="btn-primary" onClick={() => setModal(true)}>Add Reader</button>
        </div>
        {devices.loading ? <LoadingState /> : devices.error ? <ErrorState message={devices.error} onRetry={devices.reload} /> : rows.length ? (
          <div className="grid gap-4 p-4 md:grid-cols-2 xl:grid-cols-3">
            {rows.map((device) => (
              <article className="rounded-xl border border-outline-variant bg-surface p-4" key={device.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-base font-semibold">{device.locationName}</h3>
                    <p className="mt-1 font-mono text-xs text-on-surface-variant">{device.id}</p>
                  </div>
                  <StatusBadge value={device.status} />
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <Info label="Latitude" value={device.latitude ?? "N/A"} />
                  <Info label="Longitude" value={device.longitude ?? "N/A"} />
                  <Info label="Registered" value={formatDateTime(device.createdAt)} />
                  <Info label="Updated" value={formatDateTime(device.updatedAt)} />
                </div>
                <div className="mt-5 flex gap-2">
                  <button className="btn-secondary flex-1 px-3 py-1.5" onClick={() => reset(device)}>Reset Secret</button>
                  <button className="btn-secondary flex-1 px-3 py-1.5 text-error" disabled={device.status === "disabled"} onClick={() => disable(device)}>Disable</button>
                </div>
              </article>
            ))}
          </div>
        ) : <EmptyState title="No readers registered" description="Add a reader for a gate, library, or access zone." />}
      </section>
      {modal ? <DeviceModal onClose={() => setModal(false)} onSaved={async (raw) => { setSecret(raw); await devices.reload(); }} /> : null}
      {secret ? <Modal title="Device secret" onClose={() => setSecret("")}><p className="text-sm text-on-surface-variant">Store this secret now. The backend only returns the raw value once.</p><pre className="mt-4 overflow-auto rounded-lg bg-slate-950 p-4 font-mono text-sm text-white">{secret}</pre></Modal> : null}
    </DashboardShell>
  );
}

function Info({ label, value }) {
  return <div><p className="label">{label}</p><p className="mt-1 break-words text-on-surface">{value}</p></div>;
}

function DeviceModal({ onClose, onSaved }) {
  const [form, setForm] = useState({ locationName: "", latitude: "", longitude: "" });
  const [error, setError] = useState("");
  async function submit(e) {
    e.preventDefault();
    try {
      const payload = {
        locationName: form.locationName,
        ...(form.latitude ? { latitude: Number(form.latitude) } : {}),
        ...(form.longitude ? { longitude: Number(form.longitude) } : {})
      };
      const data = await devicesService.register(payload);
      await onSaved(data.secret);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <Modal title="Register reader" onClose={onClose}>
      <form className="space-y-4" onSubmit={submit}>
        <label className="block"><span className="label">Location name</span><input className="field mt-1" value={form.locationName} onChange={(e) => setForm({ ...form, locationName: e.target.value })} required /></label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block"><span className="label">Latitude</span><input className="field mt-1" value={form.latitude} onChange={(e) => setForm({ ...form, latitude: e.target.value })} /></label>
          <label className="block"><span className="label">Longitude</span><input className="field mt-1" value={form.longitude} onChange={(e) => setForm({ ...form, longitude: e.target.value })} /></label>
        </div>
        {error ? <p className="rounded-lg bg-error-container p-3 text-sm text-on-error-container">{error}</p> : null}
        <button className="btn-primary">Register reader</button>
      </form>
    </Modal>
  );
}
