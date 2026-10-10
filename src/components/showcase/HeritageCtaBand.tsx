export function HeritageCtaBand() {
  return (
    <section className="cta-band" aria-labelledby="cta-band-title">
      <div className="cta-band-backdrop-mesh" aria-hidden="true" />
      <div className="cta-band-content">
        <span className="cta-eyebrow">✦ THE LIVING PANTRY COLLECTION · HERITAGE RECIPES ✦</span>
        <h2 id="cta-band-title">
          Bring home the timeless joy
          <br />
          of authentic mother&apos;s touch.
        </h2>
        <p>
          Prepared with cold-pressed mustard oil, sun-ripened regional produce, and secret spice blends
          passed down through generations. Every jar and pouch delivers grandmother&apos;s heirloom kitchen
          straight to your family&apos;s dining table.
        </p>

        <div className="cta-trust-badges" aria-label="Quality badges">
          <span className="trust-badge">
            <span className="badge-bullet">✓</span> 100% Sun-Ripened Produce
          </span>
          <span className="trust-badge">
            <span className="badge-bullet">✓</span> Traditional Mustard Oil Curing
          </span>
          <span className="trust-badge">
            <span className="badge-bullet">✓</span> No Artificial Preservatives
          </span>
        </div>

        <div className="cta-band-actions">
          <a
            className="cta cta-gold"
            href="https://www.mothersrecipe.com/collections/pickles"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore All Pickles <span aria-hidden="true">↗</span>
          </a>
          <a
            className="cta cta-crimson"
            href="https://www.mothersrecipe.com/collections/pastes"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shop Cooking Pastes <span aria-hidden="true">↗</span>
          </a>
          <a className="cta cta-outline-gold" href="mailto:customercare@mothersrecipe.com">
            Talk to Our Chefs ✉
          </a>
        </div>
      </div>
    </section>
  );
}
