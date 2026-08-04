import { useCallback, useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/motion';

/**
 * A pull-cord light switch. Drag the bead down — past roughly a third of its
 * travel the lights flip and the cord springs back, exactly like the real
 * thing. Tapping it (or hitting Enter/Space, since the bead is a button)
 * performs the same pull on its own. Brush the cord with the cursor and it
 * swings on its pivot until it settles.
 *
 * Geometry is in px and shared with the `.pullswitch` rules in index.css:
 * REST must match the cord's CSS height, and the knob's `top` is REST minus
 * half the knob so the bead sits on the end of the cord.
 */

const REST = 86; // cord length at rest
const MAX = 74; // furthest the cord will stretch, however hard you pull
const TRIGGER = 30; // pull past this and the switch flips
const SLOP = 4; // movement under this is a tap, not a drag
const SWING = 7; // degrees the cord kicks out when the cursor knocks it

export default function PullSwitch({ theme, onToggle }) {
  const hangerRef = useRef(null);
  const cordRef = useRef(null);
  const knobRef = useRef(null);
  const pull = useRef({ value: 0 });
  const drag = useRef(null);
  const wasDragged = useRef(false);

  /**
   * Knock the cord sideways and let it settle. `elastic.out` overshoots zero
   * on the way back and decays, which is what a hanging cord does — so the
   * whole pendulum is one tween.
   */
  const swing = useCallback((event, strength) => {
    const hanger = hangerRef.current;
    // Mid-pull the cord is taut in your hand; it has no business swinging.
    if (!hanger || drag.current || prefersReducedMotion()) return;

    const { left, width } = event.currentTarget.getBoundingClientRect();
    const centre = left + width / 2;
    // Push whichever way the cursor was travelling: entering on the left means
    // it is moving right, leaving on the right means the same.
    const side = event.type === 'pointerenter' ? -1 : 1;
    const direction = Math.sign(event.clientX - centre) * side || 1;

    gsap.killTweensOf(hanger);
    gsap.fromTo(
      hanger,
      { rotation: direction * SWING * strength },
      { rotation: 0, duration: 1.8, ease: 'elastic.out(1, 0.22)', transformOrigin: '50% 0' },
    );
  }, []);

  const render = useCallback(() => {
    const dy = pull.current.value;
    if (cordRef.current) cordRef.current.style.transform = `scaleY(${(REST + dy) / REST})`;
    if (knobRef.current) knobRef.current.style.transform = `translateY(${dy}px)`;
  }, []);

  const springBack = useCallback(() => {
    const target = pull.current;
    gsap.killTweensOf(target);
    if (prefersReducedMotion()) {
      target.value = 0;
      render();
      return;
    }
    gsap.to(target, { value: 0, duration: 1.1, ease: 'elastic.out(1, 0.32)', onUpdate: render });
  }, [render]);

  useEffect(() => {
    const target = pull.current;
    const hanger = hangerRef.current;
    return () => {
      gsap.killTweensOf(target);
      gsap.killTweensOf(hanger);
    };
  }, []);

  const handlePointerDown = (event) => {
    if (event.button > 0) return;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    gsap.killTweensOf(pull.current);
    // Settle any swing still running, so the pull starts from vertical.
    gsap.to(hangerRef.current, { rotation: 0, duration: 0.25, ease: 'power2.out' });
    drag.current = { id: event.pointerId, startY: event.clientY, fired: false };
    wasDragged.current = false;
  };

  const handlePointerMove = (event) => {
    const state = drag.current;
    if (!state || state.id !== event.pointerId) return;

    const raw = Math.max(0, event.clientY - state.startY);
    if (raw > SLOP) wasDragged.current = true;

    // Rubber band: the cord gives less the further it is pulled, so it never
    // runs away from the pointer and always feels like it has tension.
    pull.current.value = MAX * (1 - Math.exp(-raw / MAX));
    render();

    // Flip while the cord is still held — the feedback belongs at the click of
    // the mechanism, not at the release.
    if (!state.fired && pull.current.value >= TRIGGER) {
      state.fired = true;
      onToggle();
    }
  };

  const handlePointerEnd = (event) => {
    const state = drag.current;
    if (!state || state.id !== event.pointerId) return;
    drag.current = null;
    springBack();
  };

  const handleClick = () => {
    // A drag has already done the work; swallow the click that follows it.
    if (wasDragged.current) {
      wasDragged.current = false;
      return;
    }

    if (prefersReducedMotion()) {
      onToggle();
      return;
    }

    const target = pull.current;
    gsap.killTweensOf(target);
    gsap
      .timeline({ onUpdate: render })
      .to(target, { value: MAX * 0.6, duration: 0.15, ease: 'power2.out', onComplete: onToggle })
      .to(target, { value: 0, duration: 1.1, ease: 'elastic.out(1, 0.32)' });
  };

  const dark = theme === 'dark';

  return (
    <div className="pullswitch" data-lit={dark ? 'false' : 'true'}>
      <div className="pullswitch__hanger" ref={hangerRef}>
        <span
          className="pullswitch__cord"
          ref={cordRef}
          aria-hidden="true"
          onPointerEnter={(event) => swing(event, 1)}
          onPointerLeave={(event) => swing(event, 0.75)}
        />
        <button
          type="button"
          ref={knobRef}
          className="pullswitch__knob"
          role="switch"
          aria-checked={dark}
          aria-label="Dark mode"
          title="Pull the cord to switch the lights"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onClick={handleClick}
        >
          <span className="pullswitch__bead" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
