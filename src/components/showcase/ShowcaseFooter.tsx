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
      <div className="footer-top-accent" aria-hidden="true" />

      {/* Elegant Header Wordmark */}
      <div className="footer-header-area">
        <div className="footer-wordmark" aria-label="Mother's Recipe">
          <span className="wordmark-main">MOTHER&apos;S</span>
          <em className="wordmark-sub">Recipe</em>
        </div>
        <div className="footer-heritage-badge">
          <span className="badge-tag">ESTD. 1962</span>
          <span className="badge-desc">CRAFTED WITH LOVE · DESAI FOODS PVT. LTD.</span>
        </div>
      </div>

      {/* Main Multi-Column Architecture */}
      <div className="footer-bottom">
        {/* Column 1: Brand & Heritage */}
        <div className="footer-brand">
          <div className="footer-logo-wrapper">
            <img
              src={assetUrl('assets/brand/logo/mothers-recipe-logo.svg')}
              alt="Mother's Recipe"
              width="130"
              height="48"
            />
          </div>
          <p className="footer-brand-mission">
            Spreading the authentic warmth of traditional Indian cooking across 45+ countries.
            Crafted with cold-pressed oils, sun-ripened regional produce, and recipes perfected
            over generations.
          </p>
          <div className="footer-certifications">
            <span>✦ ISO 22000 Certified</span>
            <span>✦ HACCP Compliant</span>
            <span>✦ FSSAI Lic. 10012022000108</span>
          </div>
        </div>

        {/* Column 2: Regional Collections */}
        <nav className="footer-nav-col" aria-label="Regional Collections">
          <h4>OUR PANTRY</h4>
          <button onClick={onGoHome}>Explore All Flavours</button>
          <a
            href="https://www.mothersrecipe.com/collections/pickles"
            target="_blank"
            rel="noopener noreferrer"
          >
            Regional Pickles <ArrowUpRight />
          </a>
          <a
            href="https://www.mothersrecipe.com/collections/pastes"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cooking Pastes <ArrowUpRight />
          </a>
          <a
            href="https://www.mothersrecipe.com/collections/papad"
            target="_blank"
            rel="noopener noreferrer"
          >
            Papads &amp; Appalams <ArrowUpRight />
          </a>
          <a
            href="https://www.mothersrecipe.com/collections/ready-to-cook"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ready-to-Cook Mixes <ArrowUpRight />
          </a>
          <a
            href="https://www.mothersrecipe.com/pages/about-us"
            target="_blank"
            rel="noopener noreferrer"
          >
            Our Heritage Story <ArrowUpRight />
          </a>
        </nav>

        {/* Column 3: Customer Care & Plant */}
        <div className="footer-contact">
          <h4>CUSTOMER CARE</h4>
          <div className="contact-detail">
            <span className="detail-label">TOLL FREE HELPLINE</span>
            <a href="tel:1800224747" className="phone-link">1800 22 4747</a>
            <span className="timing-note">Mon – Sat, 9:00 AM – 6:00 PM IST</span>
          </div>
          <div className="contact-detail">
            <span className="detail-label">DIRECT INQUIRIES</span>
            <a href="mailto:customercare@mothersrecipe.com">customercare@mothersrecipe.com</a>
          </div>
          <div className="contact-detail">
            <span className="detail-label">REGISTERED OFFICE</span>
            <address>
              Desai Foods Pvt. Ltd., Atur Chambers,
              <br />
              2A Moledina Road, Camp, Pune - 411001
            </address>
          </div>
        </div>

        {/* Column 4: The Recipe Circle (Newsletter) */}
        <div className="footer-newsletter">
          <h4>THE RECIPE CIRCLE</h4>
          <p>
            Receive seasonal harvest stories, grandmother&apos;s culinary secrets, and private offers
            from our master chefs.
          </p>
          <form
            className="newsletter-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for joining the Mother’s Recipe Circle!');
            }}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              required
              aria-label="Email address"
            />
            <button type="submit" className="cta cta-gold cta-small">
              Join ↗
            </button>
          </form>
          <span className="newsletter-note">Pure culinary passion. No spam, ever.</span>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-small">
        <div className="footer-legal">
          <span>&copy; {new Date().getFullYear()} Desai Foods Pvt. Ltd. (Mother&apos;s Recipe). All rights reserved.</span>
          <span className="legal-divider">·</span>
          <a href="https://www.mothersrecipe.com/pages/privacy-policy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
          <span className="legal-divider">·</span>
          <a href="https://www.mothersrecipe.com/pages/terms-and-conditions" target="_blank" rel="noopener noreferrer">
            Terms of Service
          </a>
        </div>
        <button
          className="back-to-top-btn"
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
