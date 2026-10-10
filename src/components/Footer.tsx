import React from 'react';
import { assetUrl } from '../utils/paths';
import { ArrowUp, ArrowUpRight, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[var(--brand-forest-dark)] text-stone-300 py-16 border-t border-stone-800">
      <div className="container">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand & Ethos (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={assetUrl('/assets/brand/logo/mothers-recipe-logo.svg')}
                alt="Mother's Recipe Official Brand Logo"
                className="h-12 w-auto object-contain bg-white/95 p-1 rounded-md"
              />
              <img
                src={assetUrl('/assets/brand/logo/mothers-recipe-dfpl-logo.png')}
                alt="Desai Foods DFPL Seal"
                className="h-10 w-auto object-contain bg-white/95 p-1 rounded-md"
              />
            </div>

            <p className="text-xs font-sans text-stone-400 max-w-sm leading-relaxed mb-6">
              Mother's Recipe is India's preeminent traditional culinary brand, bringing
              honest kitchen craft, sun-ripened farm ingredients, and generational recipes
              to dining tables across over 50 countries worldwide.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Manufactured by Desai Foods Pvt. Ltd. (DFPL), Pune</span>
            </div>
          </div>

          {/* Quick Navigation Links (3 cols) */}
          <div className="md:col-span-3">
            <span className="font-mono text-xs uppercase tracking-wider text-amber-300 block mb-4 font-semibold">
              The Living Pantry Index
            </span>
            <ul className="flex flex-col gap-2.5 text-xs text-stone-400">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  The Living Pantry Hero
                </a>
              </li>
              <li>
                <a href="#pantry-to-plate" className="hover:text-white transition-colors">
                  From Pantry to Plate
                </a>
              </li>
              <li>
                <a href="#specimens" className="hover:text-white transition-colors">
                  Flavour Specimen Drawer
                </a>
              </li>
              <li>
                <a href="#build-your-bite" className="hover:text-white transition-colors">
                  Build Your Bite (Flavour Lab)
                </a>
              </li>
              <li>
                <a href="#alchemy" className="hover:text-white transition-colors">
                  The Alchemy of Achaar (4 Stages)
                </a>
              </li>
              <li>
                <a href="#archive" className="hover:text-white transition-colors">
                  Grand Catalogue Archive (80+ Jars)
                </a>
              </li>
            </ul>
          </div>

          {/* Official Verification & Store (4 cols) */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-amber-300 block mb-4 font-semibold">
                Official Manufacturer Inquiries
              </span>
              <p className="text-xs text-stone-400 mb-3 leading-relaxed">
                Desai Foods Private Limited<br />
                Atur Chambers, 2A Moledina Road, Camp,<br />
                Pune – 411001, Maharashtra, India.
              </p>
              <div className="text-xs font-mono text-stone-400 mb-6">
                Customer Support: <span className="text-stone-300">consumercare@desai.com</span>
              </div>
            </div>

            <a
              href="https://www.mothersrecipe.com/collections/pickle"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[var(--spice-red)] hover:bg-[var(--spice-red-hover)] text-white font-medium text-xs rounded-xl shadow-md transition-all"
            >
              <span>Visit Official Mother’s Recipe Store</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Bottom Transparency & Legal Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono text-stone-500">
          <p className="text-center md:text-left max-w-2xl leading-relaxed">
            <strong>Creative Pitch & Concept Portfolio Demonstration:</strong> All brand logos,
            trade dress, package silhouettes, and product catalogue names are the exclusive
            intellectual property of Desai Foods Private Limited (DFPL). No commercial endorsement
            is claimed or implied.
          </p>

          <button
            onClick={scrollToTop}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
