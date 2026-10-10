#!/usr/bin/env python3
"""
collect_official_products.py
Collects authentic Mother's Recipe pickle products and genuine packaging packshots
directly from the official website (mothersrecipe.com).
"""

import sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
import os
import json
import time
import urllib.parse
from pathlib import Path
import requests
from PIL import Image
import io

BASE_DIR = Path(__file__).resolve().parent.parent
PUBLIC_ASSETS = BASE_DIR / "public" / "assets"
PRODUCTS_ORIGINALS = PUBLIC_ASSETS / "products" / "originals"
BRAND_LOGO = PUBLIC_ASSETS / "brand" / "logo"
DATA_DIR = PUBLIC_ASSETS / "data"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "text/html,application/json,image/webp,image/apng,image/*,*/*;q=0.8",
}

def ensure_dirs():
    for p in [
        PUBLIC_ASSETS / "brand" / "logo",
        PUBLIC_ASSETS / "brand" / "brand-reference",
        PRODUCTS_ORIGINALS,
        PUBLIC_ASSETS / "products" / "cutouts",
        PUBLIC_ASSETS / "products" / "detail-shots",
        PUBLIC_ASSETS / "products" / "cards",
        PUBLIC_ASSETS / "ingredients" / "cutouts",
        PUBLIC_ASSETS / "ingredients" / "editorial",
        PUBLIC_ASSETS / "editorial" / "hero",
        PUBLIC_ASSETS / "editorial" / "story",
        PUBLIC_ASSETS / "editorial" / "serving",
        PUBLIC_ASSETS / "editorial" / "textures",
        PUBLIC_ASSETS / "ui",
        PUBLIC_ASSETS / "previews",
        DATA_DIR,
    ]:
        p.mkdir(parents=True, exist_ok=True)

def download_logo():
    print("[1/3] Downloading official brand logo...")
    logo_svg_url = "https://www.mothersrecipe.com/cdn/shop/files/MR_new_Logo_C.svg?v=1686908477"
    try:
        r = requests.get(logo_svg_url, headers=HEADERS, timeout=15)
        if r.status_code == 200:
            svg_path = BRAND_LOGO / "mothers-recipe-logo.svg"
            svg_path.write_bytes(r.content)
            print(f"  [OK] Saved official SVG logo ({len(r.content)} bytes) -> {svg_path.name}")
    except Exception as e:
        print(f"  [FAIL] Failed downloading SVG logo: {e}")

    # Also secondary logo PNG if available
    logo_png_url = "https://cdn.shopify.com/s/files/1/0720/7872/1333/files/Logo-DFPL.png?v=1691729782"
    try:
        r = requests.get(logo_png_url, headers=HEADERS, timeout=15)
        if r.status_code == 200:
            png_path = BRAND_LOGO / "mothers-recipe-dfpl-logo.png"
            png_path.write_bytes(r.content)
            print(f"  [OK] Saved DFPL corporate logo ({len(r.content)} bytes) -> {png_path.name}")
    except Exception as e:
        print(f"  [FAIL] Failed downloading PNG logo: {e}")

def fetch_products():
    print("[2/3] Fetching products from official Mother's Recipe catalogue...")
    collections = [
        "https://www.mothersrecipe.com/collections/pickle/products.json?limit=250",
        "https://www.mothersrecipe.com/collections/pickles/products.json?limit=250"
    ]
    
    seen_handles = set()
    all_raw_products = []
    
    for url in collections:
        try:
            print(f"  Fetching: {url}")
            r = requests.get(url, headers=HEADERS, timeout=20)
            if r.status_code == 200:
                data = r.json()
                products = data.get("products", [])
                print(f"  -> Found {len(products)} products")
                for p in products:
                    if p["handle"] not in seen_handles:
                        seen_handles.add(p["handle"])
                        all_raw_products.append(p)
        except Exception as e:
            print(f"  -> Error fetching {url}: {e}")
            
    print(f"Total unique pickle products discovered: {len(all_raw_products)}")
    return all_raw_products

def clean_image_url(url):
    # Shopify URLs often have ?v=... and width parameters; strip query params for maximum resolution
    parsed = urllib.parse.urlparse(url)
    clean_url = f"{parsed.scheme}:{parsed.netloc}{parsed.path}" if not parsed.scheme else f"{parsed.scheme}://{parsed.netloc}{parsed.path}"
    if clean_url.startswith("://"):
        clean_url = "https" + clean_url
    elif clean_url.startswith("//"):
        clean_url = "https:" + clean_url
    return clean_url

def download_and_organize_products(raw_products):
    print("[3/3] Downloading original product images and generating products.json...")
    organized_products = []
    failed_assets = []
    
    total_images_downloaded = 0
    
    for idx, p in enumerate(raw_products):
        title = p.get("title", "").strip()
        handle = p.get("handle", "").strip()
        slug = handle
        product_url = f"https://www.mothersrecipe.com/products/{handle}"
        
        # Product details
        variants = p.get("variants", [])
        primary_variant = variants[0] if variants else {}
        price = primary_variant.get("price", "N/A")
        weight = primary_variant.get("title", "")
        # Clean weight if it's default title
        if weight.lower() == "default title":
            # Extract from product title
            weight = ""
            for part in title.split(","):
                if "gm" in part.lower() or "kg" in part.lower() or "g" in part.lower():
                    weight = part.strip()
        
        # Description
        body_html = p.get("body_html", "") or ""
        # Simple plain text extraction from body_html
        import re
        plain_desc = re.sub(r"<[^>]+>", " ", body_html).strip()
        plain_desc = re.sub(r"\s+", " ", plain_desc)
        
        # Determine region and spice tag
        region = "All India"
        title_lower = title.lower()
        if "andhra" in title_lower or "gongura" in title_lower or "avakaya" in title_lower or "thokku" in title_lower:
            region = "Andhra & South"
        elif "punjabi" in title_lower or "pachranga" in title_lower:
            region = "Punjab & North"
        elif "gujarati" in title_lower or "choondo" in title_lower or "gorkeri" in title_lower:
            region = "Gujarat & West"
        elif "karnataka" in title_lower:
            region = "Karnataka"
        elif "madras" in title_lower or "kerala" in title_lower:
            region = "South India"
            
        # Determine flavor/ingredient category
        category = "Specialty"
        if "mango" in title_lower or "avakaya" in title_lower or "aam" in title_lower:
            category = "Mango"
        elif "chilli" in title_lower or "mirchi" in title_lower:
            category = "Chilli"
        elif "garlic" in title_lower or "lahsun" in title_lower:
            category = "Garlic"
        elif "mixed" in title_lower or "pachranga" in title_lower:
            category = "Mixed"
        elif "lime" in title_lower or "lemon" in title_lower:
            category = "Lime"
        elif "tomato" in title_lower:
            category = "Tomato"
        elif "ginger" in title_lower:
            category = "Ginger"
            
        prod_dir = PRODUCTS_ORIGINALS / slug
        prod_dir.mkdir(parents=True, exist_ok=True)
        
        local_image_paths = []
        raw_images = p.get("images", [])
        
        print(f"  [{idx+1}/{len(raw_products)}] {title} ({len(raw_images)} images)")
        
        for img_idx, img_info in enumerate(raw_images):
            src = img_info.get("src", "")
            if not src:
                continue
            clean_url = clean_image_url(src)
            
            # Name convention
            role = "front" if img_idx == 0 else f"gallery-{img_idx:02d}"
            ext = os.path.splitext(urllib.parse.urlparse(clean_url).path)[1] or ".jpg"
            if ext.lower() not in [".jpg", ".jpeg", ".png", ".webp"]:
                ext = ".jpg"
                
            local_filename = f"{slug}-{role}-original{ext}"
            target_path = prod_dir / local_filename
            rel_path = f"assets/products/originals/{slug}/{local_filename}"
            
            # Download if not exists or 0 bytes
            if not target_path.exists() or target_path.stat().st_size == 0:
                try:
                    r = requests.get(clean_url, headers=HEADERS, timeout=15)
                    if r.status_code == 200 and len(r.content) > 1000:
                        target_path.write_bytes(r.content)
                        # Verify valid image
                        with Image.open(target_path) as im:
                            w, h = im.size
                        total_images_downloaded += 1
                        time.sleep(0.05) # Polite rate limit
                    else:
                        failed_assets.append({
                            "url": clean_url,
                            "slug": slug,
                            "reason": f"HTTP {r.status_code} or small size"
                        })
                        continue
                except Exception as e:
                    failed_assets.append({
                        "url": clean_url,
                        "slug": slug,
                        "reason": str(e)
                    })
                    continue
                    
            local_image_paths.append({
                "role": role,
                "localPath": rel_path,
                "sourceUrl": clean_url,
                "isHeroCandidate": (img_idx == 0)
            })
            
        # Expected cutout path
        cutout_rel_path = f"assets/products/cutouts/{slug}.png"
        
        prod_data = {
            "id": p.get("id"),
            "slug": slug,
            "title": title,
            "handle": handle,
            "officialUrl": product_url,
            "category": category,
            "region": region,
            "price": price,
            "weight": weight,
            "description": plain_desc[:280] + ("..." if len(plain_desc) > 280 else ""),
            "images": local_image_paths,
            "cutoutPath": cutout_rel_path,
            "tags": p.get("tags", []),
            "inStock": primary_variant.get("available", True)
        }
        organized_products.append(prod_data)
        
    # Write products.json
    products_json_path = DATA_DIR / "products.json"
    with open(products_json_path, "w", encoding="utf-8") as f:
        json.dump(organized_products, f, indent=2, ensure_ascii=False)
    print(f"✓ Saved {len(organized_products)} products to {products_json_path}")
    
    # Write failed-assets.json
    failed_json_path = DATA_DIR / "failed-assets.json"
    with open(failed_json_path, "w", encoding="utf-8") as f:
        json.dump(failed_assets, f, indent=2)
    print(f"✓ Recorded {len(failed_assets)} failed downloads to {failed_json_path}")
    print(f"✓ Total downloaded original images: {total_images_downloaded}")

def main():
    ensure_dirs()
    download_logo()
    products = fetch_products()
    if products:
        download_and_organize_products(products)
    else:
        print("✗ No products fetched!")

if __name__ == "__main__":
    main()
