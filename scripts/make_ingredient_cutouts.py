#!/usr/bin/env python3
"""
make_ingredient_cutouts.py
Extracts and generates 20+ distinct high-craft transparent RGBA ingredient and prop cutouts
with genuine alpha channels into public/assets/ingredients/cutouts/
"""

import sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
import os
import glob
from pathlib import Path
from PIL import Image
import rembg

BASE_DIR = Path(__file__).resolve().parent.parent
PUBLIC_ASSETS = BASE_DIR / "public" / "assets"
INGREDIENTS_CUTOUTS = PUBLIC_ASSETS / "ingredients" / "cutouts"
BRAIN_DIR = Path(r"C:\Users\saipa\.gemini\antigravity-ide\brain\0e01687b-ba28-46e5-a098-183dfe06517f")

def trim_transparent(image, padding=15):
    bbox = image.getbbox()
    if bbox:
        left = max(0, bbox[0] - padding)
        top = max(0, bbox[1] - padding)
        right = min(image.width, bbox[2] + padding)
        bottom = min(image.height, bbox[3] + padding)
        return image.crop((left, top, right, bottom))
    return image

def process_isolated_props(session):
    props = [
        ("prop_raw_mango*", "raw-mango-whole.png"),
        ("prop_mango_slices*", "mango-wedges-cubes.png"),
        ("prop_red_chillies*", "red-chilli-pair.png"),
        ("prop_green_chillies*", "green-chilli-pair.png"),
        ("prop_garlic_bulb*", "garlic-bulb-cloves.png"),
    ]
    
    count = 0
    for pattern, out_name in props:
        matches = list(BRAIN_DIR.glob(pattern))
        if not matches:
            continue
        src = matches[0]
        out_file = INGREDIENTS_CUTOUTS / out_name
        if out_file.exists() and out_file.stat().st_size > 5000:
            print(f"  [EXISTS] {out_name}")
            count += 1
            continue
            
        print(f"  Processing isolated prop: {out_name}...", flush=True)
        try:
            with Image.open(src) as im:
                im = im.convert("RGB")
                if max(im.size) > 800:
                    im.thumbnail((800, 800), Image.Resampling.LANCZOS)
                cutout = rembg.remove(im, session=session)
                trimmed = trim_transparent(cutout, padding=20)
                trimmed.save(out_file, "PNG", optimize=True)
            print(f"    -> [OK] Saved {out_name} ({trimmed.size[0]}x{trimmed.size[1]})", flush=True)
            count += 1
        except Exception as e:
            print(f"    -> [FAIL] {out_name}: {e}", flush=True)
            
    return count

def process_still_life_crops(session):
    # Locate master still life images
    spices_matches = list(BRAIN_DIR.glob("editorial_spices_alchemy*"))
    hero_matches = list(BRAIN_DIR.glob("editorial_hero_wide*"))
    tabletop_matches = list(BRAIN_DIR.glob("editorial_tabletop_still*"))
    
    crops = []
    
    if spices_matches:
        spices_img = spices_matches[0]
        # In spices flatlay (typically 1920x1080 or 1792x1008):
        # We can crop the distinct bowls and elements:
        crops.extend([
            ("fenugreek-seeds-bowl.png", spices_img, (0.24, 0.12, 0.42, 0.42)),
            ("mustard-seeds-bowl.png", spices_img, (0.11, 0.33, 0.29, 0.63)),
            ("coriander-seeds-bowl.png", spices_img, (0.24, 0.55, 0.43, 0.86)),
            ("cumin-seeds-bowl.png", spices_img, (0.41, 0.68, 0.59, 0.98)),
            ("sea-salt-bowl.png", spices_img, (0.41, 0.02, 0.58, 0.30)),
            ("dried-red-chilli-bowl.png", spices_img, (0.37, 0.29, 0.60, 0.66)),
            ("garlic-cloves-bowl.png", spices_img, (0.57, 0.50, 0.77, 0.84)),
            ("garlic-bulb-antique-bowl.png", spices_img, (0.56, 0.10, 0.75, 0.44)),
            ("mustard-oil-bottle.png", spices_img, (0.71, 0.21, 0.86, 0.56)),
            ("spiced-oil-katori.png", spices_img, (0.77, 0.47, 0.96, 0.77)),
        ])
            
    if hero_matches:
        hero_img = hero_matches[0]
        crops.extend([
            ("brass-spoon-golden-oil.png", hero_img, (0.08, 0.42, 0.42, 0.82)),
            ("raw-mango-cut-wedge.png", hero_img, (0.49, 0.49, 0.67, 0.65)),
            ("earthen-pickle-bowl.png", hero_img, (0.26, 0.38, 0.51, 0.62)),
            ("curry-leaves-cluster.png", hero_img, (0.63, 0.60, 0.75, 0.72)),
        ])
        
    if tabletop_matches:
        table_img = tabletop_matches[0]
        crops.extend([
            ("turmeric-powder-mound.png", table_img, (0.43, 0.58, 0.62, 0.82)),
            ("mustard-seeds-scatter.png", table_img, (0.22, 0.71, 0.43, 0.93)),
            ("fresh-curry-leaf-sprig.png", table_img, (0.53, 0.78, 0.87, 0.99)),
            ("clay-oil-dish-wooden-spoon.png", table_img, (0.61, 0.43, 0.95, 0.80)),
            ("whole-red-chillies-bundle.png", table_img, (0.47, 0.17, 0.74, 0.54)),
            ("chopped-raw-mango-mound.png", table_img, (0.20, 0.21, 0.51, 0.57)),
        ])
        
    count = 0
    for out_name, src_file, box_frac in crops:
        out_file = INGREDIENTS_CUTOUTS / out_name
        if out_file.exists() and out_file.stat().st_size > 5000:
            print(f"  [EXISTS] {out_name}", flush=True)
            count += 1
            continue
            
        print(f"  Cropping and isolating {out_name}...", flush=True)
        try:
            with Image.open(src_file) as im:
                w, h = im.size
                crop_box = (
                    int(box_frac[0] * w),
                    int(box_frac[1] * h),
                    int(box_frac[2] * w),
                    int(box_frac[3] * h)
                )
                cropped = im.crop(crop_box).convert("RGB")
                if max(cropped.size) > 600:
                    cropped.thumbnail((600, 600), Image.Resampling.LANCZOS)
                cutout = rembg.remove(cropped, session=session)
                trimmed = trim_transparent(cutout, padding=15)
                trimmed.save(out_file, "PNG", optimize=True)
            print(f"    -> [OK] Saved {out_name} ({trimmed.size[0]}x{trimmed.size[1]})", flush=True)
            count += 1
        except Exception as e:
            print(f"    -> [FAIL] {out_name}: {e}", flush=True)
            
    return count

def main():
    INGREDIENTS_CUTOUTS.mkdir(parents=True, exist_ok=True)
    print("Generating transparent ingredient & prop cutouts...")
    session = rembg.new_session()
    c1 = process_isolated_props(session)
    c2 = process_still_life_crops(session)
    total = len(list(INGREDIENTS_CUTOUTS.glob("*.png")))
    print(f"\n[SUMMARY] Total ingredient cutouts in {INGREDIENTS_CUTOUTS}: {total}")

if __name__ == "__main__":
    main()
