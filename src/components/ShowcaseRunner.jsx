import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/site';
import { gsap, ScrollTrigger, hasFinePointer, prefersReducedMotion } from '../lib/motion';

/** Scrolling down sends the top row left and the bottom row right. */
const ROWS = [
  { items: projects.items, direction: 1 },
  { items: [...projects.items].reverse(), direction: -1 },
];

const SCROLL_GAIN = 0.6; // strip px travelled per px scrolled
const POINTER_GAIN = 1; // strip px travelled per px of cursor movement
const GLIDE = 0.12; // seconds the strip takes to catch up to the scroll

function Group({ items, hidden }) {
  return (
    <div className="runner__group" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <Link
          className="runner__card"
          to={`/projects/${item.id}`}
          key={item.id}
          tabIndex={hidden ? -1 : undefined}
        >
          <img
            className="runner__image"
            src={`/projects/${item.id}-4x3.webp`}
            alt={hidden ? '' : `The ${item.name} website`}
            width={1000}
            height={750}
            loading="lazy"
            decoding="async"
          />
          <span className="runner__caption">
            <strong>{item.name}</strong>
            <span>{item.type}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}

/**
 * Two counter-running rows of project shots beneath the hero.
 *
 * Nothing moves on its own. The strip is driven entirely by the scrollbar —
 * down sends the top row left and the bottom row right, up reverses both — and
 * by the cursor while it is over them, which pushes both rows the way it
 * travels. Stop doing either and the strip stops, which keeps the cards
 * clickable.
 */
export default function ShowcaseRunner() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return undefined;

    const tracks = Array.from(root.querySelectorAll('.runner__track'));
    if (!tracks.length) return undefined;

    const ctx = gsap.context(() => {
      // No unit: xPercent is already a percentage, and passing one writes junk.
      const setters = tracks.map((track) => gsap.quickSetter(track, 'xPercent'));
      // Each row holds two copies of the group, so 50% is one seamless lap.
      const wrap = gsap.utils.wrap(-50, 0);
      const targets = tracks.map(() => 0);
      const offsets = tracks.map(() => 0);

      // Movement is asked for in px and applied in percent, so the strip
      // travels the same distance whatever width the cards clamp to.
      let percentPerPx = tracks.map(() => 0);
      const measure = () => {
        percentPerPx = tracks.map((track) => 100 / (track.offsetWidth || 1));
      };
      measure();

      let lastScroll = window.scrollY;

      const trigger = ScrollTrigger.create({
        onUpdate: (self) => {
          const position = self.scroll();
          const delta = position - lastScroll;
          lastScroll = position;

          ROWS.forEach((row, index) => {
            targets[index] -= delta * percentPerPx[index] * SCROLL_GAIN * row.direction;
          });
        },
        onRefresh: () => {
          measure();
          lastScroll = window.scrollY;
        },
      });

      const tick = (time, delta) => {
        // Frame-rate independent glide toward wherever scroll left the strip.
        const ease = 1 - Math.exp(-delta / (GLIDE * 1000));

        offsets.forEach((offset, index) => {
          let next = offset + (targets[index] - offset) * ease;

          // Keep the accumulators near zero. A whole number of laps makes no
          // visual difference, so offset and target shed them together.
          const laps = Math.trunc(next / 50) * 50;
          if (Math.abs(laps) >= 500) {
            next -= laps;
            targets[index] -= laps;
          }

          offsets[index] = next;
          setters[index](wrap(next));
        });
      };
      gsap.ticker.add(tick);

      // Touch has no hover, and a drag-scroll over the strip would read as one.
      const fine = hasFinePointer();
      let lastX = null;

      const onMove = (event) => {
        if (event.pointerType !== 'mouse') return;

        if (lastX !== null) {
          const dx = event.clientX - lastX;
          // Both rows go the way the cursor goes, like pushing the strip.
          for (let index = 0; index < targets.length; index += 1) {
            targets[index] += dx * percentPerPx[index] * POINTER_GAIN;
          }
        }

        lastX = event.clientX;
      };

      const onLeave = () => {
        lastX = null;
      };

      if (fine) {
        root.addEventListener('pointermove', onMove);
        root.addEventListener('pointerleave', onLeave);
      }

      return () => {
        gsap.ticker.remove(tick);
        trigger.kill();
        if (fine) {
          root.removeEventListener('pointermove', onMove);
          root.removeEventListener('pointerleave', onLeave);
        }
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="runner" ref={rootRef}>
      {ROWS.map((row, index) => (
        <div className="runner__track" key={index}>
          {/* The second copy makes the -50% translation loop seamlessly. */}
          <Group items={row.items} />
          <Group items={row.items} hidden />
        </div>
      ))}
    </div>
  );
}
