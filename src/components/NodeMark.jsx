/**
 * The four-node mark that closes the Clearfield lockup: squares stepping
 * low–high–low–high, wired together by a link that runs behind them and is
 * only ever visible in the gaps.
 *
 * `animated` tags the parts GSAP reaches for — [data-node] for the squares,
 * [data-node-link] for the wire, which is normalised to pathLength 1 so it can
 * be drawn on with a plain 1 → 0 strokeDashoffset.
 */
const SIZE = 24;

const NODES = [
  { x: 0, y: 30 },
  { x: 29, y: 0 },
  { x: 58, y: 30 },
  { x: 87, y: 0 },
];

const LINK = NODES.map((node) => `${node.x + SIZE / 2},${node.y + SIZE / 2}`).join(' ');

export default function NodeMark({ width = 26, height = 12.6, className, style, animated = false }) {
  return (
    <svg
      className={className}
      style={style}
      width={width}
      height={height}
      viewBox="0 0 111 54"
      aria-hidden="true"
      focusable="false"
    >
      <polyline
        data-node-link={animated ? '' : undefined}
        points={LINK}
        pathLength="1"
        fill="none"
        stroke="var(--brand-orange)"
        strokeWidth="2.8"
        strokeDasharray={animated ? 1 : undefined}
      />
      {NODES.map((node) => (
        <rect
          key={node.x}
          data-node={animated ? '' : undefined}
          x={node.x}
          y={node.y}
          width={SIZE}
          height={SIZE}
          rx="2.4"
          fill="var(--brand-orange)"
        />
      ))}
    </svg>
  );
}
