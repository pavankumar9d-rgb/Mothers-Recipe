import React, { useState } from 'react';
import { MEAL_BASES, PALATE_PROFILES, BITE_PAIRINGS } from '../data/curatedData';
import { Product } from '../types';
import {
  Sparkles,
  Flame,
  Shuffle,
  ExternalLink,
  Soup,
  CheckCircle2,
  Info
} from 'lucide-react';

interface BuildYourBiteProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const BuildYourBite: React.FC<BuildYourBiteProps> = ({
  products,
  onSelectProduct
}) => {
  const [selectedMealId, setSelectedMealId] = useState('rice-ghee');
  const [selectedPalateId, setSelectedPalateId] = useState('fiery-pungent');

  // Find matching pairing
  const currentPairing =
    BITE_PAIRINGS.find(
      (p) => p.mealId === selectedMealId && p.palateId === selectedPalateId
    ) || BITE_PAIRINGS[0];

  // Find the product details from products prop
  const matchedProduct = products.find(
    (p) => p.slug === currentPairing.productSlug
  );

  const selectedMeal =
    MEAL_BASES.find((m) => m.id === selectedMealId) || MEAL_BASES[0];
  const selectedPalate =
    PALATE_PROFILES.find((p) => p.id === selectedPalateId) || PALATE_PROFILES[0];

  // Randomize / Chef's Surprise
  const handleRandomize = () => {
    const randomMeal =
      MEAL_BASES[Math.floor(Math.random() * MEAL_BASES.length)];
    const randomPalate =
      PALATE_PROFILES[Math.floor(Math.random() * PALATE_PROFILES.length)];
    setSelectedMealId(randomMeal.id);
    setSelectedPalateId(randomPalate.id);
  };

  const jarCutout =
    matchedProduct?.cutoutPath ||
    `/assets/products/cutouts/${currentPairing.productSlug}.png`;

  return (
    <section
      id="build-your-bite"
      className="py-24 bg-[var(--bg-ivory)] border-b border-[var(--border-light)] paper-grain relative overflow-hidden"
    >
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="badge-tag badge-spice">
              <Sparkles className="w-3.5 h-3.5" />
              The Signature Experience
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--earth-dark)]">
            Build Your Bite: Flavour Laboratory
          </h2>
          <p className="text-sm sm:text-base text-[var(--earth-muted)] font-sans mt-3 leading-relaxed">
            Achaar is never eaten alone; it completes the plate. Select your meal base
            and desired flavour mood to compute the ideal Mother’s Recipe pairing with
            our culinary tasting rationale.
          </p>
        </div>

        {/* The Laboratory Layout: Step 1 (Meal) + Step 2 (Palate) -> Live Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* Step 1: Meal Base Selector */}
            <div className="bg-white p-6 rounded-2xl border border-[var(--border-medium)] shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase font-mono tracking-wider font-bold text-[var(--brand-forest)]">
                  Step 1: Choose Your Meal Base
                </span>
                <span className="text-xs text-[var(--text-muted)] font-mono">
                  {MEAL_BASES.length} Bases
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                {MEAL_BASES.map((meal) => {
                  const isSelected = selectedMealId === meal.id;
                  return (
                    <button
                      key={meal.id}
                      onClick={() => setSelectedMealId(meal.id)}
                      type="button"
                      className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        isSelected
                          ? 'bg-[var(--surface-tinted)] border-[var(--spice-red)] shadow-sm'
                          : 'bg-[#FAF7F2] border-[var(--border-light)] hover:bg-white hover:border-[var(--border-medium)]'
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg mt-0.5 ${
                          isSelected
                            ? 'bg-[var(--spice-red)] text-white'
                            : 'bg-white text-[var(--brand-forest)] border border-[var(--border-light)]'
                        }`}
                      >
                        <Soup className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-serif font-bold text-base text-[var(--earth-dark)]">
                            {meal.name}
                          </span>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-[var(--spice-red)]" />
                          )}
                        </div>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5 line-clamp-1">
                          {meal.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Palate Direction Selector */}
            <div className="bg-white p-6 rounded-2xl border border-[var(--border-medium)] shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase font-mono tracking-wider font-bold text-[var(--brand-forest)]">
                  Step 2: Choose Your Palate Mood
                </span>
                <span className="text-xs text-[var(--text-muted)] font-mono">
                  {PALATE_PROFILES.length} Profiles
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PALATE_PROFILES.map((profile) => {
                  const isSelected = selectedPalateId === profile.id;
                  return (
                    <button
                      key={profile.id}
                      onClick={() => setSelectedPalateId(profile.id)}
                      type="button"
                      className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[var(--surface-tinted)] border-[var(--mustard-gold)] shadow-sm ring-1 ring-[var(--mustard-gold)]'
                          : 'bg-[#FAF7F2] border-[var(--border-light)] hover:bg-white hover:border-[var(--border-medium)]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-serif font-bold text-sm text-[var(--earth-dark)]">
                            {profile.name}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-[var(--text-muted)] block mb-1">
                          {profile.subtitle}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-[var(--spice-red)] flex items-center gap-0.5">
                          <Flame className="w-3 h-3 fill-current" />
                          {profile.intensity}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[var(--mustard-gold-hover)]" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Surprise Button */}
              <div className="mt-4 pt-4 border-t border-[var(--border-light)] flex justify-end">
                <button
                  onClick={handleRandomize}
                  type="button"
                  className="flex items-center gap-1.5 text-xs font-semibold text-[var(--brand-forest)] hover:text-[var(--spice-red)] transition-colors cursor-pointer"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>Chef's Surprise Pairing</span>
                </button>
              </div>
            </div>

          </div>

          {/* Live Pairing Canvas Column (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-[var(--border-medium)] shadow-xl relative overflow-hidden">
            
            {/* Top pairing badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[var(--border-light)]">
              <div className="flex items-center gap-2">
                <span className="badge-tag badge-forest">
                  Verified Culinary Match
                </span>
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  {selectedMeal.name} + {selectedPalate.name}
                </span>
              </div>
              <span className="text-xs font-mono text-[var(--mustard-gold-hover)] font-bold">
                Pairing Code: #{selectedMealId.slice(0, 3).toUpperCase()}-{selectedPalateId.slice(0, 3).toUpperCase()}
              </span>
            </div>

            {/* Serving Scene Image + Jar Cutout Composition */}
            <div className="relative my-6 rounded-2xl overflow-hidden bg-stone-900 border border-[var(--border-light)] min-h-[300px] sm:min-h-[340px] flex items-center justify-center">
              {/* Background food serving photograph */}
              <img
                src={currentPairing.servingImage}
                alt={currentPairing.dishName}
                className="absolute inset-0 w-full h-full object-cover opacity-60 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

              {/* Dish Name Overlay */}
              <div className="absolute top-4 left-5 right-5 z-10 flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-mono text-amber-300 uppercase tracking-widest block">
                    Curated Plate
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-white drop-shadow-md">
                    {currentPairing.dishName}
                  </h4>
                </div>
              </div>

              {/* Jar Cutout positioned in the composition */}
              <div className="relative z-10 flex flex-col items-center mt-12 animate-fadeIn">
                <div className="h-44 sm:h-52 flex items-center justify-center filter drop-shadow-[0_16px_25px_rgba(0,0,0,0.6)]">
                  <img
                    src={jarCutout}
                    alt={currentPairing.pickleTitle}
                    className="max-h-full w-auto object-contain transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <div className="mt-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-white text-xs font-mono">
                  {currentPairing.pickleTitle}
                </div>
              </div>
            </div>

            {/* Culinary Rationale Box */}
            <div className="bg-[var(--surface-parchment)] p-5 rounded-2xl border border-[var(--border-medium)] mb-6">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-[var(--brand-forest)] uppercase tracking-wider">
                <Info className="w-4 h-4 text-[var(--mustard-gold)]" />
                The Culinary Rationale: Why This Bite Sings
              </div>
              <p className="text-sm sm:text-base text-[var(--earth-dark)] font-serif italic leading-relaxed">
                "{currentPairing.culinaryRationale}"
              </p>

              {/* Tasting Notes Pills */}
              <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-[var(--border-light)]">
                {currentPairing.tastingNotes.map((note) => (
                  <span
                    key={note}
                    className="px-2.5 py-1 bg-white rounded-full text-xs font-medium text-[var(--earth-dark)] border border-[var(--border-light)] shadow-xs"
                  >
                    ✦ {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div>
                <span className="text-xs text-[var(--text-muted)] font-mono block">
                  Recommended Authentic Product
                </span>
                <span className="font-serif font-bold text-lg text-[var(--earth-dark)]">
                  {currentPairing.pickleTitle}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {matchedProduct && (
                  <button
                    onClick={() => onSelectProduct(matchedProduct)}
                    type="button"
                    className="btn-secondary text-xs py-2.5 px-4"
                  >
                    Inspect Jar Specs
                  </button>
                )}

                <a
                  href={
                    matchedProduct?.officialUrl ||
                    'https://www.mothersrecipe.com/collections/pickle'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs py-2.5 px-5"
                >
                  <span>Buy on Official Store</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
