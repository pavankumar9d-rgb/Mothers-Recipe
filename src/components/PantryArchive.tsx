import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { assetUrl } from '../utils/paths';
import {
  Search,
  Grid,
  List,
  ArrowUpRight,
  Eye,
  X
} from 'lucide-react';

interface PantryArchiveProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const CATEGORIES = ['All Categories', 'Mango', 'Chilli', 'Garlic', 'Lime', 'Mixed', 'Tomato', 'Gongura'];

export const PantryArchive: React.FC<PantryArchiveProps> = ({
  products,
  onSelectProduct,
  searchQuery,
  setSearchQuery
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'name'>('recommended');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Compute regions from data
  const regions = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.region) set.add(p.region);
    });
    return ['All Regions', ...Array.from(set)];
  }, [products]);

  // Filter and Sort
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.region.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);

      const matchesCat =
        selectedCategory === 'All Categories' ||
        p.category.toLowerCase() === selectedCategory.toLowerCase() ||
        p.title.toLowerCase().includes(selectedCategory.toLowerCase());

      const matchesReg =
        selectedRegion === 'All Regions' ||
        p.region.toLowerCase() === selectedRegion.toLowerCase();

      return matchesSearch && matchesCat && matchesReg;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        return parseFloat(a.price || '0') - parseFloat(b.price || '0');
      }
      if (sortBy === 'price-desc') {
        return parseFloat(b.price || '0') - parseFloat(a.price || '0');
      }
      if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      }
      return 0; // Default order
    });
  }, [products, searchQuery, selectedCategory, selectedRegion, sortBy]);

  return (
    <section id="archive" className="py-24 bg-[var(--bg-ivory)] border-b border-[var(--border-light)] paper-grain">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[var(--border-medium)] mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge-tag badge-forest">
                Comprehensive Archive
              </span>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                {products.length} Official Catalogued Variants
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--earth-dark)]">
              The Grand Pantry Archive
            </h2>
            <p className="text-sm sm:text-base text-[var(--earth-muted)] max-w-xl mt-2 font-sans">
              Search, filter, and inspect every authentic pickle in the Mother's Recipe
              lineage. Every image is sourced from genuine brand photography.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-[var(--mustard-gold)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ingredient, name, region..."
              className="w-full pl-10 pr-10 py-2.5 bg-white border border-[var(--border-medium)] rounded-full text-xs font-sans text-[var(--earth-dark)] placeholder:text-stone-400 focus:outline-none focus:border-[var(--mustard-gold)] focus:ring-1 focus:ring-[var(--mustard-gold)] shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                type="button"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                type="button"
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[var(--spice-red)] text-white border-[var(--spice-red)] shadow-sm'
                    : 'bg-white text-[var(--earth-muted)] border-[var(--border-medium)] hover:border-[var(--spice-red)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort & View Mode Controls */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Region select */}
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-3 py-1.5 bg-white border border-[var(--border-medium)] rounded-lg text-xs font-sans text-[var(--earth-dark)] focus:outline-none focus:border-[var(--mustard-gold)] cursor-pointer"
            >
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            {/* Sort select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 bg-white border border-[var(--border-medium)] rounded-lg text-xs font-sans text-[var(--earth-dark)] focus:outline-none focus:border-[var(--mustard-gold)] cursor-pointer"
            >
              <option value="recommended">Featured Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>

            {/* Grid / List toggle */}
            <div className="flex items-center bg-white border border-[var(--border-medium)] rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                type="button"
                className={`p-1.5 rounded cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[var(--surface-parchment)] text-[var(--spice-red)]'
                    : 'text-stone-400 hover:text-stone-700'
                }`}
                title="Grid View"
                aria-label="Grid view"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                type="button"
                className={`p-1.5 rounded cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-[var(--surface-parchment)] text-[var(--spice-red)]'
                    : 'text-stone-400 hover:text-stone-700'
                }`}
                title="List View"
                aria-label="List view"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="text-xs font-mono text-[var(--text-muted)] mb-6 flex items-center justify-between">
          <span>Showing {filteredProducts.length} authentic pickle items</span>
          {searchQuery && (
            <span>
              Filtered by: "<strong className="text-[var(--earth-dark)]">{searchQuery}</strong>"
            </span>
          )}
        </div>

        {/* Grid View */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => {
              const cutout = assetUrl(
                p.cutoutPath || `/assets/products/cutouts/${p.slug}.png`
              );
              const fallbackImg =
                p.images && p.images[0]?.localPath
                  ? assetUrl(`/${p.images[0].localPath}`)
                  : cutout;

              return (
                <div
                  key={p.slug}
                  className="group bg-white rounded-2xl p-5 border border-[var(--border-medium)] hover:border-[var(--spice-red)] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top pill */}
                    <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] mb-2">
                      <span className="text-[10px] uppercase font-bold text-[var(--brand-forest)] truncate max-w-[140px]">
                        {p.category}
                      </span>
                      <span className="text-[11px] font-bold text-[var(--spice-red)]">
                        ₹{p.price}
                      </span>
                    </div>

                    {/* Image Area */}
                    <div className="h-44 flex items-center justify-center my-3 relative group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={cutout}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = fallbackImg;
                        }}
                        alt={p.title}
                        className="max-h-40 w-auto object-contain drop-shadow-[0_8px_14px_rgba(28,25,23,0.12)]"
                        loading="lazy"
                      />
                    </div>

                    {/* Title & Details */}
                    <div>
                      <span className="text-[10px] font-mono text-[var(--mustard-gold-hover)] uppercase font-semibold">
                        {p.region}
                      </span>
                      <h3 className="font-serif font-bold text-base text-[var(--earth-dark)] group-hover:text-[var(--spice-red)] transition-colors line-clamp-1 mt-0.5">
                        {p.title}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] mt-1 line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 mt-4 border-t border-[var(--border-light)] flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[var(--text-muted)]">
                      {p.weight}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onSelectProduct(p)}
                        type="button"
                        className="px-2.5 py-1.5 rounded-lg bg-[var(--surface-parchment)] hover:bg-[var(--spice-red)] hover:text-white text-xs font-medium text-[var(--earth-dark)] transition-colors flex items-center gap-1 cursor-pointer"
                        title="View Full Spec & Gallery"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Specs</span>
                      </button>

                      <a
                        href={p.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-[var(--brand-forest)] text-white hover:bg-[var(--brand-forest-dark)] transition-colors"
                        title="Buy on Official Store"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View */
          <div className="flex flex-col gap-3">
            {filteredProducts.map((p) => {
              const cutout = assetUrl(
                p.cutoutPath || `/assets/products/cutouts/${p.slug}.png`
              );
              const fallbackImg =
                p.images && p.images[0]?.localPath
                  ? assetUrl(`/${p.images[0].localPath}`)
                  : cutout;

              return (
                <div
                  key={p.slug}
                  className="bg-white rounded-xl p-4 border border-[var(--border-medium)] hover:border-[var(--spice-red)] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 transition-all"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-16 h-16 shrink-0 bg-[var(--surface-parchment)] rounded-lg flex items-center justify-center p-1">
                      <img
                        src={cutout}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = fallbackImg;
                        }}
                        alt={p.title}
                        className="max-h-full w-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase text-[var(--mustard-gold-hover)] font-bold">
                          {p.region}
                        </span>
                        <span className="text-[10px] text-stone-400">•</span>
                        <span className="text-[10px] font-mono text-[var(--text-muted)]">
                          {p.category}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-base text-[var(--earth-dark)]">
                        {p.title}
                      </h4>
                      <p className="text-xs text-[var(--text-muted)] line-clamp-1 max-w-lg">
                        {p.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-[var(--border-light)]">
                    <div className="text-left sm:text-right">
                      <span className="text-xs font-mono text-[var(--text-muted)] block">
                        {p.weight}
                      </span>
                      <span className="font-mono font-bold text-sm text-[var(--earth-dark)]">
                        ₹{p.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectProduct(p)}
                        type="button"
                        className="px-3 py-1.5 rounded-lg bg-[var(--surface-parchment)] hover:bg-[var(--spice-red)] hover:text-white text-xs font-medium text-[var(--earth-dark)] transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Specs</span>
                      </button>

                      <a
                        href={p.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-[var(--brand-forest)] text-white hover:bg-[var(--brand-forest-dark)] text-xs font-medium flex items-center gap-1"
                      >
                        <span>Buy</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-[var(--border-medium)]">
            <p className="font-serif text-lg text-[var(--earth-muted)]">
              No matching pickles found for "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Categories');
                setSelectedRegion('All Regions');
              }}
              type="button"
              className="mt-4 btn-secondary text-xs"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
