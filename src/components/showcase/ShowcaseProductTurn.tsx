import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import type { ShowcaseProduct } from '../../data/showcaseProducts';
import { assetUrl } from '../../utils/paths';

export type ProductTurnHandle = { turn: (radians: number) => void };

export const ShowcaseProductTurn = forwardRef<ProductTurnHandle, { product: ShowcaseProduct }>(
  function ShowcaseProductTurn({ product }, ref) {
    const stageRef = useRef<HTMLDivElement>(null);
    const packet3dRef = useRef<HTMLDivElement>(null);
    const sheenRef = useRef<HTMLDivElement>(null);
    const shadowRef = useRef<HTMLDivElement>(null);
    const [imgLoaded, setImgLoaded] = useState(false);

    useImperativeHandle(
      ref,
      () => ({
        turn: (radians: number) => {
          if (!packet3dRef.current) return;
          const deg = (radians * 180) / Math.PI;
          const pitch = Math.sin(radians) * -4;
          const roll = Math.sin(radians * 0.5) * 2;

          // 3D rotation of entire physical packet
          packet3dRef.current.style.transform = `rotateY(${deg}deg) rotateX(${pitch}deg) rotateZ(${roll}deg)`;

          // Specular metallic sheen sweep across foil packaging
          if (sheenRef.current) {
            const sheenPos = ((radians / (Math.PI * 2)) % 1) * 200 - 50;
            sheenRef.current.style.backgroundPosition = `${sheenPos}% 50%`;
            const sheenOpacity = Math.max(0.12, Math.abs(Math.cos(radians)) * 0.55);
            sheenRef.current.style.opacity = String(sheenOpacity);
          }

          // Dynamic perspective ground shadow
          if (shadowRef.current) {
            const shadowScale = 0.45 + 0.55 * Math.abs(Math.cos(radians));
            const shadowSkew = Math.sin(radians) * 12;
            shadowRef.current.style.transform = `translateX(-50%) rotateX(80deg) scaleX(${shadowScale}) skewX(${shadowSkew}deg)`;
            shadowRef.current.style.opacity = String(0.28 + 0.32 * Math.abs(Math.cos(radians)));
          }
        }
      }),
      []
    );

    useEffect(() => {
      // Preload image
      const img = new Image();
      img.src = assetUrl(product.image);
      img.onload = () => setImgLoaded(true);
      img.onerror = () => {
        if (product.fallbackImage) {
          const fallback = new Image();
          fallback.src = assetUrl(product.fallbackImage);
          fallback.onload = () => setImgLoaded(true);
        } else {
          setImgLoaded(true);
        }
      };
    }, [product]);

    return (
      <div ref={stageRef} className="product-turn-stage" data-ready={imgLoaded}>
        {/* Dynamic 3D ground contact shadow */}
        <div ref={shadowRef} className="packet-ground-shadow" aria-hidden="true" />

        {/* 3D Packet container */}
        <div ref={packet3dRef} className="packet-3d-body">
          {/* Front Face: High-definition transparent pouch cutout */}
          <div className="packet-face packet-front">
            <img
              src={assetUrl(product.image)}
              alt={`Mother’s Recipe ${product.name} packaging`}
              draggable="false"
              onError={(e) => {
                if (product.fallbackImage) {
                  (e.currentTarget as HTMLImageElement).src = assetUrl(product.fallbackImage);
                }
              }}
            />
            {/* Dynamic metallic foil sheen */}
            <div ref={sheenRef} className="packet-foil-sheen" aria-hidden="true" />
          </div>

          {/* Back Face: Exact Stand-Up Pouch Silhouette masked with product cutout */}
          <div
            className="packet-face packet-back"
            aria-hidden="true"
            style={{
              maskImage: `url("${assetUrl(product.image)}")`,
              WebkitMaskImage: `url("${assetUrl(product.image)}")`,
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskPosition: 'center'
            }}
          >
            <div className="back-pouch-surface">
              {/* Top heat-seal crimp band with authentic ribbed embossing */}
              <div className="pouch-crimp-seal top-crimp">
                <div className="crimp-ribs" />
                <div className="crimp-labels">
                  <span className="notch-v left-notch">◀</span>
                  <span className="tear-text">▲ EASY TEAR PACK ▲</span>
                  <span className="notch-v right-notch">▶</span>
                </div>
              </div>

              {/* Main pouch back artwork */}
              <div className="pouch-back-content">
                <div className="back-header">
                  <span className="back-brand">Mother&apos;s Recipe</span>
                  <span className="back-tagline">TASTE THE LOVE</span>
                </div>

                <div className="back-name">{product.name}</div>
                <div className="back-regional-praise">
                  Authentic Indian culinary heritage prepared with traditional recipes and sun-ripened regional ingredients.
                </div>

                <div className="back-info-grid">
                  <div className="back-nutrition">
                    <div className="table-title">NUTRITIONAL INFO (Per 100g)</div>
                    <div className="nutri-row"><span>Energy</span><span>168 kcal</span></div>
                    <div className="nutri-row"><span>Protein</span><span>2.8 g</span></div>
                    <div className="nutri-row"><span>Carbohydrates</span><span>12.4 g</span></div>
                    <div className="nutri-row"><span>Total Fat</span><span>11.9 g</span></div>
                    <div className="nutri-row"><span>Sodium</span><span>4200 mg</span></div>
                  </div>

                  <div className="back-ingredients-panel">
                    <div className="panel-title">KEY INGREDIENTS</div>
                    <p>
                      {product.details.ingredients.map((ing) => ing.name).join(', ')}, Mustard Oil, Iodized Salt,
                      Turmeric Powder, Asafoetida, Acidity Regulator (E260).
                    </p>
                    <div className="veg-indicator">
                      <span className="veg-box"><span className="veg-dot" /></span>
                      <span className="veg-label">100% VEGETARIAN</span>
                    </div>
                  </div>
                </div>

                <div className="back-footer-meta">
                  <div className="dfpl-meta">
                    <strong>DESAI FOODS PVT. LTD.</strong>
                    <span>Pune 411001, Maharashtra, India</span>
                    <span>FSSAI Lic. No. 10012022000108</span>
                  </div>
                  <div className="barcode-mock">
                    <span className="bars" />
                    <span className="bar-num">8 906001 021487</span>
                  </div>
                </div>
              </div>

              {/* Bottom fold gusset heat-seal */}
              <div className="pouch-crimp-seal bottom-crimp">
                <span className="gusset-label">NET WT. 200g (7.05 oz) · STORE IN A COOL, DRY PLACE</span>
                <div className="crimp-ribs" />
              </div>
            </div>
            {/* Specular metallic foil sheen overlay */}
            <div className="packet-foil-sheen" aria-hidden="true" />
          </div>
        </div>
      </div>
    );
  }
);
