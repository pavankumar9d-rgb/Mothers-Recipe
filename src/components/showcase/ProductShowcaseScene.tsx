import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import type { ShowcaseProduct } from '../../data/showcaseProducts';
import { ShowcaseProductTurn, type ProductTurnHandle } from './ShowcaseProductTurn';
import { ShowcaseIngredientScene } from './ShowcaseIngredientScene';

const clamp = (n: number) => Math.min(1, Math.max(0, n));
const smooth = (n: number) => n * n * (3 - 2 * n);

export function ProductShowcaseScene({
  product,
  reduced
}: {
  product: ShowcaseProduct;
  reduced: boolean;
}) {
  const scene = useRef<HTMLElement>(null);
  const jar = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const turn = useRef<ProductTurnHandle>(null);

  useEffect(() => {
    let raf = 0;
    let previous = 0;
    let current = window.scrollY;

    const render = (time: number) => {
      const dt = previous ? Math.min(time - previous, 40) : 16;
      previous = time;
      current += (window.scrollY - current) * (reduced ? 1 : 1 - Math.exp(-dt / 65));
      const height = window.innerHeight;
      const scroll = Math.max(0, current - (scene.current?.offsetTop ?? 0)) / height;
      const arrive = reduced ? 1 : smooth(clamp(scroll / 0.42));
      const spin = clamp((scroll - 0.42) / 1.12);

      if (jar.current) {
        const mobile = window.innerWidth < 701;
        jar.current.style.transform = `translate(-50%,${reduced ? 0 : -arrive * height * (mobile ? 0.45 : 0.57)}px)`;
      }
      turn.current?.turn(reduced ? 0 : spin * Math.PI * 2);

      if (title.current && !reduced) {
        title.current.style.opacity = String(1 - arrive);
        title.current.style.transform = `translateY(${-arrive * 65}px)`;
      }

      const el = scene.current;
      if (el) {
        el.style.setProperty('--arrival', String(arrive));
        el.style.setProperty('--spin', String(reduced ? 0 : spin));
        el.dataset.panels = arrive > 0.6 ? 'on' : 'off';
        el.dataset.intro = arrive < 0.35 ? 'on' : 'off';
      }

      if (Math.abs(window.scrollY - current) > 0.1) {
        raf = requestAnimationFrame(render);
      } else {
        raf = 0;
      }
    };

    const update = () => {
      if (!raf) {
        previous = 0;
        raf = requestAnimationFrame(render);
      }
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [product, reduced]);

  const toIngredients = () => {
    const top = (scene.current?.offsetTop ?? 0) + window.innerHeight * 0.75;
    window.scrollTo({ top, behavior: reduced ? 'instant' : 'smooth' });
  };

  return (
    <section
      ref={scene}
      className={`product-hero spin-scene ${reduced ? 'reduced-scene' : ''}`}
      aria-labelledby="product-title"
      data-panels="off"
      data-intro="on"
    >
      <div className="product-hero-stage">
        <h1
          ref={title}
          id="product-title"
          className={`product-title ${product.lines[0].length > 9 ? 'long-title' : ''}`}
        >
          {product.lines.map((line, i) => (
            <span className="title-mask" key={line}>
              <span style={{ animationDelay: `${100 + i * 100}ms` }}>{line}</span>
            </span>
          ))}
        </h1>

        <span className="product-category">{product.kind}</span>
        <span className="product-origin">
          Taste the tradition
          <br />
          Mother&apos;s Recipe
        </span>

        <ShowcaseIngredientScene product={product} />

        <div ref={jar} className="detail-product">
          <ShowcaseProductTurn ref={turn} product={product} />
        </div>

        <div className="detail-ctas">
          <a
            className="cta cta-solid"
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy on Mother&apos;s Recipe <span aria-hidden="true">↗</span>
          </a>
          <button className="cta cta-outline" onClick={toIngredients}>
            Explore ingredients <ArrowDown size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
