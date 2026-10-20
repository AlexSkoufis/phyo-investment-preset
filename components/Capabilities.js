import SplitLines from "./SplitLines";

export default function Capabilities({ content }) {
  const { capabilities } = content;
  return (
    <section className="section section--dark capabilities" id={capabilities.id} aria-labelledby="capabilities-title">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <p className="eyebrow eyebrow--light" data-reveal="">
              {capabilities.eyebrow}
            </p>
            <SplitLines id="capabilities-title" className="h2" lines={[capabilities.title]} />
          </div>
          <p className="section-head__intro" data-reveal="">
            {capabilities.intro}
          </p>
        </div>

        <ol className="cap-grid" data-stagger="">
          {capabilities.items.map((item) => (
            <li className="cap-card" key={item.number}>
              <span className="cap-card__number">{item.number}</span>
              <h3 className="cap-card__title">{item.title}</h3>
              <p className="cap-card__text">{item.text}</p>
              <span className="cap-card__glow" aria-hidden="true" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
