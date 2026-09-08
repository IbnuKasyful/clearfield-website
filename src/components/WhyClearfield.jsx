import { why } from '../data/site';
import Reveal from './Reveal';

export default function WhyClearfield() {

  return (
    <section className="section why" id="why">
      <div className="why__head">
        <Reveal as="span" className="eyebrow">
          {why.index}&nbsp;&nbsp;{why.kicker}
        </Reveal>
        <Reveal as="h2" className="why__title">
          {why.heading}
        </Reveal>
        <Reveal as="p" className="why__intro">
          {why.intro}
        </Reveal>
      </div>

      {/* Four open cards. Nothing here is interactive, so nothing here is a tab
          stop — the cards used to be focusable only so a keyboard could open
          them, which is no longer something that has to happen. */}
      <Reveal className="why__cards">
        {why.items.map((item) => (
          <article key={item.number} className="why-card" style={{ '--tone': item.tone }}>
            <span className="why-card__number">{item.number}</span>
            <div className="why-card__body">
              <h3 className="why-card__title">{item.title}</h3>
              <p className="why-card__text">{item.body}</p>
            </div>
          </article>
        ))}
      </Reveal>
    </section>
  );
}
