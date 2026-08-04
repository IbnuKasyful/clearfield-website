/** The three-step pixel staircase used beside the Clearfield wordmark. */
export default function PixelMark({ width = 24, height = 17, className, style, animated = false }) {
  return (
    <svg
      className={className}
      style={style}
      width={width}
      height={height}
      viewBox="0 0 24 17"
      aria-hidden="true"
      focusable="false"
    >
      {[
        { x: 0, y: 10, size: 6 },
        { x: 8, y: 5, size: 6 },
        { x: 16, y: 0, size: 7 },
      ].map((step) => (
        <rect
          key={step.x}
          data-pixel={animated ? '' : undefined}
          x={step.x}
          y={step.y}
          width={step.size}
          height={step.size}
          fill="var(--accent-2)"
        />
      ))}
    </svg>
  );
}
