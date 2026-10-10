import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import type { ShowcaseProduct } from '../../data/showcaseProducts';
import { createPhotoTurn } from '../../utils/photoTurnRenderer';
import { assetUrl } from '../../utils/paths';

export type ProductTurnHandle = { turn: (radians: number) => void };

export const ShowcaseProductTurn = forwardRef<ProductTurnHandle, { product: ShowcaseProduct }>(
  function ShowcaseProductTurn({ product }, ref) {
    const canvas = useRef<HTMLCanvasElement>(null);
    const draw = useRef<(angle: number) => void>(() => {});
    const rotation = useRef(0);
    const [ready, setReady] = useState(false);

    useImperativeHandle(
      ref,
      () => ({
        turn: (angle) => {
          rotation.current = angle;
          draw.current(angle);
        }
      }),
      []
    );

    useEffect(() => {
      const element = canvas.current;
      if (!element) return;
      let resize: ResizeObserver | undefined;

      const cancel = createPhotoTurn(element, product, (render) => {
        draw.current = render;
        const size = () => {
          const density = Math.max(2, Math.min(window.devicePixelRatio || 1, 2.5));
          const width = Math.max(1, Math.round(element.clientWidth * density));
          const height = Math.max(1, Math.round(element.clientHeight * density));
          if (element.width !== width) element.width = width;
          if (element.height !== height) element.height = height;
          render(rotation.current);
        };
        resize = new ResizeObserver(size);
        resize.observe(element);
        size();
        setReady(true);
      });

      return () => {
        cancel();
        resize?.disconnect();
        draw.current = () => {};
      };
    }, [product]);

    return (
      <div className="product-turn" data-ready={ready}>
        <img
          className="spin-fallback"
          src={assetUrl(product.image)}
          alt={`Mother’s Recipe ${product.name} packaging`}
          draggable="false"
          onError={(e) => {
            if (product.fallbackImage) {
              (e.currentTarget as HTMLImageElement).src = assetUrl(product.fallbackImage);
            }
          }}
        />
        <canvas ref={canvas} aria-hidden="true" />
      </div>
    );
  }
);
