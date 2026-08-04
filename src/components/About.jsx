import { about } from '../data/site';
import { usePinnedWordReveal } from '../lib/motion';
import Reveal from './Reveal';
import SplitWords from './SplitWords';

export default function About() {
  // Parked higher than the projects lede: this section carries its own top
  // padding, so the copy still lands in the same place on screen.
  const sectionRef = usePinnedWordReveal({ words: '.about__word', offset: 0.1 });

  return (
    <section className="section about" id="about" ref={sectionRef}>
      <Reveal as="span" className="eyebrow">
        {about.index}&nbsp;&nbsp;{about.kicker}
      </Reveal>

      <div>
        <Reveal as="h2" className="about__heading">
          {about.heading}
        </Reveal>
        <p className="about__statement">
          {about.statement.map((part, index) => (
            <span key={index} className={part.tone ?? undefined}>
              <SplitWords text={part.text} className="about__word" />
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
