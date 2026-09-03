"use client";

import Icon from "./Icon";

export default function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 p-4">
      <div className="max-h-[90vh] w-full max-w-xl overflow-auto rounded-xl border border-outline-variant bg-white shadow-lg">
        <div className="flex items-center justify-between border-b border-outline-variant p-4">
          <h2 className="font-display text-lg font-semibold text-on-surface">{title}</h2>
          <button className="rounded-lg p-2 text-on-surface-variant hover:bg-surface-container" onClick={onClose} aria-label="Close">
            <Icon name="close" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
