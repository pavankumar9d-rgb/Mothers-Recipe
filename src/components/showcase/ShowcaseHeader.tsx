import { ArrowLeft, Pause, Play } from 'lucide-react';
import { assetUrl } from '../../utils/paths';

interface ShowcaseHeaderProps {
  selected: boolean;
  automatic: boolean;
  onToggleMotion: () => void;
  onGoHome: () => void;
  onOpenMenu: () => void;
}

export function ShowcaseHeader({
  selected,
  automatic,
  onToggleMotion,
  onGoHome,
  onOpenMenu
}: ShowcaseHeaderProps) {
  return (
    <header className="site-header">
      {selected ? (
        <button className="small-control back-control" onClick={onGoHome} aria-label="Back to collection">
          <ArrowLeft size={15} />
          <span>BACK</span>
        </button>
      ) : (
        <button
          className="motion-control"
          onClick={onToggleMotion}
          aria-label={automatic ? 'Pause carousel' : 'Play carousel'}
        >
          {automatic ? <Pause size={10} fill="currentColor" /> : <Play size={10} fill="currentColor" />}
        </button>
      )}

      <button className="brand" onClick={onGoHome} aria-label="Mother's Recipe home">
        <img
          src={assetUrl('assets/brand/logo/mothers-recipe-logo.svg')}
          alt="Mother's Recipe — Taste the Tradition"
          width="128"
          height="48"
        />
      </button>

      <div className="header-actions">
        <a
          className="cta cta-solid cta-small header-shop"
          href="https://www.mothersrecipe.com/collections/pickles"
          target="_blank"
          rel="noopener noreferrer"
        >
          Shop online <span aria-hidden="true">↗</span>
        </a>
        <button className="menu-trigger" onClick={onOpenMenu} aria-label="Open menu">
          MENU <span />
        </button>
      </div>
    </header>
  );
}
