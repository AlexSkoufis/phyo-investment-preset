// Renders each line wrapped in a mask so it can slide in. Text stays fully
// visible without JavaScript; Motion.js animates [data-split] on the client.
export default function SplitLines({ lines, as: Tag = "h2", className = "", accentLine = -1, id }) {
  return (
    <Tag className={className} id={id} data-split="">
      {lines.map((line, i) => (
        <span className="line" key={i}>
          <span className={`line__inner${i === accentLine ? " is-accent" : ""}`}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
