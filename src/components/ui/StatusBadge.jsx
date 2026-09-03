const styles = {
  active: "bg-tertiary-fixed-dim/20 text-tertiary-container border-tertiary-container/20",
  present: "bg-tertiary-fixed-dim/20 text-tertiary-container border-tertiary-container/20",
  early: "bg-primary/10 text-primary border-primary/20",
  late: "bg-amber-50 text-amber-700 border-amber-200",
  absent: "bg-error-container text-on-error-container border-error/20",
  revoked: "bg-error-container text-on-error-container border-error/20",
  disabled: "bg-surface-container text-on-surface-variant border-outline-variant",
  unknown: "bg-surface-container text-on-surface-variant border-outline-variant"
};

export default function StatusBadge({ value }) {
  const key = String(value || "unknown").toLowerCase();
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-xs font-semibold ${styles[key] || styles.unknown}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {value || "Unknown"}
    </span>
  );
}
