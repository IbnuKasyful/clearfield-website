import { useState } from 'react';
import { Link } from 'react-router-dom';
import { nav, contact, emailHref } from '../data/site';
import NodeMark from './NodeMark';
import SectionLink from './SectionLink';
import Wordmark from './Wordmark';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="navbar">
      <nav className="navpill" data-open={open ? 'true' : 'false'}>
        {/* Reads as a mark at rest; opens into the full lockup on hover. */}
        <Link className="navpill__brand" to="/" onClick={close} aria-label="Clearfield home">
          <span className="navpill__mark">
            <NodeMark width={28} height={13.6} />
          </span>
          <span className="navpill__wordmark" aria-hidden="true">
            <Wordmark />
          </span>
        </Link>

        <div className="navpill__links" id="primary-navigation">
          {nav.map((item) => (
            <SectionLink key={item.href} className="navpill__link" href={item.href} onClick={close}>
              {item.label}
            </SectionLink>
          ))}

          {/* Same address, reachable once the desktop pill has collapsed. */}
          <a className="navpill__cta navpill__cta--menu" href={emailHref} onClick={close}>
            {contact.email}
          </a>
        </div>

        <button
          type="button"
          className="navpill__toggle"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>

        <a className="navpill__cta" href={emailHref}>
          {contact.email}
        </a>
      </nav>
    </header>
  );
}
