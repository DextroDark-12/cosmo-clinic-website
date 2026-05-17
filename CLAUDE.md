# Cosmo Skin Clinic - Architecture Documentation

## Project Purpose
Premium multi-page static dermatology clinic website template for sale to local clinics. Reusable commercial template with luxury dark/gold aesthetic.

## Design Language
- Luxury dark theme with gold accents
- Elegant, sophisticated, medical professionalism
- High contrast typography for readability

## Typography System
- Headings: 'Cormorant Garamond' (serif, elegant) - canonical
- Body: 'Inter' (sans-serif, clean) - canonical
- Font hierarchy: h1 → h2 → h3 → body
- Sizes defined in css/style.css CSS variables

## Color System (from css/style.css CSS variables)
```css
--color-bg: #0d0d1a;
--color-bg-secondary: #1a1a2e;
--color-bg-card: #16213e;
--color-gold: #c9a96e;
--color-gold-light: #e8c98a;
--color-gold-dark: #a07840;
--color-white: #f9f6f1;
--color-white-muted: #d4cfc8;
--color-text: #e8e4de;
--color-text-muted: #9e9a94;
--color-border: rgba(201, 169, 110, 0.2);
--color-border-strong: rgba(201, 169, 110, 0.5);
```

## Mobile-First Philosophy
- CSS written mobile-first with min-width media queries
- Hamburger menu for navigation on mobile
- Touch-friendly tap targets (min 44px)
- Fluid typography using rem/em units

## Reusable Template Philosophy
- Components in css/components.css
- Animations in css/animations.css
- Shared JS in js/main.js
- Page-specific JS in separate files
- CSS classes over inline styles
- No hardcoded clinic names in global CSS

## Current File Structure
```
├── index.html
├── about-clinic.html
├── about-doctor.html
├── treatments.html
├── conditions.html
├── gallery.html
├── testimonials.html
├── blog.html
├── faq.html
├── book-appointment.html
├── css/
│   ├── style.css (base styles, typography, layout)
│   ├── components.css (reusable component classes)
│   └── animations.css (transition/animation utilities)
└── js/
    ├── main.js (shared functionality)
    ├── treatments.js
    ├── gallery.js
    ├── faq.js
    ├── testimonials.js
    └── booking.js
```

## Canonical UI System

### Typography
- Headings: Cormorant Garamond (via --font-heading CSS variable)
- Body: Inter (via --font-body CSS variable)
- Always use CSS variables, never hardcode font names

### Navigation System (canonical)
- `<nav class="navbar">` - main nav container
- `.navbar-logo` - logo with `.logo-text` + `.logo-sub`
- `.navbar-nav` - nav links wrapper
- `.mega-menu` - dropdown mega menu
- `.mobile-toggle` - hamburger button

### Button System
- `.btn` base class
- `.btn-primary` - gold filled button
- `.btn-outline` - gold outline button
- `.btn-book` - booking CTA button

### Card System
- `.card` base class
- Use for treatment cards, info cards
- Consistent padding and border-radius

### Spacing Philosophy
- Section padding: `.section-padding` class
- Grid gaps: use CSS Grid with consistent spacing
- Margins: use rem units, avoid magic numbers

### Animation Philosophy
- Use CSS transitions for hover states
- Prefer transform/opacity for GPU acceleration
- Keep animations subtle and elegant

## Rules for Future Edits
1. Never hardcode clinic-specific content in global CSS/JS
2. Add new components to components.css, not style.css
3. Use semantic HTML5 elements
4. Maintain BEM-like class naming for components
5. Keep JS vanilla - no frameworks
6. NEVER create duplicate component systems when reusable existing components already exist
7. Avoid adding inline styles unless absolutely necessary. Prefer reusable utility/component classes

## Rules to Avoid Hallucinated Rewrites
1. Don't rewrite working code "for consistency" without cause
2. Only fix actual bugs or implement new features
3. When editing a page, preserve its existing structure
4. If something works, don't "clean" it
5. When refining pages, unify them toward the canonical system incrementally instead of full rewrites

## Rules for Keeping Component Consistency
1. New buttons use `.btn-primary` / `.btn-outline` from components.css
2. New cards use `.card` class structure
3. Forms use consistent `.form-group`, `.form-input` pattern
4. Section padding uses consistent `.section` spacing

## JS Architecture Rules
1. Shared functionality in main.js
2. Page-specific code in separate files
3. Use event delegation for dynamic elements
4. No jQuery - vanilla DOM only

## Performance Rules
1. Lazy load images where possible
2. Minimize CSS specificity
3. Keep animations GPU-accelerated (transform/opacity)
4. Defer non-critical JS

## Dependency Rules
- No npm, no bundlers
- No React, Vue, or backend frameworks
- Google Fonts loaded via CDN
- No external JS libraries unless explicitly needed

## Legacy Pages (Inconsistent Architecture)
The following pages use older inconsistent systems and need migration during future refinement:

### Typography Inconsistencies
- conditions.html uses: Playfair Display + Poppins (MIGRATED)

### Navigation Inconsistencies
- conditions.html uses: `<header class="header">`, `.nav-list`, `.logo` (MIGRATED)

These legacy pages work but drift from the canonical system. Unify incrementally when editing.

## Incremental Migration Strategy (Active)
This approach is working successfully:
- conditions.html: Migrated to canonical navbar + typography + bridge classes
- index.html: Refined with reusable classes, removed inline styles
- Legacy bridge classes added to components.css

**Strategy: Continue incremental refinement when editing pages rather than redesign-based rewrites.**

## Homepage Refinement (Completed)
The homepage is now the visual quality reference for future refinements:
- Hero: Added `.hero-home`, `.hero-overlay` (radial gradient), `.hero-cta` (button spacing)
- Sections: Added `.section-alt` for alternating backgrounds
- Doctor: Added `.doctor-grid`, `.doctor-info-text`, `.doctor-features`
- Testimonials: Added `.card-testimonial`, `.testimonial-author`, `.section-cta`
- Removed 12+ inline style attributes
- Mobile: CTA buttons stack vertically on small screens (<600px)
- Improved card hover shadows

## Reusable Classes Added (components.css)
- `.hero-overlay` - radial gradient for depth
- `.hero-cta` - flex container for button spacing
- `.section-alt` - alternate section background
- `.doctor-grid` - constrains doctor section width
- `.doctor-info-text` - flex layout for doctor content
- `.doctor-features` - feature list styling
- `.card-testimonial` - testimonial card variant
- `.testimonial-author` - author attribution
- `.section-cta` - section CTA spacing

## Legacy Compatibility Bridge (components.css)
Lightweight mappings for legacy HTML classes to maintain visual consistency:
- `.condition-card`, `.conditions-grid` - bridge to card system
- `.btn-gold`, `.btn-outline-dark`, `.btn-large` - bridge to button system
- `.page-header`, `.cta`, `.section-title` - bridge to layout system
- These enable legacy pages to render consistently without full rewrites

## Preserving Stable Code
- Some existing pages have older inconsistent structure
- Gradually unify when editing those pages specifically
- Don't do mass rewrites for consistency alone

## Outstanding Technical Debt
- contact.html does not exist yet (needs creation)
- Legacy pages (blog.html, faq.html) still have old architecture - refine when editing

## Audit Priority
- Mobile responsiveness refinement is priority
- Homepage (index.html) is the visual quality reference
- Legacy pages (blog.html, faq.html) need incremental unification when edited
- Keep audit lightweight - address issues when editing specific pages