import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from '../lib/motion';

/**
 * Route changes are not page loads, so nothing resets the scroll position and
 * nothing tells ScrollTrigger the document height changed. This does both.
 *
 * A hash or an explicit `scrollTo` means the destination page is targeting a
 * section itself — leave those alone.
 */
export default function RouteScroll() {
  const { pathname, hash, state } = useLocation();

  useEffect(() => {
    const targetsSection = Boolean(hash) || Boolean(state?.scrollTo);
    // 'instant' matters: html has scroll-behavior:smooth for in-page anchors,
    // and a route change should not animate through the whole document.
    const toTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    if (!targetsSection) toTop();

    // Measurements taken against the previous page are meaningless now. The
    // refresh restores the scroll position it had recorded, so re-assert the
    // top afterwards rather than before.
    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (!targetsSection) toTop();
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, state]);

  return null;
}
