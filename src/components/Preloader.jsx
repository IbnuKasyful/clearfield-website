import { useEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion } from '../lib/motion';
import Wordmark from './Wordmark';

/**
 * Opening curtain: the wordmark fades in, the link runs left to right and
 * drops a node as it reaches each corner, the bar and counter fill, then the
 * whole thing lifts away. Skipped entirely when the visitor asks for reduced
 * motion.
 */
export default function Preloader({ onDone }) {
  const [skipped] = useState(prefersReducedMotion);
  const rootRef = useRef(null);
  const barRef = useRef(null);
  const pctRef = useRef(null);
  const doneRef = useRef(onDone);

  doneRef.current = onDone;

  useEffect(() => {
    if (skipped) {
      doneRef.current?.();
      return undefined;
    }

    const counter = { value: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
        onComplete: () => doneRef.current?.(),
      });

      tl.fromTo('[data-wordmark-text]', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0)
        .fromTo(
          '[data-node-link]',
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 0.8, ease: 'power1.inOut' },
          0.18,
        )
        // One node per corner the line reaches, so the stagger tracks the draw.
        .fromTo(
          '[data-node]',
          { scale: 0, transformOrigin: '50% 50%' },
          { scale: 1, duration: 0.4, ease: 'back.out(2.6)', stagger: 0.25 },
          0.18,
        )
        .to(barRef.current, { scaleX: 1, duration: 1.1, ease: 'power2.inOut' }, 0.15)
        .to(
          counter,
          {
            value: 100,
            duration: 1.1,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (pctRef.current) pctRef.current.textContent = `${Math.round(counter.value)}%`;
            },
          },
          0.15,
        )
        .to(rootRef.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '+=0.15');
    }, rootRef);

    // Safety net: never leave the curtain up if an animation frame is lost.
    const fallback = setTimeout(() => doneRef.current?.(), 4200);

    return () => {
      clearTimeout(fallback);
      ctx.revert();
    };
  }, [skipped]);

  if (skipped) return null;

  return (
    <div className="preloader" ref={rootRef} aria-hidden="true">
      <Wordmark className="preloader__word" withMark animated />
      <div className="preloader__row">
        <div className="preloader__track">
          <div className="preloader__bar" ref={barRef} />
        </div>
        <span className="preloader__pct" ref={pctRef}>
          0%
        </span>
      </div>
    </div>
  );
}
