import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';
const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia(REDUCED_QUERY).matches;
}

export function hasFinePointer() {
  return typeof window !== 'undefined' && window.matchMedia(FINE_POINTER_QUERY).matches;
}

/** Live-updating version of the reduced-motion preference. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(prefersReducedMotion);

  useEffect(() => {
    const mq = window.matchMedia(REDUCED_QUERY);
    const onChange = (event) => setReduced(event.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

/**
 * Fade-and-rise an element the first time it scrolls into view.
 * Returns the ref to attach to the element.
 */
export function useReveal({ y = 34, duration = 1, delay = 0, start = 'top 88%' } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0,
        y,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start, once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [y, duration, delay, start]);

  return ref;
}

/** Pull an element gently toward the pointer, then spring it back. */
export function useMagnetic({ strengthX = 0.22, strengthY = 0.28 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !hasFinePointer()) return undefined;

    const onMove = (event) => {
      const rect = el.getBoundingClientRect();
      gsap.to(el, {
        x: (event.clientX - rect.left - rect.width / 2) * strengthX,
        y: (event.clientY - rect.top - rect.height / 2) * strengthY,
        duration: 0.3,
      });
    };
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.45)' });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      gsap.killTweensOf(el);
    };
  }, [strengthX, strengthY]);

  return ref;
}

/**
 * Types each word out, holds it, deletes it, moves on.
 * With reduced motion (or before it is enabled) the first word is shown as-is,
 * which is the headline exactly as written.
 */
export function useTypewriter(words, { enabled = true, typeMs = 84, deleteMs = 42, holdMs = 1600 } = {}) {
  const [text, setText] = useState(words[0]);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!enabled || reduced || words.length < 2) {
      setText(words[0]);
      return undefined;
    }

    let wordIndex = 0;
    let charCount = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const word = words[wordIndex];
      charCount += deleting ? -1 : 1;
      setText(word.slice(0, charCount));

      let delay = deleting ? deleteMs : typeMs;
      if (!deleting && charCount >= word.length) {
        delay = holdMs;
        deleting = true;
      } else if (deleting && charCount <= 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 320;
      }
      timer = setTimeout(tick, delay);
    };

    // Start from the written headline, then begin cycling.
    charCount = words[0].length;
    deleting = true;
    timer = setTimeout(tick, holdMs);

    return () => clearTimeout(timer);
  }, [words, enabled, reduced, typeMs, deleteMs, holdMs]);

  return text;
}
