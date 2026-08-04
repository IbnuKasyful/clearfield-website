import { useState } from 'react';
import { nav, hero } from '../data/site';
import { useMagnetic } from '../lib/motion';
import PixelMark from './PixelMark';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const ctaRef = useMagnetic();

  return (
    <nav className="nav" data-open={open ? 'true' : 'false'}>
      <a className="nav__brand" href="#top" onClick={() => setOpen(false)}>
        <span className="nav__wordmark">Clearfield</span>
        <PixelMark width={20} height={14} />
        <span className="visually-hidden">Clearfield home</span>
      </a>

      <div className="nav__links" id="primary-navigation">
        {nav.map((item, index) => (
          <span key={item.href} style={{ display: 'contents' }}>
            {index > 0 && <span className="nav__dot" aria-hidden="true" />}
            <a href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          </span>
        ))}
      </div>

      <button
        type="button"
        className="nav__toggle"
        aria-label="Menu"
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      <a ref={ctaRef} className="btn btn--primary btn--sm nav__cta" href="#contact">
        {hero.primaryCta}
      </a>
    </nav>
  );
}
