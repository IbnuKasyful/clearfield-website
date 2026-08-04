import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// The webfonts load with display: swap, so text reflows after the triggers have
// already measured the page. Anything pinned would then engage at the wrong
// scroll position — remeasure once the real faces are in.
if (typeof document !== 'undefined' && document.fonts) {
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}

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

/**
 * Lights a block of copy up word by word, tied to the scrollbar, and pins the
 * page while it happens — so the reader cannot reach the next section until the
 * last word has landed. Returns the ref for the block that gets pinned.
 *
 * `words` is a selector for the per-word spans inside that block; SplitWords
 * produces them.
 */
export function usePinnedWordReveal({
  words,
  dim = 0.14,
  // Where the block parks while it is held, as a fraction of the viewport.
  offset = 0.18,
  // Viewport-heights of scroll spent on the reveal, and the beat afterwards
  // with every word already lit (in timeline units).
  distance = 1.2,
  hold = 6,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          // Park it below the header, but never so low that a short screen cuts
          // the tail of the copy off. Re-measured on every refresh.
          start: () => {
            const room = Math.max(0, window.innerHeight - el.offsetHeight);
            return `top ${Math.round(Math.min(window.innerHeight * offset, room / 2))}px`;
          },
          end: () => `+=${window.innerHeight * distance}`,
          // No width or height gate: the hold is the point of the section, so it
          // applies on every screen that has not asked for reduced motion.
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // Tight scrub: a long lag would let the release outrun the words.
          scrub: 0.25,
        },
      });

      tl.fromTo(words, { opacity: dim }, { opacity: 1, ease: 'none', duration: 0.5, stagger: 0.6 });
      // Without the beat the release lands on the same frame as the last word,
      // and the copy reads as cut off rather than finished.
      if (hold) tl.to({}, { duration: hold });
    }, el);

    return () => ctx.revert();
  }, [words, dim, offset, distance, hold]);

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
