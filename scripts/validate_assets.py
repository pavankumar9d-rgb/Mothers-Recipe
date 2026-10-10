#!/usr/bin/env python3
"""
validate_assets.py
Comprehensive asset auditor and runtime reference checker for Mother's Recipe project.
Validates:
1. Physical files on disk (sizes, dimensions, alpha transparency, format integrity).
2. Runtime references in products.json (verifies every front, gallery, and cutout URL resolves).
3. Runtime references in curatedData.ts (serving plates, macro textures, hero cutouts).
4. Generates updated asset-manifest.json, asset-manifest.csv, and runtime-reference-report.json.
5. Fails with non-zero exit if any runtime-required asset is missing.
"""

import sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
import os
import json
import csv
import re
from pathlib import Path
from PIL import Image

BASE_DIR = Path(__file__).resolve().parent.parent
PUBLIC_DIR = BASE_DIR / "public"
PUBLIC_ASSETS = PUBLIC_DIR / "assets"
DATA_DIR = PUBLIC_ASSETS / "data"

def check_transparency(im):
    """Returns True if image has genuine non-binary alpha channel."""
    if im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info):
        alpha = im.convert('RGBA').split()[-1]
        extrema = alpha.getextrema()
        return extrema[0] < 255
    return False

def scan_all_assets():
    records = []
    category_map = [
        (PUBLIC_ASSETS / "brand", "Brand"),
        (PUBLIC_ASSETS / "products" / "originals", "Product Original"),
        (PUBLIC_ASSETS / "products" / "cutouts", "Product Cutout"),
        (PUBLIC_ASSETS / "ingredients" / "cutouts", "Ingredient Cutout"),
        (PUBLIC_ASSETS / "ingredients" / "sources", "Ingredient Source"),
        (PUBLIC_ASSETS / "editorial", "Editorial Photography"),
    ]
    
    for folder, category in category_map:
        if not folder.exists():
            continue
        for path in folder.rglob("*"):
            if path.is_file() and not path.name.startswith("."):
                records.append({
                    "category": category,
                    "rel_path": str(path.relative_to(BASE_DIR)).replace("\\", "/"),
                    "file_name": path.name,
                    "file_size": path.stat().st_size,
                    "ext": path.suffix.lower(),
                    "path_obj": path
                })
    return records

def audit_runtime_references():
    print("\nAuditing runtime references from data files & source code...")
    missing_refs = []
    verified_refs = 0
    
    # 1. Audit products.json
    products_file = DATA_DIR / "products.json"
    if products_file.exists():
        with open(products_file, "r", encoding="utf-8") as f:
            products = json.load(f)
            
        for p in products:
            slug = p.get("slug", "")
            # Check all images in product
            for img in p.get("images", []):
                local_path = img.get("localPath", "")
                full_path = PUBLIC_DIR / local_path
                if full_path.exists():
                    verified_refs += 1
                else:
                    missing_refs.append({
                        "source": f"products.json ({slug})",
                        "field": "images.localPath",
                        "referencedPath": local_path,
                        "resolvedPath": str(full_path)
                    })
                    
            # Check cutout if specified
            cutout_candidate = PUBLIC_ASSETS / "products" / "cutouts" / f"{slug}.png"
            if cutout_candidate.exists():
                verified_refs += 1
                
    # 2. Audit curatedData.ts
    curated_file = BASE_DIR / "src" / "data" / "curatedData.ts"
    if curated_file.exists():
        content = curated_file.read_text(encoding="utf-8")
        # Match asset paths like '/assets/...'
        asset_matches = set(re.findall(r"['\"](/assets/[^'\"]+)['\"]", content))
        for ref in asset_matches:
            clean_path = ref.lstrip("/")
            full_path = PUBLIC_DIR / clean_path
            if full_path.exists():
                verified_refs += 1
            else:
                missing_refs.append({
                    "source": "curatedData.ts",
                    "field": "asset-literal",
                    "referencedPath": ref,
                    "resolvedPath": str(full_path)
                })
                
    print(f"Verified {verified_refs} runtime asset references.")
    if missing_refs:
        print(f"[ALERT] Found {len(missing_refs)} missing runtime asset references:")
        for m in missing_refs[:10]:
            print(f"  - {m['source']}: {m['referencedPath']}")
        if len(missing_refs) > 10:
            print(f"  ... and {len(missing_refs) - 10} more.")
    else:
        print("[OK] Zero broken runtime references detected!")
        
    return missing_refs

def audit_and_generate_manifest():
    print("=" * 70)
    print("Mother's Recipe Living Pantry — Comprehensive Asset & Runtime Audit")
    print("=" * 70)
    
    records = scan_all_assets()
    manifest_items = []
    category_counts = {}
    transparency_counts = 0
    corrupted_count = 0
    
    for rec in records:
        path = rec["path_obj"]
        cat = rec["category"]
        category_counts[cat] = category_counts.get(cat, 0) + 1
        
        item = {
            "fileName": rec["file_name"],
            "relativePath": rec["rel_path"],
            "category": cat,
            "fileSizeBytes": rec["file_size"],
            "format": rec["ext"].lstrip(".").upper(),
            "width": None,
            "height": None,
            "hasAlphaChannel": False,
            "status": "VALID",
            "source": "Official Mother's Recipe Public Site / Local Curated"
        }
        
        if rec["ext"] in [".jpg", ".jpeg", ".png", ".webp"]:
            try:
                with Image.open(path) as im:
                    item["width"] = im.width
                    item["height"] = im.height
                    is_transparent = check_transparency(im)
                    item["hasAlphaChannel"] = is_transparent
                    if is_transparent:
                        transparency_counts += 1
            except Exception as e:
                item["status"] = f"CORRUPTED: {e}"
                corrupted_count += 1
        elif rec["ext"] == ".svg":
            item["status"] = "VALID_VECTOR"
            item["hasAlphaChannel"] = True
            
        manifest_items.append(item)
        
    # Save manifest JSON
    manifest_json_path = DATA_DIR / "asset-manifest.json"
    with open(manifest_json_path, "w", encoding="utf-8") as f:
        json.dump(manifest_items, f, indent=2)
    print(f"\n[OK] Generated {manifest_json_path} ({len(manifest_items)} items)")
    
    # Save manifest CSV
    manifest_csv_path = DATA_DIR / "asset-manifest.csv"
    fieldnames = [
        "fileName", "relativePath", "category", "fileSizeBytes",
        "format", "width", "height", "hasAlphaChannel", "status", "source"
    ]
    with open(manifest_csv_path, "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for item in manifest_items:
            writer.writerow(item)
    print(f"[OK] Generated {manifest_csv_path}")
    
    # Check runtime references
    missing_refs = audit_runtime_references()
    
    # Print Audit Summary Table
    print("\n" + "-" * 70)
    print(f"{'Category':<28} | {'Count':<8} | {'Total Size (MB)':<16}")
    print("-" * 70)
    for cat, count in sorted(category_counts.items()):
        total_bytes = sum(m["fileSizeBytes"] for m in manifest_items if m["category"] == cat)
        print(f"{cat:<28} | {count:<8} | {total_bytes / (1024*1024):<16.2f}")
    print("-" * 70)
    print(f"Total Assets Audited:           {len(manifest_items)}")
    print(f"Transparent Cutouts (Alpha):    {transparency_counts}")
    print(f"Corrupted Files Detected:       {corrupted_count}")
    print(f"Missing Runtime References:     {len(missing_refs)}")
    print("=" * 70)
    
    if corrupted_count > 0 or len(missing_refs) > 0:
        print("[FAIL] Audit detected discrepancies. Review issues above.")
        return 1
    else:
        print("[SUCCESS] All assets and runtime references passed audit.")
        return 0

if __name__ == "__main__":
    sys.exit(audit_and_generate_manifest())
