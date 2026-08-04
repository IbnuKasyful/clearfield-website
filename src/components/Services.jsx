import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/site';
import { gsap, prefersReducedMotion, useMagnetic } from '../lib/motion';
import Reveal from './Reveal';
import SectionLink from './SectionLink';

export default function Services() {
  const [openId, setOpenId] = useState(services.items[0].id);
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const bodyRefs = useRef({});
  const mountedRef = useRef(false);
  const ctaRef = useMagnetic();

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

  // The panel scales up into place as it enters, echoing the artifact.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panel,
        { scale: 0.62, borderRadius: 60, opacity: 0.6 },
        {
          scale: 1,
          borderRadius: 26,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 92%',
            end: 'top 34%',
            scrub: 0.6,
          },
        },
      );
    }, panel);

    return () => ctx.revert();
  }, []);

  return (
    <section className="services" id="services" ref={sectionRef}>
      <div className="services__panel" ref={panelRef}>
        <div className="services__head">
          <div>
            <Reveal as="span" className="eyebrow eyebrow--on-dark">
              {services.index}&nbsp;&nbsp;{services.kicker}
            </Reveal>
            <Reveal as="h2" className="services__title">
              {services.heading}
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
                  </div>
                  {item.media.length > 0 && (
                    // Collapsed rows are marked inert, so these links leave the
                    // tab order along with the rest of the panel.
                    <div className="service-row__media">
                      {item.media.map((media) => (
                        <Link
                          className="service-row__shot"
                          to={`/projects/${media.project}`}
                          key={media.project}
                        >
                          <img
                            src={`/projects/${media.project}-4x3.webp`}
                            alt={media.label}
                            width={1000}
                            height={750}
                            loading="lazy"
                            decoding="async"
                          />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        <SectionLink ref={ctaRef} className="btn btn--light services__cta" href="#contact">
          {services.cta}&nbsp;↗
        </SectionLink>
      </div>
    </section>
  );
}
