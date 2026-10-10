import React, { useState } from 'react';
import { Search, Compass, Sparkles, BookOpen, Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onSearchClick: () => void;
  activeCount: number;
}

export const Header: React.FC<HeaderProps> = ({ onSearchClick, activeCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[var(--border-light)] transition-all">
      <div className="container flex items-center justify-between h-20">
        {/* Brand / Logo */}
        <div className="flex items-center gap-4">
          <a href="#" className="flex items-center gap-3 group text-decoration-none" aria-label="Mother's Recipe Home">
            <img
              src="/assets/brand/logo/mothers-recipe-logo.svg"
              alt="Mother's Recipe Official Brandmark"
              className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="hidden sm:flex flex-col border-l border-[var(--border-medium)] pl-3">
              <span className="font-serif text-xs font-semibold tracking-wider text-[var(--brand-forest)] uppercase">
                The Living Pantry
              </span>
              <span className="text-[10px] text-[var(--text-muted)] font-mono tracking-tight">
                Authentic Indian Achaar • Since 1979
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 font-medium text-sm text-[var(--earth-muted)]" aria-label="Primary Navigation">
          <a
            href="#hero"
            className="hover:text-[var(--spice-red)] transition-colors py-1 relative"
          >
            The Living Pantry
          </a>
          <a
            href="#specimens"
            className="hover:text-[var(--spice-red)] transition-colors py-1 flex items-center gap-1.5"
          >
            <Compass className="w-4 h-4 text-[var(--mustard-gold)]" />
            Specimen Drawer
          </a>
          <a
            href="#build-your-bite"
            className="hover:text-[var(--spice-red)] transition-colors py-1 flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-[var(--spice-red)]" />
            Build Your Bite
          </a>
          <a
            href="#alchemy"
            className="hover:text-[var(--spice-red)] transition-colors py-1 flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4 text-[var(--brand-forest)]" />
            The Alchemy
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
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium bg-white rounded-full border border-[var(--border-medium)] shadow-sm text-[var(--earth-dark)] hover:border-[var(--mustard-gold)] hover:bg-[var(--surface-tinted)] transition-all cursor-pointer"
            aria-label="Search all authentic pickles"
          >
            <Search className="w-3.5 h-3.5 text-[var(--mustard-gold)]" />
            <span className="hidden sm:inline">Search Pickles</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-stone-100 rounded text-stone-500 border border-stone-200">
              /
            </kbd>
          </button>

          <a
            href="https://www.mothersrecipe.com/collections/pickle"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[var(--brand-forest)] text-white rounded-full hover:bg-[var(--brand-forest-dark)] transition-all shadow-sm"
          >
            <span>Official Store</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[var(--earth-dark)] hover:bg-[var(--surface-parchment)] transition-colors"
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
              className="text-[var(--earth-dark)] hover:text-[var(--spice-red)] py-2"
            >
              The Living Pantry
            </a>
            <a
              href="#specimens"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[var(--earth-dark)] hover:text-[var(--spice-red)] py-2 flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-[var(--mustard-gold)]" />
              Flavour Specimen Drawer
            </a>
            <a
              href="#build-your-bite"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[var(--earth-dark)] hover:text-[var(--spice-red)] py-2 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[var(--spice-red)]" />
              Build Your Bite (Interactive Lab)
            </a>
            <a
              href="#alchemy"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[var(--earth-dark)] hover:text-[var(--spice-red)] py-2 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-[var(--brand-forest)]" />
              The Alchemy of Achaar
            </a>
            <a
              href="#archive"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[var(--earth-dark)] hover:text-[var(--spice-red)] py-2"
            >
              The Grand Pantry Archive ({activeCount} Variants)
            </a>
            <div className="pt-4 border-t border-[var(--border-light)] flex gap-3">
              <a
                href="https://www.mothersrecipe.com/collections/pickle"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3 bg-[var(--brand-forest)] text-white font-medium text-sm rounded-lg"
              >
                Visit Official Mother’s Recipe Store
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
