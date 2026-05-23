# Cosmo Skin Clinic — Scalable Static Architecture

## Folder Structure

```
/
├── treatments/        # Individual treatment pages (expandable)
├── conditions/        # Individual condition pages (expandable)
├── gallery/           # Gallery subcategory pages
├── about/             # About doctor & clinic pages
├── blog/              # Blog post pages
├── templates/        # Master blueprints & reusable sections
│   ├── treatment-template.html
│   ├── condition-template.html
│   ├── gallery-template.html
│   ├── blog-template.html
│   ├── sections/      # Reusable section reference systems
│   │   ├── cta-section.html
│   │   ├── faq-section.html
│   │   ├── doctor-section.html
│   │   ├── testimonials-section.html
│   │   └── before-after-section.html
│   └── README.md      # This file
├── css/               # Global styles
├── js/                # Global scripts
└── *.html             # Live root pages (homepage, FAQ, testimonials, etc.)
```

## Section Order (FROZEN)

### Treatment Pages (always in this order)
1. **Hero** — Trust + Treatment Name
2. **Overview** — What it is, who it's for
3. **Benefits** — 3-4 benefit cards
4. **Procedure** — Step-by-step process
5. **Before/After** — Visual proof
6. **Doctor Trust** — Expert credibility
7. **FAQ** — Common questions
8. **Related Treatments** — Internal links
9. **CTA** — Final conversion

### Condition Pages (always in this order)
1. **Hero** — Empathy + Condition Name
2. **Understanding** — Educational explanation
3. **Signs & Causes** — Symptoms + triggers
4. **Why Treatment Matters** — Urgency messaging
5. **Recommended Treatments** — Linked treatments
6. **Before/After** — Visual proof
7. **FAQ** — Common questions
8. **CTA** — Final conversion

### Gallery Pages (always in this order)
1. **Hero** — Category intro
2. **Category Navigation** — Subcategory tabs
3. **Featured Transformation** — Hero comparison
4. **Transformation Grid** — Filterable results
5. **Client Reviews** — Trust reinforcement
6. **CTA** — Final conversion

## Placeholder System (STANDARDIZED)

All templates use consistent `<!-- PLACEHOLDER_NAME -->` format.

### Universal Metadata
```
<!-- PAGE_TITLE -->           → <title> tag content
<!-- PAGE_DESCRIPTION -->     → meta description
<!-- CANONICAL_URL -->       → canonical link
<!-- OG_IMAGE -->            → social share image
```

### Treatment Page Placeholders
```
<!-- TREATMENT_NAME -->           → Full treatment name
<!-- TREATMENT_SLUG -->           → URL slug (e.g., "anti-aging")
<!-- TREATMENT_META_DESCRIPTION --> → SEO description
<!-- TREATMENT_KEYWORDS -->       → SEO keywords
<!-- TREATMENT_HERO_HEADING -->    → Hero h1 text
<!-- TREATMENT_HERO_MESSAGE -->    → Hero subtitle
<!-- TREATMENT_OVERVIEW -->       → Educational overview
<!-- BENEFIT_1_TITLE -->           → Benefit card title
<!-- BENEFIT_1_DESCRIPTION -->     → Benefit card description
<!-- STEP_1_TITLE -->             → Procedure step title
<!-- STEP_1_DESCRIPTION -->       → Procedure step description
<!-- PROCEDURE_DURATION -->        → Time estimate
<!-- PROCEDURE_AFTERCARE -->        → Aftercare instructions
<!-- BEFORE_IMAGE_URL -->         → Before photo URL
<!-- AFTER_IMAGE_URL -->          → After photo URL
<!-- RESULT_CAPTION -->            → Results disclaimer
<!-- DOCTOR_INSIGHT -->            → Expert quote
<!-- FAQ_QUESTION_1 -->            → FAQ question text
<!-- FAQ_ANSWER_1 -->              → FAQ answer text
<!-- RELATED_TREATMENT_1_NAME -->  → Related treatment name
<!-- RELATED_TREATMENT_1_SLUG --> → Related treatment URL slug
<!-- CTA_HEADING -->               → CTA section heading
```

### Condition Page Placeholders
```
<!-- CONDITION_NAME -->            → Full condition name
<!-- CONDITION_SLUG -->            → URL slug
<!-- CONDITION_META_DESCRIPTION --> → SEO description
<!-- CONDITION_KEYWORDS -->         → SEO keywords
<!-- CONDITION_HERO_HEADING -->     → Hero h1
<!-- CONDITION_HERO_MESSAGE -->    → Hero subtitle
<!-- CONDITION_OVERVIEW -->        → Educational content
<!-- WHO_AFFECTED -->              → Demographics
<!-- SYMPTOM_1 -->                 → Symptom text
<!-- CAUSE_1 -->                   → Cause text
<!-- CONSEQUENCES_IF_UNTREATED -->  → Urgency copy
<!-- QUALITY_OF_LIFE_IMPACT -->     → Life impact copy
<!-- RECOMMENDED_TREATMENT_1_NAME --> → Treatment name
<!-- TREATMENT_1_SLUG -->           → Treatment URL
```

### Gallery Page Placeholders
```
<!-- GALLERY_TITLE -->              → Page title
<!-- GALLERY_SLUG -->               → URL slug
<!-- GALLERY_META_DESCRIPTION -->    → SEO description
<!-- GALLERY_KEYWORDS -->           → SEO keywords
<!-- GALLERY_HERO_HEADING -->       → Hero h1
<!-- GALLERY_HERO_MESSAGE -->       → Hero subtitle
<!-- TRANSFORM_1_BEFORE -->         → Before image URL
<!-- TRANSFORM_1_AFTER -->          → After image URL
<!-- TRANSFORM_1_TITLE -->          → Case title
<!-- TRANSFORM_1_TREATMENT -->      → Treatment used
<!-- REVIEW_QUOTE_1 -->              → Client quote
<!-- REVIEW_CLIENT_1 -->            → Client name
<!-- REVIEW_TREATMENT_1 -->         → Treatment received
```

### Blog Post Placeholders
```
<!-- BLOG_TITLE -->                → Article headline
<!-- BLOG_SLUG -->                 → URL slug
<!-- BLOG_META_DESCRIPTION -->      → SEO description
<!-- BLOG_KEYWORDS -->              → SEO keywords
<!-- BLOG_CATEGORY -->             → Category tag
<!-- BLOG_DATE -->                 → Publication date
<!-- BLOG_READ_TIME -->            → Read time estimate
<!-- BLOG_SUBTITLE -->             → Subheading/lede
<!-- BLOG_FEATURED_IMAGE -->       → Hero image URL
<!-- BLOG_INTRO -->                → Opening paragraph
<!-- BLOG_SECTION_1_HEADING -->     → H2 section title
<!-- BLOG_SECTION_1_CONTENT -->     → Section body text
<!-- EXPERT_INSIGHT_QUOTE -->      → Pull quote
<!-- TIP_1 -->                      → Tip list item
<!-- BLOG_CONCLUSION -->           → Closing paragraph
```

## Page Generation Workflow

### NEW TREATMENT PAGE

1. Copy `templates/treatment-template.html`
2. Rename to `treatments/[slug].html` (e.g., `anti-aging.html`)
3. Open file and replace ALL placeholders:
   - Search for `<!-- ... -->` pattern
   - Replace each with actual content
4. Add images (before/after, icons)
5. Update CSS `<link>` hrefs if needed (subfolder)
6. Connect internal links:
   - Related treatment links
   - Gallery links
   - FAQ page link
7. Add to navbar dropdown in ALL pages
8. Validate: open in browser, check layout

### NEW CONDITION PAGE

1. Copy `templates/condition-template.html`
2. Rename to `conditions/[slug].html` (e.g., `acne.html`)
3. Replace ALL placeholders
4. Add condition illustration image
5. Link recommended treatments to actual treatment pages
6. Connect internal links
7. Add to conditions dropdown in ALL pages
8. Validate

### NEW GALLERY PAGE

1. Copy `templates/gallery-template.html`
2. Rename to `gallery/[category].html` (e.g., `before-after.html`)
3. Replace ALL placeholders
4. Add actual transformation images
5. Link treatments to real treatment pages
6. Connect testimonials
7. Update gallery dropdown in ALL pages
8. Validate

### NEW BLOG POST

1. Copy `templates/blog-template.html`
2. Rename to `blog/[slug].html` (e.g., `skincare-routine-guide.html`)
3. Replace ALL placeholders
4. Add featured image
5. Link related treatments
6. Add to blog listing page (index.html)
7. Validate

### COPY/REPLACE SECTION WORKFLOW

When adding a section to an existing page:

1. Copy the section structure from `templates/sections/`
2. Paste into the page at the correct position (see Section Order above)
3. Replace content placeholders with actual content
4. Ensure animation class `.animate-on-scroll` is present
5. For staggered animations, add `.delay-1`, `.delay-2`, etc.

## Internal Linking Philosophy

### Treatment Pages link to:
- Related treatments (internal)
- Related conditions (internal)
- Gallery before/after (internal)
- Book appointment CTA (internal)
- FAQ page (internal)

### Condition Pages link to:
- Recommended treatments (internal)
- Related conditions (internal)
- Gallery (internal)
- Book appointment CTA (internal)

### Gallery Pages link to:
- Specific treatment pages (internal)
- Testimonials (internal)
- Book appointment CTA (internal)

This creates a **conversion ecosystem**, not isolated pages.

## CSS/JS Organization

```
css/
├── style.css          # Base styles, typography, layout (global)
├── components.css    # Reusable component classes (global)
└── animations.css    # Transition/animation utilities (global)

No css/templates/ folder needed yet.
```

```
js/
├── main.js            # Shared functionality (navbar, mobile menu, FAB)
├── faq.js             # FAQ accordion
├── gallery.js         # Gallery filtering
├── testimonials.js    # Testimonial carousel
├── comparison.js      # Before/after slider
└── booking.js         # Booking form

No js/templates/ folder needed yet.
```

## Design Token Reference

```css
/* Typography */
--font-heading: 'Cormorant Garamond', serif;
--font-body: 'Inter', sans-serif;

/* Colors */
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

## Key Classes

| Class | Purpose |
|-------|---------|
| `.section-padding` | Consistent vertical padding |
| `.section-alt` | Alternate background |
| `.container` | Max-width content wrapper |
| `.card` | Base card container |
| `.btn-primary` | Gold filled button |
| `.btn-outline` | Gold outline button |
| `.animate-on-scroll` | Scroll-triggered animation |
| `.delay-1`, `.delay-2` | Animation stagger |
| `.grid-2`, `.grid-3` | Multi-column layouts |
| `.text-muted` | Muted text color |
| `.text-gold` | Gold accent text |
| `.section-title` | Standard section heading |

## Phase 6A Checklist

- [x] Folder architecture finalized
- [x] templates/ folder created (renamed from _templates/)
- [x] templates/sections/ created
- [x] treatment-template.html created
- [x] condition-template.html created
- [x] gallery-template.html created
- [x] blog-template.html created
- [x] cta-section.html created
- [x] faq-section.html created
- [x] doctor-section.html created
- [x] testimonials-section.html created
- [x] before-after-section.html created
- [x] Placeholder system documented
- [x] Generation workflow documented
- [ ] Live pages verified stable
- [ ] Phase 6A frozen for Phase 6B

## Phase 6B Focus

Once Phase 6A is frozen, Phase 6B will:
1. Create perfect individual treatment pages from templates
2. Create individual condition pages from templates
3. Populate with real content
4. Connect all internal links
5. Verify cross-page navigation works