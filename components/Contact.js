"use client";

import SplitLines from "./SplitLines";

// No form backend yet: submitting composes an email to the firm's inbox in the
// visitor's mail app. Swap handleSubmit for an API route when one exists.
export default function Contact({ content, site }) {
  const { contact } = content;
  const { form } = contact;
  const info = site.contact;

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [
      `${form.nameLabel}: ${data.get("name")}`,
      `${form.emailLabel}: ${data.get("email")}`,
      `${form.companyLabel}: ${data.get("company") || ""}`,
      `${form.roleLabel}: ${data.get("role")}`,
      "",
      data.get("message") || "",
    ].join("\n");
    const subject = `${form.subject}: ${data.get("company") || data.get("name")}`;
    window.location.href = `mailto:${info.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="section contact" id={contact.id} aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div className="contact__intro">
          <p className="eyebrow eyebrow--light" data-reveal="">
            {contact.eyebrow}
          </p>
          <SplitLines id="contact-title" className="h2" lines={[contact.title]} />
          <p className="contact__text" data-reveal="">
            {contact.text}
          </p>

          <div className="contact__direct" data-reveal="">
            <h3 className="contact__direct-title">{contact.directTitle}</h3>
            <dl>
              <div>
                <dt>{contact.emailLabel}</dt>
                <dd>
                  <a href={`mailto:${info.email}`}>{info.email}</a>
                </dd>
              </div>
              <div>
                <dt>{contact.phoneLabel}</dt>
                <dd>
                  <a href={info.phoneHref}>{info.phone}</a>
                </dd>
              </div>
              <div>
                <dt>{contact.addressLabel}</dt>
                <dd>
                  {info.addressLines.map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <form className="form" onSubmit={handleSubmit} data-reveal="">
          <div className="form__row">
            <div className="field">
              <input id="f-name" name="name" type="text" autoComplete="name" required placeholder=" " />
              <label htmlFor="f-name">{form.nameLabel}</label>
            </div>
            <div className="field">
              <input id="f-email" name="email" type="email" autoComplete="email" required placeholder=" " />
              <label htmlFor="f-email">{form.emailLabel}</label>
            </div>
          </div>
          <div className="form__row">
            <div className="field">
              <input id="f-company" name="company" type="text" autoComplete="organization" placeholder=" " />
              <label htmlFor="f-company">{form.companyLabel}</label>
            </div>
            <div className="field field--select">
              <select id="f-role" name="role" defaultValue={form.roleOptions[0]}>
                {form.roleOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
              <label htmlFor="f-role">{form.roleLabel}</label>
            </div>
          </div>
          <div className="field">
            <textarea id="f-message" name="message" rows={5} placeholder={form.messagePlaceholder} />
            <label htmlFor="f-message" className="is-static">
              {form.messageLabel}
            </label>
          </div>
          <div className="form__foot">
            <p className="form__privacy">{form.privacy}</p>
            <button className="btn btn--accent" type="submit" data-magnetic="">
              <span>{form.submit}</span>
              <svg className="btn__arrow" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
