#!/usr/bin/env python3
"""
make_product_cutouts.py
Generates clean RGBA transparent cutouts with genuine alpha channels from authentic
Mother's Recipe front-packshot images using rembg.
"""

import sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
import os
import json
from pathlib import Path
from PIL import Image
import rembg

BASE_DIR = Path(__file__).resolve().parent.parent
PUBLIC_ASSETS = BASE_DIR / "public" / "assets"
PRODUCTS_ORIGINALS = PUBLIC_ASSETS / "products" / "originals"
PRODUCTS_CUTOUTS = PUBLIC_ASSETS / "products" / "cutouts"
DATA_DIR = PUBLIC_ASSETS / "data"

# Prioritize key representative products across diverse regional pickle traditions
PRIORITY_SLUGS = [
    "andhra-avakaya-pickle-200-gm",
    "andhra-gongura-pickle-200-gm",
    "andhra-tomato-pickle-200-gm",
    "andhra-ginger-pickle-200-gm",
    "punjabi-mango-pickle-400-gm",
    "punjabi-pachranga-pickle-400-gm",
    "punjabi-mango-pickle-200-gm",
    "green-chilli-pickle-500-gm",
    "green-chilli-pickle-200-gm",
    "stuffed-green-chilli-pickle-200-gm",
    "stuffed-red-chilli-pickle-200-gm",
    "mothers-recipe-red-stuffed-chilli-pickle-500gm",
    "garlic-pickle-200-gm",
    "garlic-pickle-south-indian-style-200-gm",
    "sweet-lime-pickle-200-gm",
    "lime-pickle-200-gm",
    "lime-chilli-pickle-200-gm",
    "gujarati-choondo-pickle-200-gm",
    "gujarati-gorkeri-pickle-200-gm",
    "mothers-recipe-mixed-pickle-400-gm",
    "mixed-pickle-200-gm",
    "mixed-pickle-south-indian-style-200-gm",
    "mothers-recipe-tomato-pickle-400gm",
    "tomato-pickle-with-garlic-300-gm",
    "ginger-pickle-300-gm",
    "karnataka-cut-mango-pickle-200-gm",
    "madras-thokku-pickle-200-gm",
    "crushed-mixed-pickle-300gm",
]

def trim_transparent(image, padding=25):
    """Trims outer fully transparent pixels while leaving a clean padding border."""
    bbox = image.getbbox()
    if bbox:
        # Expand bbox by padding within original image bounds
        left = max(0, bbox[0] - padding)
        top = max(0, bbox[1] - padding)
        right = min(image.width, bbox[2] + padding)
        bottom = min(image.height, bbox[3] + padding)
        return image.crop((left, top, right, bottom))
    return image

def main():
    PRODUCTS_CUTOUTS.mkdir(parents=True, exist_ok=True)
    
    products_file = DATA_DIR / "products.json"
    if not products_file.exists():
        print("[FAIL] products.json not found! Run collect_official_products.py first.")
        return
        
    with open(products_file, "r", encoding="utf-8") as f:
        products = json.load(f)
        
    print(f"Loaded {len(products)} products from products.json.")
    
    # Map products by slug
    prod_map = {p["slug"]: p for p in products}
    
    # Determine target list
    target_slugs = []
    for s in PRIORITY_SLUGS:
        if s in prod_map:
            target_slugs.append(s)
            
    # If fewer than 25, add others that have front images
    for p in products:
        if len(target_slugs) >= 25:
            break
        if p["slug"] not in target_slugs:
            target_slugs.append(p["slug"])
            
    print(f"Targeting {len(target_slugs)} products for transparent cutout generation...")
    
    # Initialize rembg session once to avoid reloading model weights
    session = rembg.new_session()
    
    successful_cutouts = []
    
    for idx, slug in enumerate(target_slugs):
        prod = prod_map[slug]
        slug_dir = PRODUCTS_ORIGINALS / slug
        if not slug_dir.exists():
            continue
            
        # Find front original image
        front_img = None
        for file in slug_dir.iterdir():
            if "front" in file.name.lower() or "page1" in file.name.lower():
                front_img = file
                break
        if not front_img:
            # Pick first image
            imgs = list(slug_dir.iterdir())
            if imgs:
                front_img = imgs[0]
                
        if not front_img:
            print(f"  [{idx+1}/{len(target_slugs)}] No image found for {slug}")
            continue
            
        out_png_path = PRODUCTS_CUTOUTS / f"{slug}.png"
        
        # Check if already processed and valid
        if out_png_path.exists() and out_png_path.stat().st_size > 5000:
            print(f"  [{idx+1}/{len(target_slugs)}] [EXISTS] {slug}.png ({out_png_path.stat().st_size} bytes)")
            successful_cutouts.append({
                "slug": slug,
                "path": str(out_png_path.relative_to(BASE_DIR)).replace("\\", "/"),
                "size": out_png_path.stat().st_size
            })
            continue
            
        print(f"  [{idx+1}/{len(target_slugs)}] Processing {slug} from {front_img.name}...")
        try:
            with Image.open(front_img) as orig_im:
                orig_im = orig_im.convert("RGB")
                cutout = rembg.remove(orig_im, session=session)
                # Trim extra empty border
                trimmed = trim_transparent(cutout, padding=25)
                # Save with maximum PNG compression
                trimmed.save(out_png_path, "PNG", optimize=True)
                
            w, h = trimmed.size
            file_size = out_png_path.stat().st_size
            print(f"    -> [OK] Saved {slug}.png ({w}x{h}, {file_size} bytes, mode={trimmed.mode})")
            
            successful_cutouts.append({
                "slug": slug,
                "path": str(out_png_path.relative_to(BASE_DIR)).replace("\\", "/"),
                "size": file_size,
                "dimensions": [w, h]
            })
        except Exception as e:
            print(f"    -> [FAIL] Error processing {slug}: {e}")
            
    print(f"\n[SUMMARY] Successfully created {len(successful_cutouts)} transparent product cutouts in {PRODUCTS_CUTOUTS}")

if __name__ == "__main__":
    main()
