import { useEffect, useRef, useState } from 'react';
import { Pause, Play, ArrowLeft, ArrowRight } from 'lucide-react';
import { SHOWCASE_PRODUCTS, type ShowcaseProduct } from '../../data/showcaseProducts';
import { ArrowUpRight } from './ShowcaseMenuDrawer';
import { assetUrl } from '../../utils/paths';

const mod = (n: number, length: number) => ((n % length) + length) % length;

export function FlavourStreamMarquee({
  current,
  onOpen,
  reduced
}: {
  current: string;
  onOpen: (product: ShowcaseProduct) => void;
  reduced: boolean;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const cursor = useRef(0);
  const target = useRef(0);
  const dragging = useRef<{ start: number; offset: number; moved: boolean } | null>(null);
  const hover = useRef(false);
  const [playing, setPlaying] = useState(true);
  const idleUntil = useRef(0);

  // Set initial focus near current product
  useEffect(() => {
    const idx = SHOWCASE_PRODUCTS.findIndex((p) => p.id === current);
    if (idx !== -1) {
      cursor.current = idx;
      target.current = idx;
    }
  }, [current]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let raf = 0;
    let previous = performance.now();
    const count = SHOWCASE_PRODUCTS.length;

    const animate = (now: number) => {
      const dt = Math.min(now - previous, 40);
      previous = now;

      // Auto-cruise when playing and not dragging
      if (playing && !dragging.current && !reduced && now > idleUntil.current) {
        target.current += dt * 0.00045 * (hover.current ? 0.35 : 1);
      }

      // Smooth interpolation toward target
      cursor.current += (target.current - cursor.current) * (reduced ? 1 : 1 - Math.exp(-dt / 130));

      const width = stage.clientWidth || window.innerWidth;
      const isMobile = width < 700;
      const cardSpacing = isMobile ? Math.min(270, width * 0.65) : Math.min(340, width * 0.28);
      const depthStrength = isMobile ? 85 : 140;

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        // Wrapped distance from virtual center
        const offset = mod(i - cursor.current + count / 2, count) - count / 2;
        const dist = Math.abs(offset);

        // 3D Cylindrical Arc Transformation (like Image 4)
        const tx = offset * cardSpacing;
        const tz = -dist * depthStrength;
        const ry = Math.max(-42, Math.min(42, offset * -25)); // Rotate inward toward center
        const scale = Math.max(0.68, 1 - dist * 0.1);
        const opacity = Math.max(0, Math.min(1, 2.8 - dist * 0.9));
        const zIndex = Math.round(50 - dist * 10);

        el.style.transform = `translate(-50%, -50%) translate3d(${tx.toFixed(1)}px, 0, ${tz.toFixed(1)}px) rotateY(${ry.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        el.style.opacity = opacity.toFixed(3);
        el.style.zIndex = String(zIndex);
        el.style.visibility = dist > (isMobile ? 2.2 : 3.4) ? 'hidden' : 'visible';
      });

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [playing, reduced]);

  const step = (dir: number) => {
    idleUntil.current = performance.now() + 4500;
    target.current = Math.round(target.current) + dir;
  };

  const toggle = () => {
    setPlaying(!playing);
  };

  return (
    <div className="coverflow-wrapper">
      <div
        ref={stageRef}
        className="coverflow-stage"
        role="region"
        aria-label="3D Cylindrical Flavour Gallery"
        onMouseEnter={() => {
          hover.current = true;
        }}
        onMouseLeave={() => {
          hover.current = false;
          if (dragging.current) {
            target.current = Math.round(target.current);
            dragging.current = null;
          }
        }}
        onPointerDown={(e) => {
          dragging.current = { start: e.clientX, offset: target.current, moved: false };
          idleUntil.current = performance.now() + 5000;
        }}
        onPointerMove={(e) => {
          const d = dragging.current;
          if (d) {
            const dx = e.clientX - d.start;
            if (Math.abs(dx) > 6) d.moved = true;
            const sensitivity = window.innerWidth < 700 ? 0.0035 : 0.0024;
            target.current = d.offset - dx * sensitivity;
          }
        }}
        onPointerUp={() => {
          if (dragging.current) {
            if (dragging.current.moved) {
              target.current = Math.round(target.current);
            }
            idleUntil.current = performance.now() + 5000;
            setTimeout(() => {
              dragging.current = null;
            }, 0);
          }
        }}
      >
        <div className="coverflow-track" aria-live="polite">
          {SHOWCASE_PRODUCTS.map((product, i) => {
            const isCurrent = product.id === current;
            return (
              <button
                key={product.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className={`coverflow-card${isCurrent ? ' is-current' : ''}`}
                aria-label={`Discover ${product.name}${isCurrent ? ' (Currently viewing)' : ''}`}
                onClick={() => {
                  if (!dragging.current?.moved) onOpen(product);
                }}
              >
                <div className="coverflow-card-inner">
                  <div className="card-top-meta">
                    <span className="card-num">0{i + 1}</span>
                    {isCurrent && <span className="card-badge-current">NOW VIEWING</span>}
                  </div>

                  <div className="card-packshot-stage">
                    <img
                      src={assetUrl(product.image)}
                      alt={`Mother's Recipe ${product.name}`}
                      draggable="false"
                      loading="lazy"
                      onError={(e) => {
                        if (product.fallbackImage) {
                          (e.currentTarget as HTMLImageElement).src = assetUrl(product.fallbackImage);
                        }
                      }}
                    />
                    <div className="card-pack-shadow" aria-hidden="true" />
                  </div>

                  <div className="card-caption">
                    <h3 className="card-title">{product.name}</h3>
                    <span className="card-kind">{product.kind}</span>
                  </div>

                  <span className="card-arrow-pill" aria-hidden="true">
                    <ArrowUpRight />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="coverflow-controls">
        <button className="coverflow-nav-btn" onClick={() => step(-1)} aria-label="Previous flavour">
          <ArrowLeft size={16} />
        </button>

        <span className="coverflow-hint">DRAG OR SWIPE TO EXPLORE 3D PANTRY</span>

        <button
          className="coverflow-play-btn"
          onClick={toggle}
          aria-label={playing ? 'Pause 3D carousel' : 'Play 3D carousel'}
        >
          {playing ? <Pause size={13} fill="currentColor" /> : <Play size={13} fill="currentColor" />}
        </button>

        <button className="coverflow-nav-btn" onClick={() => step(1)} aria-label="Next flavour">
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
