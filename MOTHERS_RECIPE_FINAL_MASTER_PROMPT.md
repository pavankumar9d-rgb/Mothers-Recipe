# MASTER PROMPT — Mother’s Recipe Immersive Brand Website + Complete Asset Library

> **How to use:** Open the existing website project in your AI coding agent (Antigravity or another agent), paste the entire prompt below, and let it inspect the repository before editing. The task is not complete until the website is implemented, assets are downloaded/created and organized, and the acceptance checks pass.

---

## BEGIN PROMPT

You are acting as a **senior digital art director, frontend creative developer, motion designer, product-photography asset librarian, and QA engineer** working together. I want you to build a high-end, immersive website concept for **Mother’s Recipe**, as if preparing a serious creative pitch for the brand.

This must be a real, functioning implementation—not a moodboard, plan, screenshot, or four-image mockup. You are responsible for both the **website** and the **complete, locally organized visual asset library** needed by the website.

## 1. Objective and definition of done

Build an original, premium food-brand experience that feels art-directed by a top digital studio. It should be visually memorable, product-led, smooth, editorial, tactile, responsive, and technically sound.

The work is complete only when all of the following exist in the project:

1. A fully implemented and running website, not just a written design proposal.
2. A substantial `public/assets/` library with real product images, transparent product cutouts, ingredient cutouts, editorial photography, brand assets, and useful supporting files.
3. All displayed product packshots sourced from genuine Mother’s Recipe product pages or explicitly identified as non-branded concept imagery. **Never invent a Mother’s Recipe package, label, logo, product name, claim, or product photograph.**
4. Transparent PNG/WebP cutouts with a genuine alpha channel for products and individual ingredient props wherever needed for layered motion.
5. A manifest documenting each asset’s filename, source URL, asset category, usage, dimensions, transparency status, and any relevant attribution/rights notes.
6. A contact sheet/preview of the assets, plus an asset-readme that explains the folder structure and any gaps.
7. Responsive behavior, working interactions, keyboard accessibility, reduced-motion support, and verified build/runtime checks.

Do not stop after creating folders, a download script, a design plan, or placeholders. **Run the scripts, obtain the files, inspect the results, wire the real local files into the website, and report what genuinely succeeded.**

## 2. Reference website: reverse-engineer quality, not the design

Reference repository:
`https://github.com/gireeshkumarreddy/Priya.git`

Reference site/brand information:
`https://www.priyafoods.com/`

Inspect the repository, especially its README, public assets, component organization, product image handling, and interaction implementation. Use it to understand the level of finish and production discipline expected. Reference qualities worth studying include:

- Product photography treated as the hero visual—not generic card thumbnails.
- A product-selection interaction controlled by scroll, pointer/touch drag, keyboard, and explicit controls.
- A clear transition from product discovery into a focused product story.
- Editorial food imagery, related-product discovery, considered typography, and a strong visual ending.
- Natural-looking product scale, tilt, lighting, spacing, and motion timing.
- Responsive behavior, visible keyboard focus, alt text, and support for reduced motion.
- Honest handling of missing product angles rather than fabricated rear labels or pretend 360-degree views.

**Do not copy or port the reference website.** Do not reproduce its exact layout, section order, title copy, red curved mound, jar orbit, product positioning, fonts, transitions, illustrations, photographs, source code, logo, or visual composition. Do not copy its assets into the Mother’s Recipe project. Do not make a near-identical recreation with only the brand name changed.

Treat the reference only as a benchmark for craft: interaction depth, image fidelity, responsive implementation, detail, and polish. Make a new concept with a different composition, design system, story, motion language, and section flow.

## 3. Brand and source-of-truth research

The selected brand is **Mother’s Recipe**.

Start with these official sources:

- Official homepage: `https://www.mothersrecipe.com/`
- Official pickle catalogue: `https://www.mothersrecipe.com/collections/pickle`
- Official broader pickle collection (if available): `https://www.mothersrecipe.com/collections/pickles`
- Example official product pages to use as starting points:
  - `https://www.mothersrecipe.com/products/andhra-tomato-pickle-200-gm`
  - `https://www.mothersrecipe.com/products/andhra-gongura-pickle-200-gm`

Use the live site as the source of truth. Product catalogue names, pack sizes, package designs, logos, imagery, ingredients, price, stock status, and brand claims can change. Confirm each displayed fact on the actual product page when you use it. Do not trust this prompt as a source for today's pricing or availability.

Research the official logo, colors, typography, packaging, photography, product naming, product variants, and tone of voice. Preserve the recognizable brand identity where appropriate, but elevate the web art direction without pretending the new concept is an official company launch. Do not imply the company hired, endorsed, or approved the website; it is a portfolio/pitch concept unless explicit authorization is provided.

Use legitimate public assets. Do not bypass login, access controls, paywalls, or technical restrictions. Prefer official source images and locally saved copies of files the site publicly exposes. If a source blocks automated access, attempt a respectful manual/browser-based retrieval. If that still fails, log the exact missing asset and move to a documented fallback rather than silently inventing it.

## 4. Design direction: original, premium, and clearly not Priya Foods

Create a distinct concept under a working creative direction such as **“The Living Pantry — An Archive of Indian Achaar.”** You can refine the concept name after research, but do not copy the name, tagline, or story from the reference project.

Suggested art direction—not rigid templates:

- A tactile, editorial palette grounded in Mother’s Recipe’s actual identity, supported by warm grain/ivory, deep leaf green, spice reds, toasted mustard, and dark ink/earth. Verify the real logo and packaging colors before finalizing exact tokens.
- Rich light-and-shadow photography, generous negative space, confident type scale, carefully selected serif/sans pairings, and a disciplined grid.
- Product packaging should feel physically present: precise scale, believable shadows, controlled depth, tasteful perspective, and enough space around every silhouette.
- Ingredient details can float, drift, or enter in layers. Motion must feel directed and deliberate, not like unrelated objects bouncing around.
- Use a new visual composition: for example, an editorial “flavour atlas,” an ingredient-led vertical journey, split-screen product reveals, a long horizontal regional index, or a scroll sequence that reveals the pantry. Choose one coherent concept and execute it deeply.
- Use product cutouts against designed CSS backgrounds, subtle texture, editorial panels, and ingredient layers. The visual interest must come from composition and rhythm, not dozens of random effects.
- Use micro-interactions and responsive motion to give the site a crafted feel. Avoid generic template sections and predictable stacks of identical cards.

**Avoid:** a copy of Priya’s red arch/orbit carousel; generic Shopify-template styling; giant gradients without purpose; too many pill-shaped cards; random blob shapes; stock-photo collage; synthetic-looking package renders; unreadable oversized text; glassmorphism everywhere; excessive parallax; cursor effects that interfere with usability; fake testimonials, false heritage claims, invented awards, and fabricated statistics.

Before implementing, write a short `DESIGN_DECISIONS.md` recording the chosen concept, palette, typography, motion idea, page structure, and what is intentionally different from the reference. Then implement it; do not stop at that file.

## 5. Required asset library — this is a major part of the task

The previous attempt was inadequate because it supplied only four editorial images. Do not repeat that. The project needs a real, varied, purpose-built library with a useful number of independent files.

### 5A. Required directory structure

Create and use a clean structure similar to this. Adapt names only if there is a clear technical reason; keep the underlying separation of originals, transparent cutouts, editorial scenes, and metadata.

```text
public/
  assets/
    brand/
      logo/
      brand-reference/
    products/
      originals/
        <product-slug>/
      cutouts/
      detail-shots/
      cards/
    ingredients/
      cutouts/
      editorial/
    editorial/
      hero/
      story/
      serving/
      textures/
    ui/
    previews/
    data/
      products.json
      asset-manifest.json
      asset-manifest.csv
      failed-assets.json
scripts/
  collect_official_products.py   (or a suitable equivalent)
  make_product_cutouts.py        (or a suitable equivalent)
  validate_assets.py
ASSET_README.md
ASSET_SOURCES.md
DESIGN_DECISIONS.md
```

Do not create empty folders just to make the structure look complete. Each directory should contain useful files or be omitted until it does.

### 5B. Genuine brand and product photography

Visit the official Mother’s Recipe pickle catalogue, follow pagination, and enumerate real pickle product URLs. Do not scrape unrelated categories just to inflate asset count. Select a broad set of genuinely available variants and their pack sizes, prioritizing products such as these when actually listed and retrievable:

- Andhra Avakaya Pickle
- Andhra Ginger Pickle
- Andhra Gongura Pickle
- Andhra Tomato Pickle
- Tomato Pickle with Garlic
- Punjabi Mango Pickle
- Mixed Pickle
- Mixed Pickle — South Indian Style
- Ginger Pickle
- Garlic Pickle
- Green Chilli Pickle
- Stuffed Green Chilli Pickle
- Stuffed Red Chilli Pickle
- Lime Pickle / Sweet Lime Pickle
- Lime Chilli Pickle
- Mango Pickle (hot or mild, if available)
- Karnataka Cut Mango Pickle
- Punjabi Pachranga Pickle
- Gujarati Choondo / Gorkeri Pickle
- Madras Thokku
- Mango Ginger Pickle
- Other real pickle products found in the current official catalogue.

This is a research list, not permission to invent products. Match every product name to an actual official product page.

**Quantity and coverage goals:**

- Aim to retrieve **at least 20 distinct official product packshots** across the range, if at least that many are publicly accessible.
- Save **all useful gallery images available for the selected products**, not only the first thumbnail. When there are multiple genuine views, preserve front, back, side, detail, serving, and lifestyle images individually as appropriate.
- Target **40–80 original official product/gallery files** if the official catalogue and image galleries offer that many useful distinct files without excessive duplication. Quality and authenticity matter more than hitting a number.
- At least 12 distinct real products must appear on the implemented website if 12 or more can be retrieved. Prefer 16–24 products for the product shelf/archive when source material allows.
- Deduplicate actual duplicate images and alternate URL encodings. Do not count the same image at different resolutions as separate visual assets.

For each product, preserve the original downloaded files in `products/originals/<slug>/`. Never overwrite the original while processing it. Use descriptive filenames such as:

```text
andhra-avakaya-200g-front-original.webp
andhra-avakaya-200g-gallery-02-original.jpg
andhra-avakaya-200g-detail-original.webp
```

Save genuine source URLs and final local paths in `products.json` and the asset manifests. Keep product facts grounded in the official page. Don't display price, stock, nutrition, claims, or weight unless verified at the time of retrieval.

### 5C. Transparent product cutouts — essential for the design

Create transparent product packshots from genuine brand photography for products featured prominently in the hero, product selector, and product shelf.

- Aim for **at least 15–20 transparent product cutouts** if enough genuine source packshots are available.
- Output them as individual `.png` files with real RGBA alpha transparency (or lossless WebP with alpha if browser support is checked; PNG is the safe default).
- Store the processed files in `public/assets/products/cutouts/`, with clear names matching the product slug and pack size.
- Keep the complete product silhouette, lid, pouch edges, label, and readable brand/product text intact. Do not redraw the packaging or replace the label.
- Preserve a sufficiently high resolution for a large desktop hero. Aim for 1200 px or more along the longest side when the source quality permits; do not upscale a tiny thumbnail and pretend it is high quality.
- Trim excessive outer whitespace but retain a consistent margin around the full object. Include padding so motion does not clip the object.
- Inspect edges at 100% zoom and against both light and dark backgrounds. Avoid white fringes, jagged masks, missing parts of the package, or a rectangular “transparent” background that is actually baked in.
- Never remove label elements or translucent product/package regions merely because they are light-colored. Transparent jars, glass reflections, oil highlights, white labels, and shiny plastic need careful masking.
- For genuine products, do **not** use generated fake packaging or a text-to-image substitute. Exact packshots must stay authentic.
- If automatic background removal damages a product, revise the mask, use an alternative segmentation method, or keep that item’s original on a carefully designed background. Report that item as not suitable for a cutout rather than publishing a broken silhouette.

Try a zero-cost local background-removal workflow first. If available, use an existing local background-removal tool or a CPU-compatible open-source segmentation model, such as `rembg`, after checking system and dependency constraints. Avoid paid APIs, subscription tools, or cloud services requiring a paid key. On an 8 GB RAM Windows laptop, avoid loading multiple large models at once. Download model weights once where needed, cache them, process one image at a time, and keep the method documented. If no suitable model is available, use a reliable alternative and test the mask carefully; do not claim a tool was run when it was not.

Use CSS shadows and lighting to create the presentation shadow around the transparent product. Do not bake a large ugly rectangular backdrop into the final cutout.

### 5D. Individual transparent ingredient props

Create a substantial reusable set of **individual, separately saved ingredient cutouts**, not one flattened collage. These provide the layered animation and scene-building assets.

Target **at least 20 distinct ingredient/food props**, ideally 24–32. Potential subjects:

- Whole raw green mango
- Mango half with stone
- Mango wedges and slices
- Mango cubes
- Red chilli, whole and broken
- Green chilli
- Curry leaves / gongura-like leafy greens (identify generic leaves honestly; do not label a generated leaf as a specific ingredient if uncertain)
- Garlic bulb and separated cloves
- Ginger root and slices
- Lime and lime wedges
- Mustard seeds in a small pile
- Fenugreek seeds
- Turmeric powder in a small mound
- Coriander seeds
- Cumin seeds
- A small pool or drizzle of spice oil
- Small earthen bowl
- Brass spoon
- Wooden scoop
- Banana leaf or natural serving leaf, where appropriate
- Small pinch bowls of pickling spices
- Rice, roti, or serving accompaniments if helpful for the story.

Save each usable prop as a separate high-resolution transparent PNG in `public/assets/ingredients/cutouts/`. Examples: `raw-mango-whole.png`, `mango-wedges.png`, `red-chilli-pair.png`, `mustard-seeds-pile.png`, `garlic-cloves.png`.

You may source properly usable/licensed stock assets or use image-generation tools for **generic food, ingredient, and prop imagery only**. Generated props must not contain logos, text, fake brand packaging, or misleading product claims. Prefer a consistent photographic treatment, light direction, scale, and lens style. Each prop should have one subject or a small related group with clean silhouette and enough transparent padding to animate independently. Do not generate a grid/contact sheet and then crop it crudely into pretend individual assets.

Check the alpha channel is real. Use a contact sheet to inspect all ingredient cutouts. Remove corrupt, duplicate, low-quality, or visibly AI-deformed results.

### 5E. Editorial photographs and scene plates

Create/retrieve **at least 8 useful editorial images** with varied roles, not eight near-identical images. Suggested set:

- 1 wide campaign hero photograph with deliberate negative space for typography
- 2 wide ingredient/tabletop still lifes
- 2 serving/meal scenes (for example, rice, roti, a small bowl of pickle; no fabricated product package)
- 1 macro texture image of pickle and spices
- 1 regional/flavour editorial scene
- 1 closing/end-card scene
- Optional portrait/tall crops and mobile-specific compositions for key sections.

Place these under `public/assets/editorial/hero/`, `story/`, and `serving/` as appropriate. Use wide compositions around 16:9 or 3:2 and separate portrait images where the mobile composition genuinely needs them.

Prioritize official brand lifestyle/food photography when available and appropriate. Otherwise use licensed public imagery or create original generic editorial photography. Generic editorial photography must not depict a fictitious Mother’s Recipe package or imply it is a real campaign shoot. Keep the style cohesive. Save image-generation prompts or source attribution metadata for generated/sourced editorial images.

### 5F. Brand assets, textures, and support files

- Retrieve the official logo from an official public source where possible. Preserve the original file; do not redraw it using text or generate a lookalike. Keep any needed optimized transparent copy separately.
- Save useful brand reference images/screenshots only if the retrieval method and usage are appropriate; label them as research/reference, never as deployable page assets.
- Prefer CSS-built grain, paper, dividers, and simple decorative motifs over huge texture files. If a texture file adds real value, optimize it and document its source.
- Use Lucide or another light, consistent icon set for UI icons instead of generating icons as images.
- Fonts: use accessible, web-licensed fonts from a verifiable source. Prefer variable fonts and keep the number of families/weights small. Do not extract/copy a paid font from another website.

### 5G. Asset manifests and visual auditing

Create:

- `public/assets/data/products.json`: product slug, verified name, weight/pack size if verified, official product URL, local image paths, available gallery paths, and whether a cutout is suitable.
- `public/assets/data/asset-manifest.json`: one record per asset with source URL or generation method, local path, type, intended use, width, height, file size, alpha status, and attribution/license note.
- `public/assets/data/asset-manifest.csv`: an easy spreadsheet-friendly version.
- `public/assets/data/failed-assets.json`: exact failures and reason; never silently replace missing official packshots with generated versions.
- `ASSET_SOURCES.md`: explain where files came from and any caveats.
- `ASSET_README.md`: explain the folder structure, naming convention, regeneration instructions, and which assets are used on which sections.
- A contact sheet in `public/assets/previews/` or project documentation. Make separate contact sheets for transparent products and ingredients, plus an overview sheet for editorial images. Do not use contact sheets as page assets.

Create a validation script that scans the entire asset library for zero-byte files, corrupt images, unsupported formats, missing manifest entries, duplicate files, and incorrectly claimed alpha transparency. It should also report missing referenced paths in the website. Run it and fix the problems it finds.

## 6. Downloading and automation workflow

Build a respectful, repeatable asset-collection workflow. You may use Python, Node, Playwright, or command-line tools depending on what is already installed. Use the simplest reliable tool, not a large unnecessary framework.

The workflow should:

1. Enumerate official product links from the pickle catalogue and pagination.
2. Open each product page and collect the product title, official URL, image URLs, and relevant gallery images.
3. Prefer a high-resolution image URL from the site's responsive image source/`srcset` or product data rather than a tiny thumbnail.
4. Download the public images with polite rate limiting, retries, sensible timeouts, and clear error logs. Use descriptive local names.
5. Confirm each downloaded file is actually an image and has a plausible file size/dimensions.
6. Deduplicate files using a content hash and/or perceptual image hash.
7. Generate transparent cutouts only from the preserved local original files; never process an image without keeping its original.
8. Create the JSON/CSV manifests and contact sheets automatically.
9. Re-run safely without downloading everything again if a valid file already exists.
10. Store scripts in the repository and document the exact Windows PowerShell commands needed to run them.

Try the official HTML/page data first. If it is Shopify-backed, you may inspect publicly accessible product JSON or catalogue pagination, but verify the live responses before relying on a URL pattern. Do not invent API endpoints or assume a script has succeeded just because it ran without throwing an exception.

No paid APIs, paid image services, paid fonts, or services requiring a credit card. Do not make external network usage mandatory at website runtime. After collection, the website should use the downloaded local files and still render when offline, aside from truly optional externally hosted fonts.

## 7. Website structure and experience

Implement one cohesive homepage experience with multiple purposeful sections. Do not copy the reference section order. You may adjust the final architecture after researching the actual brand, but deliver a complete story rather than a disconnected collection of effects.

Required experience areas:

### A. Opening/hero
- Instantly establish the food brand and creative concept.
- Use a genuinely striking composition: a real official hero product cutout if available, with independently animated ingredient props and a custom background/scene.
- Make the product image large enough and sharp enough to carry the first screen.
- Include clear navigation and one primary CTA.
- Typography and product must remain readable together; don't layer text over a busy label.

### B. Flavour discovery / product interaction
- Give the visitor an interactive way to explore a curated group of authentic products.
- Make interactions work with mouse, touch, keyboard, and explicit buttons. Scroll may contribute to the experience, but never make normal navigation impossible.
- Selecting a product must update the product title and available details together with the correct matching genuine image.
- Product selection should be deterministic and accessible, not random.
- If using an orbit, rotating shelf, horizontal journey, or scroll-driven selector, invent a new composition and behavior; do not reuse Priya’s exact orbit or red mound.
- Provide a usable fallback grid/list for touch, reduced motion, and narrow screens.

### C. Flavour/ingredient storytelling
- Tell a visual story around flavours and ingredients using individual cutout props, editorial images, and intentional scroll transitions.
- Use layered parallax sparingly and ensure ingredients appear anchored in space rather than randomly floating.
- Keep copy short, brand-appropriate, and grounded. Do not invent recipes, preparation methods, regional history, nutrition, or heritage claims. If the official source does not substantiate a claim, omit it or label general editorial copy as such.

### D. Product archive / related variants
- Build a responsive, visually consistent product section drawing from `products.json`.
- Show at least 12 real products if the asset library can support that, preferably 16–24.
- Each card uses the correct official product image, name, and only verified pack-size/price details.
- Filters or categories must actually work if displayed. If no functional search/filter is implemented, do not show decorative fake controls.
- A product click should open a meaningful product detail panel/section or the corresponding official product page. No dead `#` links.

### E. Serving / recipe-inspired editorial section
- Use curated lifestyle images, food details, and a composition that differs from the product-selector section.
- CTA labels should point to real routes/pages or work locally. Do not invent recipe pages unless you implement real useful content and label it appropriately.

### F. Brand close / footer
- Finish with a deliberate visual resolution rather than a generic black footer.
- Use approved logo assets, real official links, sensible navigation, and accessible contrast.
- Do not invent address, contact details, certifications, social handles, or corporate claims; retrieve them from official pages if needed.

## 8. Motion, interaction, and responsive engineering

Use motion to serve composition and storytelling, not to hide weak design. Every major transition should be intentional and have an observable relationship to scroll, selection, hover, or focus.

- Use the project's existing animation stack if sound. If a new stack is necessary, prefer small, stable dependencies.
- GSAP/ScrollTrigger or native Web Animations/CSS may be used where appropriate. Lenis is optional, never required for basic scroll or keyboard access.
- Make scrolling work normally. Avoid trapping the whole page in a pinned section for too long.
- Animate image transforms/opacity rather than expensive layout properties where possible.
- Use `prefers-reduced-motion` and provide a reduced-motion experience that preserves content and functionality.
- Support keyboard focus, arrow keys only where appropriate, tab navigation, Escape for dismissible overlays, and semantic buttons/links.
- Add meaningful alt text for product images; decorative ingredients should use empty alt text/`aria-hidden` when appropriate.
- Respect visible focus rings and readable color contrast.
- Responsive targets: small mobile around 360–390 px, common mobile, tablet, and large desktop. Do not simply scale down the desktop canvas: compose separate image crops and responsive layout states when needed.
- Do not let product labels be cropped, product images overlap important text, or the page introduce horizontal scroll on mobile.

## 9. Technical constraints and tool choices

First inspect the existing project. Determine its framework, package manager, scripts, routing, styling, components, and assets. **Do not overwrite a working project or rebuild the application from scratch without a strong reason.** Follow the existing structure and make minimal, maintainable changes.

- If a `pnpm-lock.yaml` already exists, use `pnpm`; do not regenerate it with npm. Otherwise preserve the existing package manager and lockfile.
- Prefer TypeScript and reusable components where the project uses them.
- Reuse existing components and installed libraries. Avoid dependency sprawl.
- Don't add a database/backend/authentication unless the existing request or project explicitly requires it. This deliverable is primarily a polished frontend concept.
- Avoid adding heavy 3D/WebGL libraries merely for a buzzword. Use real 3D only if the visual benefit justifies the cost and it performs well on an 8 GB RAM laptop with integrated graphics. A sophisticated 2D layered composition may be better.
- Avoid huge autoplay videos and oversized image files. Prefer well-sized WebP/AVIF for editorial images and transparent PNG/WebP for cutouts. Preserve source originals separately.
- Lazy-load below-the-fold images, reserve image dimensions to prevent layout shifts, and ensure the hero is prioritized.
- Use local assets by default; do not make runtime depend on a third-party image URL that could disappear.
- Protect the existing `.env` and secrets. Do not create or expose credentials.
- Keep the implementation readable. Do not create a single giant component or a maze of abstractions.
- Follow YAGNI, reuse-first, minimal-change, security, validation, and accessibility principles.

## 10. Art direction acceptance bar

Before declaring the site finished, compare the actual browser result against the following. If it fails, iterate on the implementation rather than explaining away the failure.

- The first screen looks deliberately composed by a professional art director.
- The hero does not look like a generic component-library landing page.
- Product packaging is authentic, sharp, large enough, and never clipped.
- Transparent cutouts have clean edges and no obvious white/black rectangles.
- Ingredient props have consistent lighting, style, and plausible scale.
- Typography hierarchy is deliberate; body copy is readable; line lengths are controlled.
- Spacing, image crop, shadows, and color contrast are consistent across sections.
- Motion has a clear purpose and finishes cleanly; there are no awkward jumps, jitter, or overlapping layers.
- Every section brings a distinct rhythm or composition while still belonging to the same design system.
- Mobile is art-directed, not merely stacked; no major product or interaction disappears accidentally.
- The finished page does not resemble Priya’s repository recreation except in the general quality of craftsmanship.

## 11. Browser testing and proof

Run the actual website in a browser and inspect the rendered result. Do not rely only on TypeScript or build success.

Minimum checks:

1. Install dependencies with the correct existing package manager.
2. Run the project's lint/type-check/build scripts, or the closest relevant equivalents.
3. Run the dev server and confirm the home page loads without console errors.
4. Inspect wide desktop, tablet, and mobile layouts (at least 390 px mobile width).
5. Test the product selector with mouse/touch-equivalent interaction, keyboard, previous/next controls, and reduced-motion preference.
6. Test every CTA, product link, navigation item, menu, filter, and dismissible panel.
7. Confirm all referenced local images load and all important assets have useful alt text.
8. Confirm no accidental horizontal overflow, clipped labels, cumulative layout shifts, or broken font loads.
9. Run the asset validation script. Fix missing/corrupt files and false alpha reports.
10. Capture screenshots of the finished website: first screen, one interactive/product state, a middle editorial section, product archive, and mobile. Put them in a documented `artifacts/screenshots/` directory if the environment supports it.

Do not state “tested”, “responsive”, “transparent”, “downloaded”, “built”, or “working” unless you actually performed the corresponding check. Record skipped checks explicitly and state why.

## 12. Required final deliverables

When finished, provide a concise but verifiable report with:

- What was implemented and where the main route lives.
- The main design choices and how the concept differs from Priya Foods.
- Exact counts of unique official products found, original product/gallery images downloaded, transparent product cutouts created, ingredient cutouts created, and editorial images included.
- The asset directory tree and path to the contact sheets.
- Any assets that could not be retrieved and their documented fallback (do not hide gaps).
- Exact commands to install, run, validate, and re-run asset collection on Windows.
- Lint/type/build results and browser/device sizes actually checked.
- Paths to screenshots and the asset manifests.

### Non-negotiable rules

- Do the work; don't just propose it.
- Do not stop after four editorial images.
- Do not use placeholders when a real source asset can be retrieved.
- Do not fabricate Mother’s Recipe products, labels, official packaging, logos, claims, or source URLs.
- Do not copy the Priya website or its source assets.
- Do not create fake transparent PNGs whose backgrounds are still visible.
- Do not download or install paid services, require a paid API, or rely on external image URLs at runtime.
- Do not claim success for a step that was not verified.
- If something fails, report the precise failure, try a sensible fallback, and keep completing the rest of the task.

Start now by inspecting the repository and both reference sources. Then implement the site and build the asset library in the same working session. Do not ask me to design the sections for you; make expert choices, document them, and verify the result.

## END PROMPT
