# Antigravity Master Prompt — Recreate the Priya Website Style for Mother's Recipe

## Objective

Work directly inside my existing project:

`https://github.com/pavankumar9d-rgb/Mothers-Recipe.git`

Use this website/repository as the **primary visual and interaction reference**:

`https://github.com/gireeshkumarreddy/Priya.git`

My immediate goal is to make the Mother's Recipe website look and behave as close as reasonably possible to the Priya reference. **Do not invent a new art direction, reinterpret the reference, or deliberately make it different yet.** I will make my own brand-specific customizations after the close reference-style baseline is working.

This instruction supersedes earlier prompts that asked for a distinct/original art direction. For this task, faithfully recreate the reference's visual language, page composition, layout proportions, product presentation, typography hierarchy, spacing, color relationships, imagery treatment, transitions, and interaction feel, then adapt the content to Mother's Recipe.

## 1. Inspect the reference before coding

Do not begin by guessing what the reference looks like.

1. Inspect the Priya repository, its live preview if available, component tree, styles, assets, animations, and interaction logic.
2. Run the reference locally when feasible. If using a temporary clone, put it outside the Mother's Recipe project so the two codebases remain separate.
3. Inspect the Mother's Recipe repository and run its existing site before changing anything.
4. Capture screenshots of both sites at matching viewport sizes: desktop, laptop, and mobile. Compare them side by side.
5. Identify the concrete reference patterns that drive its quality: hero proportions and focal point; product scale and placement; foreground/background layering; whitespace; typography; section transitions; product selection/reveal behavior; image crops; hover, drag, keyboard, and scroll interactions; and responsive behavior.
6. Record the findings as an implementation checklist. Then build the checklist into the actual Mother's Recipe website.

If the reference cannot be run directly, study its source and all available screenshots/preview carefully. Do not falsely claim visual matching has been verified when the reference was not accessible.

## 2. Match the reference style closely

Aim for a close visual match to the Priya reference in these areas:

- **Overall composition:** Use the same general design grammar, section rhythm, content density, scale relationships, alignment logic, and whitespace discipline.
- **Hero:** Recreate the reference's hero structure and visual impact, including the relative positions and sizes of the primary product, surrounding elements, backdrop, and supporting copy. Do not replace it with a generic ecommerce hero.
- **Product showcase:** Reproduce the reference's product presentation, selected-product emphasis, reveal/transition behavior, carousel/drag behavior where present, and the visual relationship between product imagery and text.
- **Typography:** Match the reference's type hierarchy, approximate scale, weight, contrast, capitalization, line lengths, and text placement. Use suitable locally available fonts or free, legally usable fonts; do not introduce a random font pairing.
- **Color and contrast:** Derive the palette and contrast relationships from the reference. Translate the product/brand colors only where necessary to represent Mother's Recipe products; do not redesign the whole color system without reason.
- **Shapes and decoration:** Recreate the reference's visual treatment of containers, arches or frames, borders, shadows, overlays, corner treatments, and decorative elements where they are part of its design language.
- **Photography and cutouts:** Match image scale, crop, lighting impression, layering, negative space, and backdrop treatment. Product images should look deliberately art-directed, not like small catalogue thumbnails dropped into cards.
- **Sections:** Match the reference's pacing, transitions, alternating visual scale, editorial product-story sections, related-product treatment, and footer hierarchy where present.
- **Interactions:** Recreate the observed behaviors, not just a static screenshot. Match drag/selection, hover feedback, transitions, scroll behavior, and keyboard interaction where applicable.
- **Responsive layout:** Preserve the reference's visual hierarchy on smaller screens rather than merely shrinking the desktop view.

Use the reference as the target for **layout and experience**, not just a loose inspiration. If the existing Mother's Recipe structure prevents a close match, refactor the relevant components rather than preserving a weak design for convenience.

## 3. Adapt the reference to Mother's Recipe

Keep Mother's Recipe as the actual brand and content. Reuse the existing product information and suitable Mother's Recipe assets wherever possible. Replace Priya-specific names, product details, logos, copy, and other brand content with truthful Mother's Recipe content.

Do not blindly copy Priya's brand identity or represent Mother's Recipe products as Priya products. Do not use Priya's proprietary product photos or branding as Mother's Recipe assets. Recreate the composition with assets belonging to Mother's Recipe or newly created/legally usable assets. The goal is a close style-and-interaction match that can later be customized—not a misleading brand impersonation.

Keep the reference's content structure only where it makes sense for Mother's Recipe. Translate product names, labels, category details, and product stories using the actual data available in the project. Do not fabricate heritage dates, awards, certifications, ingredients, product claims, or manufacturing processes. If a claim is not supported by the repository or a trustworthy source already available to the project, omit it or flag it for me.

## 4. Assets are part of the design—not a later task

A close style match will fail if product imagery is missing, tiny, badly cropped, or inconsistent. Audit all referenced assets before finalizing.

1. Inspect the existing assets and product data; map each product to its intended image and fallback.
2. Find broken paths, missing files, transparent PNGs without real transparency, incorrect aspect ratios, low-resolution images, and accidental duplicate imagery.
3. Do not show broken-image icons, empty product cutouts, arbitrary stock images, or the same image for unrelated products.
4. Use the best available legitimate Mother's Recipe image for each product. If the exact product cutout is missing, create a clean and consistent fallback using existing local tools/assets if feasible, or use a deliberate product-image treatment that does not pretend a missing asset exists.
5. Keep product image dimensions and visual weights consistent with the reference's composition. Avoid stretching or distorting product packs.
6. Generate an asset manifest and contact sheet if useful, and report which product images are genuinely missing.
7. Keep large assets performant and do not add paid APIs or paid services without my explicit approval.

## 5. Implementation rules

- Work in the existing Mother's Recipe repository and preserve its current stack unless a specific technical limitation makes a change necessary.
- Reuse and refactor existing components when practical; do not rewrite the whole project just to make the code look different.
- Build real functioning UI, not a static mockup or an image of a website.
- Do not remove working product data or features without a concrete reason.
- Avoid unnecessary dependencies and paid services.
- Ensure buttons, product selectors, drag controls, navigation, and other visible controls work as expected. No decorative controls that appear interactive but do nothing.
- Add accessible labels, sensible focus states, keyboard support where appropriate, and reduced-motion support without sacrificing the core layout.
- Keep the console clean and fix broken links, missing assets, runtime errors, and layout overflow.
- Check the project's deployment configuration and ensure the build still succeeds in its intended hosting environment.

## 6. Required workflow — do the work, not just a plan

Execute each stage in order:

### Stage A — Baseline and reference analysis
- Start both sites where possible.
- Capture matching desktop and mobile screenshots.
- Inspect the reference source and interactions.
- Write a short, concrete comparison checklist.

### Stage B — Reference-style implementation
- Rebuild the Mother's Recipe hero and main product showcase first to closely match the reference.
- Implement the same general product-selection and reveal experience.
- Apply the reference's typography, composition, spacing, imagery treatment, colors, transitions, and section rhythm across the rest of the page.
- Adapt only the content and assets needed to make it legitimately Mother's Recipe.

### Stage C — Visual comparison and correction
- Run the changed Mother's Recipe site.
- Capture screenshots at the same viewport dimensions as the reference.
- Compare both sites and identify the **five most visible differences**.
- Correct those differences before polishing small details.
- Repeat this visual comparison for at least three refinement passes. Do not treat a successful build as proof of visual quality.

### Stage D — Functional and responsive checks
- Test product selection, drag/swipe, hover, keyboard behavior, navigation, and other interactions that exist in the implementation.
- Test desktop, laptop, and mobile widths.
- Test reduced-motion behavior and image fallbacks.
- Run the production build and fix all errors caused by the changes.

## 7. Acceptance criteria

Do not consider the work finished until all applicable points are met:

- At first glance, the page follows the Priya reference's visual grammar and product-showcase experience much more closely than the current Mother's Recipe implementation.
- The hero has a clear focal point and comparable visual impact, instead of feeling like a generic template.
- Product imagery, typography, spacing, layers, and section rhythm look intentional and coherent.
- The product selection/reveal experience works, where present in the reference.
- The page remains usable on mobile, with working controls and no horizontal overflow.
- No broken product images, obvious placeholders, dead controls, console errors, or build failures remain.
- All Mother's Recipe claims and product details are supported by the available data.
- The final result is a functioning website, not only a design plan or screenshot.

## 8. Final report

After implementing, report briefly:

1. What you actually changed.
2. Which reference elements and interactions you recreated.
3. Which assets remain missing or imperfect.
4. The desktop and mobile viewport sizes tested.
5. Whether the production build passed.
6. Where the before/after screenshots were saved.
7. Any remaining differences from the reference that are significant enough for me to customize later.

Do not say the result is an exact match unless you verified it side by side. Do not stop after producing a plan. Make the changes in the repository, run the site, inspect the visual result, and iterate.

## Final instruction

**First recreate the Priya reference's visual style and interaction experience as closely as possible inside Mother's Recipe. Do not replace this with an unrelated creative concept. Once that baseline is complete and verified, stop before making extra stylistic customizations so I can decide what to change next.**
