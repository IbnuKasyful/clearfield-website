import NodeMark from './NodeMark';

/**
 * The wordmark. "Clearfield" is left as real text — one word, selectable and
 * spoken as written — and the tittle over the i is simply covered by the
 * brand's coral dot, which is drawn a little larger than the one it replaces.
 * The stylesheet turns ligatures off so an fi never swallows that tittle and
 * leaves the dot floating on its own.
 *
 * `withMark` adds the node mark, riding above the ascenders the way it does in
 * the master lockup.
 */
export default function Wordmark({
  className,
  withMark = false,
  animated = false,
  markWidth = '0.78em',
  markHeight = '0.38em',
}) {
  return (
    <span className={className ? `wordmark ${className}` : 'wordmark'}>
      <span className="wordmark__text" data-wordmark-text={animated ? '' : undefined}>
        Clearfi<span className="wordmark__dot" aria-hidden="true" />eld
      </span>
      {withMark && (
        <NodeMark className="wordmark__mark" width={markWidth} height={markHeight} animated={animated} />
      )}
    </span>
  );
}
