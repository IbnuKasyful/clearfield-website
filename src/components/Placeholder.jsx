/**
 * Stand-in for artwork that has not been supplied yet.
 * To use a real asset, replace the element with an <img> carrying the same
 * class on the wrapper so the border radius and aspect ratio still apply.
 */
export default function Placeholder({ label, onDark = false, className = '', style }) {
  return (
    <div
      className={`placeholder${onDark ? ' placeholder--on-dark' : ''} ${className}`.trim()}
      style={style}
      role="img"
      aria-label={`${label} placeholder`}
    >
      <span className="placeholder__label">{label}</span>
    </div>
  );
}
