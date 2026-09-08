import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Projects from '../components/Projects';
import WhyClearfield from '../components/WhyClearfield';
import ClientMarquee from '../components/ClientMarquee';
import Contact from '../components/Contact';
import { site } from '../data/site';
import { prefersReducedMotion } from '../lib/motion';
import { useHead } from '../lib/head';

export default function Home() {
  useHead({ title: site.title, description: site.description, path: '/' });

  const { state, hash } = useLocation();
  // Nav anchors hand over router state; the "All projects" link uses a hash.
  const scrollTo = state?.scrollTo || hash.replace('#', '');

  // Arriving from a project page: the section exists only once this route has
  // mounted, so the scroll happens here rather than in the link.
  useEffect(() => {
    if (!scrollTo) return undefined;

    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(scrollTo);
      if (!target) return;
      target.scrollIntoView({
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        block: 'start',
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [scrollTo]);

  return (
    <>
      <Hero />
      <About />
      <Services />
      <Projects />
      <WhyClearfield />
      <ClientMarquee />
      <Contact />
    </>
  );
}
