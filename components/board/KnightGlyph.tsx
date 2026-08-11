/**
 * Faceted knight silhouette, drawn in a 100×100 box facing right.
 *
 * Deliberately angular rather than smoothly curved — it reads as drafted
 * rather than sketched, which is the point of the whole site.
 */
export const KNIGHT_PATH =
  "M12 96 L88 96 L82 87 L64 87 L62 78 L56 68 L64 60 L82 57 L90 51 L85 43 L70 39 L61 34 L57 25 L52 9 L43 25 L34 35 L25 49 L20 64 L22 78 L27 87 L18 87 Z";

/** Centre of the glyph's bounding box, for placing it on a square. */
export const KNIGHT_CENTER = { x: 51, y: 52.5 } as const;

export default function KnightGlyph({
  className = "",
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path d={KNIGHT_PATH} fill="currentColor" />
    </svg>
  );
}
