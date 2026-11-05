# Design System: Envíos DosRuedas
**Project ID:** `envios-dosruedas-mdp`

---

## 1. Visual Theme & Atmosphere

* **Atmospheric Character:** Energetic, Utilitarian, Hyper-Local, and High-Velocity.
* **Aesthetic Philosophy:** The interface conveys instant reliability and non-stop operational urgency for same-day urban logistics in Mar del Plata. It fuses industrial transport cues (high-visibility safety accents, route schematics, live dispatch indicators) with refined, modern digital craft (glassmorphism navigation, tactile micro-interactions, springy typographic motion, and ambient glows).
* **Information Density:** High yet scannable. Information is presented through structured modular cards, contrast-rich badges, ticker reels, and compact data-dense grids that prioritize immediate contact and conversion without cognitive fatigue.
* **Depth & Dimensionality:** Layered glassmorphism with crisp optical boundaries. Elevation is achieved through deep, saturated cobalt ambient drop shadows (`rgba(9, 80, 246, 0.45)`) paired with high-voltage yellow directional glows (`0 0 28px rgba(255, 236, 1, 0.45)`), giving interactive targets a vibrant, tactile presence over dark oceanic blue canvases.

---

## 2. Color Palette & Roles

The palette is strictly anchored in a three-color core system: Electric Cobalt Blue, High-Visibility Speed Yellow, and Crisp Optic White, complemented by a calibrated tint scale for depth and contrast.

### Core Brand Colors

* **Electric Cobalt Blue (`#0950F6`):** Primary canvas and structural brand anchor. Used for full-bleed body backgrounds, primary headers, dark surfaces, and interactive contrasting states. Represents speed, oceanic coastal identity, and institutional dependability.
* **High-Visibility Speed Yellow (`#FFEC01`):** Primary focal attractor and action color. Reserved strictly for primary call-to-action buttons, key status accents, focus rings, route art markers, active indicators, and high-impact typographic highlights.
* **Crisp Optic White (`#FFFFFF`):** High-contrast clarity base. Used for primary typography, icon strokes, glass border contours, and crisp contrast surfaces over the cobalt ground.

### Blue Tonal Scale (Atmospheric Depths & Glass Borders)

* **Deep Sapphire Navy (`#063BB7`):** Darker shadow state and pressed button contours.
* **Pure Brand Cobalt (`#0950F6`):** Canonical brand blue token (`--color-brand-blue-500`).
* **Vibrant Dodger Cobalt (`#3570F8`):** Subtle hover gradients and secondary surface borders.
* **Sky Cerulean (`#628FF9`):** Tertiary accents and secondary interactive states.
* **Soft Cornflower (`#8EAFFB`):** Muted route art lines and auxiliary illustration details.
* **Pale Glacial Frost (`#BACEFD`):** Route line vectors, dashed guides, and subtle informational dividers.
* **Whisper Ice Blue (`#E6EEFE`):** High-light surface fills and light chip backgrounds.

### Yellow Tonal Scale (Alerts, Highlights & Radiance)

* **Amber Gold Edge (`#E6D400`):** Pressed borders and active shadow accents.
* **Pure High-Vis Yellow (`#FFEC01`):** Canonical brand yellow token (`--color-brand-yellow-500`).
* **Bright Lemon Flare (`#FFF12E`):** Hover transitions for CTA elements.
* **Luminous Soft Yellow (`#FFF45C`):** Subhead emphasis and hover glows.
* **Gentle Buttercream (`#FFF78A`):** Low-contrast tag backgrounds.
* **Pastel Primrose (`#FFFAB8`):** Glow halos and map indicator rings.
* **Warm Cream White (`#FFFDE6`):** Ambient radial lighting highlights.

### Semantic Overlays & Alpha Tokens

* **Translucent Cobalt Glass (`rgba(9, 80, 246, 0.94)` / `rgba(9, 80, 246, 0.98)`):** Sticky navigation background with 14px backdrop blur.
* **Ghost White Tint (`rgba(255, 255, 255, 0.08)` / `rgba(255, 255, 255, 0.12)`):** Hover pills, dropdown item highlights, and button icon wells.
* **Subtle Glass Border (`rgba(255, 255, 255, 0.22)`):** Structural hairline separation between layers and module boundaries.
* **Muted Text Veil (`rgba(255, 255, 255, 0.88)`):** Secondary copy, descriptions, and metadata.

---

## 3. Typography Rules

A distinct 4-family typographic hierarchy engineered for maximum contrast, urgent roadside legibility, and technical precision.

### 1. Primary Display & Brand Titling: `Anton` / `Anton SC`
* **Font Family:** `"Anton", Impact, sans-serif`
* **Character:** Condensed, muscular, ultra-bold grotesque.
* **Usage:** Top-level brand logotype (`22px`, line-height `0.92`, letter-spacing `-0.015em`, all caps) and Hero split headlines (`clamp(44px, 7vw, 92px)`, uppercase).
* **Behavior:** Animated per-character in the Hero using 3D perspective transforms (`rotationX: -75deg`, staggered entrance).

### 2. Action Headers & Navigation: `Bebas Neue`
* **Font Family:** `"Bebas Neue", sans-serif`
* **Character:** Architectural, tall, clean sans-serif with strong vertical rhythm.
* **Usage:** Navigation links (`16px`, letter-spacing `0.08em`), CTA button text (`17px`, letter-spacing `0.06em`), Section banners, and Footer column headlines.
* **Styling:** Always transformed to uppercase (`text-transform: uppercase`).

### 3. Body & Interface Prose: `Outfit`
* **Font Family:** `"Outfit", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
* **Character:** Humanist geometric sans with open apertures, warm geometry, and superior screen readability.
* **Usage:** Hero lead paragraph (`clamp(15px, 1.4vw, 18px)`, line-height `1.55`), card descriptions, list items, and legal notices.
* **Weights:** `300` (Light body), `400` (Regular), `500` (Medium interface labels), `600` (Semi-bold titles), `700` (Bold emphasis).

### 4. Technical Data, Badges & Numbers: `Geist Mono`
* **Font Family:** `"Geist Mono", monospace`
* **Character:** Monospaced, engineered, tabular figure representation.
* **Usage:** Eyebrow status badges (`12px`, letter-spacing `0.08em`), direct phone numbers with tabular alignment (`14px`), operational tags, and address micro-labels.

---

## 4. Component Stylings (Exhaustive HTML Catalog)

### 4.1. Navigation & Header (`.site-header`)
* **Geometry:** Sticky top bar, full viewport width with `clamp(16px, 4vw, 56px)` inline padding, standard height `82px` transitioning to a compressed `70px` on scroll.
* **Material & Elevation:** Glassmorphism surface (`background: rgba(9, 80, 246, 0.94)`, `backdrop-filter: blur(14px)`), bounded by a hairline border (`1px solid rgba(255, 255, 255, 0.22)`). On scroll, transitions to deep indigo density (`rgba(9, 80, 246, 0.98)`) with `0 12px 36px rgba(9, 80, 246, 0.32)`.
* **Brand Lockup (`.brand`):** Inline flex cluster featuring the square logo icon (`44px` with smooth scale on hover) paired with stacked all-caps typography and a High-Vis Yellow monospaced micro-subtitle (`MENSAJERÍA · LOGÍSTICA MDP`).
* **Navigation Links (`.nav-link`, `.dropdown-trigger`):** Pill-padded touch targets (`8px 12px`), subtly rounded (`border-radius: 8px`), Bebas Neue font at `16px`. Hover and focus states swap text color to High-Vis Yellow with a faint white ghost background (`rgba(255, 255, 255, 0.08)`).

### 4.2. Flyout Dropdowns (`.dropdown-menu`)
* **Geometry:** Generously rounded floating panels (`border-radius: 14px`), minimum width `250px`, positioned with a 4px vertical offset below triggers.
* **Surface & Shadow:** Solid Cobalt ground (`#0950F6`) with `1px solid rgba(255, 255, 255, 0.24)` and an expansive oceanic drop shadow (`0 20px 48px -8px rgba(9, 80, 246, 0.45)`).
* **Dropdown Items (`.dropdown-link`):** Padded interactive rows (`10px 12px`) with subtle left-to-right drift on hover (`transform: translateX(3px)`).
* **Icon Wells (`.dropdown-icon-pill`):** Squircle container (`28x28px`, `border-radius: 6px`) housing yellow geometric SVG stroke icons. Inverts on hover to solid Yellow background with Cobalt Blue icon.

### 4.3. Primary Action Buttons with Arrow Disc (`.header-cta`, `.button-primary`, `.btn-cotizar-footer`)
* **Signature Design Feature:** The circular nested arrow disc (`.arrow-disc`).
* **Geometry:** Full pill shape (`border-radius: 999px`), minimum height `48px` to `56px`, asymmetrical internal padding (`padding: 0 8px 0 22px`).
* **Color & Contrast:** Solid High-Visibility Yellow background (`#FFEC01`) with Electric Cobalt Blue text (`#0950F6`).
* **Arrow Disc Element:** Floating circular icon capsule (`34px` to `40px` diameter) anchored to the right edge. Rendered in Electric Cobalt Blue with a crisp white or yellow 2.5px stroke directional arrow that shifts rightward on hover (`transform: translateX(4px)`).
* **Elevation & Dynamics:** Tactile lift (`transform: translateY(-2px)`), radiant yellow glow (`box-shadow: 0 8px 24px rgba(255, 236, 1, 0.32)` expanding to `0 10px 28px rgba(255, 236, 1, 0.45)`).

### 4.4. Hero Stage & Typographic Highlights
* **Hero Canvas (`.hero`):** Immersive, high-energy layout featuring an SVG dashed vector trajectory (`.route-art`) simulating motorcycle dispatch routes through Mar del Plata with glowing node circles (`cx/cy` waypoints).
* **Eyebrow Status Badge (`.eyebrow`):** Compact monospaced pill containing a pulsating green/yellow live operational dot (`.eyebrow-dot`), establishing immediate active status.
* **Headline Pill Highlight (`.headline-pill`):** Integrated within the main headline. Encases key phrases ("Última milla") in a High-Vis Yellow pill capsule with dark blue text, instantly anchoring visual weight.
* **Trust & Proof Badges (`.hero-proof`):** Horizontal flex grouping of verified operational guarantees, accented by micro checkmark pills (`.proof-mark`).

### 4.5. Floating Map Chips & Pulsing Anchors (`.map-chip`, `.pulse-ring`)
* **Visual Anchor (`.hero-art`):** Radial concentric glow rings (`.pulse-ring`) pulsating outward around the central map graphic.
* **Map Chips (`.map-chip`):** Floating frosted-glass cards (`border-radius: 12px`, padding `10px 14px`, `background: rgba(9, 80, 246, 0.85)`, `backdrop-filter: blur(10px)`).
* **Accents:** High-Vis Yellow icon capsules on the left, paired with two-line Geist Mono micro-copy (e.g., **Base Friuli 1972** / Mar del Plata, **Entrega en el día** / En todo MDQ).
* **Elevation:** Hover elevation with smooth spring motion and shadow deepening.

### 4.6. Continuous Marquee Ticker (`.ticker`)
* **Geometry:** Full-width strip running across the base of sections with zero horizontal gutters.
* **Background & Border:** High-contrast ribbon with top and bottom hairline borders (`1px solid rgba(255, 255, 255, 0.18)`).
* **Content:** Infinite seamless dual-track loop (`.ticker-track`) cycling uppercase logistical capabilities (e.g., `MERCADO ENVÍOS FLEX EN EL DÍA · RETIRO BONIFICADO · FLOTA PROPIA EN CALLE`).
* **Typography:** Bold Bebas Neue tracking with glowing star/dot dividers.

### 4.7. Mobile Drawer & Backdrop (`#mobile-nav`, `#mobile-overlay`)
* **Backdrop Overlay (`.mobile-overlay`):** Full-screen scrim (`background: rgba(6, 59, 183, 0.75)`, `backdrop-filter: blur(8px)`) with opacity transition and click-outside dismissal.
* **Drawer Panel (`.mobile-nav`):** Right-anchored sliding sheet (`max-width: 380px`, width `90vw`), solid Cobalt Blue surface, containing keyboard focus trap and clean vertical navigation stack.
* **Close Target:** Generous circular target (`44x44px`) with high-contrast icon.

### 4.8. Structured 4-Tier Footer System (`#optimized-footer`)
* **Tier 0 — Brand Yellow Accent Bar (`.footer-yellow-top-bar`):** A razor-sharp 6px solid High-Visibility Yellow strip spanning the entire top edge of the footer, acting as the brand's unmistakable color signature.
* **Tier 1 — Responsive Conversion Banner (`.footer-banner-cta`):** A high-impact floating card with subtle ambient radial glow (`.ambient-glow-center`), featuring a live operational badge (`.banner-badge-live`), dual-line heading, and instant conversion triggers (Cotizar + WhatsApp Directo).
* **Tier 2 — Information Architecture Grid (`.footer-columns-grid`):** 3-column asymmetric layout:
  1. *Brand & Identity:* Logo lockup, bio copy, squircle social media buttons (`.social-btn` with WhatsApp highlight), and physical hub badge (`.hub-badge-pill` Friuli 1972).
  2. *Services & Platforms:* Multi-column category links with subtle left-inset arrow transitions on hover.
  3. *Operations Stack (`.col-ops`):* Stack of structured info cards (`.ops-info-box`) with rounded yellow icon wells highlighting dispatch hours, physical hub address, and direct telephone lines.
* **Tier 3 — Interactive Scroll-to-Top Anchor (`.btn-scroll-top`):** Centered circular floating button (`46x46px`, `border-radius: 50%`) with chevron icon and yellow hover glow.
* **Tier 4 — Legal & Secondary Bar (`.legal-bar`):** Clean flex row separating copyright notice and inline utility links with subdued contrast.

---

## 5. Layout Principles & Spatial System

### 5.1. Spatial Rhythms & Fluid Spacing
* **Responsive Base Padding:** Fluid clamp unit `--pad: clamp(16px, 4vw, 56px)` applied consistently across headers, section containers, and footer modules.
* **Vertical Section Rhythm:** Generous vertical breathing space (`clamp(64px, 8vw, 120px)`) ensuring fast mobile scanning and visual hierarchy.
* **Component Gap Scale:**
  * Micro (Badges, icon labels): `6px` to `8px`
  * Standard (Form rows, button clusters): `12px` to `16px`
  * Layout (Grid gutters, column separation): `clamp(20px, 3vw, 40px)`

### 5.2. Responsive Grid Breakpoints
* **Mobile Viewport (`< 640px`):** Single column linear stack. Navigation collapses into drawer; hero transforms into stacked column; map art displays at 100% width with floating chips repositioned inline.
* **Tablet Viewport (`640px – 1080px`):** Two-column card grids, collapsed primary nav bar with visible CTA and mobile menu trigger, compact hero grid.
* **Desktop Viewport (`> 1080px`):** Full expanded horizontal navigation, dual-column asymmetric Hero (`55% copy / 45% interactive art`), 3-column footer grid.
* **Wide Desktop (`> 1240px`):** Direct telephone monospaced badge reveals in the site header.

### 5.3. Motion & Micro-interaction Curves
* **Easing Function:** Smooth decelerating cubic bezier (`cubic-bezier(0.23, 1, 0.32, 1)`).
* **Feedback Duration:** Standard interactive response time of `160ms` for color, border, and transform states; `280ms` for header blur transitions; `680ms` for staggered entrance choreography.
* **Accessibility Guarantee:** All motion automatically respects `prefers-reduced-motion: reduce`, disabling GSAP timeline reveals, marquee animations, and pulse rings for sensitive users.
