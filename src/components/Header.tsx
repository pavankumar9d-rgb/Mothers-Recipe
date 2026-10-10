import React, { useState } from 'react';
import { assetUrl } from '../utils/paths';
import { Search, Compass, Sparkles, Menu, X, ArrowUpRight, Utensils } from 'lucide-react';

interface HeaderProps {
  onSearchClick: () => void;
  activeCount: number;
}

export const Header: React.FC<HeaderProps> = ({ onSearchClick, activeCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[var(--border-light)] transition-all">
      <div className="container flex items-center justify-between h-20">
        {/* Brand / Logo */}
        <div className="flex items-center gap-4">
          <a href="#" className="flex items-center gap-3 group text-decoration-none" aria-label="Mother's Recipe Home">
            <img
              src={assetUrl('/assets/brand/logo/mothers-recipe-logo.svg')}
              alt="Mother's Recipe Official Brandmark"
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-102"
            />
            <div className="hidden sm:flex flex-col border-l border-[var(--border-medium)] pl-3">
              <span className="font-serif text-xs font-semibold tracking-wider text-[var(--brand-forest)] uppercase">
                The Living Pantry
              </span>
              <span className="text-[10px] text-[var(--text-muted)] font-mono tracking-tight">
                Authentic Indian Achaar
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 font-medium text-sm text-[var(--earth-muted)]" aria-label="Primary Navigation">
          <a
            href="#hero"
            className="hover:text-[var(--spice-red)] transition-colors py-1"
          >
            Pantry
          </a>
          <a
            href="#pantry-to-plate"
            className="hover:text-[var(--spice-red)] transition-colors py-1 flex items-center gap-1.5"
          >
            <Utensils className="w-3.5 h-3.5 text-[var(--mustard-gold)]" />
            <span>Pantry to Plate</span>
          </a>
          <a
            href="#specimens"
            className="hover:text-[var(--spice-red)] transition-colors py-1 flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5 text-[var(--mustard-gold)]" />
            <span>Regional Drawer</span>
          </a>
          <a
            href="#build-your-bite"
            className="hover:text-[var(--spice-red)] transition-colors py-1 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[var(--spice-red)]" />
            <span>Build Your Bite</span>
          </a>
          <a
            href="#archive"
            className="hover:text-[var(--spice-red)] transition-colors py-1"
          >
            Archive ({activeCount})
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onSearchClick}
            type="button"
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium bg-white rounded-full border border-[var(--border-medium)] shadow-xs text-[var(--earth-dark)] hover:border-[var(--mustard-gold)] hover:bg-[var(--surface-tinted)] transition-all cursor-pointer"
            aria-label="Search all authentic pickles"
          >
            <Search className="w-3.5 h-3.5 text-[var(--mustard-gold)]" />
            <span className="hidden sm:inline">Search Pickles</span>
          </button>

          <a
            href="https://www.mothersrecipe.com/collections/pickle"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[var(--brand-forest)] text-white rounded-full hover:bg-[var(--brand-forest-dark)] transition-all shadow-xs"
          >
            <span>Official Store</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[var(--earth-dark)] hover:bg-[var(--surface-parchment)] transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[var(--border-medium)] px-6 py-6 shadow-xl animate-fadeIn">
          <nav className="flex flex-col gap-4 text-base font-medium">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[var(--earth-dark)] hover:text-[var(--spice-red)] py-1.5"
            >
              The Living Pantry
            </a>
            <a
              href="#pantry-to-plate"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[var(--earth-dark)] hover:text-[var(--spice-red)] py-1.5 flex items-center gap-2"
            >
              <Utensils className="w-4 h-4 text-[var(--mustard-gold)]" />
              Pantry to Plate
            </a>
            <a
              href="#specimens"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[var(--earth-dark)] hover:text-[var(--spice-red)] py-1.5 flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-[var(--mustard-gold)]" />
              Regional Flavour Drawer
            </a>
            <a
              href="#build-your-bite"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[var(--earth-dark)] hover:text-[var(--spice-red)] py-1.5 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[var(--spice-red)]" />
              Build Your Bite
            </a>
            <a
              href="#archive"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[var(--earth-dark)] hover:text-[var(--spice-red)] py-1.5"
            >
              Catalogue Archive ({activeCount} Variants)
            </a>
            <div className="pt-4 border-t border-[var(--border-light)]">
              <a
                href="https://www.mothersrecipe.com/collections/pickle"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-2.5 bg-[var(--brand-forest)] text-white font-medium text-sm rounded-lg"
              >
                Official Mother’s Recipe Store
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
