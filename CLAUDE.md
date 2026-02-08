# Iron Lot Homes LLC - Claude Instructions

## Communication
When user asks about strategic advice, scaling questions, or "why did X fail":
- **STOP** and clarify the actual question before diving into code exploration
- Don't assume they want implementation - they may want high-level guidance
- Ask: "Do you want strategic advice or should I implement something?"

## Architecture Decisions
For multi-page SEO sites, **ALWAYS** use proper directory structure:
- Individual HTML files: `/locations/austin/index.html`
- **NEVER** use single-page apps with hash fragments (#) for SEO-focused projects
- Each target keyword = separate HTML file with unique URL

## Business Context
- **Type:** Mobile Home Investor (buy, sell, consign, subject-to deals)
- **Primary Market:** Austin, TX + Central Texas + DFW corridor
- **Key Differentiator:** 85% Spanish-speaking clients - **BILINGUAL EN/ES REQUIRED**
- **Tagline:** "We Buy Mobile Homes Fast for Cash"

## Service Areas
Central Texas: Austin, San Antonio, San Marcos, Lockhart, Kyle, Buda, Bastrop
North Texas (DFW): McKinney, Princeton, Dallas, Fort Worth, Arlington, Irving, Plano, Frisco, Denton

## Bilingual Requirements
- All pages must have English AND Spanish versions
- URL structure: `/en/` and `/es/` prefixes OR language toggle
- Spanish content must be native-quality, not Google Translate
- CTAs in both languages prominently displayed

## SEO Keywords to Target
English:
- "sell my mobile home fast Austin"
- "we buy mobile homes Texas"
- "cash for mobile homes [city]"
- "mobile home buyers near me"

Spanish:
- "vendemos casas móviles Austin"
- "compramos casas móviles Texas"
- "efectivo por casa móvil"

## Trust Elements Required
- BBB accreditation (if available)
- Google reviews
- "Family-owned since 2022"
- "Hablamos Español" prominently displayed
- Before/after or testimonial photos

## External Services
When external services require login:
1. Immediately ask user for credentials
2. Or pivot to free alternatives

## After Making Changes
Commit and push to GitHub for deployment.
