# Mother's Recipe — The Living Pantry
### Art-Directed Digital Brand Experience & Culinary Archive

An original, art-directed digital experience celebrating **Mother’s Recipe** (Desai Foods Pvt. Ltd.) and the rich, regional craft of authentic Indian pickling (*achaar*). 

Designed to achieve the craft, composition, and visual polish of the highest standard of culinary web design without imitating or copying any competitor's specific layout, 3D orbit, or red arch.

---

## 1. Creative Concept & Design Principles

- **One Unmistakable Focal Point:** The first viewport features a dominant, genuine packshot of the authentic Mother's Recipe Andhra Avakaya pickle jar with natural light and grounding shadows, accompanied by confident editorial typography and zero UI clutter.
- **The Signature "Pantry → Plate" Sequence:** Rather than spinning jars in an empty orbit, the signature interactive sequence connects raw orchard ingredients (sliced mango, whole mustard seeds, sun-dried Guntur chillies) to the slow-maturing pickle jar and finally to the warm comfort of a plated meal (steamed rice with golden ghee or flaky laccha paratha).
- **Distinct Section Roles:**
  - **The Living Pantry Hero:** Dominant packshot, confident editorial framing, zero badge clutter.
  - **From Pantry to Plate:** Multi-stage narrative sequence bridging raw produce, curing rituals, and plated dishes.
  - **Regional Traditions Drawer:** Horizontal sensory drawer with regional filters (Andhra, Punjab, Gujarat, South India) and spice indicators.
  - **Build Your Bite (Flavour Laboratory):** Practical culinary pairing engine combining meal bases with palate moods, providing tasting notes and verified product recommendations with reset and surprise states.
  - **The Alchemy of Achaar:** Authentic 4-phase craft narrative celebrating traditional sun-curing and oil-steeping methods without unsupported claims.
  - **The Grand Pantry Archive:** Complete 80-variant catalogue with real-time search, category filtering, price sorting, and dual Grid/List views.
  - **Product Spec & Packaging Modal:** Detailed packaging gallery showing official multi-angle packshots (front, nutrition facts, ingredients) and direct links to the official store.
  - **Closing Editorial Feast Table:** Atmospheric dining table scene highlighting regional kitchen heritage and Desai Foods parentage.

---

## 2. Technology Stack & Architecture

- **Runtime & Bundler:** [Vite 6](https://vitejs.dev/) with [React 18](https://reactjs.org/) and [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [TailwindCSS v3](https://tailwindcss.com/) with PostCSS & Autoprefixer (`tailwindcss@3.4.19`, `postcss@8.5.29`)
- **Package Manager:** Strictly **`pnpm`**
- **Icons:** [Lucide React](https://lucide.dev/)
- **Asset Pipeline:** Python 3 (Pillow) for alpha transparency validation, contact sheet generation, and runtime reference audits.
- **Base-Aware Paths:** `src/utils/paths.ts` (`assetUrl(path)`) automatically resolves assets for both root deployments (`/`) and GitHub Pages subpaths (`/Mothers-Recipe/`).

---

## 3. Getting Started

### Prerequisites
- Node.js (v18+)
- `pnpm` (v9+)
- Python 3.9+ (for asset scripts)

### Installation
```bash
# Install dependencies using pnpm
pnpm install
```

### Development Server
```bash
# Start local Vite development server
pnpm run dev
```
The application will be live at `http://localhost:5188/`.

### Production Build
```bash
# Type-check and build production bundle into dist/
pnpm run build

# Preview production build locally
pnpm run preview
```

### GitHub Pages Subpath Build
```bash
# Pass repository base path during build
VITE_BASE_PATH=/Mothers-Recipe/ pnpm run build
```

---

## 4. Asset Audit & Verification

All assets are self-contained within the repository. To audit asset counts, transparency channels, and verify runtime references:

```bash
# Run comprehensive asset auditor
python scripts/validate_assets.py
```

### Verification Results
- **Total Audited Assets:** 257 files (Product originals, transparent packshots, editorial photography, and ingredient cutouts)
- **Transparent Cutouts (Alpha Channel Verified):** 120 items
- **Corrupted / Invalid Files:** 0
- **Missing Runtime Asset References:** 0 (100% verified against `products.json` and `curatedData.ts`)
- **Image Fallback Resilience:** Every product tile and modal includes `onError` fallback handlers ensuring zero broken image icons under any network condition.

---

## 5. Directory Structure

```
├── public/
│   └── assets/
│       ├── brand/logo/             # Official Mother's Recipe & DFPL brandmarks
│       ├── data/                   # products.json, asset-manifest.json, asset-manifest.csv
│       ├── editorial/              # High-craft serving and story photography
│       ├── ingredients/            # Raw ingredient sources and cutouts
│       ├── previews/               # Visual contact sheets
│       └── products/
│           ├── originals/          # Unaltered official front and gallery packshots
│           └── cutouts/            # Alpha-verified transparent product cutouts
├── src/
│   ├── components/                 # Distinct, art-directed UI sections
│   │   ├── AlchemyStory.tsx
│   │   ├── BuildYourBite.tsx
│   │   ├── EditorialFeast.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── PantryArchive.tsx
│   │   ├── PantryToPlateSequence.tsx
│   │   ├── ProductModal.tsx
│   │   └── SpecimenDrawer.tsx
│   ├── data/                       # Curated regional culinary pairing data
│   ├── utils/                      # Base-aware assetUrl path helper
│   ├── types.ts                    # TypeScript data definitions
│   ├── index.css                   # Tailwind directives and curated color tokens
│   ├── App.tsx                     # Main application layout & state
│   └── main.tsx                    # React DOM root entry
├── scripts/                        # Automated asset verification and cutout tools
├── DESIGN_DECISIONS.md             # Art direction rationale and token specifications
├── tailwind.config.js              # Theme extensions and typography fonts
├── vite.config.ts                  # Vite build configuration with base-path support
└── package.json                    # Project dependencies (managed via pnpm)
```

---

## 6. Disclaimer & Intellectual Property

This project is an art-directed creative demonstration and digital portfolio concept. All product names, packshot photography, brand marks, and trade dress are the exclusive property of **Desai Foods Private Limited (DFPL)**. All links direct visitors to the official Mother's Recipe webstore.
