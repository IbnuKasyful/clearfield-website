import { about } from '../data/site';
import Reveal from './Reveal';

export default function About() {
  return (
    <section className="section about" id="about">
      <Reveal as="span" className="eyebrow">
        {about.index}&nbsp;&nbsp;{about.kicker}
      </Reveal>

      <div>
        <Reveal as="h2" className="about__heading">
          {about.heading}
        </Reveal>
        {/* This paragraph used to pin the page and light itself up a word at a
            time, holding the reader in place until it finished. It now reads at
            whatever pace the reader chooses. */}
        {about.statement.map((paragraph, pIndex) => (
          <Reveal as="p" className="about__statement" key={pIndex}>
            {paragraph.map((part, index) => (
              <span key={index} className={part.tone ?? undefined}>
                {part.text}
              </span>
            ))}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
