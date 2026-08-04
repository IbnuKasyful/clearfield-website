import { useEffect, useRef } from 'react';
import { projects } from '../data/site';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion';
import PixelMark from './PixelMark';
import Placeholder from './Placeholder';
import Reveal from './Reveal';

export default function Projects() {
  const gridRef = useRef(null);

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
      <div className="projects__head">
        <Reveal as="span" className="eyebrow">
          {projects.index}&nbsp;&nbsp;{projects.kicker}
        </Reveal>
        <Reveal as="h2" className="projects__title">
          {projects.heading}
        </Reveal>
        <Reveal as="p" className="projects__intro">
          {projects.intro}
        </Reveal>
      </div>

      <PixelMark width={70} height={50} className="projects__mark" />

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
                <Placeholder label={`${project.name} — ${project.type}`} />
              </div>
            </div>
            <p className="project-card__type">{project.type}</p>
            <h3 className="project-card__name">{project.name}</h3>
            <p className="project-card__description">{project.description}</p>
            <p className="project-card__delivered-label">Delivered</p>
            <ul className="project-card__delivered">
              {project.delivered.map((item) => (
                <li className="pill" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
