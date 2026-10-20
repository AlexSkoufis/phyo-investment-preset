// Phyo mark: moss square, "PH / YO" set in the display serif.
export default function Logo({ className = "", title }) {
  return (
    <svg
      className={className}
      viewBox="0 0 44 44"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <rect width="44" height="44" fill="var(--accent)" />
      <text x="22" y="20" textAnchor="middle" className="logo__letters">
        PH
      </text>
      <text x="22" y="37" textAnchor="middle" className="logo__letters">
        YO
      </text>
    </svg>
  );
}
