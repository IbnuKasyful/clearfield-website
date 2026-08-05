import { useEffect, useRef } from 'react';
import { footer, contact, contactSection, emailHref } from '../data/site';
import { gsap, prefersReducedMotion } from '../lib/motion';
import SectionLink from './SectionLink';
import Wordmark from './Wordmark';

export default function Footer() {
  const markRef = useRef(null);

  useEffect(() => {
    const mark = markRef.current;
    if (!mark || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: mark, start: 'top 94%', once: true },
      });

      tl.from(mark, { yPercent: 40, opacity: 0, duration: 1.2, ease: 'power4.out' })
        // The mark assembles once the signature has settled.
        .from('[data-node-link]', { strokeDashoffset: 1, duration: 0.7, ease: 'power1.inOut' }, 0.45)
        .from(
          '[data-node]',
          { scale: 0, transformOrigin: '50% 50%', duration: 0.4, ease: 'back.out(2.6)', stagger: 0.22 },
          0.45,
        );
    }, mark);

    return () => ctx.revert();
  }, []);

  const toTop = (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer__top">
        <p className="footer__mark" ref={markRef}>
          <Wordmark withMark animated />
        </p>
        <span style={{ paddingTop: 12, fontSize: 15, color: 'rgba(241,239,233,0.6)' }}>
          © {new Date().getFullYear()}
        </span>
      </div>

      <div className="footer__grid">
        <div>
          <p className="footer__tagline">{footer.tagline}</p>
          <a className="footer__email" href={emailHref}>
            {contact.email}
          </a>
        </div>

        {footer.columns.map((column) => (
          <div key={column.title}>
            <p className="footer__column-title">{column.title}</p>
            <div className="footer__links">
              {column.links.map((link) => (
                <SectionLink href={link.href} key={link.label}>
                  {link.label}
                </SectionLink>
              ))}
            </div>
          </div>
        ))}

        <div>
          <p className="footer__column-title">Group</p>
          <div className="footer__links">
            <span className="footer__meta">{contact.group}</span>
            <span className="footer__meta">{contact.hours}</span>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <span>{contactSection.closingLine}</span>
        <span>{footer.copyright}</span>
        <a className="footer__top-link" href="#top" aria-label="Back to top" onClick={toTop}>
          ↑
        </a>
      </div>
    </footer>
  );
}
