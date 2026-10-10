# DESIGN DECISIONS — Mother’s Recipe

## 1. Creative Concept
**“The Living Pantry — From Raw Craft to Finished Plate”**

An art-directed, product-led culinary digital experience for Mother’s Recipe. Rather than an e-commerce catalogue grid or a 3D orbit clone of Priya Foods, this experience presents authentic regional Indian pickling heritage through considered photography, confident typography, and a signature **Pantry → Plate** visual transition.

---

## 2. Differentiation from Reference (Priya Foods)
- **No Priya Red Arch or Circular Orbit:** Priya uses a monochromatic red curved arch and a rotating 3D Three.js jar orbit. Mother's Recipe uses an architectural, editorial layout grounded in warm paper ground, botanical leaf green, and natural spice tones.
- **Pantry to Plate Transformation:** Instead of spinning jars in empty space, the core interaction connects raw ingredients (mango slices, whole mustard seeds, Guntur chillies, brass spoon) with the authentic jar and resolves into a plated meal (steamed rice with ghee or blistered laccha paratha).
- **Substantive Product Transparency:** Directly displays 80 genuine Mother's Recipe pickle variants with verified weights, prices in ₹, and official product links, with zero fabricated packaging or imaginary claims.

---

## 3. Design System & Tokens

### Palette
- **Warm Ivory / Paper Ground:** `#FAF7F2` (Primary canvas)
- **Antique Parchment:** `#F3EDE2` (Secondary surface)
- **Card Surface:** `#FFFFFF`
- **Deep Botanical Forest:** `#1A3026` (Hero accents & headings)
- **Guntur Spice Red:** `#B82E1E` (Brand accent & primary CTA)
- **Toasted Mustard Gold:** `#D4972C` (Warm highlights)
- **Deep Charcoal Slate:** `#1C1917` (High-contrast typography)
- **Muted Stone:** `#78716C` (Secondary typography & borders)

### Typography
- **Display Serif:** Cormorant Garamond (`font-serif`) — Timeless culinary poise.
- **Body & UI Sans:** Plus Jakarta Sans (`font-sans`) — Crisp readability and accessible contrast.
- **Monospace Accent:** JetBrains Mono (`font-mono`) — Weight specs, catalogue tags.

### Negative Space & Layout
- Generous whitespace around hero packshots (360–460px tall).
- Eliminates decorative UI clutter (no pseudo-scientific serial numbers, no redundant badge stacks).
- Coherent vertical pacing between discovery, interactive pairing, craft storytelling, and catalogue archive.

---

## 4. Key Sections & Narrative Flow
1. **Header:** Constrained brandmark, concise navigation, search trigger, official store link.
2. **Hero:** One unmistakable focal point featuring authentic Andhra Avakaya / Punjabi Mango packshot, confident headline, minimal supporting copy.
3. **Pantry → Plate Sequence:** Interactive staged sequence showing raw ingredients transitioning to jar curing and plated serving.
4. **Regional Specimen Drawer:** Horizontal sensory exploration with regional filter pills (Andhra, Punjab, Gujarat, South India).
5. **Build Your Bite:** Tactical flavour laboratory pairing 5 meal bases with 4 palate directions to compute authentic Mother's Recipe recommendations with honest culinary notes.
6. **The Pickling Craft:** 4-stage heritage storytelling (Orchard Harvest, Whole Spice Toasting, Cold-Pressed Oils, Ceramic Barni Maturation).
7. **The Grand Pantry Archive:** Complete 80-variant directory with live search, category filters, and grid/list modes.
8. **Product Spec Modal:** Multi-angle packaging gallery (nutrition, back label, FSSAI) with official store outbound link.
9. **Footer:** Verified DFPL manufacturer information and honest concept transparency notice.

---

## 5. Motion & Accessibility
- **CSS Transitions:** Hardware-accelerated transforms and opacity.
- **Reduced Motion Support:** `@media (prefers-reduced-motion: reduce)` disables animations and presents complete static scenes cleanly.
- **Keyboard Access:** Tab, Enter, Space, and Escape key navigation across all drawers, tabs, and modals.
- **Image Fallbacks:** `onError` handlers prevent any broken-image icons across all product and dish visuals.
