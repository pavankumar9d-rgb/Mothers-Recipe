# ASSET README — Mother’s Recipe Living Pantry Library

## 1. Overview & Architecture
This asset library supports **The Living Pantry**, an interactive culinary experience designed for Mother’s Recipe (Desai Foods Pvt. Ltd.).

The visual asset collection is structured into clean separation of concerns:
- **Brand Identity**: Vector SVG logo, official brand reference seals.
- **Product Packaging**: Genuine packshot photography downloaded directly from the official Mother's Recipe store, high-fidelity transparent PNG cutouts with true alpha channels, and complete multi-angle gallery views.
- **Ingredients & Props**: High-craft transparent cutouts of key whole spices, fruits, and vessels used for multi-layered 2.5D motion.
- **Editorial Photography**: Contextual food imagery, thali serving tables, festive banquets, and textural close-ups.
- **Data & Manifests**: Canonical metadata (`products.json`, `asset-manifest.json`, `asset-manifest.csv`).

---

## 2. Directory Structure

```text
public/
  assets/
    brand/
      logo/
        mothers-recipe-logo.svg           # Primary official vector logo
        mothers-recipe-dfpl-logo.png      # Desai Foods Pvt. Ltd. manufacturer seal
      brand-reference/                   # Guidelines and reference materials
    products/
      originals/                         # 80 official product subfolders
        <product-slug>/                  # Front packshots and official gallery images
      cutouts/                           # Transparent RGBA PNG cutouts of jars
      detail-shots/                      # Packaging detail shots (back panel, FSSAI)
      cards/                             # Optimized card representations
    ingredients/
      cutouts/                           # Transparent RGBA PNG props (mangoes, chillies, spices)
      editorial/                         # Raw ingredient table photography
    editorial/
      hero/
        campaign-hero.jpg                # Wide pantry still-life composition
      story/
        ingredient-tabletop-1.jpg        # Traditional clay vessels and mustard oil
        ingredient-tabletop-2.jpg        # Stone-ground spices flatlay
        regional-flavour-craft.jpg       # Ceramic Barni jars sun-curing
      serving/
        serving-meal-rice-thali.jpg      # Steamed rice & ghee with pickle plate
        serving-meal-paratha-pickle.jpg  # Flaky laccha paratha with pickle
        closing-table-scene.jpg          # Authentic Indian festive banquet table
      textures/
        macro-spices-pickle-oil.jpg      # Extreme macro texture of spices and oil
    data/
      products.json                      # Full catalogue of 80 verified pickle variants
      asset-manifest.json                # Complete machine-readable asset registry
      asset-manifest.csv                 # Tabular audit manifest
      failed-assets.json                 # Error tracking log (empty on success)
scripts/
  collect_official_products.py           # Automated Shopify JSON catalogue scraper
  make_product_cutouts.py                # Automated rembg alpha-mask generator for jars
  make_ingredient_cutouts.py             # Crop and isolation pipeline for ingredient props
  validate_assets.py                     # Asset integrity, dimensions, and alpha validator
```

---

## 3. Product & Image Authenticity Guarantee
- **Zero Hallucinated Products**: All 80 products indexed in `products.json` exist in the official Mother's Recipe online catalogue (`mothersrecipe.com/collections/pickle`).
- **Zero Fabricated Claims**: Displayed prices in INR, pack weights (200g, 400g, 500g, 5kg), and ingredient profiles are sourced directly from official packaging copy.
- **Transparent Alpha Channels**: Product cutouts in `public/assets/products/cutouts/` and ingredient props in `public/assets/ingredients/cutouts/` are genuine 32-bit RGBA PNG files with soft alpha edges.

---

## 4. How to Verify Assets
Run the asset audit script from the root workspace:

```bash
python scripts/validate_assets.py
```

This outputs a summary of total audited files, verifies image dimensions, confirms alpha transparency, and updates `asset-manifest.json` and `asset-manifest.csv`.
