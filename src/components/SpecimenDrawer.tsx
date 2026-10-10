import React, { useState, useRef } from 'react';
import { Product } from '../types';
import { ChevronLeft, ChevronRight, Flame, ArrowUpRight, Filter, Eye } from 'lucide-react';

interface SpecimenDrawerProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

const REGION_TABS = [
  'All Traditions',
  'Andhra',
  'Punjab',
  'Gujarat',
  'South India',
  'Western India'
];

export const SpecimenDrawer: React.FC<SpecimenDrawerProps> = ({
  products,
  onSelectProduct
}) => {
  const [selectedTab, setSelectedTab] = useState('All Traditions');
  const [selectedSpice, setSelectedSpice] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredProducts = products.filter((p) => {
    const matchesRegion =
      selectedTab === 'All Traditions' ||
      p.region.toLowerCase().includes(selectedTab.toLowerCase()) ||
      p.title.toLowerCase().includes(selectedTab.toLowerCase());

    const matchesSpice =
      selectedSpice === null || (p.spiceLevel && p.spiceLevel >= selectedSpice);

    return matchesRegion && matchesSpice;
  });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="specimens" className="py-20 bg-[var(--surface-parchment)] border-b border-[var(--border-light)]">
      <div className="container mb-8">
        {/* Header and Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--border-medium)]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge-tag badge-gold">
                Sensory Specimen Index
              </span>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                Catalogue Drawer
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--earth-dark)]">
              The Flavour Specimen Drawer
            </h2>
            <p className="text-sm sm:text-base text-[var(--earth-muted)] max-w-xl mt-2 font-sans">
              Pull open the pantry archive. Filter by ancestral pickling regions or spice
              thresholds to inspect genuine jar silhouettes, spice profiles, and verified recipes.
            </p>
          </div>

          {/* Left/Right Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              type="button"
              className="p-3 rounded-full bg-white border border-[var(--border-medium)] text-[var(--earth-dark)] hover:bg-[var(--surface-tinted)] hover:border-[var(--spice-red)] transition-all shadow-sm cursor-pointer"
              aria-label="Scroll left in specimen drawer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              type="button"
              className="p-3 rounded-full bg-white border border-[var(--border-medium)] text-[var(--earth-dark)] hover:bg-[var(--surface-tinted)] hover:border-[var(--spice-red)] transition-all shadow-sm cursor-pointer"
              aria-label="Scroll right in specimen drawer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
          {/* Regional Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {REGION_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                type="button"
                className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
                  selectedTab === tab
                    ? 'bg-[var(--brand-forest)] text-white border-[var(--brand-forest)] shadow-sm'
                    : 'bg-white text-[var(--earth-muted)] border-[var(--border-medium)] hover:border-[var(--brand-forest)] hover:bg-[var(--surface-tinted)]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Spice Meter Quick Toggle */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-[var(--text-muted)] flex items-center gap-1 font-sans">
              <Filter className="w-3 h-3 text-[var(--spice-red)]" /> Heat Level:
            </span>
            <button
              onClick={() => setSelectedSpice(null)}
              type="button"
              className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                selectedSpice === null
                  ? 'bg-[var(--spice-red)] text-white font-semibold'
                  : 'bg-stone-200/70 text-stone-700 hover:bg-stone-300'
              }`}
            >
              All
            </button>
            {[3, 4, 5].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedSpice(lvl)}
                type="button"
                className={`flex items-center gap-0.5 px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  selectedSpice === lvl
                    ? 'bg-[var(--spice-red)] text-white font-semibold'
                    : 'bg-stone-200/70 text-stone-700 hover:bg-stone-300'
                }`}
              >
                <Flame className="w-3 h-3 fill-current" />
                <span>{lvl === 5 ? '5/5 Fiery' : lvl === 4 ? '4/5 Hot' : '3/5 Med'}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div className="container">
        <div
          ref={scrollRef}
          tabIndex={0}
          role="region"
          aria-label="Specimens carousel"
          className="horizontal-scroll-drawer focus-visible:ring-2 focus-visible:ring-[var(--mustard-gold)] focus-visible:outline-none"
        >
          {filteredProducts.map((product, index) => {
            const cutout =
              product.cutoutPath ||
              `/assets/products/cutouts/${product.slug}.png`;
            const fallbackImg =
              product.images && product.images[0]?.localPath
                ? `/${product.images[0].localPath}`
                : cutout;

            return (
              <div
                key={product.slug}
                className="drawer-card group relative bg-white rounded-2xl p-6 border border-[var(--border-medium)] hover:border-[var(--spice-red)] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Card Metadata */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] mb-3">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[var(--brand-forest)]">
                      SPECIMEN № 0{index + 1}
                    </span>
                    <span className="flex items-center gap-1 text-[var(--spice-red)] font-bold">
                      <Flame className="w-3.5 h-3.5 fill-current" />
                      {product.spiceLevel || 4}/5
                    </span>
                  </div>

                  {/* Cutout Container */}
                  <div className="relative h-56 flex items-center justify-center my-2 p-2 group-hover:scale-105 transition-transform duration-300">
                    <div className="absolute inset-x-8 bottom-2 h-6 bg-stone-900/10 rounded-[100%] blur-md" />
                    <img
                      src={cutout}
                      onError={(e) => {
                        // Fallback to front catalog photo if cutout is missing
                        (e.target as HTMLImageElement).src = fallbackImg;
                      }}
                      alt={product.title}
                      className="max-h-52 w-auto object-contain drop-shadow-[0_12px_18px_rgba(28,25,23,0.15)]"
                      loading="lazy"
                    />
                  </div>

                  {/* Title & Region */}
                  <div className="mt-4">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--mustard-gold-hover)] font-semibold">
                      {product.region}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[var(--earth-dark)] mt-0.5 line-clamp-1 group-hover:text-[var(--spice-red)] transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] mt-1.5 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Spec & Action Bar */}
                <div className="pt-4 mt-4 border-t border-[var(--border-light)] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-[var(--text-muted)] block">
                      {product.weight}
                    </span>
                    <span className="font-mono text-base font-bold text-[var(--earth-dark)]">
                      ₹{product.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectProduct(product)}
                      type="button"
                      className="p-2 rounded-lg bg-[var(--surface-parchment)] hover:bg-[var(--spice-red)] hover:text-white text-[var(--earth-dark)] transition-all cursor-pointer"
                      title="Inspect Specimen Details"
                      aria-label={`Inspect ${product.title}`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <a
                      href={product.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[var(--brand-forest)] text-white hover:bg-[var(--brand-forest-dark)] transition-all"
                      title="Buy on Official Mother's Recipe Store"
                      aria-label={`Buy ${product.title} on official store`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
