# Mother’s Recipe — Root-Cause Audit & Repair Brief

Use this document in Antigravity with the existing `Mothers-Recipe` project open. This is a **repair task for the existing repository**, not a request to start over or generate another proposal.

## 1. Target outcome

Improve the current website so it feels like a polished, art-directed brand experience, with reliable product photography, accurate catalogue data, purposeful motion, and a production-ready codebase. Use the actual Mother’s Recipe site as a reference for brand credibility and commerce clarity, and the Priya Foods repo only as a reference for interaction quality. Do not copy either site's exact composition, assets, or code.

Do not stop after writing a plan. Inspect, edit, run, validate, and report actual results.

## 2. Confirmed audit findings

The current repository has these concrete issues:

1. **Product cutout coverage is incomplete.** `public/assets/data/products.json` contains 80 product records and 207 original-image references. All 207 referenced original-image paths currently resolve in the repository, but `public/assets/products/cutouts/` contains only **10** product cutouts. That leaves **70 of the 80 product records without the slug-based cutout file expected by the UI**. The archive and specimen drawer fall back to original product images, so a missing cutout often becomes a flat or non-transparent image rather than the intended isolated product. `BuildYourBite` uses a cutout directly and has no `onError` fallback of its own.
2. **The product cutout script is capped and under-delivers.** `scripts/make_product_cutouts.py` has a priority list but stops selecting targets at 25. Only 10 resulting cutouts are present in the committed asset library. The script logs failures to the console but does not persist a full failure report, so the repository itself does not explain why all intended cutouts were not produced.
3. **Ingredient generation is not reproducible.** `public/assets/ingredients/cutouts/` contains 16 files, while the script advertises 20+. `scripts/make_ingredient_cutouts.py` reads source images from a machine-specific absolute path under `C:\Users\saipa\.gemini\antigravity-ide\brain\...`. That hidden local directory is not part of the repository, so another machine cannot reproduce the pipeline from the repo alone.
4. **Asset validation does not verify runtime references.** `public/assets/data/asset-manifest.json` reports its listed files as valid, but this does not ensure that every `products.json` cutout path exists, that each rendered URL resolves under deployment, or that the displayed image really has transparent pixels. Extend validation to check data references and the browser-facing URL paths, not just files already found.
5. **The source tree is polluted with dependencies and duplicate build output.** The repository commits `node_modules/` (8,566 files, about 122 MB by summed file sizes) and `dist/` (about 41 MB) alongside `public/` (about 41 MB). `dist/` duplicates the source assets that Vite copies from `public/`. There is no root `.gitignore` in the current tree. This does not alone explain visual quality, but it is an avoidable maintenance and deployment failure risk.
6. **GitHub Pages subpath deployment would break with the current paths.** `vite.config.ts` does not define a deployment `base`, while `src/App.tsx` fetches `/assets/data/products.json` from the domain root and source components use absolute `/assets/...` paths. If the site is served at `https://<user>.github.io/Mothers-Recipe/`, those URLs point to `https://<user>.github.io/assets/...` instead of the repository subpath. Confirm the intended deployment target and fix URL construction accordingly. Do not assume the current deployment status without verifying it.
7. **The product data needs reconciliation with the live store.** The local JSON contains 80 products, while the live pickle collection currently reports 37 products. Some difference may be legacy variants or pack sizes, but the UI calls all 80 “official catalogued variants” without explaining the scope. Reconcile the data against the live official collection, identify legacy/unlisted products, and label the archive honestly.
8. **There are unverified brand claims in the copy.** The site currently uses claims such as “Since 1979,” “21-Day Solar Curing Protocol,” “100% Pure,” “80+ Authentic Regional Varieties,” “for over four decades,” and some specific traditional-process descriptions. Do not present these as factual unless an authoritative official source verifies them. Replace fabricated, assumed, or stale claims with sourced statements or clearly editorial language. Keep price and stock data consistent with the latest official product data.
9. **The design is over-labeled and reads like a concept dashboard.** Terms such as “Official Heritage Archive,” “Sensory Specimen Index,” “Specimen №,” “The Alchemy,” “Flavour Laboratory,” “Pairing Code,” “Culinary Rationale,” and many small uppercase/monospace labels appear throughout the experience. There are numerous filter pills, cards, badges, and bordered panels. These elements describe the concept but do not by themselves create premium visual design. Reduce interface noise, clarify content hierarchy, and let photography, composition, typography, and whitespace carry the experience.
10. **The signature interaction is weaker than the concept promise.** The actual implementation mostly uses section-based layouts, hover effects, a mouse tilt, click-to-switch tabs, and a horizontal scroller. The “Pantry to Plate” concept is not implemented as a coherent, scroll-reactive visual sequence. Do not add animation for animation’s sake; implement one intentional signature transition that meaningfully evolves an ingredient still life into a plated meal and featured product, with a reduced-motion fallback.
11. **The experience is not a full ecommerce store.** The current interface links product purchases out to the official store; it does not implement its own cart/checkout. Make the product’s purpose clear: either polish it as a brand-discovery/pitch microsite with honest outbound purchase links, or implement only those commerce features that can be supported without pretending there is an actual checkout integration.

## 3. Mandatory repair workflow

### Phase A — Reproduce and inspect before editing

1. Read `package.json`, `vite.config.ts`, `src/App.tsx`, every component under `src/components/`, `src/data/curatedData.ts`, `src/types.ts`, all asset scripts, the product JSON, and the asset manifest.
2. Install using the existing package manager/lockfile. Run the production build before changes and record the exact output. Do not claim a build passed if it was not run.
3. Run the site and use a browser/preview to inspect the current desktop and mobile experience. Capture screenshots before modifying anything. If a browser is unavailable, state that clearly and do not pretend visual testing happened.
4. Build a reference checker that compares every image URL used by the app against real files in `public/`. It must include image paths embedded in curated data, `products.json`, hero references, fallback sources, logos, editorial backgrounds, and font/resource paths.

### Phase B — Fix asset coverage and correctness

1. Preserve the genuine official source images in `public/assets/products/originals/`; never redraw or AI-generate product packaging or labels.
2. Update `scripts/make_product_cutouts.py` to process **all catalogue products with usable front packshots**, sequentially and with a CPU-safe model where possible. Remove the hard cap of 25. For each product, choose its actual front image from that product’s metadata rather than an arbitrary first file. Never mistake nutrition/gallery panels for the front packshot.
3. Run the cutout pipeline, not just write the script. Check each output at normal size and against both light and dark backgrounds. Verify genuine alpha values (minimum alpha below 255), dimensions, file size, and edge quality. Retain originals when background removal damages glass, text, labels, or pack edges. Record exceptions explicitly.
4. Save a persistent report such as `public/assets/data/cutout-report.json` containing product slug, source file, output file, transparency result, dimensions, result status, and the actual failure message where relevant. Do not quietly treat missing outputs as success.
5. Fix the application’s product image resolution so a valid existing cutout path is used where present. Do not blindly derive a slug path if the manifest already supplies a correct path. Provide a graceful fallback in every location that displays a product—including `BuildYourBite`—and avoid a broken-image icon or broken image URL loop.
6. Make ingredient assets reproducible. Remove the hard-coded Antigravity brain directory. Put source props within the repo or document a reproducible, permitted source. Keep every ingredient prop as a separate transparent file; do not flatten multiple props into one collage and pretend they can animate independently. Target **20–32 genuinely distinct usable props** if source or generation tools can produce that quality. If unavailable, report the actual number instead of claiming success.
7. Keep the eight editorial images if they pass visual review; replace weak or mismatched images with coherent, original generic food/editorial photography. Do not create fake branded jars. Optimize editorial images to responsive sizes and modern formats where appropriate without visibly degrading detail.
8. Generate a contact sheet for product cutouts, ingredient props, originals, and editorial images. Update the JSON/CSV manifest with true dimensions, actual alpha transparency, source/provenance, and current validity. Make the validator fail when app-referenced assets are missing.

### Phase C — Art-direction repair

Treat the following as design requirements, not suggestions:

1. **Simplify the hero.** Use one decisive headline, one concise explanation, one primary action, and one secondary action at most. The featured packshot and still-life composition must be the visual anchor. Remove stacked badges and unnecessary technical metadata from the first viewport.
2. **Create stronger art direction.** Use a coherent, photo-led material language: warm paper, deep botanical green, restrained chilli red, mustard accents, and natural food textures. Do not apply grain to every section or wrap every item in a rounded card. Vary composition intentionally between quiet space, editorial full-bleed image, close-up ingredient details, and product-focused layouts.
3. **Reduce labels and UI chrome.** Retain filters and metadata only where they help a real user. Remove decorative serial numbers, redundant badges, pseudo-scientific phrases, repeated borders, and unnecessary pill controls. Use a clear type scale and generous whitespace. Product labels and product photographs must be legible at normal viewport sizes.
4. **Make one signature interaction truly excellent.** Implement the “Pantry to Plate” transition as a purposeful staged scroll sequence: a few separate transparent ingredients establish the scene; the genuine packshot joins them; the composition transitions into an editorial serving scene. Keep it lightweight, responsive, and interruptible. On phones, provide a simplified non-pinned sequence. Under `prefers-reduced-motion: reduce`, skip parallax/pinning and show the complete static scene.
5. **Keep product discovery practical.** Use an attractive but usable catalogue with accurate names, pack size, price, availability, search, category/region filters, and clear actions. Do not force users through a long cinematic animation just to find products. Distinguish out-of-stock items. Use outbound official-store links unless a real store/cart integration has actually been built.
6. **Keep the flavour finder honest and useful.** The current spice level is guessed from product-title substrings in `src/App.tsx`; do not present this as verified data. Replace it with verified labels or clearly identified editorial estimates, and allow unknown values. Make the pairing control give useful results rather than verbose AI-style “scientific” rationale.
7. **Use accurate content.** Remove or source-check every quantitative or manufacturing claim. Prefer verifiable official brand story, real catalogue data, and concise copy. Do not claim the brand was founded in 1979 or that every product follows a 21-day curing protocol unless the official brand specifically substantiates it.
8. **Match brand reality while remaining original.** The official brand sells much more than pickles. For a pickle-focused concept, explain that this is a focused experience rather than implying it is the company’s entire official catalogue. Preserve the real logo only where permitted and do not imply official endorsement.

### Phase D — Engineering/deployment hygiene

1. Add `.gitignore` entries for `node_modules/`, `dist/`, `.vite/`, logs, OS noise, Python caches, local brain folders, and secrets. Untrack generated dependency folders and duplicated `dist/` assets from git history going forward (`git rm -r --cached node_modules dist` where appropriate); do not delete the user’s working local copies accidentally.
2. Add a concise `README.md` with install, dev, build, preview, asset-processing, and deployment instructions.
3. Confirm the actual deployment target. For GitHub Pages project hosting, set the correct Vite `base` and route every application asset/data path through one base-aware helper. For root-hosted deployments, keep root-relative assets only if that is the intended target. Do not mix root-relative URLs and project-subpath URLs.
4. Keep a single canonical asset source under `public/assets/`. Do not manually check in the entire `dist/` output unless the deployment configuration explicitly requires it; if it does, document why and automate its build.
5. Avoid unnecessary dependencies or paid APIs. Reuse the current React + Vite + TypeScript stack unless a specific, measured need justifies change. Keep background removal sequential and mindful of an 8 GB RAM machine.

### Phase E — Visual and functional QA

Check and fix issues rather than just recording them:

- Desktop at 1440×900 and 1280×800.
- Tablet around 768×1024.
- Phone at 390×844 and 360×800.
- First viewport communicates the concept within seconds and features real, clean imagery.
- No image 404s, broken URLs, white rectangular backgrounds accidentally presented as transparent, clipped pack labels, strange cutout edges, overflowing text, horizontal page overflow, or layout shifts.
- Product search/filter/sort/view switching work and show correct result counts.
- Region/spice controls have honest underlying data and useful empty states.
- Product modal/gallery opens and closes; Escape and keyboard navigation work; body scroll is restored on close.
- No console errors or React key warnings.
- The app builds and runs from a clean install.
- Reduced-motion mode and touch interactions remain usable.
- Compare before/after screenshots and do at least one correction pass after inspecting the browser output.

## 4. Completion report — required

At the end, provide:

1. Root causes fixed, linked to the changed files.
2. Exact build/test commands run and real pass/fail results.
3. Actual counts: catalogue records verified, original product images, product cutouts, ingredient cutouts, editorial images, and failed/exception assets.
4. Contact-sheet paths and manifest paths.
5. Before/after screenshots or a clear statement that screenshot/browser verification was unavailable.
6. Deployment target and any path-prefix fixes made.
7. Remaining limitations stated honestly.

**Do not claim “100% complete,” “all assets valid,” “all cutouts generated,” or “WCAG compliant” unless the relevant checks actually prove it.**
