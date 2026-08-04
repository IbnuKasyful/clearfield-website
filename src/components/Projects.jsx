import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/site';
import { gsap, ScrollTrigger, prefersReducedMotion, usePinnedWordReveal } from '../lib/motion';
import PhysicsPills from './PhysicsPills';
import PixelMark from './PixelMark';
import Reveal from './Reveal';
import SplitWords from './SplitWords';

export default function Projects() {
  const gridRef = useRef(null);
  const ledeRef = usePinnedWordReveal({ words: '.projects__word' });

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.project-card');

      // Cards rise in, row by row.
      gsap.set(cards, { opacity: 0, y: 56 });
      ScrollTrigger.batch(cards, {
        start: 'top 90%',
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.12,
            overwrite: true,
          }),
      });

      // Slow parallax drift on the artwork inside each frame.
      gsap.utils.toArray('.project-card__media-inner').forEach((inner) => {
        gsap.fromTo(
          inner,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: inner.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      });
    }, grid);

    return () => ctx.revert();
  }, []);

  const onCardHover = (event, scale) => {
    if (prefersReducedMotion()) return;
    const inner = event.currentTarget.querySelector('.project-card__media-inner');
    if (inner) gsap.to(inner, { scale, duration: 0.8, ease: 'power3.out' });
  };

  return (
    <section className="projects" id="projects">
      {/* Head and mark travel together so the pin takes the whole lede. */}
      <div className="projects__lede" ref={ledeRef}>
        <div className="projects__head">
          <Reveal as="span" className="eyebrow">
            {projects.index}&nbsp;&nbsp;{projects.kicker}
          </Reveal>
          <h2 className="projects__title">
            <SplitWords text={projects.heading} className="projects__word" />
          </h2>
          <p className="projects__intro">
            <SplitWords text={projects.intro} className="projects__word" />
          </p>
        </div>

        <PixelMark width={70} height={50} className="projects__mark" />
      </div>

      <div className="projects__grid" ref={gridRef}>
        {projects.items.map((project) => (
          <article
            className="project-card"
            key={project.id}
            onMouseEnter={(event) => onCardHover(event, 1.07)}
            onMouseLeave={(event) => onCardHover(event, 1)}
          >
            <div className="project-card__media">
              <div className="project-card__media-inner">
                <img
                  className="project-card__image"
                  src={`/projects/${project.id}-card.webp`}
                  alt={`The ${project.name} website`}
                  width={1200}
                  height={1075}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span className="project-card__cue" aria-hidden="true">
                {projects.cardCta}
                <span className="project-card__cue-arrow">→</span>
              </span>
            </div>
            <p className="project-card__type">{project.type}</p>
            {/* The whole card is clickable — the overlay below stretches this
                link across it, so nothing else needs to be interactive. */}
            <h3 className="project-card__name">
              <Link className="project-card__link" to={`/projects/${project.id}`}>
                {project.name}
                <span className="visually-hidden"> — {project.type}, view project</span>
              </Link>
            </h3>
            <p className="project-card__description">{project.description}</p>
            <p className="project-card__delivered-label">Delivered</p>
            <PhysicsPills className="project-card__delivered" items={project.delivered} />
          </article>
        ))}
      </div>
    </section>
  );
}
