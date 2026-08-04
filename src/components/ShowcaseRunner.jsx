import { projects } from '../data/site';
import Placeholder from './Placeholder';

function Group({ items, hidden }) {
  return (
    <div className="runner__group" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <a className="runner__card" href="#projects" key={item.id} tabIndex={hidden ? -1 : undefined}>
          <Placeholder label={`${item.name} mockup`} />
          <span className="runner__caption">
            <strong>{item.name}</strong>
            <span>{item.type}</span>
          </span>
        </a>
      ))}
    </div>
  );
}

/** Two counter-scrolling rows of project mockups beneath the hero. */
export default function ShowcaseRunner() {
  const rows = [
    { items: projects.items, reverse: false },
    { items: [...projects.items].reverse(), reverse: true },
  ];

  return (
    <div className="runner">
      {rows.map((row, index) => (
        <div
          className={`runner__track${row.reverse ? ' runner__track--reverse' : ''}`}
          key={index}
        >
          {/* The second copy makes the -50% translation loop seamlessly. */}
          <Group items={row.items} />
          <Group items={row.items} hidden />
        </div>
      ))}
    </div>
  );
}
