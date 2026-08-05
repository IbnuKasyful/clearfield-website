import { useEffect, useRef } from 'react';
import { hero } from '../data/site';
import {
  gsap,
  prefersReducedMotion,
  useMagnetic,
  useReducedMotion,
  useTypewriter,
} from '../lib/motion';
import NodeMark from './NodeMark';
import SectionLink from './SectionLink';
import ShowcaseRunner from './ShowcaseRunner';

export default function Hero({ ready }) {
  const rootRef = useRef(null);
  const ctaRef = useMagnetic();
  const reduced = useReducedMotion();
  const typed = useTypewriter(hero.headingWords, { enabled: ready });

  useEffect(() => {
    if (!ready || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .from('[data-node]', { scale: 0, transformOrigin: '50% 50%', duration: 0.55, ease: 'back.out(3)', stagger: 0.1 })
        .from('[data-node-link]', { strokeDashoffset: 1, duration: 0.5, ease: 'power1.out' }, '<')
        .from('[data-hero-fade]', { opacity: 0, y: 24, duration: 0.9, stagger: 0.08 }, '-=0.3');
    }, rootRef);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section className="hero" id="top" ref={rootRef} aria-label="Introduction">
      <div className="hero__inner">
        <p className="hero__chip" data-hero-fade>
          <NodeMark width={20} height={9.7} animated />
          {hero.chip}
        </p>

        {/* The heading is announced once, as written; the typed version is
            decorative so assistive tech is not re-read on every keystroke. */}
        <h1 className="hero__title">
          <span className="visually-hidden">
            {hero.headingLead} {hero.headingWords[0]}
          </span>
          <span aria-hidden="true">
            <span className="hero__line">
              <span style={{ display: 'block' }}>{hero.headingLead}</span>
            </span>
            <span className="hero__line">
              <span style={{ display: 'block' }}>
                <span className="hero__typed">{typed}</span>
                {!reduced && <span className="hero__caret" />}
                <span className="hero__mark">
                  <NodeMark width="0.68em" height="0.33em" animated />
                </span>
              </span>
            </span>
          </span>
        </h1>

        <p className="hero__body" data-hero-fade>
          {hero.body}
        </p>

        <div className="hero__actions" data-hero-fade>
          <SectionLink ref={ctaRef} className="btn btn--primary" href="#contact">
            {hero.primaryCta}
          </SectionLink>
          <SectionLink className="btn btn--soft" href="#projects">
            {hero.secondaryCta}
          </SectionLink>
        </div>

        <div className="hero__capabilities" data-hero-fade>
          <p className="hero__capabilities-label">{hero.capabilitiesLabel}</p>
          <div className="hero__capabilities-list">
            {hero.capabilities.map((capability) => (
              <span key={capability}>
                <NodeMark width={16} height={7.8} />
                {capability}
              </span>
            ))}
          </div>
        </div>
      </div>

      <ShowcaseRunner />
    </section>
  );
}
