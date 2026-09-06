import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/site';
import { gsap, prefersReducedMotion } from '../lib/motion';

const DRIFT = 34; // strip px travelled per second
const GLIDE = 0.14; // seconds the strip takes to ease in and out of that drift

/**
 * Cards laid in one group. Every second card drops (see `.runner__card` in the
 * stylesheet), so a group holding an odd number of projects restarts the
 * alternation on the same beat and leaves two cards level where the strip
 * seams. Running the list twice makes the count even and the drop unbroken,
 * whatever number of projects the site is showing.
 */
const cards = projects.items.length % 2 === 0
  ? projects.items
  : [...projects.items, ...projects.items];

function Group({ hidden }) {
  return (
    <div className="runner__group" aria-hidden={hidden || undefined}>
      {cards.map((item, index) => {
        // Only the first pass through the real list is announced. Repeats
        // exist to keep the drop alternating and the loop seamless, so they
        // stay out of the reading order the way the duplicate group does.
        const repeat = index >= projects.items.length;
        const silent = hidden || repeat;

        return (
          <Link
            className="runner__card"
            to={`/projects/${item.id}`}
            key={`${item.id}-${index}`}
            aria-hidden={repeat || undefined}
            tabIndex={silent ? -1 : undefined}
          >
            {/* The frame is what crops and rounds the shot. The caption sits
                outside it, below, so nothing is printed over the artwork. */}
            <span className="runner__frame">
              <img
                className="runner__image"
                src={`/projects/${item.id}-4x3.webp`}
                alt={silent ? '' : `The ${item.name} website`}
                width={1000}
                height={750}
                loading="lazy"
                decoding="async"
              />
              <span className="runner__tag">{item.type}</span>
              <span className="runner__view" aria-hidden="true">
                View
              </span>
            </span>

            <span className="runner__caption">
              <strong>{item.name}</strong>
              <span>{item.urlLabel}</span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}

/**
 * A single row of project shots beneath the hero, running on its own at a slow
 * constant drift and nothing else. It was two rows travelling against each
 * other, which the reader had to resolve before reading anything, and later a
 * single row shoved along by the scrollbar, which tied the work on show to how
 * hard someone happened to be scrolling. One row at one speed states the same
 * thing without asking for attention.
 */
export default function ShowcaseRunner() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return undefined;

    const track = root.querySelector('.runner__track');
    if (!track) return undefined;

    const ctx = gsap.context(() => {
      // No unit: xPercent is already a percentage, and passing one writes junk.
      const setter = gsap.quickSetter(track, 'xPercent');
      // The row holds two copies of the group, so 50% is one seamless lap.
      const wrap = gsap.utils.wrap(-50, 0);
      let target = 0;
      let offset = 0;

      // Movement is asked for in px and applied in percent, so the strip
      // travels the same distance whatever width the cards clamp to.
      let percentPerPx = 0;
      const measure = () => {
        percentPerPx = 100 / (track.offsetWidth || 1);
      };
      measure();

      // ScrollTrigger used to re-measure this on refresh. Nothing is watching
      // the scrollbar now, so the row watches its own width instead — the cards
      // clamp against the viewport, and images landing late reflow the track.
      const observer = new ResizeObserver(measure);
      observer.observe(track);

      // Every card is a link, and asking someone to hit a moving one is a poor
      // trade for the drift. Pointer or keyboard on the row holds it still.
      let held = false;
      const hold = () => {
        held = true;
      };
      const release = () => {
        held = false;
      };
      root.addEventListener('pointerenter', hold);
      root.addEventListener('pointerleave', release);
      root.addEventListener('focusin', hold);
      root.addEventListener('focusout', release);

      const tick = (time, delta) => {
        if (!held) target -= DRIFT * percentPerPx * (delta / 1000);

        // Frame-rate independent glide. At a constant drift this only trails the
        // target by a fixed few px, which is invisible — it earns its keep on
        // hold and release, where it eases the row to a stop and back up again
        // instead of cutting the motion dead.
        const ease = 1 - Math.exp(-delta / (GLIDE * 1000));
        let next = offset + (target - offset) * ease;

        // Keep the accumulators near zero. A whole number of laps makes no
        // visual difference, so offset and target shed them together.
        const laps = Math.trunc(next / 50) * 50;
        if (Math.abs(laps) >= 500) {
          next -= laps;
          target -= laps;
        }

        offset = next;
        setter(wrap(next));
      };
      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        observer.disconnect();
        root.removeEventListener('pointerenter', hold);
        root.removeEventListener('pointerleave', release);
        root.removeEventListener('focusin', hold);
        root.removeEventListener('focusout', release);
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="runner" ref={rootRef}>
      <div className="runner__track">
        {/* The second copy makes the -50% translation loop seamlessly. */}
        <Group />
        <Group hidden />
      </div>
    </div>
  );
}
