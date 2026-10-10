import React, { useState, useRef } from 'react';
import { Product } from '../types';
import { assetUrl } from '../utils/paths';
import { ChevronLeft, ChevronRight, Flame, ArrowUpRight, Eye } from 'lucide-react';

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
      const offset = direction === 'left' ? -360 : 360;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="specimens" className="py-20 bg-[var(--surface-parchment)] border-b border-[var(--border-light)]">
      <div className="container mb-8">
        {/* Header and Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--border-medium)]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--mustard-gold-hover)] font-bold block mb-1">
              Regional Flavour Palette
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--earth-dark)]">
              Regional Traditions
            </h2>
            <p className="text-sm sm:text-base text-[var(--earth-muted)] max-w-xl mt-2 font-sans">
              Explore distinctive pickling profiles across India. Filter by regional heritage
              or spice intensity to inspect authentic recipes and pack sizes.
            </p>
          </div>

          {/* Left/Right Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              type="button"
              className="p-3 rounded-full bg-white border border-[var(--border-medium)] text-[var(--earth-dark)] hover:bg-[var(--surface-tinted)] hover:border-[var(--spice-red)] transition-all shadow-xs cursor-pointer"
              aria-label="Scroll left in drawer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              type="button"
              className="p-3 rounded-full bg-white border border-[var(--border-medium)] text-[var(--earth-dark)] hover:bg-[var(--surface-tinted)] hover:border-[var(--spice-red)] transition-all shadow-xs cursor-pointer"
              aria-label="Scroll right in drawer"
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
                    ? 'bg-[var(--brand-forest)] text-white border-[var(--brand-forest)] shadow-xs'
                    : 'bg-white text-[var(--earth-muted)] border-[var(--border-medium)] hover:border-[var(--brand-forest)] hover:bg-[var(--surface-tinted)]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Spice Filter Quick Toggle */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-[var(--text-muted)] font-sans">Spice Level:</span>
            <button
              onClick={() => setSelectedSpice(null)}
              type="button"
              className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                selectedSpice === null
                  ? 'bg-[var(--spice-red)] text-white font-semibold'
                  : 'bg-stone-200/80 text-stone-700 hover:bg-stone-300'
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
                    : 'bg-stone-200/80 text-stone-700 hover:bg-stone-300'
                }`}
              >
                <Flame className="w-3 h-3 fill-current" />
                <span>{lvl === 5 ? 'Fiery (5/5)' : lvl === 4 ? 'Hot (4/5)' : 'Medium (3/5)'}</span>
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
          aria-label="Regional pickles carousel"
          className="horizontal-scroll-drawer focus-visible:ring-2 focus-visible:ring-[var(--mustard-gold)] focus-visible:outline-none"
        >
          {filteredProducts.map((product) => {
            const cutout = assetUrl(
              product.cutoutPath || `/assets/products/cutouts/${product.slug}.png`
            );
            const fallbackImg =
              product.images && product.images[0]?.localPath
                ? assetUrl(product.images[0].localPath)
                : cutout;

            return (
              <div
                key={product.slug}
                className="drawer-card group relative bg-white rounded-2xl p-6 border border-[var(--border-medium)] hover:border-[var(--spice-red)] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Card Metadata */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] mb-3">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[var(--mustard-gold-hover)]">
                      {product.region} Tradition
                    </span>
                    <span className="flex items-center gap-1 text-[var(--spice-red)] font-bold">
                      <Flame className="w-3.5 h-3.5 fill-current" />
                      {product.spiceLevel || 4}/5
                    </span>
                  </div>

                  {/* Cutout Container */}
                  <div className="relative h-56 flex items-center justify-center my-2 p-2 group-hover:scale-104 transition-transform duration-300">
                    <div className="absolute inset-x-8 bottom-2 h-6 bg-stone-900/8 rounded-[100%] blur-md" />
                    <img
                      src={cutout}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = fallbackImg;
                      }}
                      alt={product.title}
                      className="max-h-52 w-auto object-contain drop-shadow-[0_12px_18px_rgba(28,25,23,0.15)]"
                      loading="lazy"
                    />
                  </div>

                  {/* Title & Description */}
                  <div className="mt-4">
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
                      title="Inspect Product Details"
                      aria-label={`Inspect ${product.title}`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <a
                      href={product.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[var(--brand-forest)] text-white hover:bg-[var(--brand-forest-dark)] transition-all"
                      title="View on Official Store"
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
