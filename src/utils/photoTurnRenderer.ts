import { assetUrl } from './paths';
import type { ShowcaseProduct } from '../data/showcaseProducts';

const TAU = Math.PI * 2;

/**
 * Correctly oriented photo sampling: every visible face reads left to right.
 */
export function labelSample(position: number, angle: number) {
  const surface = Math.asin(Math.max(-0.99999, Math.min(0.99999, position)));
  const local = surface - angle;
  const rear = Math.cos(local) < 0;
  const face = Math.atan2(Math.sin(local - (rear ? Math.PI : 0)), Math.cos(local - (rear ? Math.PI : 0)));
  const quarter = Math.sin(angle) ** 2;
  const offset = Math.sin(face) * (1 - quarter) + (face / (Math.PI / 2)) * quarter;
  const derivative =
    (Math.cos(face) * (1 - quarter) + (2 / Math.PI) * quarter) / Math.sqrt(Math.max(0.0001, 1 - position * position));
  return { rear, offset, derivative };
}

export function createPhotoTurn(
  canvas: HTMLCanvasElement,
  product: ShowcaseProduct,
  onReady: (render: (angle: number) => void) => void
) {
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return () => {};

  let cancelled = false;
  let lastAngle = Number.NaN;
  let lastWidth = 0;
  let lastHeight = 0;

  const load = (src: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.onload = () => resolve(image);
      image.onerror = () => {
        // Fallback to original image if cutout failed to load
        if (product.fallbackImage && src !== product.fallbackImage) {
          image.src = assetUrl(product.fallbackImage);
        } else {
          reject(new Error(`Failed to load ${src}`));
        }
      };
      image.src = assetUrl(src);
    });

  load(product.image)
    .then((front) => {
      if (cancelled) return;
      const center = 0.5;
      const radius = 0.22;
      const top = 0.3;
      const bottom = 0.85;

      const render = (requestedAngle: number) => {
        const w = canvas.width;
        const h = canvas.height;
        // Bounded oscillation for single front photograph to prevent artificial stretching
        const angle = Math.sin(requestedAngle) * 0.45;
        if (Math.abs(angle - lastAngle) < 0.0002 && w === lastWidth && h === lastHeight) return;

        lastAngle = angle;
        lastWidth = w;
        lastHeight = h;

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.clearRect(0, 0, w, h);

        // Draw crisp original cutout
        ctx.drawImage(front, 0, 0, w, h);

        const normalized = ((angle % TAU) + TAU) % TAU;
        const frontDistance = Math.min(normalized, TAU - normalized);

        if (frontDistance > 0.0002) {
          const left = Math.floor((center - radius) * w);
          const right = Math.ceil((center + radius) * w);

          for (let x = left; x < right; x++) {
            const position = Math.max(-0.9999, Math.min(0.9999, ((x + 0.5) / w - center) / radius));
            const sample = labelSample(position, angle);
            if (sample.rear) {
              sample.offset = Math.sign(Math.asin(position) - angle) * 0.99;
              sample.derivative = 0;
              sample.rear = false;
            }

            const sx = center + radius * sample.offset;
            const sampleWidth = Math.min(24, Math.max(0.5, (sample.derivative / w) * front.width));
            const safeX = Math.max(
              (center - radius + 0.002) * front.width,
              Math.min((center + radius - 0.002) * front.width - sampleWidth, sx * front.width - sampleWidth / 2)
            );

            ctx.drawImage(
              front,
              safeX,
              top * front.height,
              sampleWidth,
              (bottom - top) * front.height,
              x,
              top * h,
              1,
              (bottom - top) * h
            );
          }
        }

        canvas.dataset.angle = String(Math.round((angle * 180) / Math.PI));
        canvas.dataset.renderStatus = 'sharp-photo-ready';
      };

      onReady(render);
    })
    .catch(() => {
      canvas.dataset.renderStatus = 'asset-error';
    });

  return () => {
    cancelled = true;
  };
}
