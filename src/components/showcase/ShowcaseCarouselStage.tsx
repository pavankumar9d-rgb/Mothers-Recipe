import { useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { ShowcaseProduct } from '../../data/showcaseProducts';
import { blobPath } from '../../utils/blob';
import { assetUrl } from '../../utils/paths';

const mod = (n: number, length: number) => ((n % length) + length) % length;

interface ShowcaseCarouselStageProps {
  products: ShowcaseProduct[];
  active: number;
  setActive: (index: number) => void;
  automatic: boolean;
  reduced: boolean;
  transitioning: boolean;
  onOpenProduct: (product: ShowcaseProduct, origin?: HTMLElement) => void;
}

export function ShowcaseCarouselStage({
  products,
  active,
  setActive,
  automatic,
  reduced,
  transitioning,
  onOpenProduct
}: ShowcaseCarouselStageProps) {
  const stage = useRef<HTMLElement>(null);
  const jars = useRef<(HTMLButtonElement | null)[]>([]);
  const backdrop = useRef<SVGGElement>(null);
  const contour = useRef<SVGPathElement>(null);
  const cursor = useRef(0);
  const target = useRef(0);
  const dragging = useRef<{ start: number; offset: number; moved: boolean } | null>(null);
  const hover = useRef(false);
  const idleUntil = useRef(0);

  useEffect(() => {
    let raf = 0;
    let previous = performance.now();
    let elapsed = 0;
    let lastActive = -1;

    const animate = (now: number) => {
      const dt = Math.min(now - previous, 40);
      previous = now;
      elapsed += dt;

      if (automatic && !dragging.current && !transitioning && elapsed > 2400 && now > idleUntil.current) {
        target.current += dt * 0.000085 * (hover.current ? 0.25 : 1);
      }
      cursor.current += (target.current - cursor.current) * (reduced ? 1 : 1 - Math.exp(-dt / 125));

      const width = window.innerWidth;
      const mobile = width < 700;

      jars.current.forEach((el, i) => {
        if (!el) return;
        const offset = mod(i - cursor.current + products.length / 2, products.length) - products.length / 2;
        const distance = Math.abs(offset);
        const x = offset * width * (mobile ? 0.62 : 0.29);
        const y = Math.min(distance, 2.8) * (mobile ? 35 : 47) + Math.sin(offset * 1.2) * 22;
        const scale = Math.max(0.54, 1 - distance * 0.17);

        el.style.transform = `translate(-50%,-50%) translate3d(${x}px,${y}px,0) rotateY(${offset * -18}deg) rotateZ(${offset * 7}deg) scale(${scale})`;
        el.style.zIndex = String(10 - Math.round(distance));
        el.style.opacity = String(Math.max(0, Math.min(1, 3 - distance)));
        el.style.visibility = distance > (mobile ? 1.6 : 2.7) ? 'hidden' : 'visible';
      });

      const phase = cursor.current * 0.82;
      backdrop.current?.setAttribute(
        'transform',
        `translate(${Math.sin(phase) * 14} ${(Math.cos(phase) - 1) * 8}) rotate(${Math.sin(phase * 0.9) * 7} 500 500)`
      );
      if (!reduced) {
        contour.current?.setAttribute('d', blobPath(500, 500, 440, phase + now / 1100));
      }

      const index = mod(Math.round(cursor.current), products.length);
      if (index !== lastActive) {
        lastActive = index;
        setActive(index);
      }
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [products, automatic, reduced, transitioning, setActive]);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (transitioning) return;
      idleUntil.current = performance.now() + 4000;
      target.current += Math.max(-100, Math.min(100, e.deltaY + e.deltaX)) * 0.0035;
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [transitioning]);

  const step = (direction: number) => {
    idleUntil.current = performance.now() + 4000;
    target.current = Math.round(target.current) + direction;
  };

  const currentProduct = products[active] || products[0];

  return (
    <section
      ref={stage}
      className={`carousel-stage ${transitioning ? 'is-leaving' : ''}`}
      aria-label="Explore Mother's Recipe flavours"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          step(1);
        }
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          step(-1);
        }
      }}
      onPointerDown={(e) => {
        if (transitioning) return;
        dragging.current = { start: e.clientX, offset: target.current, moved: false };
        idleUntil.current = performance.now() + 4000;
      }}
      onPointerMove={(e) => {
        const d = dragging.current;
        if (d) {
          if (Math.abs(e.clientX - d.start) > 7) d.moved = true;
          target.current =
            d.offset - ((e.clientX - d.start) / window.innerWidth) * (window.innerWidth < 700 ? 1.8 : 3.4);
        }
      }}
      onPointerUp={() => {
        if (dragging.current) {
          if (dragging.current.moved) target.current = Math.round(target.current);
          idleUntil.current = performance.now() + 4000;
          setTimeout(() => {
            dragging.current = null;
          }, 0);
        }
      }}
      onPointerLeave={() => {
        hover.current = false;
        if (dragging.current) {
          target.current = Math.round(target.current);
          dragging.current = null;
        }
      }}
    >
      <h1 className="sr-only">Mother&apos;s Recipe. Taste the tradition.</h1>

      <div className="carousel-mound" aria-hidden="true">
        <svg viewBox="0 0 1000 1000">
          <defs>
            <radialGradient id="stage-aura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#C8601E" stopOpacity="0.28" />
              <stop offset="55%" stopColor="#8F1D2C" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#8F1D2C" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="crest-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8F1D2C" />
              <stop offset="50%" stopColor="#6E121E" />
              <stop offset="100%" stopColor="#4A0A12" />
            </linearGradient>
            <linearGradient id="gold-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5D48B" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#D4A359" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#9E6C28" stopOpacity="0.4" />
            </linearGradient>
            <filter id="mound-shadow" x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="0" dy="18" stdDeviation="24" floodColor="#26100B" floodOpacity="0.22" />
            </filter>
            {/* Downward parabola brand arc (smile curve) */}
            <path id="brand-arc" d="M 110 390 Q 500 790 890 390" />
          </defs>

          {/* Ambient warm spice aura glow */}
          <circle cx="500" cy="500" r="470" fill="url(#stage-aura)" />

          <g ref={backdrop}>
            {/* Main sculpted organic crest */}
            <path
              ref={contour}
              className="mound-fill"
              d={blobPath(500, 500, 440, 0)}
              fill="url(#crest-gradient)"
              filter="url(#mound-shadow)"
            />
            {/* Delicate golden accent downward parabola arcs */}
            <path d="M 110 360 Q 500 760 890 360" fill="none" stroke="url(#gold-stroke)" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.65" />
            <path d="M 110 420 Q 500 820 890 420" fill="none" stroke="url(#gold-stroke)" strokeWidth="0.75" opacity="0.35" />

            {/* Downward parabolic heritage branding text */}
            <text className="mound-arc-text">
              <textPath href="#brand-arc" startOffset="50%" textAnchor="middle">
                ✦ TASTE THE TRADITION · MOTHER&apos;S RECIPE · SINCE 1962 ✦
              </textPath>
            </text>
          </g>
        </svg>
      </div>

      <div className="orbit" aria-label="Product carousel">
        {products.map((product, i) => (
          <button
            key={product.id}
            ref={(el) => {
              jars.current[i] = el;
            }}
            className="orbit-product"
            aria-label={`Discover ${product.name}`}
            onMouseEnter={() => {
              hover.current = true;
            }}
            onMouseLeave={() => {
              hover.current = false;
            }}
            onClick={(e) => {
              if (!dragging.current?.moved) {
                onOpenProduct(product, e.currentTarget);
              }
            }}
          >
            <img
              src={assetUrl(product.image)}
              alt={`Mother's Recipe ${product.name} packaging`}
              draggable="false"
              onError={(e) => {
                if (product.fallbackImage) {
                  (e.currentTarget as HTMLImageElement).src = assetUrl(product.fallbackImage);
                }
              }}
            />
            <span className="product-tooltip">
              {product.name}
              <span>↗</span>
            </span>
          </button>
        ))}
      </div>

      <div className="carousel-bottom">
        <button className="carousel-arrow" onClick={() => step(-1)} aria-label="Previous flavour">
          <ArrowLeft size={20} />
        </button>
        <div className="explore-prompt">
          <span className="flavour-name" aria-live="polite">
            {currentProduct.name}
          </span>
          <span>SCROLL OR DRAG TO EXPLORE</span>
          <div className="hero-ctas">
            <button
              className="cta cta-cream"
              onClick={() => onOpenProduct(currentProduct, jars.current[active] ?? undefined)}
            >
              Discover this flavour <ArrowRight size={13} />
            </button>
            <a className="cta cta-ghost" href={currentProduct.url} target="_blank" rel="noopener noreferrer">
              Shop now <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <button className="carousel-arrow" onClick={() => step(1)} aria-label="Next flavour">
          <ArrowRight size={20} />
        </button>
      </div>

      <div className="carousel-index" aria-hidden="true">
        0{active + 1}
        <span>/ 0{products.length}</span>
      </div>
    </section>
  );
}
