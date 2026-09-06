import { useEffect, useRef } from 'react';
import { hero, whatsappHref } from '../data/site';
import { gsap, prefersReducedMotion } from '../lib/motion';
import NodeMark from './NodeMark';
import SectionLink from './SectionLink';
import ShowcaseRunner from './ShowcaseRunner';

export default function Hero() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    // One settle on arrival, nothing more. The headline used to type itself
    // through four different endings, which read as a showreel and left the
    // positioning ambiguous — it is now the single line as written.
    const ctx = gsap.context(() => {
      gsap.from('[data-hero-fade]', {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.06,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="top" ref={rootRef} aria-label="Introduction">
      <div className="hero__inner">
        <p className="hero__chip" data-hero-fade>
          <NodeMark width={20} height={9.7} />
          {hero.chip}
        </p>

        <h1 className="hero__title" data-hero-fade>
          <span className="hero__line">
            <span style={{ display: 'block' }}>{hero.headingLead}</span>
          </span>
          <span className="hero__line">
            <span style={{ display: 'block' }}>
              <span className="hero__accent">{hero.headingAccent}</span>
              <span className="hero__mark" aria-hidden="true">
                <NodeMark width="0.68em" height="0.33em" />
              </span>
            </span>
          </span>
        </h1>

        <p className="hero__body" data-hero-fade>
          {hero.body}
        </p>

        <div className="hero__actions" data-hero-fade>
          {/* Straight into WhatsApp rather than down to the contact section —
              the ask is a direct conversation, not another scroll. */}
          <a
            className="btn btn--primary"
            href={whatsappHref}
            target="_blank"
            rel="noreferrer noopener"
          >
            {hero.primaryCta}
          </a>
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
