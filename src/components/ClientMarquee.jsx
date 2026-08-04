import { useEffect, useRef } from 'react';
import { projects, contact } from '../data/site';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion';

const names = [...projects.items.map((project) => project.name), contact.groupShort];

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

  const group = (hidden) => (
    <span className="marquee__group" aria-hidden={hidden || undefined}>
      {names.map((name) => (
        <span key={name}>{name}</span>
      ))}
    </span>
  );

  return (
    <section className="marquee" aria-label="Clients and group">
      <div className="marquee__track" ref={trackRef}>
        {group(false)}
        {group(true)}
      </div>
    </section>
  );
}
