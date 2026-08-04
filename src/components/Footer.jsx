import { useEffect, useRef } from 'react';
import { footer, contact, contactSection, emailHref } from '../data/site';
import { gsap, prefersReducedMotion } from '../lib/motion';
import PixelMark from './PixelMark';

export default function Footer() {
  const markRef = useRef(null);

  useEffect(() => {
    const mark = markRef.current;
    if (!mark || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      gsap.from(mark, {
        yPercent: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: { trigger: mark, start: 'top 94%', once: true },
      });
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
          Clearfield
          <PixelMark
            width="0.42em"
            height="0.3em"
            style={{ marginTop: '0.1em' }}
          />
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
                <a href={link.href} key={link.label}>
                  {link.label}
                </a>
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
