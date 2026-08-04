import { useEffect, useRef, useState } from 'react';
import { gsap, hasFinePointer, prefersReducedMotion } from '../lib/motion';

const INTERACTIVE = 'a, button, .project-card, .service-row__head';

/**
 * Trailing ring and dot that replace the system pointer on fine-pointer
 * devices. Hover targets are matched by delegation, so it keeps working as
 * sections mount and unmount.
 */
export default function CustomCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  // Mouse-driven only: touch and reduced-motion visitors keep the system pointer.
  const [enabled] = useState(() => hasFinePointer() && !prefersReducedMotion());

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot || !enabled) return undefined;

    document.body.classList.add('has-cursor');
    gsap.set([ring, dot], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const ringX = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' });
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' });

    const onMove = (event) => {
      ringX(event.clientX);
      ringY(event.clientY);
      dotX(event.clientX);
      dotY(event.clientY);
    };

    let hovered = null;
    const onOver = (event) => {
      const target = event.target.closest?.(INTERACTIVE);
      if (!target || target === hovered) return;
      hovered = target;
      gsap.to(ring, { scale: 1.9, backgroundColor: 'rgba(255,255,255,0.14)', duration: 0.3 });
    };
    const onOut = (event) => {
      if (!hovered) return;
      const next = event.relatedTarget?.closest?.(INTERACTIVE);
      if (next === hovered) return;
      hovered = null;
      gsap.to(ring, { scale: 1, backgroundColor: 'rgba(255,255,255,0)', duration: 0.3 });
    };

    const onDown = () => gsap.to(dot, { scale: 2.4, duration: 0.2 });
    const onUp = () => gsap.to(dot, { scale: 1, duration: 0.2 });
    const onEnterDoc = () => gsap.to([ring, dot], { opacity: 1, duration: 0.3 });
    const onLeaveDoc = () => gsap.to([ring, dot], { opacity: 0, duration: 0.3 });

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseenter', onEnterDoc);
    document.addEventListener('mouseleave', onLeaveDoc);

    return () => {
      document.body.classList.remove('has-cursor');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseenter', onEnterDoc);
      document.removeEventListener('mouseleave', onLeaveDoc);
      gsap.killTweensOf([ring, dot]);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
    </>
  );
}
