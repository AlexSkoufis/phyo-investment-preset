"use client";

import { useState } from "react";
import SplitLines from "./SplitLines";

export default function FitCheck({ content }) {
  const { fit } = content;
  const [answers, setAnswers] = useState({});

  const answered = Object.keys(answers).length;
  const yesCount = Object.values(answers).filter(Boolean).length;
  const total = fit.questions.length;

  let resultKey = "empty";
  if (answered === total) resultKey = yesCount === total ? "strong" : yesCount >= total - 2 ? "partial" : "low";
  else if (answered > 0 && answered - yesCount >= 3) resultKey = "low";
  const result = fit.results[resultKey];

  const set = (key, value) => setAnswers((a) => ({ ...a, [key]: value }));

  return (
    <section className="section fit" id={fit.id} aria-labelledby="fit-title">
      <div className="container fit__grid">
        <div className="fit__intro">
          <p className="eyebrow" data-reveal="">
            {fit.eyebrow}
          </p>
          <SplitLines id="fit-title" className="h2" lines={[fit.title]} />
          <p className="section-head__intro" data-reveal="">
            {fit.intro}
          </p>

          <div className={`fit__result fit__result--${resultKey}`} aria-live="polite" data-reveal="">
            <div className="fit__meter" aria-hidden="true">
              {fit.questions.map((q) => (
                <span
                  key={q.key}
                  className={`fit__meter-seg${q.key in answers ? (answers[q.key] ? " is-yes" : " is-no") : ""}`}
                />
              ))}
            </div>
            <p className="fit__progress">
              {answered}/{total} {fit.progressLabel}
            </p>
            <h3 className="fit__result-title">{result.title}</h3>
            <p className="fit__result-text">{result.text}</p>
            {result.cta && (
              <a className="btn btn--accent" href={result.cta.href}>
                <span>{result.cta.label}</span>
                <svg className="btn__arrow" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </a>
            )}
          </div>
        </div>

        <ol className="fit__questions" data-stagger="">
          {fit.questions.map((q, i) => {
            const value = answers[q.key];
            return (
              <li className={`fit-q${q.key in answers ? " is-answered" : ""}`} key={q.key}>
                <fieldset>
                  <legend className="fit-q__legend">
                    <span className="fit-q__label">
                      0{i + 1} · {q.label}
                    </span>
                    <span className="fit-q__question">{q.question}</span>
                  </legend>
                  <div className="fit-q__options">
                    {[true, false].map((opt) => (
                      <label key={String(opt)} className={`pill${value === opt ? " is-checked" : ""}`}>
                        <input
                          type="radio"
                          name={`fit-${q.key}`}
                          checked={value === opt}
                          onChange={() => set(q.key, opt)}
                        />
                        <span>{opt ? fit.yes : fit.no}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </li>
            );
          })}
        </ol>
      </div>
      <p className="container fit__note" data-reveal="">
        {fit.note}
      </p>
    </section>
  );
}
