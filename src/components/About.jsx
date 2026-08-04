import { useEffect, useRef } from 'react';
import { about } from '../data/site';
import { gsap, prefersReducedMotion } from '../lib/motion';
import Reveal from './Reveal';

export default function About() {
  const statementRef = useRef(null);

  useEffect(() => {
    const el = statementRef.current;
    if (!el || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0.12,
        y: 20,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 82%', once: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section about" id="about">
      <Reveal as="span" className="eyebrow">
        {about.index}&nbsp;&nbsp;{about.kicker}
      </Reveal>

      <div>
        <Reveal as="h2" className="about__heading">
          {about.heading}
        </Reveal>
        <p className="about__statement" ref={statementRef}>
          {about.statement.map((part, index) => (
            <span key={index} className={part.tone ?? undefined}>
              {part.text}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
