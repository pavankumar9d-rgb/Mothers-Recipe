import React, { useState } from 'react';
import { ALCHEMY_STEPS } from '../data/curatedData';
import { assetUrl } from '../utils/paths';
import { Sparkles, ArrowRight } from 'lucide-react';

export const AlchemyStory: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const current = ALCHEMY_STEPS[activeStep];

  return (
    <section id="alchemy" className="py-24 bg-[var(--surface-parchment)] border-b border-[var(--border-light)] paper-grain">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[var(--border-medium)] mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge-tag badge-forest">
                Craft & Heritage
              </span>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                Culinary Methodology
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--earth-dark)]">
              The Alchemy of Achaar
            </h2>
            <p className="text-sm sm:text-base text-[var(--earth-muted)] max-w-xl mt-2 font-sans">
              Indian pickling is a delicate balance of sun, unrefined salt, and cold-pressed oil.
              Discover four time-honoured stages of regional pickle craft.
            </p>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)] bg-white px-4 py-2 rounded-full border border-[var(--border-medium)]">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Time-Honoured Maturation Craft</span>
          </div>
        </div>

        {/* 4-Step Interactive Timeline */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {ALCHEMY_STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={step.step}
                onClick={() => setActiveStep(idx)}
                type="button"
                className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-white border-[var(--spice-red)] shadow-md ring-1 ring-[var(--spice-red)]'
                    : 'bg-[#FAF7F2] border-[var(--border-light)] hover:bg-white hover:border-[var(--border-medium)]'
                }`}
              >
                <div>
                  <span
                    className={`font-mono font-bold text-xs ${
                      isActive ? 'text-[var(--spice-red)]' : 'text-[var(--text-muted)]'
                    }`}
                  >
                    PHASE {step.step}
                  </span>
                  <h3 className="font-serif font-bold text-base text-[var(--earth-dark)] mt-1">
                    {step.title}
                  </h3>
                </div>
                <span className="text-[11px] text-[var(--text-muted)] mt-2 line-clamp-1">
                  {step.subtitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Stage Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[var(--border-medium)] shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Narrative & Technical Nuance (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-stone-100 rounded-full font-mono text-xs text-stone-600 font-bold">
                STAGE {current.step} OF 04
              </span>
              <span className="text-xs font-mono text-[var(--mustard-gold-hover)] font-semibold">
                {current.subtitle}
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--earth-dark)] mb-4">
              {current.title}
            </h3>

            <p className="text-base text-[var(--earth-muted)] font-sans leading-relaxed mb-6">
              {current.description}
            </p>

            {/* Culinary Detail Callout */}
            <div className="bg-[var(--surface-parchment)] p-4 rounded-xl border-l-4 border-[var(--spice-red)] w-full mb-8">
              <span className="text-xs font-mono font-bold uppercase text-[var(--brand-forest)] block mb-1">
                The Heritage Secret
              </span>
              <p className="text-sm font-serif italic text-[var(--earth-dark)]">
                "{current.detail}"
              </p>
            </div>

            {/* Next Step Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  setActiveStep((prev) => (prev + 1) % ALCHEMY_STEPS.length)
                }
                type="button"
                className="btn-secondary text-xs py-2.5 px-4"
              >
                <span>Next Stage (Phase {ALCHEMY_STEPS[(activeStep + 1) % ALCHEMY_STEPS.length].step})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: High-Res Macro Editorial Photography (5 cols) */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden min-h-[320px] sm:min-h-[380px] shadow-lg border border-[var(--border-medium)]">
            <img
              key={current.step}
              src={assetUrl(current.texture)}
              alt={current.title}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] font-mono uppercase tracking-wider bg-black/60 backdrop-blur-md px-2.5 py-1 rounded">
                Authentic Photography Archive
              </span>
              <p className="font-serif text-sm font-medium mt-1 drop-shadow-sm">
                Mother’s Recipe Master Batch Craft
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
