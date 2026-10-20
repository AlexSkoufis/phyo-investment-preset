import SplitLines from "./SplitLines";

export default function Process({ content }) {
  const { process } = content;
  return (
    <section className="section process" id={process.id} aria-labelledby="process-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow" data-reveal="">
            {process.eyebrow}
          </p>
          <SplitLines id="process-title" className="h2" lines={[process.title]} />
        </div>

        <div className="process__track">
          <div className="process__rail" aria-hidden="true">
            <span className="process__rail-fill" data-progress-line="" />
          </div>
          <ol className="process__steps" data-stagger="">
            {process.steps.map((step) => (
              <li className="step" key={step.number}>
                <span className="step__dot" aria-hidden="true" />
                <span className="step__number">{step.number}</span>
                <h3 className="step__title">{step.title}</h3>
                <p className="step__text">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
