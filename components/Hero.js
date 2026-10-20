import SplitLines from "./SplitLines";

const RINGS = [70, 120, 170, 220, 270];

function Rings() {
  return (
    <svg className="rings" viewBox="0 0 600 600" aria-hidden="true">
      <g className="rings__spin">
        {RINGS.map((r, i) => (
          <circle
            key={r}
            cx="300"
            cy="300"
            r={r}
            pathLength="1"
            data-draw=""
            className={`rings__ring rings__ring--${i}`}
          />
        ))}
        <circle cx="300" cy="300" r="245" className="rings__dash" />
        <circle cx="300" cy="300" r="145" className="rings__dash" />
        {/* Nodes sitting on the rings */}
        <circle cx="300" cy="30" r="5" className="rings__node" />
        <circle cx="470" cy="300" r="4" className="rings__node" />
        <circle cx="215" cy="152" r="3.5" className="rings__node rings__node--soft" />
        <circle cx="300" cy="420" r="4" className="rings__node rings__node--soft" />
      </g>
      {/* Growth curve sweeping out of the core */}
      <path
        className="rings__growth"
        d="M300 300 C 340 300, 360 250, 390 210 S 470 110, 560 70"
        pathLength="1"
        data-draw=""
      />
      <circle cx="300" cy="300" r="7" className="rings__core" />
    </svg>
  );
}

export default function Hero({ content }) {
  const { hero } = content;
  return (
    <section className="hero" data-hero="" aria-labelledby="hero-title">
      <div className="hero__grain" aria-hidden="true" />
      <div className="hero__visual" data-hero-visual="">
        <Rings />
      </div>

      <div className="container hero__inner">
        <p className="eyebrow eyebrow--light" data-hero-fade="">
          {hero.eyebrow}
        </p>
        <SplitLines
          as="h1"
          id="hero-title"
          className="hero__title"
          lines={hero.titleLines}
          accentLine={hero.titleAccentLine}
        />
        <div className="hero__row">
          <p className="hero__lead" data-hero-fade="">
            {hero.lead}
          </p>
          <div className="hero__ctas" data-hero-fade="">
            <a className="btn btn--accent" href={hero.primaryCta.href} data-magnetic="">
              <span>{hero.primaryCta.label}</span>
              <svg className="btn__arrow" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </a>
            <a className="btn btn--ghost-light" href={hero.secondaryCta.href}>
              <span>{hero.secondaryCta.label}</span>
            </a>
          </div>
        </div>

        <dl className="hero__stats">
          {hero.stats.map((s) => (
            <div className="stat" key={s.label} data-hero-fade="">
              <dt className="stat__label">{s.label}</dt>
              <dd className="stat__value">
                {s.prefix}
                <span data-count={s.value >= 10 ? s.value : undefined}>{s.value}</span>
                {s.suffix}
              </dd>
            </div>
          ))}
          <div className="definition" data-hero-fade="">
            <dt className="definition__term">
              <em>{hero.definition.term}</em> <span>{hero.definition.phonetic}</span>
            </dt>
            <dd className="definition__text">{hero.definition.text}</dd>
          </div>
        </dl>
      </div>

      <a className="hero__scroll" href="#who" aria-label={hero.scrollHint}>
        <span>{hero.scrollHint}</span>
        <span className="hero__scroll-line" aria-hidden="true" />
      </a>
    </section>
  );
}
