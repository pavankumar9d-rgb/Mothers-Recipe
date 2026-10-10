# DESIGN DECISIONS — Mother’s Recipe

## 1. Creative Direction & Core Concept
**“The Living Pantry — Find Your Flavour, Build Your Bite”**

Rather than creating another static e-commerce catalogue or replicating the circular orbit and red arch of Priya Foods, this experience is designed as an interactive culinary journey through India's regional pickling heritage. It brings the visceral, sensorial craft of Mother’s Recipe pickles into an editorial, tactile, high-craft web space.

---

## 2. Uniqueness Test & Direct Differentiation from Priya Foods

### What can a visitor do on this site that is more meaningful than simply scrolling a product catalogue?
- **“Build Your Bite” Interactive Flavour Laboratory:** Visitors do not just browse product photos; they choose their meal base (Steamed Rice & Ghee, Crisp Laccha Paratha, Soft Idli & Dosa, Comforting Dal Khichdi, or Savoury Snack/Mathri) and their desired palate profile (Fiery & Pungent, Sun-Cured Sweet & Tangy, Aromatic Roasted Garlic, or Earthy Mustard Oil). The interface computes and recommends authentic Mother's Recipe pairings with an editorial culinary rationale.
- **Flavour Specimen Drawer (Horizontal Sensory Selector):** A specimen drawer allowing users to filter by regional heritage (Andhra, Punjab, Gujarat, South India) and spice intensity with keyboard, mouse-drag, and direct controls.
- **Genuine Product Transparency:** Every packshot cutout is extracted from official Mother's Recipe catalogue photography with zero fabricated packaging or imaginary claims.

### Which visual or motion moment is unique to this concept and clearly different from Priya?
- **No Priya Red Arch / Mound:** Priya features a prominent red curved mound and rotating circular orbit of floating jars. Mother's Recipe uses a **tactile dual-panel architectural layout** with an asymmetrical hero, textured linen/paper grain backdrop, and an editorial specimen drawer.
- **Layered Still Life Deconstruction:** Ingredient props (whole raw mangoes, cut wedges, dried red chillies, mustard seeds, garlic bulbs, brass spoon) are art-directed around genuine packshots with subtle scroll-linked depth and micro-animations, moving from raw ingredients to an assembled meal table (“Pantry to Plate”).
- **Interactive Pairing Plate:** In the “Build Your Bite” section, selecting meal combinations live-updates a culinary canvas displaying the authentic jar cutout alongside a curated meal plate.

### What makes the experience specifically useful for discovering Mother’s Recipe products, without inventing brand claims?
- Direct mapping to the **80 genuine Mother's Recipe pickle variants** indexed from the official store.
- Displays verified pack sizes (e.g. 200g glass jar, 400g pet jar, 500g pouch, 5kg catering), authentic pricing in INR, and genuine ingredient profiles.
- Direct links to the official Mother's Recipe product pages for seamless purchasing.

### Which pages, transitions, compositions, and interactions are intentionally NOT taken from Priya?
1. **No 3D Three.js rotating orbit:** Replaced by butter-smooth 60fps CSS/Web-Animation layered motion and a tactile horizontal specimen carousel.
2. **No single monochromatic red background:** Replaced by a rich editorial palette (Warm Raw Ivory, Botanical Leaf Green, Guntur Red, Toasted Mustard Yellow, and Dark Charcoal Slate).
3. **Pantry Archive Modal with Full Gallery:** Clicking any product card opens a dedicated slide-over / modal displaying all downloaded official gallery views (nutrition labels, barcode, back panels, texture shots) instead of a simple 1-image card.

---

## 3. Design System & Tokens

### Color Palette
- **Warm Ivory / Paper Ground:** `#FAF7F2` (Primary Background)
- **Antique Parchment:** `#F3EDE2` (Secondary Surface)
- **Card / Panel Surface:** `#FFFFFF`
- **Deep Botanical Forest:** `#1A3026` (Hero Accents & Headers)
- **Guntur Spice Red:** `#B82E1E` (Brand Accent & Buttons)
- **Toasted Mustard Gold:** `#D4972C` (Highlights & Badges)
- **Deep Earth / Charcoal Ink:** `#1C1917` (High-contrast typography)
- **Muted Stone:** `#78716C` (Secondary typography & borders)

### Typography Hierarchy
- **Display Serif:** Cormorant Garamond / Playfair Display (`font-serif`) — Timeless culinary prestige, editorial poise.
- **Body & UI Sans:** Plus Jakarta Sans / Inter (`font-sans`) — Crisp readability, clean metrics, accessible contrast.
- **Monospace Metadata:** JetBrains Mono / Space Mono (`font-mono`) — For weight specs, batch numbers, catalog indexing tags.

### Grid & Layout
- 12-column responsive grid with fluid margins (`max-w-7xl`).
- High scale contrast between hero packshots (400–600px tall) and editorial headers.
- Controlled whitespace giving breathing room around product silhouettes.

---

## 4. Homepage Section Architecture

1. **Header & Brand Navigation:**
   - Official Mother's Recipe vector SVG logo.
   - Live Spice Meter filter, Regional Quick-nav, and Catalog Search drawer.
2. **Hero — The Living Pantry:**
   - Asymmetric split layout with large authentic Andhra Avakaya / Punjabi Mango jar cutout.
   - Independently drifting ingredient cutouts (raw mango slices, Guntur chillies, mustard seeds).
   - Editorial headline, brand tagline, and primary CTA to "Build Your Bite".
3. **The Flavour Specimen Drawer (Interactive Product Showcase):**
   - Interactive carousel of genuine cutouts with regional filter tabs (All, Andhra, Punjab, Gujarat, South).
   - Detailed product view with verified pack size, price, spice rating, and official purchase link.
4. **Signature Experience: “Build Your Bite” Flavour Laboratory:**
   - Step 1: Select Meal Context (Rice & Ghee, Laccha Paratha, Idli & Dosa, Dal Khichdi, Snacks).
   - Step 2: Select Flavour Intensity (Fiery Hot, Tangy & Sour, Aromatic Garlic, Sweet & Spicy).
   - Real-time recommendation displaying matching Mother's Recipe jar + editorial serving photo + taste notes.
5. **The Alchemy of Achaar (Pantry to Plate Storytelling):**
   - Interactive 4-step craft story: Sun-Curing (Barni Jars), Cold-Pressed Mustard Oil, Hand-Selected Whole Spices, and The Maturation Ritual.
   - Macro spice photography and layered ingredient props.
6. **The Grand Pantry Archive (Complete Product Directory):**
   - Responsive grid of 24+ genuine Mother's Recipe pickles from `products.json`.
   - Live search input, category filters (Mango, Chilli, Garlic, Lime, Mixed, Tomato).
   - Interactive Quick-View modal showing all official gallery shots and official store link.
7. **Culinary Rituals & Editorial Feast:**
   - Editorial gallery showcasing authentic Indian dining tables, traditional thalis, and festive gatherings.
8. **Brand Heritage & Master Footer:**
   - Official logos, verified DFPL manufacturer info, genuine site links, and compliance note.

---

## 5. Motion & Accessibility Principles
- **60fps Fluidity:** Transform and opacity hardware-accelerated animations.
- **Reduced Motion Support:** `@media (prefers-reduced-motion: reduce)` disables parallax and floating drift while keeping all transitions instant and functional.
- **Keyboard Navigation:** Full Tab, Enter, Space, and Arrow-key accessibility across carousels, tabs, and modals.
- **WCAG AA Compliance:** High-contrast text on all surfaces, semantic HTML5 landmarks, descriptive alt tags.
