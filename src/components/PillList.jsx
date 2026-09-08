/**
 * A plain wrapped row of pills.
 *
 * This replaces a Matter.js simulation that dropped the pills in as falling
 * blocks you could shove around with the cursor. The markup it produced was
 * the same list this renders — the physics only ever wrote `transform` — so
 * nothing about the content or its reading order changed when it went.
 */
export default function PillList({ items, className = '', itemClassName = 'pill' }) {
  return (
    <ul className={`pill-list ${className}`.trim()}>
      {items.map((item) => (
        <li className={itemClassName} key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
}
