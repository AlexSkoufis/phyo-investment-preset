"use client";

// A link whose "#" placeholder href does nothing (no jump to top) until the
// destination page exists. Real hrefs behave normally.
export default function InertLink({ href, children, ...rest }) {
  const onClick = (e) => {
    if (href === "#") e.preventDefault();
  };
  return (
    <a href={href} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}
