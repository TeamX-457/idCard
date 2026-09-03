export function LoadingState({ label = "Loading data..." }) {
  return (
    <div className="flex min-h-40 items-center justify-center text-sm text-on-surface-variant">
      <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-primary" />
      {label}
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="m-4 rounded-lg border border-error/20 bg-error-container/40 p-4 text-sm text-on-error-container">
      <p className="font-semibold">Unable to load this view</p>
      <p className="mt-1">{message}</p>
      {onRetry ? (
        <button className="btn-secondary mt-3 bg-white" onClick={onRetry}>
          Retry
        </button>
      ) : null}
    </div>
  );
}

export function EmptyState({ title = "No records yet", description = "Create a record to populate this area." }) {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center p-6 text-center">
      <p className="text-sm font-semibold text-on-surface">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-on-surface-variant">{description}</p>
    </div>
  );
}
