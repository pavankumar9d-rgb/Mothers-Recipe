import { ArrowUpRight } from './ShowcaseMenuDrawer';
import { assetUrl } from '../../utils/paths';

export function ShowcaseFooter({
  onGoHome,
  reduced
}: {
  onGoHome: () => void;
  reduced: boolean;
}) {
  return (
    <footer id="contact" className="site-footer">
      <div className="footer-wordmark" aria-label="Mother's Recipe">
        <span>MOTHER&apos;S</span>
        <em>Recipe</em>
      </div>

      <div className="footer-bottom">
        <div className="footer-brand">
          <img
            src={assetUrl('assets/brand/logo/mothers-recipe-logo.svg')}
            alt="Mother's Recipe"
            width="108"
            height="40"
          />
          <span>
            TASTE THE TRADITION
            <br />
            DESAI FOODS PVT. LTD. · PUNE
          </span>
        </div>

        <nav aria-label="Footer navigation">
          <button onClick={onGoHome}>Our flavours</button>
          <a
            href="https://www.mothersrecipe.com/pages/about-us"
            target="_blank"
            rel="noopener noreferrer"
          >
            Our story ↗
          </a>
          <a
            href="https://www.mothersrecipe.com/collections/pickles"
            target="_blank"
            rel="noopener noreferrer"
          >
            Regional pickles ↗
          </a>
          <a
            href="https://www.mothersrecipe.com/collections/pastes"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cooking pastes ↗
          </a>
        </nav>

        <div className="footer-contact">
          <span>LET’S TALK</span>
          <a href="mailto:customercare@mothersrecipe.com">customercare@mothersrecipe.com</a>
          <a href="tel:1800224747">1800 22 4747 (Toll Free)</a>
        </div>

        <div className="footer-note">
          <p>
            Familiar flavours.
            <br />
            Unforgettable memories.
          </p>
          <a
            href="https://www.mothersrecipe.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            VISIT MOTHERSRECIPE.COM <ArrowUpRight />
          </a>
        </div>
      </div>

      <div className="footer-small">
        <span>Mother&apos;s Recipe — Authentic Indian Flavours & Culinary Heritage</span>
        <button
          onClick={() =>
            window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' })
          }
        >
          BACK TO TOP ↑
        </button>
      </div>
    </footer>
  );
}
