import { useReveal } from '../lib/motion';

/** Wrapper that fades and rises its children into view once. */
export default function Reveal({
  as: Tag = 'div',
  y,
  duration,
  delay,
  start,
  children,
  ...rest
}) {
  const ref = useReveal({ y, duration, delay, start });
  return (
    <Tag ref={ref} {...rest}>
      {children}
    </Tag>
  );
}
