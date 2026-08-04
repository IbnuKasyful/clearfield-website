import { forwardRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * An in-page anchor (`#about`) that still works from a project detail page.
 *
 * On the home route it stays a plain anchor so the browser's native smooth
 * scroll handles it. Anywhere else it navigates home first and hands the target
 * id to Home via router state, which scrolls once the sections have mounted.
 *
 * The ref is forwarded so `useMagnetic` can reach the underlying anchor.
 */
const SectionLink = forwardRef(function SectionLink(
  { href, onClick, children, ...rest },
  ref,
) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onHome = pathname === '/';
  const id = href.replace('#', '');

  const handleClick = (event) => {
    if (onClick) onClick(event);
    if (onHome || event.defaultPrevented) return;
    event.preventDefault();
    navigate('/', { state: { scrollTo: id } });
  };

  return (
    <a ref={ref} href={onHome ? href : `/${href}`} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
});

export default SectionLink;
