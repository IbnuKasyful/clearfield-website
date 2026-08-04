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

      {/* Closed cards sit side by side and read vertically; the one under the
          pointer (or keyboard focus) opens and takes colour, the rest give up
          their width. */}
      <Reveal className="why__cards">
        {why.items.map((item) => (
          <article
            key={item.number}
            className="why-card"
            style={{ '--tone': item.tone }}
            tabIndex={0}
          >
            <span className="why-card__number">{item.number}</span>
            {/* The closed-state label — the real heading lives in the body. */}
            <span className="why-card__spine" aria-hidden="true">
              {item.title}
            </span>
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
