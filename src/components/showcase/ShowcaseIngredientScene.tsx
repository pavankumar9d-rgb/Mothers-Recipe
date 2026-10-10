import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { Check } from 'lucide-react';
import type { ShowcaseProduct, Sprite } from '../../data/showcaseProducts';

export function SpriteIcon({ sprite, className }: { sprite: Sprite; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <use href={`#spr-${sprite}`} />
    </svg>
  );
}

type Particle = {
  kind: Sprite;
  x: number;
  y: number;
  depth: number;
  size: number;
  rot: number;
  dur: number;
  delay: number;
  mobile: boolean;
};

const sizes: Record<Sprite, [number, number]> = {
  'gongura-leaf': [90, 140],
  'curry-leaf': [46, 70],
  'red-chilli': [80, 120],
  'green-chilli': [70, 105],
  'chilli-flake': [16, 30],
  garlic: [40, 60],
  mustard: [20, 30],
  lime: [70, 110],
  ginger: [80, 115],
  tomato: [72, 105],
  'tomato-slice': [64, 92],
  mango: [60, 90],
  tamarind: [80, 110]
};

function seeded(text: string) {
  let h = 1779033703;
  for (const c of text) h = Math.imul(h ^ c.charCodeAt(0), 3432918353);
  return () => {
    h = Math.imul(h ^ (h >>> 15), h | 1);
    h ^= h + Math.imul(h ^ (h >>> 7), h | 61);
    return ((h ^ (h >>> 14)) >>> 0) / 4294967296;
  };
}

function layout(product: ShowcaseProduct): Particle[] {
  const rand = seeded(product.id);
  const placed: Particle[] = [];
  for (const [kind, count = 0] of Object.entries(product.details.scatter) as [Sprite, number][]) {
    for (let j = 0; j < count; j++) {
      let x = 0;
      let y = 0;
      for (let attempt = 0; attempt < 40; attempt++) {
        x = (rand() * 2 - 1) * 47;
        y = (rand() * 2 - 1) * 45;
        const clearOfJar = Math.abs(x) > 13 || Math.abs(y) > 36;
        const spaced = placed.every((p) => Math.hypot(p.x - x, (p.y - y) * 0.8) > 7);
        if (clearOfJar && spaced) break;
      }
      const depth = 0.4 + rand() * 0.85;
      const [min, max] = sizes[kind] || [40, 70];
      placed.push({
        kind,
        x,
        y,
        depth,
        size: Math.round((min + rand() * (max - min)) * (0.62 + depth * 0.42)),
        rot: Math.round(rand() * 360),
        dur: 3.2 + rand() * 3.4,
        delay: -rand() * 6,
        mobile: j % 2 === 0
      });
    }
  }
  return placed;
}

export function ShowcaseIngredientScene({ product }: { product: ShowcaseProduct }) {
  const { details } = product;
  const particles = useMemo(() => layout(product), [product]);
  const [focus, setFocus] = useState<Sprite | null>(null);
  const [open, setOpen] = useState(0);
  const field = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      field.current?.style.setProperty('--px', x.toFixed(3));
      field.current?.style.setProperty('--py', y.toFixed(3));
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.002 ? requestAnimationFrame(tick) : 0;
    };
    const move = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  const highlight = (sprite: Sprite | null) => setFocus(sprite);

  return (
    <>
      <div
        ref={field}
        className={`ingredient-field${focus ? ' has-focus' : ''}`}
        aria-hidden="true"
      >
        <div className="ingredient-orbit">
          {particles.map((p, i) => (
            <span
              key={i}
              data-kind={p.kind}
              className={`ingredient-particle kind-${p.kind}${p.mobile ? '' : ' desktop-only'}${
                p.depth < 0.62 ? ' is-far' : p.depth > 1.12 ? ' is-near' : ''
              }${focus === p.kind ? ' is-focus' : ''}`}
              style={
                {
                  '--x': `${p.x}vw`,
                  '--y': `${p.y}vh`,
                  '--depth': p.depth,
                  '--size': `${p.size}px`,
                  '--r': `${p.rot}deg`,
                  '--dur': `${p.dur}s`,
                  '--delay': `${p.delay}s`
                } as CSSProperties
              }
            >
              <span className="particle-float">
                <SpriteIcon sprite={p.kind} />
              </span>
            </span>
          ))}
        </div>
      </div>

      <aside className="ingredient-panel panel-left" aria-label={`What is inside ${product.name}`}>
        <span className="eyebrow">WHAT&apos;S INSIDE</span>
        <h2 className="panel-title">The ingredients</h2>
        <ul className="ingredient-list">
          {details.ingredients.map((ingredient, i) => (
            <li key={ingredient.name} style={{ '--i': i } as CSSProperties} className={open === i ? 'is-open' : undefined}>
              <button
                className="ingredient-row"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? -1 : i)}
                onMouseEnter={() => highlight(ingredient.sprite)}
                onMouseLeave={() => highlight(null)}
                onFocus={() => highlight(ingredient.sprite)}
                onBlur={() => highlight(null)}
              >
                <SpriteIcon sprite={ingredient.sprite} className="ingredient-icon" />
                <span className="ingredient-name">{ingredient.name}</span>
                {ingredient.share && <span className="ingredient-share">{ingredient.share}</span>}
                <span className="ingredient-toggle" aria-hidden="true" />
              </button>
              <div className="ingredient-detail">
                <p>{ingredient.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      <aside className="ingredient-panel panel-right" aria-label={`Why you will love ${product.name}`}>
        <span className="eyebrow">WHY YOU&apos;LL LOVE IT</span>
        <h2 className="panel-title">Good things inside</h2>
        <ul className="highlight-list">
          {details.highlights.map((item, i) => (
            <li key={item} style={{ '--i': i } as CSSProperties}>
              <span className="tick">
                <Check size={11} strokeWidth={2.4} />
              </span>
              {item}
            </li>
          ))}
        </ul>
        <div className="heat-row">
          <span>HEAT LEVEL</span>
          <div className="heat-meter" role="img" aria-label={`Heat ${details.heat} out of 5`}>
            {[1, 2, 3, 4, 5].map((n) => (
              <SpriteIcon
                key={n}
                sprite="red-chilli"
                className={n <= details.heat ? 'is-on' : undefined}
              />
            ))}
          </div>
        </div>
        <dl className="spec-list">
          {details.specs.map((spec) => (
            <div key={spec.label}>
              <dt>{spec.label}</dt>
              <dd>{spec.value}</dd>
            </div>
          ))}
        </dl>
        <a
          className="cta cta-solid cta-small"
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Buy this {product.kind.toLowerCase()} <span aria-hidden="true">↗</span>
        </a>
      </aside>
    </>
  );
}
