"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

// Placeholder links ("#") are intentionally inert until their pages exist.
const blockPlaceholder = (e) => {
  if (e.currentTarget.getAttribute("href") === "#") e.preventDefault();
};

export default function Header({ site }) {
  const { nav, brand } = site;
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const lastY = useRef(0);
  const toggleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 320 && y > lastY.current);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", menuOpen);
    if (menuOpen) window.__lenis?.stop();
    else window.__lenis?.start();
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    if (openDropdown === null) return;
    const close = (e) => {
      if (e.type === "keydown" && e.key !== "Escape") return;
      if (e.type === "pointerdown" && e.target.closest(".nav__item--has-children")) return;
      setOpenDropdown(null);
    };
    window.addEventListener("keydown", close);
    window.addEventListener("pointerdown", close);
    return () => {
      window.removeEventListener("keydown", close);
      window.removeEventListener("pointerdown", close);
    };
  }, [openDropdown]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`header${scrolled ? " is-scrolled" : ""}${hidden && !menuOpen ? " is-hidden" : ""}${menuOpen ? " is-menu-open" : ""}`}
    >
      <a className="skip-link" href="#main">
        {nav.skipLink}
      </a>
      <div className="header__inner container">
        <Link className="header__brand" href="/" aria-label={brand.homeLabel}>
          <Logo className="logo" />
          <span className="header__wordmark">
            <span className="header__name">{brand.shortName}</span>
            <span className="header__sub">{brand.wordmarkSub}</span>
          </span>
        </Link>

        <nav className="nav" aria-label={nav.label}>
          <ul className="nav__list">
            {nav.items.map((item, i) =>
              item.children ? (
                <li
                  key={item.label}
                  className={`nav__item nav__item--has-children${openDropdown === i ? " is-open" : ""}`}
                  onMouseEnter={() => setOpenDropdown(i)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    className="nav__link"
                    aria-expanded={openDropdown === i}
                    aria-controls={`dropdown-${i}`}
                    onClick={() => setOpenDropdown(openDropdown === i ? null : i)}
                  >
                    {item.label}
                    <svg className="nav__caret" viewBox="0 0 10 6" aria-hidden="true">
                      <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </button>
                  <ul className="dropdown" id={`dropdown-${i}`}>
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <a className="dropdown__link" href={child.href} onClick={blockPlaceholder}>
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.label} className="nav__item">
                  <a
                    className="nav__link"
                    href={item.href}
                    aria-current={item.href === "/" ? "page" : undefined}
                    onClick={blockPlaceholder}
                  >
                    {item.label}
                  </a>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="header__actions">
          <a className="header__investors" href={nav.investors.href} onClick={blockPlaceholder}>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <rect x="3" y="7" width="10" height="7" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
              <path d="M5.5 7V5a2.5 2.5 0 015 0v2" fill="none" stroke="currentColor" strokeWidth="1.3" />
            </svg>
            {nav.investors.label}
          </a>
          <a className="btn btn--accent btn--sm header__cta" href={nav.cta.href} data-magnetic="">
            <span>{nav.cta.label}</span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? nav.menuClose : nav.menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className="mobile-menu" id="mobile-menu" hidden={!menuOpen}>
        <nav className="mobile-menu__inner container" aria-label={nav.label}>
          <ul className="mobile-menu__list">
            {nav.items.map((item, i) => (
              <li key={item.label} style={{ "--i": i }}>
                <a
                  className="mobile-menu__link"
                  href={item.href}
                  onClick={(e) => {
                    blockPlaceholder(e);
                    if (item.href !== "#") closeMenu();
                  }}
                >
                  {item.label}
                </a>
                {item.children && (
                  <ul className="mobile-menu__sub">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <a href={child.href} onClick={blockPlaceholder}>
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="mobile-menu__footer">
            <a className="btn btn--accent" href={nav.cta.href} onClick={closeMenu}>
              <span>{nav.cta.label}</span>
            </a>
            <a className="mobile-menu__investors" href={nav.investors.href} onClick={blockPlaceholder}>
              {nav.investors.label}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
