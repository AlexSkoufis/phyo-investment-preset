import Link from "next/link";
import Logo from "./Logo";
import InertLink from "./InertLink";

export default function Footer({ site }) {
  const { footer, contact, social, brand } = site;
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link className="header__brand" href="/" aria-label={brand.homeLabel}>
              <Logo className="logo" />
              <span className="header__wordmark">
                <span className="header__name">{brand.shortName}</span>
                <span className="header__sub">{brand.wordmarkSub}</span>
              </span>
            </Link>
            <p className="footer__statement">{footer.statement}</p>
            <a className="footer__cta" href={footer.cta.href}>
              {footer.cta.label}
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </a>
          </div>

          <nav className="footer__nav" aria-label={footer.navLabel}>
            {footer.columns.map((col) => (
              <div key={col.title}>
                <h2 className="footer__heading">{col.title}</h2>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <InertLink href={l.href}>{l.label}</InertLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h2 className="footer__heading">{footer.contactTitle}</h2>
              <address className="footer__address">
                {contact.addressLines.map((l) => (
                  <span key={l}>{l}</span>
                ))}
                <a href={contact.phoneHref}>{contact.phone}</a>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </address>
              <ul className="footer__social">
                {social.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="footer__bottom">
          <p>
            © {year} {footer.copyright}
          </p>
          <ul className="footer__legal">
            {footer.legal.map((l) => (
              <li key={l.label}>
                <InertLink href={l.href}>{l.label}</InertLink>
              </li>
            ))}
          </ul>
          <p className="footer__credit">
            {footer.credit.prefix}{" "}
            <a href={footer.credit.href} target="_blank" rel="noopener noreferrer">
              {footer.credit.label}
            </a>
          </p>
          <a className="footer__top-link" href="#top">
            {footer.backToTop} ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
