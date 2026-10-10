import { useEffect } from 'react';
import { X } from 'lucide-react';
import { assetUrl } from '../../utils/paths';

export function ArrowUpRight() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 15 15 5M5 5h10v10" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

interface ShowcaseMenuDrawerProps {
  open: boolean;
  onClose: () => void;
  onGoHome: () => void;
  onGoTo: (id: string) => void;
}

export function ShowcaseMenuDrawer({ open, onClose, onGoHome, onGoTo }: ShowcaseMenuDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="showcase-menu-overlay" onClick={onClose} role="presentation">
      <div
        className="showcase-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Explore Mother's Recipe"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="menu-top">
          <img
            src={assetUrl('assets/brand/logo/mothers-recipe-logo.svg')}
            alt="Mother's Recipe"
            width="118"
            height="44"
          />
          <button className="menu-close" onClick={onClose} aria-label="Close menu">
            <X size={21} />
          </button>
        </div>
        <p className="menu-eyebrow">TASTE THE TRADITION</p>
        <nav className="menu-links" aria-label="Main navigation">
          <button onClick={() => { onClose(); onGoHome(); }}>
            <span>01</span>Our flavours
            <ArrowUpRight />
          </button>
          <button onClick={() => onGoTo('story')}>
            <span>02</span>A taste of home
            <ArrowUpRight />
          </button>
          <button onClick={() => onGoTo('products')}>
            <span>03</span>Discover more
            <ArrowUpRight />
          </button>
          <button onClick={() => onGoTo('contact')}>
            <span>04</span>Get in touch
            <ArrowUpRight />
          </button>
        </nav>
        <a
          className="menu-shop"
          href="https://www.mothersrecipe.com/collections/pickles"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit the official store <ArrowUpRight />
        </a>
        <p className="menu-since">Bringing you the authentic taste of Indian tradition.</p>
      </div>
    </div>
  );
}
