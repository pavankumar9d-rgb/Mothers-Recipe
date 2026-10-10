import React from 'react';
import { ArrowUpRight, Utensils } from 'lucide-react';

export const EditorialFeast: React.FC = () => {
  return (
    <section className="py-24 bg-[var(--surface-tinted)] border-b border-[var(--border-light)] paper-grain relative overflow-hidden">
      <div className="container">
        {/* Full-bleed Feast Banner */}
        <div className="relative rounded-3xl overflow-hidden min-h-[460px] sm:min-h-[520px] shadow-2xl border border-[var(--border-medium)] flex items-end p-8 sm:p-14">
          {/* Background Photography */}
          <img
            src="/assets/editorial/serving/closing-table-scene.jpg"
            alt="Authentic Indian Festive Dining Table Feast with Mother's Recipe Pickles"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
          />
          {/* Rich Vignette Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Editorial Overlay Content */}
          <div className="relative z-10 max-w-2xl text-white">
            <div className="flex items-center gap-2 mb-4">
              <span className="badge-tag bg-white/20 text-white backdrop-blur-md border border-white/30 text-xs font-mono">
                <Utensils className="w-3.5 h-3.5 text-amber-300" />
                The Feast Ritual
              </span>
              <span className="text-xs font-mono text-stone-300">
                Pantry to Plate
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              From Our Sunlit Terraces <br />
              <span className="italic font-normal text-amber-200">
                to Your Family Table.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-stone-200 font-sans leading-relaxed mb-8 max-w-xl">
              For over four decades, Mother’s Recipe has safeguarded the living culinary
              heritage of Indian households. A meal without achaar is just food; with
              achaar, it becomes a memory of home, tempered in mustard oil and salt.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://www.mothersrecipe.com/collections/pickle"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <span>Explore the Full Official Collection</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#build-your-bite"
                className="btn-secondary !text-white !border-white/60 hover:!bg-white hover:!text-[var(--brand-forest)]"
              >
                <span>Re-roll Your Bite Pairing</span>
              </a>
            </div>
          </div>
        </div>

        {/* Brand Heritage Credentials Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-[var(--border-medium)]">
          <div className="text-center md:text-left">
            <span className="font-serif font-bold text-2xl sm:text-3xl text-[var(--earth-dark)] block">
              1979
            </span>
            <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
              Year of Heritage Foundation
            </span>
          </div>

          <div className="text-center md:text-left">
            <span className="font-serif font-bold text-2xl sm:text-3xl text-[var(--spice-red)] block">
              80+
            </span>
            <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
              Authentic Regional Varieties
            </span>
          </div>

          <div className="text-center md:text-left">
            <span className="font-serif font-bold text-2xl sm:text-3xl text-[var(--brand-forest)] block">
              50+ Countries
            </span>
            <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
              Global Desi Dining Presence
            </span>
          </div>

          <div className="text-center md:text-left">
            <span className="font-serif font-bold text-2xl sm:text-3xl text-[var(--mustard-gold-hover)] block">
              100% Pure
            </span>
            <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
              Traditional Whole Spice Craft
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
