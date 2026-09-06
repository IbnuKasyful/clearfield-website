import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/site';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion';
import PillList from './PillList';
import NodeMark from './NodeMark';
import Reveal from './Reveal';

export default function Projects() {
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.project-card');

      // Cards rise in, row by row. The artwork inside used to drift on a
      // scrubbed parallax as well; the work itself is the point, so it now
      // holds still.
      gsap.set(cards, { opacity: 0, y: 28 });
      ScrollTrigger.batch(cards, {
        start: 'top 90%',
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.08,
            overwrite: true,
          }),
      });
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <section className="projects" id="projects">
      <div className="projects__lede">
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

        <NodeMark width={72} height={35} className="projects__mark" />
      </div>

      <div className="projects__grid" ref={gridRef}>
        {projects.items.map((project) => (
          <article className="project-card" key={project.id}>
            <div className="project-card__media">
              <img
                className="project-card__image"
                src={`/projects/${project.id}-card.webp`}
                alt={`The ${project.name} website`}
                width={1200}
                height={960}
                loading="lazy"
                decoding="async"
              />
              <span className="project-card__cue" aria-hidden="true">
                {projects.cardCta}
              </span>
            </div>

            {/* The write-up sits beside the shot rather than under it, so it
                needs its own box to be the second column of the card. */}
            <div className="project-card__body">
              <p className="project-card__type">{project.type}</p>

              {/* The client's own mark, in the client's own colours. A project
                  with no published mark simply leads with its name. */}
              {project.logo && (
                <img
                  className={`project-card__logo${
                    project.logo.tile ? ' project-card__logo--tile' : ''
                  }`}
                  src={project.logo.src}
                  alt=""
                  style={{ '--logo-h': `${project.logo.height}px` }}
                  loading="lazy"
                  decoding="async"
                />
              )}

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
              <PillList className="project-card__delivered" items={project.delivered} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
