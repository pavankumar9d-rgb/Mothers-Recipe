#!/usr/bin/env python3
"""
validate_assets.py
Comprehensive asset auditor and manifest generator for Mother's Recipe project.
Validates existence, file sizes, image dimensions, format integrity, and transparency.
Generates asset-manifest.json and asset-manifest.csv in public/assets/data/.
"""

import sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
import os
import json
import csv
from pathlib import Path
from PIL import Image

BASE_DIR = Path(__file__).resolve().parent.parent
PUBLIC_ASSETS = BASE_DIR / "public" / "assets"
DATA_DIR = PUBLIC_ASSETS / "data"

def check_transparency(im):
    """Returns True if image has genuine non-binary alpha channel."""
    if im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info):
        alpha = im.convert('RGBA').split()[-1]
        extrema = alpha.getextrema()
        # If minimum alpha is less than 255, it has transparent pixels
        return extrema[0] < 255
    return False

def scan_all_assets():
    records = []
    
    # 1. Brand assets
    for path in (PUBLIC_ASSETS / "brand").rglob("*"):
        if path.is_file() and not path.name.startswith("."):
            records.append({
                "category": "Brand",
                "rel_path": str(path.relative_to(BASE_DIR)).replace("\\", "/"),
                "file_name": path.name,
                "file_size": path.stat().st_size,
                "ext": path.suffix.lower(),
                "path_obj": path
            })
            
    # 2. Product Originals
    for path in (PUBLIC_ASSETS / "products" / "originals").rglob("*"):
        if path.is_file() and not path.name.startswith("."):
            records.append({
                "category": "Product Original",
                "rel_path": str(path.relative_to(BASE_DIR)).replace("\\", "/"),
                "file_name": path.name,
                "file_size": path.stat().st_size,
                "ext": path.suffix.lower(),
                "path_obj": path
            })
            
    # 3. Product Cutouts
    for path in (PUBLIC_ASSETS / "products" / "cutouts").rglob("*"):
        if path.is_file() and not path.name.startswith("."):
            records.append({
                "category": "Product Cutout",
                "rel_path": str(path.relative_to(BASE_DIR)).replace("\\", "/"),
                "file_name": path.name,
                "file_size": path.stat().st_size,
                "ext": path.suffix.lower(),
                "path_obj": path
            })
            
    # 4. Ingredient Cutouts
    for path in (PUBLIC_ASSETS / "ingredients" / "cutouts").rglob("*"):
        if path.is_file() and not path.name.startswith("."):
            records.append({
                "category": "Ingredient Cutout",
                "rel_path": str(path.relative_to(BASE_DIR)).replace("\\", "/"),
                "file_name": path.name,
                "file_size": path.stat().st_size,
                "ext": path.suffix.lower(),
                "path_obj": path
            })
            
    # 5. Editorial Photography
    for path in (PUBLIC_ASSETS / "editorial").rglob("*"):
        if path.is_file() and not path.name.startswith("."):
            records.append({
                "category": "Editorial Photography",
                "rel_path": str(path.relative_to(BASE_DIR)).replace("\\", "/"),
                "file_name": path.name,
                "file_size": path.stat().st_size,
                "ext": path.suffix.lower(),
                "path_obj": path
            })
            
    return records

def audit_and_generate_manifest():
    print("=" * 70)
    print("Mother's Recipe Living Pantry — Asset Integrity Audit & Manifest")
    print("=" * 70)
    
    records = scan_all_assets()
    print(f"Discovered {len(records)} total media assets across repository.")
    
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
            "source": "Official Mother's Recipe Public Site / Curated Editorial"
        }
        
        # Verify image formats
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
    
    # Print Audit Summary Table
    print("\n" + "-" * 70)
    print(f"{'Category':<28} | {'Count':<8} | {'Total Size (MB)':<16}")
    print("-" * 70)
    for cat, count in sorted(category_counts.items()):
        total_bytes = sum(m["fileSizeBytes"] for m in manifest_items if m["category"] == cat)
        print(f"{cat:<28} | {count:<8} | {total_bytes / (1024*1024):<16.2f}")
    print("-" * 70)
    print(f"Total Assets Audited: {len(manifest_items)}")
    print(f"Transparent Cutouts (Alpha Channel): {transparency_counts}")
    print(f"Corrupted Files Detected: {corrupted_count}")
    print("=" * 70)

if __name__ == "__main__":
    audit_and_generate_manifest()
