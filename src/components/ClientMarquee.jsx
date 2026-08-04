import { useEffect, useRef } from 'react';
import { projects } from '../data/site';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion';

// The wall runs the mark each client uses on their own live site. Handelsmissie
// Dubai publishes none of its own, so it keeps the wordmark it had before — the
// shared ink treatment holds the row together either way.
const clients = projects.items.map(({ id, name, logo }) => ({ id, name, logo }));

// The loop translates the track by half its width, so each half has to be at
// least as wide as the viewport or the seam shows as a gap. Four marks are not,
// hence the repeat inside every half.
const SETS_PER_HALF = 3;

export default function ClientMarquee() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return undefined;

    // Hand the loop to gsap so it can speed up with scroll velocity.
    track.style.animation = 'none';

    const ctx = gsap.context(() => {
      const loop = gsap.to(track, { xPercent: -50, repeat: -1, ease: 'none', duration: 38 });
      let target = 1;

      const trigger = ScrollTrigger.create({
        onUpdate: (self) => {
          target = gsap.utils.clamp(1, 7, 1 + Math.abs(self.getVelocity()) / 800);
        },
      });

      const tick = () => {
        loop.timeScale(gsap.utils.interpolate(loop.timeScale(), target, 0.07));
        target += (1 - target) * 0.05;
      };
      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        trigger.kill();
        loop.kill();
      };
    }, track);

    return () => ctx.revert();
  }, []);

  // Only the first set is read out; every other copy exists to fill the track.
  const set = (key, announced) => (
    <span className="marquee__set" key={key} aria-hidden={announced ? undefined : true}>
      {clients.map((client) =>
        client.logo ? (
          <img
            key={client.id}
            className="marquee__logo"
            src={client.logo.src}
            alt={announced ? client.name : ''}
            style={{ '--logo-h': `${client.logo.height}px` }}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className="marquee__wordmark" key={client.id}>
            {client.name}
          </span>
        ),
      )}
    </span>
  );

  const group = (half) =>
    Array.from({ length: SETS_PER_HALF }, (_, index) =>
      set(`${half}-${index}`, half === 0 && index === 0),
    );

  return (
    <section className="marquee" aria-label="Clients">
      <div className="marquee__track" ref={trackRef}>
        <span className="marquee__group">{group(0)}</span>
        <span className="marquee__group">{group(1)}</span>
      </div>
    </section>
  );
}
