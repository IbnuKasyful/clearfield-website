import { contactSection, contact, emailHref, whatsappHref } from '../data/site';
import Reveal from './Reveal';

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact__panel">
        <div>
          <Reveal as="span" className="eyebrow">
            {contactSection.index}&nbsp;&nbsp;{contactSection.kicker}
          </Reveal>
          <Reveal as="h2" className="contact__title">
            {contactSection.heading}
          </Reveal>
          <Reveal as="p" className="contact__body">
            {contactSection.body}
          </Reveal>
          <div className="contact__actions">
            <a className="btn btn--primary" href={emailHref}>
              {contactSection.cta}
            </a>
            <a className="btn btn--outline" href={whatsappHref} target="_blank" rel="noreferrer">
              {contact.whatsappDisplay}
            </a>
          </div>
        </div>

        <Reveal className="contact__details">
          <div>
            <span className="contact__detail-label">Email</span>
            <a className="contact__detail-value" href={emailHref}>
              {contact.email}
            </a>
          </div>
          <div>
            <span className="contact__detail-label">WhatsApp</span>
            <a
              className="contact__detail-value"
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              {contact.whatsappDetail}
            </a>
          </div>
          <div>
            <span className="contact__detail-label">Hours</span>
            <span className="contact__detail-value">{contact.hours}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
