import { useEffect } from 'react';
import { site } from '../data/site';

/**
 * Per-route head data for a client-rendered build.
 *
 * index.html ships one static <head>, so without this every route served the
 * homepage's description and Open Graph tags — every case study shared on
 * LinkedIn or WhatsApp previewed as the homepage. This rewrites them on
 * navigation and puts them back when the route unmounts.
 *
 * Caveat worth keeping in mind: this runs in JavaScript. Google renders JS and
 * will see it; most social-preview crawlers do not, and they read the HTML as
 * served. Closing that last gap needs prerendering or SSR — a build decision,
 * not something this hook can reach.
 */

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    const [, name, key] = selector.match(/\[(\w+)="([^"]+)"\]/) || [];
    if (name && key) el.setAttribute(name, key);
    document.head.appendChild(el);
  }
  const previous = el.getAttribute(attr);
  el.setAttribute(attr, value);
  return () => {
    if (previous === null) el.remove();
    else el.setAttribute(attr, previous);
  };
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  let created = false;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
    created = true;
  }
  const previous = el.getAttribute('href');
  el.setAttribute('href', href);
  return () => {
    if (created) el.remove();
    else if (previous !== null) el.setAttribute('href', previous);
  };
}

export function useHead({ title, description, path, image }) {
  useEffect(() => {
    const url = `${site.origin}${path}`;
    const previousTitle = document.title;
    document.title = title;

    const undo = [
      setMeta('meta[name="description"]', 'content', description),
      setMeta('meta[property="og:title"]', 'content', title),
      setMeta('meta[property="og:description"]', 'content', description),
      setMeta('meta[property="og:url"]', 'content', url),
      setLink('canonical', url),
    ];

    if (image) undo.push(setMeta('meta[property="og:image"]', 'content', `${site.origin}${image}`));

    return () => {
      document.title = previousTitle;
      undo.forEach((fn) => fn());
    };
  }, [title, description, path, image]);
}
