import SplitLines from "./SplitLines";
import InertLink from "./InertLink";

export default function Portfolio({ content }) {
  const { portfolio } = content;
  const names = portfolio.current.map((c) => c.name);

  return (
    <section className="section section--dark portfolio" id={portfolio.id} aria-labelledby="portfolio-title">
      <div className="marquee" aria-label={portfolio.marqueeLabel} role="region">
        <div className="marquee__track">
          {[0, 1].map((copy) => (
            <ul className="marquee__group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {names.map((n) => (
                <li key={n}>
                  {n}
                  <span className="marquee__sep" aria-hidden="true" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="portfolio__head">
          <div>
            <p className="eyebrow eyebrow--light" data-reveal="">
              {portfolio.eyebrow}
            </p>
            <SplitLines id="portfolio-title" className="h2" lines={[portfolio.title]} />
          </div>
          <div className="portfolio__count" data-reveal="">
            <span className="portfolio__count-num" data-count={portfolio.current.length}>
              {portfolio.current.length}
            </span>
            <span className="portfolio__count-label">
              {portfolio.countLabel}
              <small>{portfolio.intro}</small>
            </span>
          </div>
        </div>

        <ol className="roster" aria-label={portfolio.listLabel} data-stagger="">
          {portfolio.current.map((c, i) => (
            <li className="roster__item" key={c.name}>
              <span className="roster__index" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="roster__name">{c.name}</span>
              <span className="roster__sector">{c.sector}</span>
            </li>
          ))}
        </ol>

        <div className="portfolio__foot" data-reveal="">
          <div className="exited">
            <h3 className="exited__title">{portfolio.exitedTitle}</h3>
            <ul className="exited__list">
              {portfolio.exited.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
          <InertLink className="btn btn--ghost-light" href={portfolio.cta.href}>
            <span>{portfolio.cta.label}</span>
            <svg className="btn__arrow" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </InertLink>
        </div>
      </div>
    </section>
  );
}
