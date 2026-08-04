import { useEffect, useRef } from 'react';
import { why } from '../data/site';
import { gsap, prefersReducedMotion } from '../lib/motion';
import Reveal from './Reveal';

export default function WhyClearfield() {
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.why-card__bar').forEach((bar) => {
        gsap.from(bar, {
          width: 0,
          duration: 1.1,
          ease: 'power4.out',
          scrollTrigger: { trigger: bar, start: 'top 88%', once: true },
        });
      });
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section why" id="why">
      <div className="why__head">
        <Reveal as="span" className="eyebrow">
          {why.index}&nbsp;&nbsp;{why.kicker}
        </Reveal>
        <Reveal as="h2" className="why__title">
          {why.heading}
        </Reveal>
        <Reveal as="p" className="why__intro">
          {why.intro}
        </Reveal>
      </div>

      <div className="why__grid" ref={gridRef}>
        {why.items.map((item) => (
          <Reveal key={item.number}>
            <div className="why-card__chart">
              <span
                className={`why-card__bar${item.accent ? ' why-card__bar--accent' : ''}`}
                style={{ width: `${item.fill}%` }}
              />
              <span className="why-card__number">{item.number}</span>
            </div>
            <div className="why-card__body">
              <h3 className="why-card__title">{item.title}</h3>
              <p className="why-card__text">{item.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
