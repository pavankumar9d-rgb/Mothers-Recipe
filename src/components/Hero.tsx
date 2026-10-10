import React from 'react';
import { assetUrl } from '../utils/paths';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onBuildBiteClick: () => void;
  onExploreSpecimensClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBuildBiteClick, onExploreSpecimensClick }) => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-[var(--bg-ivory)] border-b border-[var(--border-light)] paper-grain"
    >
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left: Confident Editorial Typography (6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-start pr-0 lg:pr-6">
            <span className="font-serif italic text-base sm:text-lg text-[var(--mustard-gold-hover)] mb-3">
              The Living Pantry
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] text-[var(--earth-dark)] tracking-tight mb-6">
              India’s Culinary Soul, <br />
              <span className="italic font-normal text-[var(--spice-red)]">Preserved in Mustard</span>, <br />
              Salt & Sun.
            </h1>

            <p className="text-base sm:text-lg text-[var(--earth-muted)] font-sans max-w-lg mb-8 leading-relaxed">
              Authentic regional achaar crafted with unhurried care. Sun-ripened green mangoes,
              pungent cold-pressed oils, and hand-selected whole spices from Andhra to Punjab.
            </p>

            {/* Clear, Focused Actions */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onBuildBiteClick}
                type="button"
                className="btn-primary w-full sm:w-auto"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Build Your Bite</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreSpecimensClick}
                type="button"
                className="btn-secondary w-full sm:w-auto"
              >
                Explore Regional Drawer
              </button>
            </div>
          </div>

          {/* Right: One Dominant, Art-Directed Packshot (6 cols) */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[420px] sm:min-h-[500px]">
            {/* Ambient radial glow */}
            <div
              className="absolute w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-tr from-[rgba(212,151,44,0.12)] via-[rgba(184,46,30,0.06)] to-transparent rounded-full blur-2xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Soft natural pedestal shadow */}
            <div className="absolute w-64 sm:w-80 h-16 bg-stone-900/12 rounded-[100%] blur-xl bottom-6 pointer-events-none" />

            {/* Dominant Product Silhouette */}
            <div className="relative z-20 flex flex-col items-center">
              <img
                src={assetUrl('/assets/products/cutouts/andhra-avakaya-pickle-200-gm.png')}
                alt="Mother's Recipe Andhra Avakaya Pickle 200g Jar"
                className="max-h-[380px] sm:max-h-[440px] w-auto object-contain drop-shadow-[0_24px_35px_rgba(28,25,23,0.22)] select-none transition-transform hover:scale-102 duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = assetUrl(
                    '/assets/products/originals/andhra-avakaya-pickle-200-gm/andhra-avakaya-pickle-200-gm-front-original.png'
                  );
                }}
              />
              
              <div className="mt-4 text-center">
                <span className="font-serif font-bold text-lg text-[var(--earth-dark)] block">
                  Andhra Avakaya Pickle
                </span>
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  Coastal Andhra Heritage • 200g Glass Jar
                </span>
              </div>
            </div>

            {/* Carefully Placed Still-Life Props (2 props only, non-distracting) */}
            
            {/* Prop 1: Sliced Raw Mango Wedge (Top Right) */}
            <div className="absolute top-4 right-2 sm:right-6 z-10 w-24 sm:w-28 animate-float pointer-events-none">
              <img
                src={assetUrl('/assets/ingredients/cutouts/mango-wedges-cubes.png')}
                alt="Raw Mango Wedge"
                className="w-full h-auto object-contain drop-shadow-md rotate-12"
              />
            </div>

            {/* Prop 2: Whole Dried Red Chillies (Bottom Left) */}
            <div className="absolute bottom-12 left-2 sm:left-4 z-10 w-24 sm:w-28 animate-float-reverse pointer-events-none">
              <img
                src={assetUrl('/assets/ingredients/cutouts/red-chilli-pair.png')}
                alt="Sun-Dried Red Chillies"
                className="w-full h-auto object-contain drop-shadow-md -rotate-30"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
