import { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { hasFinePointer, prefersReducedMotion } from '../lib/motion';

const { Bodies, Composite, Engine, Mouse, MouseConstraint } = Matter;

/**
 * A row of pills that drops in like a pile of blocks and can be shoved around.
 *
 * The pills stay real list items — Matter only supplies coordinates, which are
 * written to `transform`. So the text stays selectable, keeps its markup, and
 * reads normally to a screen reader whether or not the simulation ever runs.
 */
export default function PhysicsPills({ items, className = '', itemClassName = 'pill' }) {
  const boxRef = useRef(null);

  useEffect(() => {
    const box = boxRef.current;
    // Reduced motion keeps the plain wrapped row: nothing falls, nothing moves.
    if (!box || prefersReducedMotion()) return undefined;

    let world = null;
    let builtWidth = 0;

    const build = () => {
      const pills = Array.from(box.children);
      if (!pills.length) return null;

      // Measure the normal flex-wrapped layout first — that is where the blocks
      // start from horizontally, and how tall the box needs to be.
      const boxRect = box.getBoundingClientRect();
      const width = box.clientWidth;
      const parts = pills.map((el) => {
        const r = el.getBoundingClientRect();
        return { el, w: r.width, h: r.height, x: r.left - boxRect.left + r.width / 2 };
      });
      const rowH = parts[0].h + 8;
      // Room for the pile to land untidily rather than in perfect rows.
      const height = Math.round(box.offsetHeight + rowH * 1.6);

      box.style.height = `${height}px`;
      box.classList.add('pills-drop--live');

      const engine = Engine.create();
      engine.gravity.y = 1.1;

      // Staggered starting heights above the box, so they arrive one after
      // another instead of landing as a single slab.
      const blocks = parts.map((p, i) =>
        Bodies.rectangle(p.x, -p.h / 2 - i * (p.h + 26), p.w, p.h, {
          chamfer: { radius: p.h / 2 - 0.5 },
          restitution: 0.3,
          friction: 0.45,
          frictionAir: 0.015,
          angle: (Math.random() - 0.5) * 0.45,
        }),
      );

      const wall = { isStatic: true };
      Composite.add(engine.world, [
        Bodies.rectangle(width / 2, height + 30, width + 200, 60, wall),
        Bodies.rectangle(-30, height / 2, 60, height * 6, wall),
        Bodies.rectangle(width + 30, height / 2, 60, height * 6, wall),
        ...blocks,
      ]);

      let mouse = null;
      // Touch is left alone on purpose: Matter's touch handlers call
      // preventDefault, which would stop the page scrolling over the card.
      if (hasFinePointer()) {
        mouse = Mouse.create(box);
        mouse.element.removeEventListener('wheel', mouse.mousewheel);
        mouse.element.removeEventListener('mousewheel', mouse.mousewheel);
        mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);
        mouse.element.removeEventListener('touchmove', mouse.mousemove);
        mouse.element.removeEventListener('touchstart', mouse.mousedown);
        mouse.element.removeEventListener('touchend', mouse.mouseup);
        Composite.add(
          engine.world,
          MouseConstraint.create(engine, {
            mouse,
            constraint: { stiffness: 0.18, render: { visible: false } },
          }),
        );
      }

      let frame = 0;
      let last = 0;
      const step = (now) => {
        frame = requestAnimationFrame(step);
        // Clamped so a backgrounded tab does not resume with one huge step that
        // fires every block through a wall.
        const dt = last ? Math.min(32, now - last) : 16.7;
        last = now;
        Engine.update(engine, dt);
        parts.forEach((p, i) => {
          const b = blocks[i];
          p.el.style.transform =
            `translate3d(${(b.position.x - p.w / 2).toFixed(1)}px, ` +
            `${(b.position.y - p.h / 2).toFixed(1)}px, 0) ` +
            `rotate(${b.angle.toFixed(4)}rad)`;
        });
      };

      return {
        width,
        start() {
          if (!frame) {
            last = 0;
            frame = requestAnimationFrame(step);
          }
        },
        stop() {
          cancelAnimationFrame(frame);
          frame = 0;
        },
        destroy() {
          this.stop();
          if (mouse) {
            mouse.element.removeEventListener('mousemove', mouse.mousemove);
            mouse.element.removeEventListener('mousedown', mouse.mousedown);
            mouse.element.removeEventListener('mouseup', mouse.mouseup);
          }
          Composite.clear(engine.world, false);
          Engine.clear(engine);
          box.classList.remove('pills-drop--live');
          box.style.height = '';
          parts.forEach((p) => {
            p.el.style.transform = '';
          });
        },
      };
    };

    // Nothing falls until the card is actually on screen, and the loop idles
    // again once it leaves.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!world) {
          if (!entry.isIntersecting) return;
          world = build();
          builtWidth = world ? world.width : 0;
        }
        if (entry.isIntersecting) world.start();
        else world.stop();
      },
      { threshold: 0.25 },
    );
    observer.observe(box);

    // A width change invalidates the walls and the starting positions, so the
    // pile is rebuilt. Height changes are ours — ignore them or this loops.
    const onResize = () => {
      if (!world || box.clientWidth === builtWidth) return;
      world.destroy();
      world = build();
      builtWidth = world ? world.width : 0;
      if (world) world.start();
    };
    window.addEventListener('resize', onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      if (world) world.destroy();
    };
  }, [items, itemClassName]);

  return (
    <ul className={`pills-drop ${className}`.trim()} ref={boxRef}>
      {items.map((item) => (
        <li className={itemClassName} key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
}
