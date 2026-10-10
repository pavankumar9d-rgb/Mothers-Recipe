import { useEffect, useRef } from 'react';
import { ShowcaseProductTurn, type ProductTurnHandle } from './ShowcaseProductTurn';
import { blobPath } from '../../utils/blob';
import type { ShowcaseProduct } from '../../data/showcaseProducts';
import { assetUrl } from '../../utils/paths';

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const clamp = (n: number) => Math.min(1, Math.max(0, n));

export function ShowcaseIntro({ product, onDone }: { product: ShowcaseProduct; onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const curtain = useRef<HTMLDivElement>(null);
  const disc = useRef<SVGSVGElement>(null);
  const discPath = useRef<SVGPathElement>(null);
  const jar = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLImageElement>(null);
  const turn = useRef<ProductTurnHandle>(null);
  const finished = useRef(false);
  const finish = useRef(() => {});

  useEffect(() => {
    const animations: Animation[] = [];
    let raf = 0;
    let timer = 0;

    const done = () => {
      if (finished.current) return;
      finished.current = true;
      onDone();
    };

    if (window.location.hash || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      done();
      return;
    }

    finish.current = () => {
      animations.forEach((a) => {
        try {
          a.finish();
        } catch {
          // ignore
        }
      });
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      done();
    };

    const play = (el: Element | null, frames: Keyframe[], options: KeyframeAnimationOptions) => {
      if (el) animations.push(el.animate(frames, { fill: 'both', ...options }));
    };

    const start = performance.now();

    const frame = (now: number) => {
      const t = now - start;
      discPath.current?.setAttribute('d', blobPath(500, 500, 430, t / 520));
      turn.current?.turn(ease(clamp((t - 950) / 1500)) * Math.PI * 2);
      if (t < 3000) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    play(
      disc.current,
      [
        { transform: 'translate(-50%,-50%) scale(0) rotate(-40deg)' },
        { transform: 'translate(-50%,-50%) scale(1) rotate(0)' }
      ],
      { duration: 1100, delay: 150, easing: 'cubic-bezier(.2,.9,.25,1.05)' }
    );

    play(
      jar.current,
      [
        { transform: 'translate(-50%,-50%) translateY(70vh) rotate(-16deg) scale(.7)', opacity: 0 },
        { opacity: 1, offset: 0.25 },
        { transform: 'translate(-50%,-50%) translateY(0) rotate(0) scale(1)', opacity: 1 }
      ],
      { duration: 1250, delay: 200, easing: 'cubic-bezier(.16,1,.3,1)' }
    );

    play(
      jar.current,
      [
        { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
        { transform: 'translate(-50%,-50%) translateY(-6vh) scale(.35)', opacity: 0 }
      ],
      { duration: 520, delay: 2550, easing: 'cubic-bezier(.6,0,.4,1)', fill: 'forwards' }
    );

    play(
      disc.current,
      [{ transform: 'translate(-50%,-50%) scale(1)' }, { transform: 'translate(-50%,-50%) scale(0)' }],
      { duration: 620, delay: 2600, easing: 'cubic-bezier(.7,0,.3,1)', fill: 'forwards' }
    );

    play(
      logo.current,
      [
        { opacity: 0, transform: 'translate(-50%,-50%) scale(.6)', filter: 'blur(10px)' },
        { opacity: 1, transform: 'translate(-50%,-50%) scale(1)', filter: 'blur(0)' }
      ],
      { duration: 650, delay: 3150, easing: 'cubic-bezier(.2,.9,.3,1.2)' }
    );

    timer = window.setTimeout(() => {
      const target = document.querySelector<HTMLElement>('.site-header .brand img')?.getBoundingClientRect();
      const from = logo.current?.getBoundingClientRect();
      if (target && from && logo.current) {
        const dx = target.left + target.width / 2 - (from.left + from.width / 2);
        const dy = target.top + target.height / 2 - (from.top + from.height / 2);
        play(
          logo.current,
          [
            { transform: 'translate(-50%,-50%) scale(1)' },
            {
              transform: `translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(${target.width / from.width})`
            }
          ],
          { duration: 950, easing: 'cubic-bezier(.75,0,.2,1)', fill: 'forwards' }
        );
      }
      play(
        curtain.current,
        [{ transform: 'translateY(0)' }, { transform: 'translateY(-100%)' }],
        { duration: 950, delay: 80, easing: 'cubic-bezier(.75,0,.2,1)' }
      );
      timer = window.setTimeout(done, 1000);
    }, 4150);

    return () => {
      animations.forEach((a) => {
        try {
          a.cancel();
        } catch {
          // ignore
        }
      });
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [onDone]);

  return (
    <div ref={root} className="intro" role="presentation">
      <div ref={curtain} className="intro-curtain">
        <svg ref={disc} className="intro-disc" viewBox="0 0 1000 1000" aria-hidden="true">
          <path ref={discPath} d={blobPath(500, 500, 430, 0)} />
        </svg>
        <div ref={jar} className="intro-jar">
          <ShowcaseProductTurn ref={turn} product={product} />
        </div>
        <span className="intro-tagline">TASTE THE TRADITION · MOTHER&apos;S RECIPE</span>
        <button className="intro-skip" onClick={() => finish.current()}>
          Skip intro
        </button>
      </div>
      <img
        ref={logo}
        className="intro-logo"
        src={assetUrl('assets/brand/logo/mothers-recipe-logo.svg')}
        alt="Mother's Recipe"
        width="280"
      />
    </div>
  );
}
