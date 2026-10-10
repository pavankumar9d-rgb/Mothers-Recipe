# ASSET SOURCES & PROVENANCE — Mother’s Recipe

## 1. Official Primary Sources
All brand assets, catalogue data, and product photography are collected directly from public endpoints of the official brand store:

- **Official Brand Storefront**: `https://www.mothersrecipe.com/`
- **Pickle Collections**:
  - `https://www.mothersrecipe.com/collections/pickle`
  - `https://www.mothersrecipe.com/collections/pickles`
- **Shopify Catalogue Endpoint**: `https://www.mothersrecipe.com/collections/pickle/products.json?limit=250`
- **Official CDN**: `https://cdn.shopify.com/s/files/1/0720/7872/1333/...`

---

## 2. Extraction & Ingestion Methodology
1. **Catalog Enumeration (`scripts/collect_official_products.py`)**:
   - Queries the official paginated JSON catalogue.
   - Filters out non-pickle SKUs (pastes, ready-to-eat meals, appalams, papads) to ensure pure focus on traditional Indian achaar.
   - Extracts title, handle, description, pricing, SKU identifiers, weights, and high-resolution CDN image links.
   - Downloads all front packshots and secondary gallery images (back label, nutrition table, FSSAI licence mark).
2. **Cutout Generation (`scripts/make_product_cutouts.py`)**:
   - Utilizes `rembg` (U-2-Net neural segmentation) on front-pack photographs to isolate jars from white or neutral backdrops.
   - Applies transparent boundary trimming and edge feathering to ensure clean blending over textured backdrops.
3. **Prop Generation (`scripts/make_ingredient_cutouts.py`)**:
   - Isolates authentic raw materials (unpeeled raw mangoes, mango slices, Guntur chillies, whole garlic cloves, roasted spice bowls).
   - Generates 32-bit RGBA PNG assets for multi-layer CSS animations.
4. **Editorial Culinary Photography**:
   - Contextual food plates (steamed rice with melted cow ghee, blistered laccha paratha with pickle, traditional brass thali feast tables) curated for the "Build Your Bite" pairing engine.

---

## 3. Intellectual Property & Fair Use Pitch Notice
- **Trademark Holder**: Desai Foods Private Limited (DFPL), Pune, Maharashtra, India.
- **Brand Names**: Mother’s Recipe, DFPL, and associated logos are registered trademarks of Desai Foods Pvt. Ltd.
- **Purpose**: This repository is created exclusively as an exploratory design pitch and technical demonstration showcasing modern web engineering, editorial art direction, and interactive culinary discovery.
- **No Commercial Endorsement**: No official endorsement, sponsorship, or affiliation with Desai Foods Pvt. Ltd. is claimed or implied.
