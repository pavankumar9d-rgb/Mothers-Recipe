# MOTHER'S RECIPE — ART-DIRECTED WEBSITE REDESIGN MASTER PROMPT
## Objective: Reach the visual craft of the Priya Foods reference without copying it

You are working inside my existing repository:
`https://github.com/pavankumar9d-rgb/Mothers-Recipe.git`

Your task is to **inspect, redesign, implement, run, and visually refine the actual website**. Do not merely write a plan, create documentation, or add more features. The target is a distinctive, polished, production-quality brand experience for Mother's Recipe.

Use this reference for quality and craft:
`https://github.com/gireeshkumarreddy/Priya.git`

The reference is **not** a template to clone. Do not copy its code, layout, red arch, floating-jar arrangement, exact typography, section order, animations, copy, or assets. Study the underlying principles: clear visual hierarchy, confident composition, product scale, intentional negative space, art direction, and movement that changes the overall composition.

---

# 1. THE CORE PROBLEM TO SOLVE

The current site has useful ideas and substantial content, but it reads too much like a collection of UI sections: too many labels, badges, bordered cards, pills, metadata, and explanatory copy compete with the product imagery. Individual hover effects and interactions do not yet add up to one memorable visual narrative. Product imagery is also incomplete in places.

**Do not solve this by adding more features. Solve it through art direction, composition, imagery, typography, pacing, and careful interaction design.**

The result must feel like a real creative studio was commissioned to make an original digital experience for Mother's Recipe—not a generic food template, a dashboard, a component gallery, or an AI-generated design showcase.

# 2. REQUIRED WORKFLOW — EXECUTE, DO NOT JUST DESCRIBE

## Phase A — Inspect and establish a baseline
1. Inspect the existing repository, package scripts, routes, components, styles, assets, data, and Git status. Preserve useful working code.
2. Run the existing project locally. Use the package manager already indicated by the lockfile; do not switch package managers without a concrete reason.
3. Capture screenshots of the current rendered website at:
   - Desktop: 1440×900
   - Laptop: 1280×800
   - Mobile: 390×844
4. Inspect the reference repository and supplied recordings only to understand visual craft and interaction principles. Do not reproduce their specific design.
5. Record concrete baseline issues with examples. Do not claim to have captured screenshots if you did not actually run the site.

## Phase B — Establish a new, original art direction
Before coding, define a concise design direction in `DESIGN_DECISIONS.md`:
- One-sentence creative concept.
- A restrained colour system grounded in real food and packaging.
- Typography pairing and a clear scale hierarchy.
- Image treatment, lighting, shadows, texture, and compositional rules.
- Motion principles and reduced-motion behaviour.
- What explicitly makes this design different from the reference.

Choose one coherent direction rather than mixing many visual styles. Keep the brand recognizably Mother's Recipe. Avoid making unsupported claims about its history, ingredients, production, health benefits, or sourcing.

## Phase C — Redesign the page as a coherent experience
Implement the following priorities in order.

### Priority 1: The first viewport must be exceptional
Redesign the hero from scratch if needed.
- Establish **one unmistakable focal point**.
- Let an authentic product packshot or carefully art-directed product composition dominate.
- Use a short, confident headline and minimal supporting copy.
- Remove redundant eyebrow labels, serial numbers, badges, floating information cards, decorative UI, and excess CTA buttons.
- Give the composition deliberate negative space and a clear relationship between product, ingredients, typography, and background.
- Do not simply place a product image beside a generic text column.
- Ensure the design works at desktop and mobile sizes without shrinking everything.

### Priority 2: Create a signature interaction unique to this website
Build an original **Pantry → Plate** visual sequence. It must not imitate the reference's red arch or orbiting/tilted jar composition.
- Start with a carefully composed ingredient or pantry scene.
- Use scroll progress to coordinate a small number of purposeful changes in scale, position, crop, depth, and opacity.
- Transition into a serving scene featuring a real product packshot.
- The movement should transform the **whole composition**, not just make individual cards float.
- Use a robust, maintainable implementation with the existing stack where possible. Prefer CSS transforms and the project's existing animation library; do not add a large dependency for a trivial effect.
- Keep scroll behaviour stable, avoid hijacking native scrolling, and support touch devices.
- Provide a useful static composition when reduced motion is enabled or animation is unavailable.

### Priority 3: Give each section a distinct compositional role
Do not repeat the same card grid or bordered panel down the page.
- **Flavour discovery:** editorial product browsing with generous imagery, strong hierarchy, and minimal controls.
- **Build Your Bite:** make this genuinely useful. Let visitors choose a meal or flavour preference and return sensible product suggestions using verified available product data. Show clear empty/reset states and keyboard-accessible controls.
- **Product archive:** use real packshots, accurate product names, appropriate filters, and a consistent image stage. Do not show a missing image icon or an empty product tile.
- **Food story / serving scene:** use authentic, legally usable imagery and restrained copy; avoid fake cultural claims and generic stock-photo repetition.
- **Footer:** concise and useful, visually connected to the rest of the page.
- Keep or remove existing sections based on whether they strengthen the experience. Do not retain a section solely because it already exists.

### Priority 4: Refine typography and spacing
- Establish a deliberate scale: display, section title, product title, body, and small metadata.
- Use no more than two main type families unless the existing brand identity clearly warrants otherwise.
- Use large type sparingly for impact. Keep paragraphs short.
- Reduce all-caps labels and unnecessary technical vocabulary.
- Avoid excessive pill badges, hairline borders, drop shadows, glassmorphism, gradients, and floating cards.
- Use consistent spacing and alignment. Elements should feel placed, not auto-arranged.
- Make product photography more visually prominent than metadata and interface controls.

# 3. ASSET WORK — AUDIT, REPAIR, THEN ADD ONLY WHAT IS NEEDED

Do not assume the current assets are sufficient or unusable. Audit them.

## Product photography
1. Inspect all product records and every image path actually referenced by the UI.
2. Build a path-validation script or equivalent automated check.
3. Fix every broken path and implement graceful fallbacks for any product whose preferred cutout is missing.
4. Prioritize authentic product packshots from official, publicly accessible Mother's Recipe sources. Preserve the original downloads.
5. Do not invent packaging, labels, logos, flavours, prices, or product details.
6. Do not use unrelated products or a generic AI jar as a substitute for a real branded product.
7. Only create a transparent cutout when the source image and background-removal result are suitable. Preserve fine packaging edges, cap shape, label text, and product colour. Keep originals.
8. Verify real alpha transparency programmatically; a `.png` extension alone does not prove transparency.
9. Create a contact sheet and a manifest containing source URL, local path, dimensions, format, alpha status, and validation result.
10. If source retrieval or background removal is blocked, report the exact limitation and continue using the best verified original images. Never fabricate success.

## Editorial and ingredient imagery
- Use a small, cohesive set of high-quality images, each with a clear role in the composition.
- Prefer authentic food, ingredients, preparation, and serving scenes with consistent lighting and colour treatment.
- Do not repeat the same image in multiple sections merely to fill space.
- Use original/generated editorial images only for scenes that do not falsely imply official brand photography. Do not put invented branding or fake packaging in generated images.
- Use separate transparent ingredient assets only where layered composition genuinely improves the design.
- Avoid decorative clutter and random floating ingredients.

## Asset deliverables
Organize assets consistently, for example:
- `public/assets/products/originals/`
- `public/assets/products/cutouts/`
- `public/assets/ingredients/originals/`
- `public/assets/ingredients/cutouts/`
- `public/assets/editorial/`
- `public/assets/data/asset-manifest.json`
- `public/assets/contact-sheets/`

Adapt this structure to the existing repository rather than duplicating assets unnecessarily. Do not commit `node_modules`, temporary processing files, model weights, or redundant build output unless the project explicitly requires them.

# 4. MOTION AND INTERACTION QUALITY

- Every animation must have a purpose: reveal, transition, focus, depth, or feedback.
- Create a consistent motion language with restrained easing and intentional timing.
- Avoid applying the same fade-up animation to every section.
- Avoid gratuitous cursor-follow effects, constant motion, parallax on everything, and animation that makes reading difficult.
- Ensure interactive elements have hover, focus-visible, active, and disabled states where relevant.
- Use semantic controls and keyboard navigation.
- Honour `prefers-reduced-motion`.
- Do not hijack native scrolling or make essential content inaccessible when JavaScript or animation fails.
- Test at least one full desktop interaction flow and one mobile/touch flow.

# 5. TECHNICAL AND DEPLOYMENT REQUIREMENTS

- Preserve the current framework and project structure unless inspection proves a change is necessary.
- Reuse installed dependencies and the existing lockfile.
- Keep components understandable; avoid giant monolithic components and needless abstractions.
- Keep product information in a reliable data source rather than duplicating it in components.
- Ensure all images use local assets where practical, with meaningful alt text.
- Check console errors, failed network requests, overflow, layout shifts, and broken routes.
- Verify GitHub Pages or other deployment base paths if the project is deployed beneath a repository subpath.
- Add an appropriate `.gitignore` if absent. Remove accidental tracked dependency/build artifacts only after confirming they are not needed.
- Do not add paid APIs, paid hosting, subscriptions, or infrastructure. Prefer existing tools and free/local processing.
- Do not claim tests passed unless they were actually run.

# 6. REQUIRED VISUAL REFINEMENT LOOP

A successful build is not the finish line.

Perform at least three genuine visual refinement passes:

### Pass 1 — Composition
Inspect rendered screenshots. Fix focal point, product scale, negative space, alignment, section rhythm, and competing elements.

### Pass 2 — Art direction
Refine image crops, product edges, typography, colours, contrast, background treatment, and consistency between sections.

### Pass 3 — Motion and responsive quality
Inspect the signature scroll sequence, animation timing, mobile composition, touch behaviour, reduced-motion mode, and edge cases.

After each pass, capture new screenshots and write down what changed. If browser automation or screenshot capture is unavailable, state that limitation honestly and use the strongest available verification method. Do not fabricate screenshot evidence.

# 7. ACCEPTANCE CRITERIA — ALL MUST BE CHECKED

## Visual
- [ ] The hero has one obvious focal point and no unnecessary UI clutter.
- [ ] Product imagery is large, crisp, well-cropped, and authentic.
- [ ] The design has a clear hierarchy and deliberate negative space.
- [ ] Sections have distinct compositions instead of repeating one component template.
- [ ] The design is recognizably Mother's Recipe but not a copy of Priya Foods.
- [ ] The desktop page feels cohesive from the first viewport to the footer.
- [ ] Mobile layouts are intentionally composed, not merely compressed.
- [ ] The Pantry → Plate sequence transforms the overall scene and works without motion.

## Assets
- [ ] Every UI-referenced image path is checked.
- [ ] No broken-image icons or empty product tiles remain.
- [ ] Every generated cutout has been checked for real transparency and edge quality.
- [ ] Genuine branded products have not been fabricated or replaced with generic packaging.
- [ ] A contact sheet and asset manifest are present.
- [ ] Unavailable assets are documented honestly.

## Functionality
- [ ] Product browsing and filters work.
- [ ] Build Your Bite produces sensible results and supports reset and keyboard access.
- [ ] The signature interaction works on desktop and touch devices.
- [ ] Reduced-motion mode works.
- [ ] The production build completes successfully.
- [ ] No obvious console errors, broken routes, or horizontal overflow remain.

## Evidence
- [ ] Before-and-after screenshots at desktop and mobile sizes.
- [ ] Actual test/build results.
- [ ] Asset validation summary with counts.
- [ ] A concise list of any remaining blockers.

Do not report “10/10” as a self-awarded score. Report the evidence, the checks passed, and the remaining gaps.

# 8. FINAL EXECUTION INSTRUCTION

Start by inspecting the repository and running the current site. Then implement the highest-impact fixes in order. Do not stop after writing `DESIGN_DECISIONS.md`, creating asset scripts, or proposing a plan. Execute the scripts, implement the website, run it, inspect the result, and refine it.

If blocked by a missing tool, network restriction, unavailable source image, or dependency issue, explain the specific blocker and continue with all other tasks that can be completed.

**The final deliverable is a working, visually refined website in this repository—not just a prompt, report, mockup, or folder full of assets.**
