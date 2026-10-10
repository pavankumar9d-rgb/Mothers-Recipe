/**
 * Organic heritage shapes for Mother's Recipe culinary showcase.
 * Replaces generic blob with graceful multi-lobed floral crests and architectural alcoves.
 */

export function blobPath(cx: number, cy: number, r: number, phase: number, points = 48): string {
  // Graceful multi-lobed floral crest inspired by traditional Indian temple archways and spice petals
  const p = Array.from({ length: points }, (_, i) => {
    const a = (i / points) * Math.PI * 2;
    // Harmonic wave profile: 6 symmetric lobes with subtle breathing motion
    const k =
      1 +
      0.065 * Math.cos(6 * a + phase * 0.8) +
      0.025 * Math.sin(3 * a - phase * 0.5) +
      0.015 * Math.cos(12 * a + phase * 1.2);
    return [cx + Math.cos(a) * r * k, cy + Math.sin(a) * r * k];
  });

  let d = `M${p[0][0].toFixed(1)} ${p[0][1].toFixed(1)}`;
  for (let i = 0; i < points; i++) {
    const [p0, p1, p2, p3] = [
      p[(i - 1 + points) % points],
      p[i],
      p[(i + 1) % points],
      p[(i + 2) % points]
    ];
    d += `C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)} ${(
      p1[1] +
      (p2[1] - p0[1]) / 6
    ).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)} ${(
      p2[1] -
      (p3[1] - p1[1]) / 6
    ).toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d + 'Z';
}

/**
 * Architectural Haveli alcove arch path (Jharokha niche)
 */
export function haveliArchPath(cx: number, cy: number, w: number, h: number): string {
  const left = cx - w / 2;
  const right = cx + w / 2;
  const bottom = cy + h / 2;
  const top = cy - h / 2;
  const shoulderY = top + h * 0.38;

  return [
    `M ${left} ${bottom}`,
    `L ${left} ${shoulderY}`,
    `C ${left} ${top + h * 0.15}, ${cx - w * 0.28} ${top + h * 0.08}, ${cx - w * 0.12} ${top + h * 0.04}`,
    `Q ${cx} ${top - h * 0.04}, ${cx + w * 0.12} ${top + h * 0.04}`,
    `C ${cx + w * 0.28} ${top + h * 0.08}, ${right} ${top + h * 0.15}, ${right} ${shoulderY}`,
    `L ${right} ${bottom}`,
    'Z'
  ].join(' ');
}

