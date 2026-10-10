import React, { useState, useEffect } from 'react';
import { Product } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SpecimenDrawer } from './components/SpecimenDrawer';
import { BuildYourBite } from './components/BuildYourBite';
import { AlchemyStory } from './components/AlchemyStory';
import { PantryArchive } from './components/PantryArchive';
import { EditorialFeast } from './components/EditorialFeast';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';

export const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch genuine products.json catalog
  useEffect(() => {
    fetch('/assets/data/products.json')
      .then((res) => res.json())
      .then((data: Product[]) => {
        // Enrich products with computed spice indicators and cutout paths
        const enriched = data.map((item) => {
          let spiceLevel: 1 | 2 | 3 | 4 | 5 = 4;
          let spiceLabel: 'Mild & Sweet' | 'Piquant' | 'Robust' | 'Fiery' | 'Extra Hot' = 'Robust';

          const titleLower = item.title.toLowerCase();
          if (titleLower.includes('sweet') || titleLower.includes('choondo') || titleLower.includes('chhundo') || titleLower.includes('gorkeri')) {
            spiceLevel = 1;
            spiceLabel = 'Mild & Sweet';
          } else if (titleLower.includes('mild')) {
            spiceLevel = 2;
            spiceLabel = 'Piquant';
          } else if (titleLower.includes('avakaya') || titleLower.includes('teekha') || titleLower.includes('hot')) {
            spiceLevel = 5;
            spiceLabel = 'Fiery';
          } else if (titleLower.includes('chilli') || titleLower.includes('garlic')) {
            spiceLevel = 4;
            spiceLabel = 'Robust';
          } else {
            spiceLevel = 3;
            spiceLabel = 'Piquant';
          }

          return {
            ...item,
            spiceLevel,
            spiceLabel,
            cutoutPath: `/assets/products/cutouts/${item.slug}.png`
          };
        });

        setProducts(enriched);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load products.json', err);
        setLoading(false);
      });
  }, []);

  const handleSearchFocus = () => {
    const archiveEl = document.getElementById('archive');
    if (archiveEl) {
      archiveEl.scrollIntoView({ behavior: 'smooth' });
      const input = archiveEl.querySelector('input');
      if (input) input.focus();
    }
  };

  const handleScrollToBuildBite = () => {
    const el = document.getElementById('build-your-bite');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToSpecimens = () => {
    const el = document.getElementById('specimens');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-ivory)] flex flex-col items-center justify-center font-serif text-[var(--earth-dark)]">
        <div className="w-12 h-12 border-3 border-[var(--mustard-gold)] border-t-[var(--spice-red)] rounded-full animate-spin mb-4" />
        <p className="text-lg">Opening The Living Pantry...</p>
        <span className="text-xs font-mono text-[var(--text-muted)] mt-1">
          Loading authentic Mother's Recipe catalogue
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-ivory)] text-[var(--earth-dark)]">
      {/* Primary Header */}
      <Header
        onSearchClick={handleSearchFocus}
        activeCount={products.length}
      />

      <main className="flex-1">
        {/* 1. Hero: The Living Pantry */}
        <Hero
          onBuildBiteClick={handleScrollToBuildBite}
          onExploreSpecimensClick={handleScrollToSpecimens}
        />

        {/* 2. Horizontal Sensory Drawer */}
        <SpecimenDrawer
          products={products}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />

        {/* 3. The Signature Flavour Laboratory: Build Your Bite */}
        <BuildYourBite
          products={products}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />

        {/* 4. The Alchemy of Achaar Craft Story */}
        <AlchemyStory />

        {/* 5. Complete Catalog Archive */}
        <PantryArchive
          products={products}
          onSelectProduct={(p) => setSelectedProduct(p)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* 6. Closing Editorial Feast Table */}
        <EditorialFeast />
      </main>

      {/* Master Footer */}
      <Footer />

      {/* Full Spec & Gallery Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
