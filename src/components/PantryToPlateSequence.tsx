import React, { useState } from 'react';
import { assetUrl } from '../utils/paths';
import { ArrowRight } from 'lucide-react';

interface Stage {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  overlayCutout?: string;
  props: Array<{
    name: string;
    path: string;
    position: string;
    className: string;
  }>;
}

const STAGES: Stage[] = [
  {
    id: 'raw-craft',
    number: '01',
    title: 'The Raw Elements',
    tagline: 'Orchard-Picked Mangoes & Whole Stone-Pounded Spices',
    description:
      'Every authentic pickle begins with tart, firm raw mangoes sliced at dawn, hand-selected whole mustard seeds (rai), fenugreek (methi), and sun-dried fiery Guntur chillies.',
    image: '/assets/editorial/story/ingredient-tabletop-2.jpg',
    props: [
      {
        name: 'Raw Mango Fruit',
        path: '/assets/ingredients/cutouts/raw-mango-whole.png',
        position: 'top-8 left-8 sm:left-12',
        className: 'w-28 sm:w-36 -rotate-12'
      },
      {
        name: 'Mustard Seeds Bowl',
        path: '/assets/ingredients/cutouts/mustard-seeds-bowl.png',
        position: 'bottom-12 left-10 sm:left-16',
        className: 'w-24 sm:w-32 rotate-6'
      },
      {
        name: 'Sun-Dried Chillies',
        path: '/assets/ingredients/cutouts/red-chilli-pair.png',
        position: 'top-12 right-10 sm:right-16',
        className: 'w-24 sm:w-32 -rotate-45'
      },
      {
        name: 'Mango Wedges',
        path: '/assets/ingredients/cutouts/mango-wedges-cubes.png',
        position: 'bottom-10 right-10 sm:right-14',
        className: 'w-28 sm:w-36 rotate-12'
      }
    ]
  },
  {
    id: 'jar-maturation',
    number: '02',
    title: 'The Curing Jar',
    tagline: 'Steeped in Cold-Pressed Oil & Traditional Stoneware',
    description:
      'Immersed in pungent mustard and sesame oils, the spiced fruit wedges slowly mature. The unrefined oils seal each grain, creating an anaerobic sanctuary where flavors deepen and soften under natural warmth.',
    image: '/assets/editorial/story/regional-flavour-craft.jpg',
    overlayCutout: '/assets/products/cutouts/andhra-avakaya-pickle-200-gm.png',
    props: [
      {
        name: 'Fenugreek Bowl',
        path: '/assets/ingredients/cutouts/fenugreek-seeds-bowl.png',
        position: 'top-10 left-12',
        className: 'w-20 sm:w-28'
      },
      {
        name: 'Garlic Bulb',
        path: '/assets/ingredients/cutouts/garlic-bulb-cloves.png',
        position: 'bottom-12 right-12',
        className: 'w-24 sm:w-32 -rotate-12'
      }
    ]
  },
  {
    id: 'plated-feast',
    number: '03',
    title: 'The Plated Feast',
    tagline: 'From Pantry Jar to Steaming Comforting Bites',
    description:
      'Achaar is never eaten alone; it transforms simple staples into an evocative sensory banquet. Paired with steaming hot rice and melted desi ghee or flaky blistered parathas, the meal is complete.',
    image: '/assets/editorial/serving/serving-meal-rice-thali.jpg',
    overlayCutout: '/assets/products/cutouts/andhra-avakaya-pickle-200-gm.png',
    props: []
  }
];

export const PantryToPlateSequence: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const currentStage = STAGES[activeStageIndex];

  return (
    <section
      id="pantry-to-plate"
      className="py-24 bg-[var(--surface-parchment)] border-b border-[var(--border-light)] overflow-hidden"
    >
      <div className="container">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--mustard-gold-hover)] font-bold block mb-2">
            The Signature Sequence
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--earth-dark)]">
            From Pantry to Plate
          </h2>
          <p className="text-sm sm:text-base text-[var(--earth-muted)] font-sans mt-3 leading-relaxed">
            Witness how raw orchard produce and roasted whole spices mature through
            traditional pickling rituals before completing everyday Indian meals.
          </p>

          {/* Staged Stepper Controls */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {STAGES.map((stg, idx) => {
              const isActive = activeStageIndex === idx;
              return (
                <button
                  key={stg.id}
                  onClick={() => setActiveStageIndex(idx)}
                  type="button"
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[var(--brand-forest)] text-white shadow-sm'
                      : 'bg-white text-[var(--earth-muted)] border border-[var(--border-medium)] hover:border-[var(--brand-forest)]'
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-80">{stg.number}</span>
                  <span>{stg.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Visual Stage Canvas */}
        <div className="relative bg-white rounded-3xl p-6 sm:p-12 border border-[var(--border-medium)] shadow-xl overflow-hidden min-h-[460px] sm:min-h-[520px] flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Visual Showcase (Left/Center) */}
          <div className="relative w-full lg:w-7/12 h-[340px] sm:h-[420px] rounded-2xl overflow-hidden bg-stone-900 border border-[var(--border-light)] flex items-center justify-center">
            {/* Background Atmosphere Image */}
            <img
              key={currentStage.id}
              src={assetUrl(currentStage.image)}
              alt={currentStage.title}
              className="absolute inset-0 w-full h-full object-cover opacity-70 transition-opacity duration-700 brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

            {/* Stage 1: Dispersed Props Still Life */}
            {activeStageIndex === 0 && (
              <div className="absolute inset-0 z-10 pointer-events-none animate-fadeIn">
                {currentStage.props.map((p) => (
                  <div
                    key={p.name}
                    className={`absolute ${p.position} ${p.className} transition-transform duration-700 drop-shadow-xl`}
                  >
                    <img
                      src={assetUrl(p.path)}
                      alt={p.name}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Stage 2: Central Jar Emerges Among Props */}
            {activeStageIndex === 1 && (
              <div className="relative z-20 flex flex-col items-center animate-fadeIn">
                <img
                  src={assetUrl(currentStage.overlayCutout || '')}
                  alt="Mother's Recipe Jar"
                  className="max-h-[300px] sm:max-h-[340px] w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)]"
                />
                {currentStage.props.map((p) => (
                  <div
                    key={p.name}
                    className={`absolute ${p.position} ${p.className} drop-shadow-lg`}
                  >
                    <img
                      src={assetUrl(p.path)}
                      alt={p.name}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Stage 3: Plated Meal with Serving Jar */}
            {activeStageIndex === 2 && (
              <div className="relative z-20 flex flex-col items-center animate-fadeIn text-center">
                <div className="flex items-center gap-6">
                  <img
                    src={assetUrl(currentStage.overlayCutout || '')}
                    alt="Pickle Jar"
                    className="max-h-[220px] sm:max-h-[260px] w-auto object-contain drop-shadow-[0_16px_25px_rgba(0,0,0,0.7)] hover:scale-105 transition-transform"
                  />
                </div>
                <span className="mt-3 text-xs font-mono text-white/90 bg-black/60 px-3 py-1 rounded-full border border-white/20 backdrop-blur-xs">
                  Steamed Rice & Melted Ghee with Andhra Avakaya
                </span>
              </div>
            )}

            {/* Stage indicator watermark in canvas */}
            <div className="absolute bottom-4 left-5 z-20 text-white/80 font-mono text-xs">
              <span>STAGE {currentStage.number} / 03</span>
            </div>
          </div>

          {/* Narrative Details (Right Column) */}
          <div className="w-full lg:w-5/12 flex flex-col items-start pr-0 lg:pr-4">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--mustard-gold-hover)] mb-2">
              Phase {currentStage.number}: {currentStage.tagline}
            </span>

            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--earth-dark)] mb-4">
              {currentStage.title}
            </h3>

            <p className="text-sm sm:text-base text-[var(--earth-muted)] font-sans leading-relaxed mb-8">
              {currentStage.description}
            </p>

            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  setActiveStageIndex((prev) => (prev + 1) % STAGES.length)
                }
                type="button"
                className="btn-primary text-xs py-3 px-5 cursor-pointer"
              >
                <span>
                  {activeStageIndex === STAGES.length - 1
                    ? 'Replay Journey (01)'
                    : `Next: ${STAGES[activeStageIndex + 1].title}`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#build-your-bite"
                className="btn-secondary text-xs py-3 px-5"
              >
                Build Your Own Plate
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
