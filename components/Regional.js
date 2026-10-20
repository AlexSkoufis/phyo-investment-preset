import InertLink from "./InertLink";

export default function Regional({ content }) {
  const { regional } = content;
  return (
    <section className="section regional" id={regional.id} aria-labelledby="regional-title">
      <div className="regional__glyph" aria-hidden="true" data-speed="0.15">
        {regional.glyph}
      </div>
      <div className="container regional__inner">
        <p className="eyebrow" data-reveal="">
          {regional.eyebrow}
        </p>
        <h2 className="regional__title" id="regional-title" data-scrub-words="">
          {regional.titleLines.map((line, i) => (
            <span className="regional__line" key={i}>
              {line.split(" ").map((w, j) => (
                <span className="word" key={j}>
                  {w}{" "}
                </span>
              ))}
            </span>
          ))}
        </h2>
        <div className="regional__body">
          <p className="regional__text" data-reveal="">
            {regional.text}
          </p>
          <ul className="regional__pillars" data-stagger="">
            {regional.pillars.map((p) => (
              <li key={p.title}>
                <strong>{p.title}</strong> {p.text}
              </li>
            ))}
          </ul>
          <div data-reveal="">
            <InertLink className="btn btn--dark" href={regional.cta.href}>
              <span>{regional.cta.label}</span>
              <svg className="btn__arrow" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </InertLink>
          </div>
        </div>
      </div>
    </section>
  );
}
