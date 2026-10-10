export function HeritageCtaBand() {
  return (
    <section className="cta-band" aria-labelledby="cta-band-title">
      <span className="eyebrow">TASTE THE TRADITION</span>
      <h2 id="cta-band-title">
        Bring home the joy
        <br />
        of authentic taste.
      </h2>
      <p>
        Pickles, pastes, and regional kitchen staples crafted the way Indian homes have always prepared them
        — delivered fresh from the official Mother&apos;s Recipe pantry.
      </p>
      <div className="cta-band-actions">
        <a
          className="cta cta-cream"
          href="https://www.mothersrecipe.com/collections/pickles"
          target="_blank"
          rel="noopener noreferrer"
        >
          Shop pickles <span aria-hidden="true">↗</span>
        </a>
        <a
          className="cta cta-ghost"
          href="https://www.mothersrecipe.com/collections/pastes"
          target="_blank"
          rel="noopener noreferrer"
        >
          Shop cooking pastes <span aria-hidden="true">↗</span>
        </a>
        <a className="cta cta-ghost" href="mailto:customercare@mothersrecipe.com">
          Talk to us
        </a>
      </div>
    </section>
  );
}
