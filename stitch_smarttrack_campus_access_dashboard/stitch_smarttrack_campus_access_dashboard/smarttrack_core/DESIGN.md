---
name: SmartTrack Core
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#434655'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#006242'
  on-tertiary: '#ffffff'
  tertiary-container: '#007d55'
  on-tertiary-container: '#bdffdb'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  display-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.03em
  mono-data:
    fontFamily: monospace
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  container-max: 1440px
  gutter: 16px
---

## Brand & Style
The design system is engineered for high-stakes campus utility and administrative precision. It adopts a **Modern Enterprise** aesthetic, drawing heavy influence from high-performance developer tools to evoke a sense of speed, technical reliability, and "invisible" infrastructure.

The interface prioritizes information density and operational clarity over decorative flair. It utilizes a refined mix of **Minimalism** and **Tonal Layering**. The emotional response is one of total control and security—trustworthy enough for government-grade access management, yet modern enough for a digital-first student body. 

Key visual markers include:
- A rigorous alignment to a technical grid.
- Subtle micro-interactions that provide instant feedback.
- A "Utility First" hierarchy where data is the primary visual driver.

## Colors
The palette is rooted in a professional "Enterprise Blue" spectrum. The default mode is **Light**, utilizing high-contrast surfaces to ensure readability during long administrative shifts.

- **Primary (Cobalt Blue):** Reserved for primary actions, active states, and critical progress indicators.
- **Secondary (Deep Slate/Navy):** Used for navigation backgrounds, high-level headers, and text to provide a grounded, authoritative feel.
- **Surface (Off-White):** A soft white used for page backgrounds to reduce eye strain compared to pure hex white.
- **Semantic Accents:** Emerald Green for "Access Granted" or "Active" states; Amber for "Temporary Access" or "Flagged" alerts.
- **Borders:** Crisp, low-contrast slate used to define data density without cluttering the visual field.

## Typography
The typography system prioritizes **scannability** and **technical precision**. 

- **Geist** is used for headings and labels to provide a modern, monospaced-adjacent feel that suggests accuracy.
- **Inter** handles all body copy and long-form data for its exceptional legibility at small sizes.
- **Hierarchy:** Use `label-sm` in uppercase for table headers and section overviews. Use `mono-data` for ID numbers, IP addresses, and timestamps to distinguish machine-generated data from human-entered text.

## Layout & Spacing
The layout follows a **Fixed-Fluid Hybrid** model. Dashboards utilize a 12-column grid on desktop, while data-heavy management views use a fluid layout to maximize screen real estate.

- **Rhythm:** A strict 4px baseline grid ensures consistent vertical alignment.
- **Density:** Use "Compact" spacing (8px) for data tables and "Roomy" spacing (24px) for landing pages and settings forms.
- **Breakpoints:** 
  - Mobile (<768px): 4 columns, 16px margins.
  - Tablet (768px - 1024px): 8 columns, 24px margins.
  - Desktop (>1024px): 12 columns, 32px margins.

## Elevation & Depth
This design system avoids heavy drop shadows, opting for **low-contrast outlines** and **tonal layering** to create depth.

- **Level 0 (Floor):** Background color `#f8fafc`.
- **Level 1 (Cards/Tables):** White background with a 1px border of `#e2e8f0`.
- **Level 2 (Dropdowns/Modals):** White background, 1px border, and a subtle "Ambient" shadow: `0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)`.
- **Active State:** Use a 2px Cobalt Blue left-border for active navigation items or selected table rows to indicate focus without adding bulk.

## Shapes
The shape language is **Soft (0.25rem)**. This provides a subtle modern touch while maintaining the structural integrity of a professional dashboard.

- **Small Components:** Checkboxes, input fields, and small buttons use `0.25rem`.
- **Large Components:** Cards and main container surfaces use `0.5rem` (`rounded-lg`).
- **Status Badges:** Use `9999px` (Pill) to distinguish them from interactive buttons or input fields.

## Components
- **Buttons:** Primary buttons use solid Cobalt Blue with white text. Secondary buttons use a white background with a `#e2e8f0` border and Slate text. Avoid gradients.
- **Data Tables:** High-density. Row height should be 40px for compact views. Use zebra-striping only on hover states to maintain a clean look.
- **Status Badges:** Use soft background tints with high-contrast text (e.g., Success = Light Green BG + Dark Green Text). 
- **Input Fields:** Use 1px borders. On focus, use a 1px Cobalt Blue border with a 3px soft blue outer halo (ring).
- **ID Card Preview:** A specific component representing the physical student ID. Use `rounded-lg`, a subtle `#0f172a` header, and a clear photo placeholder.
- **Real-time Feed:** List items with a timestamp in `mono-data` and a colored dot indicating the event type (Access, Denied, Alert).