import SplitLines from "./SplitLines";

export default function Principles({ content }) {
  const { principles } = content;
  return (
    <section className="section principles" id={principles.id} aria-labelledby="principles-title">
      <div className="container principles__grid">
        <div className="principles__head">
          <p className="eyebrow eyebrow--light" data-reveal="">
            {principles.eyebrow}
          </p>
          <SplitLines id="principles-title" className="h2" lines={[principles.title]} />
        </div>

        <ol className="principles__stack">
          {principles.items.map((item, i) => (
            <li className="stack-card" key={item.number} data-stack-card="" style={{ "--i": i }}>
              <div className="stack-card__inner">
                <span className="stack-card__number">{item.number}</span>
                <div>
                  <h3 className="stack-card__title">{item.title}</h3>
                  <p className="stack-card__text">{item.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
