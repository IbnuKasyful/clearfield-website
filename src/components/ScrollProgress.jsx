import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/motion';

/** Hairline at the top of the viewport that tracks scroll depth. */
export default function ScrollProgress() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (prefersReducedMotion()) {
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        el.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }

    const ctx = gsap.context(() => {
      gsap.to(el, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
      });
    });
    return () => ctx.revert();
  }, []);

  return <div className="progress" ref={ref} aria-hidden="true" />;
}
