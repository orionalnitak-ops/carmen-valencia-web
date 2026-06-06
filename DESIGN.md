# Design System: Clínica Dental Valencia

## 1. Visual Theme & Atmosphere

A restrained, gallery-airy clinical interface built on 80% white with precise green accents. The atmosphere is professional and trustworthy without feeling cold — like a well-lit, recently renovated consultation room. Generous whitespace lets real photography breathe. Typography alternates between an editorial serif for display and a precise sans-serif for body, signaling both authority and approachability.

- **Density:** 4/10 — Art Gallery Airy. Spacious sections, breathing room, never cluttered
- **Variance:** 5/10 — Offset Asymmetric. Split grids, left-aligned hero, stats column on the right
- **Motion:** 5/10 — Fluid CSS. Scroll reveals, hover micro-interactions, stat counters. No cinematic choreography

The brand emotion is: *"The clinic that earns your trust before you open your mouth."*

---

## 2. Color Palette & Roles

- **Canvas White** (`#FFFFFF`) — Primary background. 80% of all visible surface area. Hero, Nav, Services, Contact
- **Mist Surface** (`#F6F8F2`) — Secondary background for the Nosotros section. Barely perceptible warmth off white
- **Charcoal Ink** (`#1C1C1C`) — Primary text, Gallery section background, Footer background. Never used in hero or content sections as a fill
- **Muted Steel** (`#555555`) — Secondary text, body paragraphs, card descriptions, nav links at rest
- **Dental Green** (`#78BE20`) — Single accent. CTAs, label text, dots, hover states, focus rings, active borders, CTA strip background. Saturation ~68% — vibrant but not neon
- **Green Botanical Dark** (`#5A9118`) — Pressed/active state for green CTAs. Button depth on click
- **Green Whisper** (`#EBF5D6`) — Icon fill backgrounds, feature highlights, tag pills, subtle hover fills
- **Warm Maroon** (`#2B1A0F`) — Extremely restricted. Doctor name in italic text only. Footer brand name. **Never as a section background**
- **Whisper Border** (`rgba(226, 232, 240, 0.5)`) — 1px structural card borders, section dividers
- **Section Divider Line** — `linear-gradient(to right, #78BE20, #EBF5D6, transparent)` — editorial separator between hero headline and lower CTA zone

---

## 3. Typography Rules

- **Display / Headlines:** `Playfair Display` — Weights 400, 600, 700. Track-tight (`letter-spacing: -0.01em`). Hierarchy through weight, not excessive size. `clamp(2.8rem, 5vw, 4rem)` for H1 hero, `clamp(1.8rem, 3.2vw, 2.6rem)` for section H2, `1.15rem` for card H3
- **Body / Interface:** `Inter` — Weights 300, 400, 500, 600. Used for all UI text, labels, buttons, nav. Clinical precision is intentional for healthcare context. Relaxed leading (`line-height: 1.65`). Max 65ch line width on body paragraphs. `0.92rem` standard body size
- **Labels / Eyebrows:** `Inter` — `0.72rem`, weight 700, uppercase, `letter-spacing: 0.12em`, color Dental Green. Always paired with a line extending via `::after` pseudo-element
- **Doctor Name:** `Inter` — `0.9rem`, weight 400, `font-style: italic`, `opacity: 0.55`, color Warm Maroon (`#2B1A0F`)
- **Banned:** Generic serif fonts (Times New Roman, Georgia, Garamond). No decorative display faces. No system UI stacks. No emoji substitutes for icons — use SVG inline

---

## 4. Hero Section

Left-aligned layout, never centered. Structure from top to bottom:

1. **Eyebrow Label** — `CLÍNICA DENTAL · AGUILAR DE LA FRONTERA · CÓRDOBA` in Dental Green, uppercase Inter 0.72rem. A gradient line (`#78BE20` → transparent) extends to the right via `::after`
2. **H1 Headline** — Playfair Display 700, Charcoal Ink. One key word/phrase wrapped in `<em>` styled with Dental Green (not italic). Line-height 1.0
3. **Editorial Divider** — Full-width 1px gradient line separating headline from lower zone
4. **Lower Zone** (flex `space-between`):
   - **Left:** Doctor name (italic Warm Maroon) + CTA buttons: primary green pill + WhatsApp outline pill
   - **Right:** 3 vertical stats — large Charcoal Ink number + small Muted Steel label (`+15 / Años exp.`, `2019 / Renovada`, `6 / Servicios`)

No background images in the hero. No overlapping elements. No decorative gradients. No scroll arrows.

---

## 5. Component Stylings

**Buttons**
- Primary: `background: #78BE20`, `color: #fff`, `border-radius: 50px`, `padding: 13px 28px`, `font-weight: 600`, `font-size: 0.9rem`. Active: `background: #5A9118`, `translateY(-2px)`. No outer glow ever
- Secondary / Outline: `border: 1.5px solid currentColor`, transparent fill, pill shape. Hover: subtle background tint
- WhatsApp: `background: #25D366`, `color: #fff`, pill, SVG icon inline

**Cards (Services)**
- `background: #fff`, `border: 1px solid #eee`, `border-radius: 10px`, `padding: 28px 22px`
- Green dot (10px circle, Dental Green) replaces any icon — simpler, more editorial
- `::after` pseudo — 3px green bottom border, `scaleX(0)` at rest → `scaleX(1)` on hover, `300ms ease`
- Hover: `translateY(-4px)`, `box-shadow: 0 8px 24px rgba(0,0,0,0.08)`, `transition: 0.25s ease`
- No floating shadows at rest

**Navigation (Fixed)**
- `background: #fff`, `border-bottom: 1px solid #f0f0f0`, `height: 88px`
- Scrolled state: adds `box-shadow: 0 1px 20px rgba(0,0,0,0.08)`, removes border. `transition: 0.3s ease`
- Logo: circular photo (72px, `border-radius: 50%`, `border: 2.5px solid #2B1A0F`) + Playfair brand name + green location label
- CTA button: Dental Green pill, right side
- Mobile: links hidden, burger menu visible

**Gallery Grid**
- 4-column grid, `gap: 6px`, on dark (`#1C1C1C`) background
- Images: `border-radius: 8px`, `overflow: hidden`. Hover: `scale(1.04)`, `transition: 0.4s ease`
- Instagram Highlights row above grid: circular thumbnails with green gradient ring (`border: 2px solid #78BE20`)

**Instagram Story Rings** — `background: linear-gradient(135deg, #78BE20, #EBF5D6)`

**Loaders:** Skeletal shimmer matching section dimensions. No circular spinners

**Empty States:** Composed placeholder with brand colors — not plain "No hay datos" text

---

## 6. Layout Principles

- Max-width `1400px` centered, `padding: 0 5%`
- Hero: `padding: 120px 5% 80px`, left-aligned, never centered
- Nosotros: CSS Grid `5fr 6fr`, vertical separator `1px solid #eee`, no gap at the divide
- Services: CSS Grid, 3 columns → 2 → 1. `gap: 20px`. Never equal-height forced
- Gallery: CSS Grid 4 columns, `gap: 6px`. No Flexbox percentage math
- CTA Strip: Flexbox `space-between`, full-width green band
- Full-height sections: `min-h-[100dvh]` — never `height: 100vh` (iOS Safari catastrophe)
- Section vertical padding: `clamp(80px, 10vw, 120px)` scaled proportionally

**Banned layouts:**
- 3 equal card columns for any asymmetric content zone
- Centered hero when variance exceeds 4
- Absolute-positioned elements stacking over other elements
- Horizontal scroll on any viewport

---

## 7. Responsive Rules

| Breakpoint | Changes |
|---|---|
| `≤ 900px` | Nav: hide links + phone, show burger. Hero: H1 scales to clamp minimum, stats in compact horizontal row. Services: 2 columns. Nosotros: 1 column (photo stacks above text). CTA Strip: column, centered |
| `≤ 600px` | Services: 1 column. Gallery: 2 columns. Hero: minimum clamp size. Footer: single column centered. All padding reduces |

- Typography scales via `clamp()` — no fixed breakpoint font jumps
- Body text minimum `1rem` / `14px` on all viewports
- All interactive elements minimum `44px` tap target
- No horizontal overflow at any width from 375px up

---

## 8. Motion & Interaction

- **Scroll Reveals:** IntersectionObserver native (no GSAP, no AOS). `opacity 0→1` + `translateY 20px→0`, `600ms ease-out`. Max 30px movement. Max 600ms duration
- **Staggered Cards:** Services cards enter with delays `0 / 80 / 160 / 240 / 320 / 400ms` — waterfall cascade
- **Stat Counter:** H1 zone stats animate from `0` → value in `1200ms easeOut` on page load. The year `2019` enters with fade, not counting
- **Nav Shadow:** Appears smoothly at scroll > 10px, `300ms ease`
- **Hover Micro-interactions:** Buttons `translateY(-2px)` in `150ms ease`. Cards `translateY(-4px)` in `250ms ease`. Gallery images `scale(1.04)` in `400ms ease`
- **Performance rule:** Animate only `transform` and `opacity`. Never animate `top`, `left`, `width`, `height`, `background`, or `color` properties directly

No infinite looping animations on this project — the clinical context favors stillness at rest.

---

## 9. Anti-Patterns (Banned)

**Visual:**
- No emojis anywhere — SVG inline only for icons
- No pure black (`#000000`) — use Charcoal Ink (`#1C1C1C`)
- No neon outer glows or colored box-shadows
- No gradient text on large headings
- No radial gradient "glow" effects in the hero
- No `backdrop-filter` blur on the nav
- No oversaturated accents — Dental Green must stay below 70% saturation

**Layout:**
- No overlapping elements — every element occupies its own clean spatial zone
- No centered hero layout — force left-aligned or split-screen
- No 3-equal-column card layouts for asymmetric content
- No `height: 100vh` — use `min-height: 100dvh`
- No horizontal scroll on any viewport
- No `calc()` percentage hacks — use CSS Grid

**Typography:**
- No `Times New Roman`, `Georgia`, or `Garamond`
- No `font-style: italic` on anything except the doctor's name
- No uppercase body text (labels only)
- No text opacity below 0.5 for readable content
- No AI copywriting clichés: "Innovación", "Soluciones integrales", "Potencia tu sonrisa", "Next-Gen dental"

**Content:**
- No placeholder names ("Paciente satisfecho", "Juan García")
- No fake round statistics ("100% satisfacción", "50+ tratamientos")
- No stock photo URLs (Unsplash, Lorem Picsum) — use only local `assets/instagram/` images
- No filler text: "Scroll para explorar", bouncing scroll arrows, chevron icons
- No Warm Maroon (`#2B1A0F`) as any section background — text only

**Motion:**
- No animations longer than 600ms (stat counter exception: 1200ms)
- No bounce or spring easing — `ease-out` only
- No elements moving more than 30px
- No pulsing, blinking, or looping animations on clinical content
- No external animation libraries (no GSAP, no AOS, no Framer Motion)
