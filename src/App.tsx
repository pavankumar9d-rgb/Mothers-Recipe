import React, { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { SHOWCASE_PRODUCTS, type ShowcaseProduct } from './data/showcaseProducts';
import { SpriteDefs } from './components/showcase/SpriteDefs';
import { ShowcaseIntro } from './components/showcase/ShowcaseIntro';
import { ShowcaseHeader } from './components/showcase/ShowcaseHeader';
import { ShowcaseMenuDrawer } from './components/showcase/ShowcaseMenuDrawer';
import { ShowcaseCarouselStage } from './components/showcase/ShowcaseCarouselStage';
import { ProductShowcaseScene } from './components/showcase/ProductShowcaseScene';
import { ProductHeritageStory } from './components/showcase/ProductHeritageStory';
import { EditorialGalleryTrack } from './components/showcase/EditorialGalleryTrack';
import { FlavourStreamMarquee } from './components/showcase/FlavourStreamMarquee';
import { HeritageCtaBand } from './components/showcase/HeritageCtaBand';
import { ShowcaseFooter } from './components/showcase/ShowcaseFooter';
import { assetUrl } from './utils/paths';
import { ArrowRight } from 'lucide-react';

export const App: React.FC = () => {
  const [selected, setSelected] = useState<ShowcaseProduct | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [menu, setMenu] = useState(false);
  const [automatic, setAutomatic] = useState(true);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [flight, setFlight] = useState<{ product: ShowcaseProduct; rect: DOMRect; landed: boolean } | null>(null);
  const [intro, setIntro] = useState(true);
  const [entering, setEntering] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => {
      setReduced(mq.matches);
      if (mq.matches) setAutomatic(false);
    };
    change();
    mq.addEventListener('change', change);
    return () => mq.removeEventListener('change', change);
  }, []);

  const introDone = useCallback(() => {
    setIntro(false);
    setEntering(true);
    setTimeout(() => setEntering(false), 1600);
  }, []);

  // Open product with flight trajectory
  const openProduct = useCallback(
    (product: ShowcaseProduct, origin?: HTMLElement) => {
      if (transitioning) return;
      setMenu(false);
      const rect = origin?.querySelector('img')?.getBoundingClientRect();
      window.scrollTo({ top: 0, behavior: 'instant' });

      if (rect && !selected && !reduced) {
        setFlight({ product, rect, landed: false });
        setTransitioning(true);
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setFlight({ product, rect, landed: true }))
        );
        timer.current = setTimeout(() => {
          setSelected(product);
          setTransitioning(false);
          setFlight(null);
        }, 1000);
      } else {
        setSelected(product);
        setFlight(null);
      }
      window.history.pushState({}, '', `#${product.id}`);
    },
    [transitioning, selected, reduced]
  );

  const goHome = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setSelected(null);
    setTransitioning(false);
    setFlight(null);
    setMenu(false);
    window.history.pushState({}, '', window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Sync hash routing
  useEffect(() => {
    const restore = () => {
      if (timer.current) clearTimeout(timer.current);
      const hashId = window.location.hash.slice(1);
      setSelected(SHOWCASE_PRODUCTS.find((p) => p.id === hashId) ?? null);
      setFlight(null);
      setTransitioning(false);
    };
    restore();
    window.addEventListener('popstate', restore);
    return () => {
      window.removeEventListener('popstate', restore);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  // Body overflow locking in carousel mode
  useEffect(() => {
    document.body.style.overflow = !selected ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selected]);

  const goTo = (id: string) => {
    setMenu(false);
    if (!selected) {
      setSelected(SHOWCASE_PRODUCTS[active]);
      window.history.pushState({}, '', `#${SHOWCASE_PRODUCTS[active].id}`);
    }
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' });
    }, 100);
  };

  return (
    <main
      className={`experience ${selected ? 'detail-mode' : 'carousel-mode'}${
        intro ? ' intro-active' : ''
      }${entering ? ' hero-enter' : ''}`}
    >
      <SpriteDefs />

      {intro && !selected && (
        <ShowcaseIntro product={SHOWCASE_PRODUCTS[0]} onDone={introDone} />
      )}

      <ShowcaseHeader
        selected={!!selected}
        automatic={automatic}
        onToggleMotion={() => setAutomatic(!automatic)}
        onGoHome={goHome}
        onOpenMenu={() => setMenu(true)}
      />

      <ShowcaseMenuDrawer
        open={menu}
        onClose={() => setMenu(false)}
        onGoHome={goHome}
        onGoTo={goTo}
      />

      {!selected && (
        <ShowcaseCarouselStage
          products={SHOWCASE_PRODUCTS}
          active={active}
          setActive={setActive}
          automatic={automatic}
          reduced={reduced}
          transitioning={transitioning}
          onOpenProduct={openProduct}
        />
      )}

      {flight && (
        <div
          className={`flying-product ${flight.landed ? 'landed' : ''}`}
          style={
            {
              '--start-top': `${flight.rect.top}px`,
              '--start-left': `${flight.rect.left}px`,
              '--start-width': `${flight.rect.width}px`,
              '--start-height': `${flight.rect.height}px`
            } as CSSProperties
          }
        >
          <img
            src={assetUrl(flight.product.image)}
            alt={`Mother's Recipe ${flight.product.name}`}
            draggable="false"
            onError={(e) => {
              if (flight.product.fallbackImage) {
                (e.currentTarget as HTMLImageElement).src = assetUrl(flight.product.fallbackImage);
              }
            }}
          />
        </div>
      )}

      {selected && (
        <div key={selected.id} className="product-page">
          <ProductShowcaseScene product={selected} reduced={reduced} />

          <ProductHeritageStory product={selected} />

          <EditorialGalleryTrack reduced={reduced} />

          <section id="products" className="related-products">
            <div className="section-heading">
              <span className="eyebrow">THE FULL RANGE</span>
              <h2>OUR FLAVOURS</h2>
            </div>
            <FlavourStreamMarquee
              current={selected.id}
              onOpen={openProduct}
              reduced={reduced}
            />
            <div className="collection-ctas">
              <button className="cta cta-outline" onClick={goHome}>
                Explore the collection <ArrowRight size={14} />
              </button>
              <a
                className="cta cta-solid"
                href="https://www.mothersrecipe.com/collections/pickles"
                target="_blank"
                rel="noopener noreferrer"
              >
                Shop all on Mother&apos;s Recipe <span aria-hidden="true">↗</span>
              </a>
            </div>
          </section>

          <HeritageCtaBand />

          <ShowcaseFooter onGoHome={goHome} reduced={reduced} />
        </div>
      )}
    </main>
  );
};

export default App;
