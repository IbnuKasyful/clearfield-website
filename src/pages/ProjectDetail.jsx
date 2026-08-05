import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { projects, projectById, projectDetail, whatsappHref } from '../data/site';
import { useMagnetic } from '../lib/motion';
import PhysicsPills from '../components/PhysicsPills';
import NodeMark from '../components/NodeMark';
import Reveal from '../components/Reveal';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projectById(slug);
  const ctaRef = useMagnetic();

  // The tab title is the only head data this static build manages per route.
  useEffect(() => {
    const previous = document.title;
    document.title = project
      ? `${project.name} — ${project.type} | Clearfield`
      : `${projectDetail.notFound.heading} | Clearfield`;
    return () => {
      document.title = previous;
    };
  }, [project]);

  if (!project) {
    return (
      <section className="project-page project-page--empty">
        <h1 className="project-page__title">{projectDetail.notFound.heading}</h1>
        <p className="project-page__summary">{projectDetail.notFound.body}</p>
        <Link className="btn btn--primary" to="/#projects">
          {projectDetail.backLabel}
        </Link>
      </section>
    );
  }

  const { detail } = project;
  const index = projects.items.findIndex((item) => item.id === project.id);
  const next = projects.items[(index + 1) % projects.items.length];

  return (
    <article className="project-page" id="top">
      <Link className="project-page__back" to="/#projects">
        <span aria-hidden="true">←</span> {projectDetail.backLabel}
      </Link>

      <header className="project-page__head">
        <Reveal as="p" className="eyebrow project-page__eyebrow">
          <NodeMark width={18} height={8.8} />
          {project.type}
        </Reveal>
        <Reveal as="h1" className="project-page__title">
          {project.name}
        </Reveal>
        {detail?.summary && (
          <Reveal as="p" className="project-page__summary">
            {detail.summary}
          </Reveal>
        )}
        <Reveal className="project-page__meta">
          <a
            className="project-page__visit"
            href={project.url}
            target="_blank"
            rel="noreferrer noopener"
          >
            {projectDetail.visitLabel}
            <span className="project-page__visit-host">{project.urlLabel}</span>
          </a>
        </Reveal>
      </header>

      <Reveal className="project-page__shot">
        <img
          src={`/projects/${project.id}.webp`}
          alt={`The ${project.name} website as it appears live`}
          width={1600}
          height={1000}
        />
      </Reveal>

      <div className="project-page__body">
        <div className="project-page__prose">
          {detail?.sections.map((section) => (
            <Reveal className="project-page__section" key={section.title}>
              <h2 className="project-page__section-title">{section.title}</h2>
              {section.body.map((paragraph) => (
                <p className="project-page__paragraph" key={paragraph.slice(0, 40)}>
                  {paragraph}
                </p>
              ))}
            </Reveal>
          ))}
        </div>

        <aside className="project-page__aside">
          <Reveal className="project-page__panel">
            <p className="project-page__panel-title">{projectDetail.deliveredLabel}</p>
            <PhysicsPills className="project-page__delivered" items={project.delivered} />
          </Reveal>

          {detail?.highlights && (
            <Reveal className="project-page__panel">
              <p className="project-page__panel-title">{projectDetail.highlightsLabel}</p>
              <ul className="project-page__highlights">
                {detail.highlights.map((item) => (
                  <li key={item}>
                    <NodeMark width={15} height={7.3} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </aside>
      </div>

      <Reveal className="project-page__cta">
        <div>
          <h2 className="project-page__cta-heading">{projectDetail.ctaHeading}</h2>
          <p className="project-page__cta-body">{projectDetail.ctaBody}</p>
        </div>
        <a ref={ctaRef} className="btn btn--primary" href={whatsappHref} target="_blank" rel="noreferrer noopener">
          {projectDetail.ctaLabel}
        </a>
      </Reveal>

      <Reveal>
        <Link className="project-page__next" to={`/projects/${next.id}`}>
          <span className="project-page__next-label">{projectDetail.nextLabel}</span>
          <span className="project-page__next-name">
            {next.name}
            <span aria-hidden="true"> →</span>
          </span>
          <span className="project-page__next-type">{next.type}</span>
        </Link>
      </Reveal>
    </article>
  );
}
