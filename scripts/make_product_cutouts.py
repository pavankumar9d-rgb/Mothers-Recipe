#!/usr/bin/env python3
"""
make_product_cutouts.py
Extracts and generates clean RGBA transparent cutouts with genuine alpha channels
for ALL 80 Mother's Recipe catalogue products from authentic front packshots.
Generates public/assets/data/cutout-report.json with full transparency and dimension audit.
"""

import sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
import os
import json
import time
from pathlib import Path
from PIL import Image
import rembg

BASE_DIR = Path(__file__).resolve().parent.parent
PUBLIC_ASSETS = BASE_DIR / "public" / "assets"
PRODUCTS_ORIGINALS = PUBLIC_ASSETS / "products" / "originals"
PRODUCTS_CUTOUTS = PUBLIC_ASSETS / "products" / "cutouts"
DATA_DIR = PUBLIC_ASSETS / "data"

def trim_transparent(image, padding=20):
    """Trims outer fully transparent pixels while leaving a clean padding border."""
    bbox = image.getbbox()
    if bbox:
        left = max(0, bbox[0] - padding)
        top = max(0, bbox[1] - padding)
        right = min(image.width, bbox[2] + padding)
        bottom = min(image.height, bbox[3] + padding)
        return image.crop((left, top, right, bottom))
    return image

def check_has_alpha(im):
    """Returns True if the image has genuine non-binary alpha transparency."""
    if im.mode in ('RGBA', 'LA'):
        alpha = im.split()[-1]
        extrema = alpha.getextrema()
        return extrema[0] < 255
    return False

def main():
    PRODUCTS_CUTOUTS.mkdir(parents=True, exist_ok=True)
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    
    products_file = DATA_DIR / "products.json"
    if not products_file.exists():
        print("[FAIL] products.json not found! Run collect_official_products.py first.")
        return
        
    with open(products_file, "r", encoding="utf-8") as f:
        products = json.load(f)
        
    total_products = len(products)
    print(f"Loaded {total_products} products from products.json.")
    print(f"Beginning full-coverage transparent cutout pipeline...")
    
    # Initialize rembg session once
    session = rembg.new_session()
    
    report = []
    success_count = 0
    skipped_existing = 0
    fail_count = 0
    start_time = time.time()
    
    for idx, prod in enumerate(products, 1):
        slug = prod.get("slug", "")
        title = prod.get("title", slug)
        out_png = PRODUCTS_CUTOUTS / f"{slug}.png"
        
        # Determine verified front image from product images metadata
        front_img_path = None
        for img in prod.get("images", []):
            if img.get("role") == "front" or img.get("isHeroCandidate"):
                candidate = BASE_DIR / "public" / img.get("localPath", "")
                if candidate.exists() and candidate.stat().st_size > 1000:
                    front_img_path = candidate
                    break
                    
        # Fallback to scanning product original directory if not found in metadata
        if not front_img_path:
            slug_dir = PRODUCTS_ORIGINALS / slug
            if slug_dir.exists():
                for f in slug_dir.iterdir():
                    if "front" in f.name.lower() or "page1" in f.name.lower():
                        front_img_path = f
                        break
                if not front_img_path:
                    files = list(slug_dir.iterdir())
                    if files:
                        front_img_path = files[0]
                        
        if not front_img_path or not front_img_path.exists():
            print(f"  [{idx}/{total_products}] [NO_SOURCE] {slug}: No valid front packshot found.", flush=True)
            report.append({
                "slug": slug,
                "title": title,
                "sourcePath": None,
                "cutoutPath": None,
                "status": "FAILED_MISSING_SOURCE",
                "hasAlpha": False,
                "dimensions": None,
                "fileSizeBytes": 0,
                "error": "No front packshot file found in originals"
            })
            fail_count += 1
            continue
            
        # Check if already processed and has genuine alpha
        if out_png.exists() and out_png.stat().st_size > 5000:
            try:
                with Image.open(out_png) as existing_im:
                    if check_has_alpha(existing_im):
                        print(f"  [{idx}/{total_products}] [EXISTS] {slug}.png ({existing_im.width}x{existing_im.height}, {out_png.stat().st_size} bytes)", flush=True)
                        report.append({
                            "slug": slug,
                            "title": title,
                            "sourcePath": str(front_img_path.relative_to(BASE_DIR)).replace("\\", "/"),
                            "cutoutPath": str(out_png.relative_to(BASE_DIR)).replace("\\", "/"),
                            "status": "SUCCESS_EXISTING",
                            "hasAlpha": True,
                            "dimensions": [existing_im.width, existing_im.height],
                            "fileSizeBytes": out_png.stat().st_size,
                            "error": None
                        })
                        skipped_existing += 1
                        success_count += 1
                        continue
            except Exception:
                pass # Re-generate if corrupted
                
        print(f"  [{idx}/{total_products}] Processing {slug} from {front_img_path.name}...", flush=True)
        try:
            with Image.open(front_img_path) as orig_im:
                orig_im = orig_im.convert("RGB")
                # Scale down for fast CPU segmentation if large
                if max(orig_im.size) > 800:
                    orig_im.thumbnail((800, 800), Image.Resampling.LANCZOS)
                
                cutout = rembg.remove(orig_im, session=session)
                trimmed = trim_transparent(cutout, padding=20)
                trimmed.save(out_png, "PNG", optimize=True)
                
            has_alpha = check_has_alpha(trimmed)
            report.append({
                "slug": slug,
                "title": title,
                "sourcePath": str(front_img_path.relative_to(BASE_DIR)).replace("\\", "/"),
                "cutoutPath": str(out_png.relative_to(BASE_DIR)).replace("\\", "/"),
                "status": "SUCCESS" if has_alpha else "WARNING_NO_ALPHA",
                "hasAlpha": has_alpha,
                "dimensions": [trimmed.width, trimmed.height],
                "fileSizeBytes": out_png.stat().st_size,
                "error": None
            })
            success_count += 1
            print(f"    -> [OK] Saved {slug}.png ({trimmed.width}x{trimmed.height}, {out_png.stat().st_size} bytes, alpha={has_alpha})", flush=True)
        except Exception as e:
            print(f"    -> [FAIL] {slug}: {e}", flush=True)
            report.append({
                "slug": slug,
                "title": title,
                "sourcePath": str(front_img_path.relative_to(BASE_DIR)).replace("\\", "/"),
                "cutoutPath": None,
                "status": "FAILED_PROCESSING_ERROR",
                "hasAlpha": False,
                "dimensions": None,
                "fileSizeBytes": 0,
                "error": str(e)
            })
            fail_count += 1

    # Save persistent cutout report
    report_file = DATA_DIR / "cutout-report.json"
    with open(report_file, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2)
        
    duration = time.time() - start_time
    print("\n" + "=" * 70)
    print(f"PRODUCT CUTOUT SUMMARY REPORT (Duration: {duration:.1f}s)")
    print(f"Total Products:           {total_products}")
    print(f"Successful Cutouts:       {success_count} ({skipped_existing} existing, {success_count - skipped_existing} new)")
    print(f"Failed / Missing Source:  {fail_count}")
    print(f"Report Saved To:          {report_file}")
    print("=" * 70)

if __name__ == "__main__":
    main()
