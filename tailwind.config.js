module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#f7f9fb",
        surface: "#f7f9fb",
        "surface-bright": "#f7f9fb",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f2f4f6",
        "surface-container": "#eceef0",
        "surface-container-high": "#e6e8ea",
        "surface-container-highest": "#e0e3e5",
        "surface-variant": "#e0e3e5",
        "on-surface": "#191c1e",
        "on-background": "#191c1e",
        "on-surface-variant": "#434655",
        outline: "#737686",
        "outline-variant": "#c3c6d7",
        primary: "#004ac6",
        "primary-container": "#2563eb",
        "primary-fixed": "#dbe1ff",
        "primary-fixed-dim": "#b4c5ff",
        "on-primary": "#ffffff",
        "on-primary-fixed": "#00174b",
        secondary: "#565e74",
        "secondary-container": "#dae2fd",
        tertiary: "#006242",
        "tertiary-container": "#007d55",
        "tertiary-fixed-dim": "#4edea3",
        error: "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem"
      },
      fontFamily: {
        display: ["Geist", "Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
      }
    }
  },
  plugins: []
};
