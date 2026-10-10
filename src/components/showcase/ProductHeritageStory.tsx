import type { ShowcaseProduct } from '../../data/showcaseProducts';

export function ProductHeritageStory({ product }: { product: ShowcaseProduct }) {
  return (
    <section id="story" className="product-story">
      <span className="eyebrow">A LITTLE TASTE OF HOME</span>
      <p>{product.description}</p>
      <span className="ingredient-note">{product.note}</span>
      <div className="story-ctas">
        <a
          className="cta cta-solid"
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Order {product.name} <span aria-hidden="true">↗</span>
        </a>
        <a
          className="cta cta-outline"
          href="https://www.mothersrecipe.com/collections/pickles"
          target="_blank"
          rel="noopener noreferrer"
        >
          Browse all pickles <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
