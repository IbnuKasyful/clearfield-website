/**
 * Splits a run of copy into per-word spans, keeping the whitespace as plain
 * text nodes so the paragraph still wraps — and still reads — normally.
 * The spans are what the scrubbed reveals animate, one word at a time.
 */
export default function SplitWords({ text, className }) {
  return text.split(/(\s+)/).map((chunk, index) =>
    /\S/.test(chunk) ? (
      <span className={className} key={index}>
        {chunk}
      </span>
    ) : (
      chunk
    ),
  );
}
