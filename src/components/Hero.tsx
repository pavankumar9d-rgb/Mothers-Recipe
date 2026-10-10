import React, { useState } from 'react';
import { HERITAGE_HERO_PRODUCTS } from '../data/curatedData';
import { Sparkles, ArrowRight, Flame, ShieldCheck, MapPin } from 'lucide-react';

interface HeroProps {
  onBuildBiteClick: () => void;
  onExploreSpecimensClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBuildBiteClick, onExploreSpecimensClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = HERITAGE_HERO_PRODUCTS[activeIndex];

  // Subtle interactive mouse tilt
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 bg-[var(--bg-ivory)] border-b border-[var(--border-light)] paper-grain"
    >
      {/* Decorative ambient gradients */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[rgba(212,151,44,0.08)] via-[rgba(184,46,30,0.05)] to-transparent rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative z-10">
        {/* Top Eyebrow */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="badge-tag badge-forest">
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--brand-forest)]" />
            Official Heritage Archive
          </span>
          <span className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            Handcrafted with 100% Genuine DFPL Packshots
          </span>
        </div>

        {/* Main Grid: Editorial Narrative (Left) + Interactive Still Life (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-8">
            <div className="inline-block mb-3">
              <span className="font-serif italic text-lg text-[var(--mustard-gold)]">
                The Living Pantry — Find Your Flavour, Build Your Bite
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] text-[var(--earth-dark)] tracking-tight mb-6">
              India’s Culinary Soul, <br />
              <span className="italic font-normal text-[var(--spice-red)]">Preserved in Mustard</span>, <br />
              Salt & Sun.
            </h1>

            <p className="text-base sm:text-lg text-[var(--earth-muted)] font-sans max-w-xl mb-8 leading-relaxed">
              Step into an interactive culinary journey across India’s time-honoured pickling heritage.
              Discover authentic recipes from coastal Andhra to the fertile plains of Punjab — slow-cured
              in ceramic Barni jars with cold-pressed oils and unadulterated whole spices.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <button
                onClick={onBuildBiteClick}
                type="button"
                className="btn-primary w-full sm:w-auto"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Build Your Bite (Interactive Lab)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreSpecimensClick}
                type="button"
                className="btn-secondary w-full sm:w-auto"
              >
                Explore Specimen Drawer
              </button>
            </div>

            {/* Heritage Switcher Tabs */}
            <div className="w-full pt-8 border-t border-[var(--border-medium)]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase font-mono tracking-wider text-[var(--text-muted)] font-semibold">
                  Featured Regional Traditions
                </span>
                <span className="text-xs font-mono text-[var(--mustard-gold)]">
                  0{activeIndex + 1} / 0{HERITAGE_HERO_PRODUCTS.length}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {HERITAGE_HERO_PRODUCTS.map((prod, idx) => (
                  <button
                    key={prod.slug}
                    onClick={() => setActiveIndex(idx)}
                    type="button"
                    className={`text-left p-3 rounded-lg border transition-all text-xs font-medium cursor-pointer ${
                      activeIndex === idx
                        ? 'bg-white border-[var(--spice-red)] shadow-sm text-[var(--spice-red)] font-semibold'
                        : 'bg-[#FAF7F2] border-[var(--border-light)] text-[var(--earth-muted)] hover:bg-white hover:border-[var(--border-medium)]'
                    }`}
                  >
                    <div className="font-serif font-bold text-sm text-[var(--earth-dark)] truncate">
                      {prod.region}
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)] truncate">
                      {prod.title.replace(' Pickle', '')}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Layered Still Life Composition (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[480px] sm:min-h-[540px]">
            {/* Soft decorative pedestal / dish shadow */}
            <div className="absolute w-72 sm:w-96 h-24 bg-gradient-to-r from-transparent via-[rgba(26,48,38,0.12)] to-transparent rounded-[100%] blur-xl bottom-6" />

            {/* Main Authentic Jar Cutout with dynamic tilt */}
            <div
              className="relative z-20 transition-transform duration-300 ease-out flex flex-col items-center"
              style={{
                transform: `translate3d(${tilt.x}px, ${tilt.y}px, 0) rotate(${tilt.x * 0.25}deg)`
              }}
            >
              <img
                key={activeProduct.slug}
                src={activeProduct.cutout}
                alt={activeProduct.title}
                className="max-h-[380px] sm:max-h-[440px] w-auto object-contain drop-shadow-[0_20px_35px_rgba(28,25,23,0.22)] select-none animate-fadeIn"
              />

              {/* Verified Product Spec Card Floating Below */}
              <div className="mt-4 bg-white/95 backdrop-blur-md px-5 py-3.5 rounded-xl border border-[var(--border-medium)] shadow-lg max-w-xs w-full text-center transition-all">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-serif font-bold text-sm text-[var(--earth-dark)]">
                    {activeProduct.title}
                  </span>
                  <span className="font-mono font-bold text-[var(--spice-red)] text-sm">
                    {activeProduct.price}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-3 text-[11px] text-[var(--text-muted)] mb-2 font-mono">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[var(--mustard-gold)]" />
                    {activeProduct.region}
                  </span>
                  <span>•</span>
                  <span>{activeProduct.weight}</span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5 text-[var(--spice-red)]">
                    <Flame className="w-3 h-3 fill-current" />
                    {activeProduct.spiceLabel}
                  </span>
                </div>
                <div className="flex flex-wrap justify-center gap-1">
                  {activeProduct.flavourNotes.map((note) => (
                    <span
                      key={note}
                      className="px-2 py-0.5 bg-stone-100 rounded text-[10px] text-stone-600 font-medium"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Layered Ingredient Cutout Props Drifting Independently in Space */}
            
            {/* Prop 1: Sliced Raw Mango (Top Right) */}
            <div
              className="absolute top-2 right-0 sm:-right-4 z-10 w-24 sm:w-32 animate-float pointer-events-none transition-transform duration-500 ease-out"
              style={{
                transform: `translate3d(${-tilt.x * 1.5}px, ${-tilt.y * 1.5}px, 0)`
              }}
            >
              <img
                src="/assets/ingredients/cutouts/mango-wedges-cubes.png"
                alt="Raw Mango Wedge Prop"
                className="w-full h-auto object-contain drop-shadow-md rotate-12"
              />
            </div>

            {/* Prop 2: Whole Raw Mango (Bottom Left) */}
            <div
              className="absolute bottom-16 -left-4 sm:-left-8 z-30 w-28 sm:w-36 animate-float-reverse pointer-events-none transition-transform duration-500 ease-out"
              style={{
                transform: `translate3d(${tilt.x * 1.2}px, ${tilt.y * 1.2}px, 0)`
              }}
            >
              <img
                src="/assets/ingredients/cutouts/raw-mango-whole.png"
                alt="Whole Raw Mango Fruit Prop"
                className="w-full h-auto object-contain drop-shadow-lg -rotate-12"
              />
            </div>

            {/* Prop 3: Sun-Dried Red Chillies (Top Left) */}
            <div
              className="absolute top-10 left-2 sm:-left-2 z-10 w-20 sm:w-28 animate-float pointer-events-none transition-transform duration-500 ease-out"
              style={{
                transform: `translate3d(${-tilt.x * 1.8}px, ${-tilt.y * 1.8}px, 0)`
              }}
            >
              <img
                src="/assets/ingredients/cutouts/red-chilli-pair.png"
                alt="Sun-Dried Red Chillies Prop"
                className="w-full h-auto object-contain drop-shadow-md -rotate-45"
              />
            </div>

            {/* Prop 4: Fresh Green Chillies (Bottom Right) */}
            <div
              className="absolute bottom-20 right-4 sm:-right-6 z-30 w-20 sm:w-24 animate-float-reverse pointer-events-none transition-transform duration-500 ease-out"
              style={{
                transform: `translate3d(${tilt.x * 1.4}px, ${tilt.y * 1.4}px, 0)`
              }}
            >
              <img
                src="/assets/ingredients/cutouts/green-chilli-pair.png"
                alt="Fresh Green Chillies Prop"
                className="w-full h-auto object-contain drop-shadow-md rotate-45"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
