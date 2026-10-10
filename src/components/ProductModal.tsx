import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import {
  X,
  ExternalLink,
  Flame,
  ShieldCheck
} from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
      setSelectedImageIndex(0);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  if (!product) return null;

  const cutout = product.cutoutPath || `/assets/products/cutouts/${product.slug}.png`;
  const gallery = product.images || [];

  // Determine active view image
  const activeImage =
    gallery[selectedImageIndex]?.localPath
      ? `/${gallery[selectedImageIndex].localPath}`
      : cutout;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-light)] bg-[#FAF7F2]">
          <div className="flex items-center gap-2">
            <span className="badge-tag badge-forest">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Specimen
            </span>
            <span className="text-xs font-mono text-[var(--text-muted)]">
              ID: DFPL-{product.id || 'ACHAAR'}
            </span>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Visual Showcase & Gallery Selector (6 cols) */}
          <div className="md:col-span-6 flex flex-col items-center">
            {/* Primary Visual Stage */}
            <div className="w-full h-72 sm:h-80 bg-[var(--surface-tinted)] rounded-2xl flex items-center justify-center p-6 border border-[var(--border-light)] relative">
              <img
                src={activeImage}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = cutout;
                }}
                alt={product.title}
                className="max-h-full max-w-full object-contain drop-shadow-[0_16px_25px_rgba(28,25,23,0.18)]"
              />
              <span className="absolute bottom-3 left-3 text-[10px] font-mono text-[var(--text-muted)] bg-white/80 px-2 py-0.5 rounded backdrop-blur-xs">
                {gallery[selectedImageIndex]?.role || 'Packshot Front'}
              </span>
            </div>

            {/* Gallery Thumbnails */}
            {gallery.length > 1 && (
              <div className="w-full mt-4">
                <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider block mb-2 font-semibold">
                  Official Packaging Gallery ({gallery.length} Views)
                </span>
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {gallery.map((img, idx) => (
                    <button
                      key={img.localPath || idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      type="button"
                      className={`h-16 w-16 shrink-0 rounded-lg border p-1 bg-white cursor-pointer transition-all ${
                        selectedImageIndex === idx
                          ? 'border-[var(--spice-red)] ring-2 ring-[var(--spice-red)] shadow-xs'
                          : 'border-[var(--border-light)] hover:border-stone-400 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={`/${img.localPath}`}
                        alt={`View ${idx + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Spec Sheet & Recipe Narrative (6 cols) */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono uppercase text-[var(--mustard-gold-hover)] font-bold">
                  {product.region} Tradition
                </span>
                <span className="text-xs text-stone-300">•</span>
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  {product.category}
                </span>
              </div>

              <h3
                id="modal-product-title"
                className="font-serif text-2xl sm:text-3xl font-bold text-[var(--earth-dark)] leading-tight mb-2"
              >
                {product.title}
              </h3>

              {/* Price & Weight Row */}
              <div className="flex items-baseline gap-3 my-3 pb-3 border-b border-[var(--border-light)]">
                <span className="font-mono text-2xl font-bold text-[var(--spice-red)]">
                  ₹{product.price}
                </span>
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  Net Weight: {product.weight}
                </span>
              </div>

              {/* Description */}
              <div className="my-4">
                <span className="text-xs font-mono font-bold uppercase text-[var(--brand-forest)] block mb-1">
                  Product Description & Profile
                </span>
                <p className="text-sm text-[var(--earth-muted)] font-sans leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Verified Product Spec Grid */}
              <div className="grid grid-cols-2 gap-3 my-4 p-4 bg-[var(--surface-parchment)] rounded-xl border border-[var(--border-light)] text-xs font-mono">
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] block">PACKAGING TYPE</span>
                  <span className="font-semibold text-[var(--earth-dark)]">
                    {product.weight.toLowerCase().includes('pet')
                      ? 'PET Food-Grade Jar'
                      : product.weight.toLowerCase().includes('pouch')
                      ? 'Aroma-Lock Pouch'
                      : 'Hermetic Glass Jar'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] block">SPICE INTENSITY</span>
                  <span className="font-semibold text-[var(--spice-red)] flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    {product.spiceLevel || 4}/5 ({product.spiceLabel || 'Robust'})
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] block">MANUFACTURER</span>
                  <span className="font-semibold text-[var(--earth-dark)]">Desai Foods Pvt Ltd</span>
                </div>
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] block">ORIGIN TRADITION</span>
                  <span className="font-semibold text-[var(--earth-dark)]">{product.region}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[var(--border-light)] flex flex-wrap items-center gap-3">
              <a
                href={product.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto flex-1 text-center"
              >
                <span>Purchase on Mother’s Recipe Store</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={onClose}
                type="button"
                className="btn-secondary text-xs py-3 px-4 w-full sm:w-auto cursor-pointer"
              >
                Close Spec Sheet
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
