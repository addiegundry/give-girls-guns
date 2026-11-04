# Complete landing-page artwork audit

This update fills omissions in the initial asset pack. Decorative vectors are reconstructed matches to the generated mockup, not pixel-exact extractions. Logos, seals, patterns and Instagram artwork come from the supplied original brand package.

| Page location | Asset | Placement |
|---|---|---|
| Header and footer | logo-main.svg / logo-main.png | Original logo; square transparent source |
| Hero photo and gradient | hero-background.png | Entire hero photographic backdrop, left area reserved for HTML |
| Hero upper-left red scallop | hero-corner-top-left.svg / .png | Absolute top-left; clip at hero boundary |
| Hero lower-right purple scallop | hero-corner-bottom-right.svg / .png | Absolute bottom-right; clip at hero boundary |
| Hero floating circular seal | seal-purple-with-shadow.svg / .png | Separate overlay; use instead of adding a second CSS shadow |
| Plain circular seal | submark-purple.png | Alternative if implementing shadow with CSS |
| Repeated-name brand strip | brand-strip-background.svg / .png | Background only; repeat brand name as live text |
| Brand strip flower separators | divider-flower-pink.svg / .png | Place between repeated brand names |
| Product photos | product-coral/plum/lavender.png | One per card |
| Product card background | background-product-gradient.png | Use only where not already covered by photo |
| Main page and header | background-page.png | May use matching CSS instead |
| Range-day photo | range-day-editorial.png | Left editorial column |
| Range-day text background | background-editorial-gradient.png | Right editorial column |
| Editorial scallop, if using product-page variation | editorial-corner-top-right.svg / .png | Optional top corner; landing original uses pattern instead |
| Editorial monogram patterned edge | editorial-pattern-edge.svg / .png | Precomposed edge with transparent curved left boundary |
| Raw repeat pattern | pattern-purple.png | Alternative: CSS masked repeat. Do not use both pattern alternatives |
| Newsletter | background-newsletter-gradient.png | Background; fields/text are HTML |
| Footer pink scallop | footer-corner-bottom-right.svg / .png | Bottom-right flourish |
| Footer separator and seal-adjacent rule | decorative-vertical-rule.svg / .png | Prefer CSS border; image alternative supplied |
| Instagram | icon-instagram.png | Original brand icon |
| Search, bag, arrow | icon-search/bag/arrow-right.svg | Reconstructed consistent UI vectors |

## Keep live in code
All navigation, headings, body copy, product names, buttons, prices, form controls and repeated brand-strip words. Cards, borders, rounded corners, shadows and responsive layout are CSS. Flower is supplied as art. No screenshot crops are needed for UI.

## Important implementation details
Use SVG for ornaments and PNG only as fallback; preserve aspect ratio. Decorations are aria-hidden with pointer-events:none. Crop ornaments at container bounds, not by stretching. Pattern stays at the far right and never overlaps text. Hero seal is a separate positioned element. Main logo already has its original square canvas; use object-fit:contain.

Reference landing uses old packaging; use updated Specialty Cartridge photography from this pack. Three carton colors are visual concepts, not verified SKU variants. All gradient-only backgrounds and reconstructed ornaments approximate the generated design. Font files were absent from the supplied source ZIP: obtain licensed Picky Retro and Goodly webfonts.
