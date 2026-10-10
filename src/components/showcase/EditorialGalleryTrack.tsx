import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { GALLERY_EDITORIAL_SLIDES } from '../../data/showcaseProducts';
import { assetUrl } from '../../utils/paths';

const mod = (n: number, length: number) => ((n % length) + length) % length;
const slides = GALLERY_EDITORIAL_SLIDES.length;

export function EditorialGalleryTrack({ reduced }: { reduced: boolean }) {
  const [gallery, setGallery] = useState(slides + 1);
  const [galleryJump, setGalleryJump] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const change = () => setPageVisible(!document.hidden);
    change();
    document.addEventListener('visibilitychange', change);
    return () => document.removeEventListener('visibilitychange', change);
  }, []);

  useEffect(() => {
    if (reduced || galleryJump || !pageVisible) return;
    const next = setTimeout(() => setGallery((g) => g + 1), 3800);
    return () => clearTimeout(next);
  }, [reduced, galleryJump, pageVisible, gallery]);

  useEffect(() => {
    if (!galleryJump) return;
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setGalleryJump(false)));
    return () => cancelAnimationFrame(raf);
  }, [galleryJump]);

  const galleryIndex = mod(gallery, slides);

  return (
    <section className="editorial-gallery" aria-label="Mother's Recipe food and authentic ingredients">
      <div
        className="gallery-track"
        onTransitionEnd={(e) => {
          if (e.target !== e.currentTarget) return;
          if (gallery >= 2 * slides || gallery < slides) {
            setGalleryJump(true);
            setGallery(slides + galleryIndex);
          }
        }}
        style={{
          transition: galleryJump ? 'none' : undefined,
          transform: `translateX(calc(-${gallery} * (var(--gallery-width) + var(--gallery-gap)) + (100vw - var(--gallery-width))/2))`
        }}
      >
        {[0, 1, 2].flatMap((copy) =>
          GALLERY_EDITORIAL_SLIDES.map((image, i) => {
            const position = copy * slides + i;
            return (
              <figure
                key={position}
                aria-hidden={copy !== 1}
                className={`gallery-image${image.product ? ' is-product' : ''}${
                  position === gallery ? ' current' : ''
                }`}
              >
                <img
                  src={assetUrl(image.src)}
                  alt={copy === 1 ? image.alt : ''}
                  loading="lazy"
                />
              </figure>
            );
          })
        )}
      </div>

      <div className="gallery-controls">
        <span>FLAVOURS, ROOTED IN GENERATIONS OF TRADITION</span>
        <div>
          <button onClick={() => setGallery(gallery - 1)} aria-label="Previous image">
            <ArrowLeft size={17} />
          </button>
          <span>
            0{galleryIndex + 1} / 0{slides}
          </span>
          <button onClick={() => setGallery(gallery + 1)} aria-label="Next image">
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}
