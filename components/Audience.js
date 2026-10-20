"use client";

import { useRef, useState } from "react";
import SplitLines from "./SplitLines";

export default function Audience({ content }) {
  const { audience } = content;
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const tab = audience.tabs[active];

  const onKeyDown = (e) => {
    const last = audience.tabs.length - 1;
    let next = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = active === last ? 0 : active + 1;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = active === 0 ? last : active - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="section audience" id={audience.id} aria-labelledby="audience-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow" data-reveal="">
            {audience.eyebrow}
          </p>
          <SplitLines id="audience-title" className="h2" lines={[audience.title]} />
          <p className="section-head__intro" data-reveal="">
            {audience.intro}
          </p>
        </div>

        <div className="audience__body" data-reveal="">
          <div className="audience__tabs" role="tablist" aria-label={audience.tabsLabel} aria-orientation="vertical">
            {audience.tabs.map((t, i) => (
              <button
                key={t.key}
                ref={(el) => (tabRefs.current[i] = el)}
                id={`tab-${t.key}`}
                role="tab"
                type="button"
                className={`audience__tab${i === active ? " is-active" : ""}`}
                aria-selected={i === active}
                aria-controls={`panel-${t.key}`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={onKeyDown}
              >
                <span className="audience__tab-index">0{i + 1}</span>
                <span className="audience__tab-label">{t.label}</span>
                <svg className="audience__tab-arrow" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            ))}
          </div>

          <div
            className="audience__panel"
            role="tabpanel"
            id={`panel-${tab.key}`}
            aria-labelledby={`tab-${tab.key}`}
            key={tab.key}
          >
            <span className="audience__panel-mark" aria-hidden="true">
              0{active + 1}
            </span>
            <h3 className="audience__panel-title">{tab.title}</h3>
            <p className="audience__panel-text">{tab.text}</p>
            <ul className="checklist">
              {tab.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <a className="btn btn--dark" href={tab.cta.href}>
              <span>{tab.cta.label}</span>
              <svg className="btn__arrow" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
