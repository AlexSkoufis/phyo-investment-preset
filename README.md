# Phyo Partners — Private Equity Preset

A homepage for a **fictional** lower-middle-market private investment firm in Columbus, Ohio. Deep green-black ink, warm paper and one moss accent; Instrument Serif + Hanken Grotesk. The name comes from the Greek *phýō*, "to make grow", and the hero carries it as a dictionary entry.

Next.js 16 (static export) · GSAP 3 + ScrollTrigger · Lenis · plain CSS. No UI libraries.

```bash
npm install
npm run dev
npm run build     # static site in ./out
```

## Sections

| Section | What it does |
|---|---|
| Hero | Masked two-line headline (second line in the accent italic), orbit graphic, count-up stats and a dictionary definition of the firm's name. |
| Who we work with | Four tabs (founders, management teams, intermediaries, investors), each with its own pitch, points and call to action. |
| What we bring | Four numbered capabilities. |
| Fit check | Four yes/no questions produce a strong / partial / low fit result. Nothing is stored or sent. |
| Principles | Five beliefs, numbered. |
| Process | Four steps from first call to ownership. |
| Portfolio | Marquee of company names, a count-up total, a roster with an accent wash on hover, and an exited list. |
| Regional fund | Statement that lights up word by word as you scroll, with a large state glyph behind it. |
| Contact | Form that opens the visitor's email app, plus direct contact details. |

## Re-skin

- **Copy & data**: `content/site.json` (brand, navigation, contact, footer) and `content/home.json` (every section). The regional section's big letters are `regional.glyph`.
- **Logo**: `components/Logo.js` (two-line monogram on an accent square) and `app/icon.svg` for the favicon.
- **Colour**: tokens at the top of `app/globals.css` (`--accent`, `--accent-light`, `--accent-deep`, `--ink`, `--charcoal`, `--mist`).
- **Type**: `app/layout.js`.

## Accessibility & motion

`prefers-reduced-motion` turns off the entrance, scrub and marquee animations and shows final values. Tabs, the fit check and the mobile menu work from the keyboard, with visible focus.

## Demo content

Phyo Partners, its people, figures, portfolio companies, fund and address are fictional. The email uses the reserved `.example` domain and the phone number is a placeholder. A real firm must replace them, and have its regulatory disclosures reviewed, before launch.
