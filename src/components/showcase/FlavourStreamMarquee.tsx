import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { SHOWCASE_PRODUCTS, type ShowcaseProduct } from '../../data/showcaseProducts';
import { ArrowUpRight } from './ShowcaseMenuDrawer';
import { assetUrl } from '../../utils/paths';

const COPIES = 4;
const REAL = 1;
const CRUISE = 0.05;
const CRAWL = 0.012;

export function FlavourStreamMarquee({
  current,
  onOpen,
  reduced
}: {
  current: string;
  onOpen: (product: ShowcaseProduct) => void;
  reduced: boolean;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const offset = useRef<number | null>(null);
  const slow = useRef(false);
  const held = useRef(false);
  const stopped = useRef(false);
  const drag = useRef<{ x: number; from: number; moved: boolean } | null>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const view = viewport.current;
    const row = track.current;
    if (!view || !row) return;

    let raf = 0;
    let previous = 0;
    let speed = 0;
    let visible = false;
    let loop = 0;
    let inset = 0;

    const measure = () => {
      const firstChild = row.children[0] as HTMLElement | undefined;
      const realChild = row.children[REAL * SHOWCASE_PRODUCTS.length] as HTMLElement | undefined;
      if (firstChild && realChild) {
        loop = realChild.getBoundingClientRect().left - firstChild.getBoundingClientRect().left;
      }
      inset = view.clientWidth * 0.05;
    };

    const tick = (now: number) => {
      const dt = previous ? Math.min(now - previous, 50) : 16;
      previous = now;
      const goal = reduced || stopped.current || held.current || drag.current ? 0 : slow.current ? CRAWL : CRUISE;
      speed += (goal - speed) * (1 - Math.exp(-dt / 280));
      offset.current ??= inset - REAL * loop;
      if (!drag.current) offset.current -= speed * dt;

      const base = inset - REAL * loop;
      let rel = loop ? (offset.current - base) % loop : 0;
      if (rel > 0) rel -= loop;
      offset.current = base + rel;
      row.style.transform = `translate3d(${offset.current.toFixed(2)}px,0,0)`;
      raf = visible ? requestAnimationFrame(tick) : 0;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) {
        previous = 0;
        raf = requestAnimationFrame(tick);
      }
    });

    const ro = new ResizeObserver(measure);
    measure();
    offset.current ??= inset - REAL * loop;
    row.style.transform = `translate3d(${offset.current}px,0,0)`;
    ro.observe(view);
    io.observe(view);

    return () => {
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const release = () => {
    if (drag.current) {
      setTimeout(() => {
        drag.current = null;
      }, 0);
    }
  };

  const toggle = () => {
    stopped.current = playing;
    setPlaying(!playing);
  };

  return (
    <>
      <div
        ref={viewport}
        className="flavour-marquee"
        onPointerEnter={(e) => {
          if (e.pointerType === 'mouse') slow.current = true;
        }}
        onPointerLeave={() => {
          slow.current = false;
          release();
        }}
        onPointerDown={(e) => {
          drag.current = { x: e.clientX, from: offset.current ?? 0, moved: false };
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d) return;
          if (Math.abs(e.clientX - d.x) > 6) d.moved = true;
          if (d.moved) offset.current = d.from + e.clientX - d.x;
        }}
        onPointerUp={release}
        onPointerCancel={() => {
          drag.current = null;
        }}
        onFocus={() => {
          held.current = true;
        }}
        onBlur={() => {
          held.current = false;
        }}
      >
        <div ref={track} className="flavour-track">
          {Array.from({ length: COPIES }, (_, copy) =>
            SHOWCASE_PRODUCTS.map((product, i) => {
              const real = copy === REAL;
              return (
                <button
                  key={`${copy}-${product.id}`}
                  className={`related-product${product.id === current ? ' is-current' : ''}`}
                  tabIndex={real ? undefined : -1}
                  aria-hidden={real ? undefined : true}
                  aria-label={
                    real ? `${product.name}${product.id === current ? ', now viewing' : ''}` : undefined
                  }
                  onClick={() => {
                    if (!drag.current?.moved) onOpen(product);
                  }}
                  onFocus={(e) => {
                    if (real && viewport.current) {
                      offset.current = viewport.current.clientWidth * 0.05 - e.currentTarget.offsetLeft;
                    }
                  }}
                >
                  <div className="related-photo">
                    <span className="related-number">0{i + 1}</span>
                    {product.id === current && <span className="related-current">Now viewing</span>}
                    <div className="related-image">
                      <img
                        src={assetUrl(product.image)}
                        alt={`Mother's Recipe ${product.name} jar`}
                        draggable="false"
                        loading="lazy"
                        onError={(e) => {
                          if (product.fallbackImage) {
                            (e.currentTarget as HTMLImageElement).src = assetUrl(product.fallbackImage);
                          }
                        }}
                      />
                    </div>
                    <span className="related-plus">
                      <ArrowUpRight />
                    </span>
                  </div>
                  <span className="related-name">{product.name}</span>
                  <span className="related-kind">{product.kind}</span>
                </button>
              );
            })
          )}
        </div>
      </div>

      <div className="flavour-controls">
        <span>DRAG OR SWIPE TO EXPLORE</span>
        <button
          onClick={toggle}
          aria-label={playing ? 'Pause the flavours' : 'Play the flavours'}
        >
          {playing ? <Pause size={11} fill="currentColor" /> : <Play size={11} fill="currentColor" />}
        </button>
      </div>
    </>
  );
}
