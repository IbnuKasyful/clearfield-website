import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { services, whatsappHref } from '../data/site';
import { gsap, prefersReducedMotion } from '../lib/motion';
import Reveal from './Reveal';

export default function Services() {
  const [openId, setOpenId] = useState(services.items[0].id);
  const bodyRefs = useRef({});
  const mountedRef = useRef(false);

  // Collapse the closed rows before first paint so nothing flashes open.
  useLayoutEffect(() => {
    services.items.forEach((item) => {
      const el = bodyRefs.current[item.id];
      if (!el) return;
      const isOpen = item.id === openId;
      el.style.height = isOpen ? 'auto' : '0px';
      el.inert = !isOpen;
    });
    mountedRef.current = true;
    // Deliberately runs once: later changes are animated by the effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mountedRef.current) return;

    services.items.forEach((item) => {
      const el = bodyRefs.current[item.id];
      if (!el) return;
      const isOpen = item.id === openId;
      el.inert = !isOpen;

      if (prefersReducedMotion()) {
        el.style.height = isOpen ? 'auto' : '0px';
        return;
      }
      gsap.to(el, {
        height: isOpen ? 'auto' : 0,
        duration: isOpen ? 0.6 : 0.5,
        ease: 'power3.inOut',
      });
    });
  }, [openId]);

  return (
    <section className="services" id="services">
      <div className="services__panel">
        <div className="services__head">
          <div>
            <Reveal as="span" className="eyebrow eyebrow--on-dark">
              {services.index}&nbsp;&nbsp;{services.kicker}
            </Reveal>
            <Reveal as="h2" className="services__title">
              {services.heading}
            </Reveal>
            <Reveal as="p" className="services__lede">
              {services.lede}
            </Reveal>
          </div>
          <Reveal className="services__tags">
            {services.tags.map((tag) => (
              <span className="pill pill--on-dark pill--upper" key={tag}>
                {tag}
              </span>
            ))}
          </Reveal>
        </div>

        {services.items.map((item) => {
          const isOpen = item.id === openId;
          return (
            <div className="service-row" key={item.id}>
              <h3 className="service-row__heading">
                <button
                  type="button"
                  className="service-row__head"
                  aria-expanded={isOpen}
                  aria-controls={`service-panel-${item.id}`}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                >
                  <span className="service-row__number">{item.number}</span>
                  <span className="service-row__title">{item.title}</span>
                  <span className="service-row__lead">{item.lead}</span>
                  <span
                    className="service-row__icon"
                    style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
              </h3>

              <div
                className="service-row__body"
                id={`service-panel-${item.id}`}
                ref={(el) => {
                  bodyRefs.current[item.id] = el;
                }}
              >
                <div className="service-row__body-inner">
                  <span className="service-row__spacer" />
                  <div>
                    <p className="service-row__copy">{item.body}</p>
                    <div className="service-row__pills">
                      {item.tags.map((tag) => (
                        <span className="pill pill--on-dark" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {item.related && (
                      <p className="service-row__related">
                        {item.relatedLead}{' '}
                        {item.related.map((entry, index) => (
                          <span key={entry.project}>
                            {index > 0 && ' and '}
                            <Link to={`/projects/${entry.project}`}>{entry.label}</Link>
                          </span>
                        ))}
                        .
                      </p>
                    )}
                  </div>
                  {item.media.length > 0 && (
                    // Collapsed rows are marked inert, so these links leave the
                    // tab order along with the rest of the panel.
                    <div className="service-row__media">
                      {item.media.map((media) => {
                        const shot = (
                          <img
                            src={media.project ? `/projects/${media.project}-4x3.webp` : media.src}
                            alt={media.label}
                            width={1000}
                            height={750}
                            loading="lazy"
                            decoding="async"
                          />
                        );

                        // Two kinds of media: our own case studies, which link
                        // to the detail route, and live profiles elsewhere,
                        // which leave the site.
                        return media.project ? (
                          <Link
                            className="service-row__shot"
                            to={`/projects/${media.project}`}
                            key={media.project}
                          >
                            {shot}
                          </Link>
                        ) : (
                          <a
                            className="service-row__shot"
                            href={media.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            key={media.src}
                          >
                            {shot}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        <a
          className="btn btn--light services__cta"
          href={whatsappHref}
          target="_blank"
          rel="noreferrer noopener"
        >
          {services.cta}&nbsp;↗
        </a>
      </div>
    </section>
  );
}
