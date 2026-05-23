# Treatment Page Architecture — Phase 6B Design Spec

**Date:** 2026-05-20
**Phase:** 6B — Canonical Treatment Page Audit
**Status:** DRAFT — Awaiting User Approval
**First Implementation Target:** Hydrafacial

---

## 1. Overview & Design Intent

This spec defines the canonical treatment-page architecture for all future treatment pages on the Cosmo Skin Clinic premium static website.

**Design Objectives:**
- Educational: clients understand exactly what they're getting
- Trustworthy: medical credibility without feeling clinical
- Aspirational: luxury aesthetic that justifies premium pricing
- Emotionally reassuring: reduces anxiety about trying a new treatment
- Conversion-optimized: strategic CTAs without aggressive sales pressure

**Key Psychological Principle:**
The page should answer the user's internal monologue at each scroll point:

1. "Is this right for me?" → Hero + Overview
2. "Will it actually work?" → Benefits + Before/After
3. "Is this clinic safe?" → Doctor Trust
4. "What happens if something goes wrong?" → FAQ
5. "What else could I consider?" → Related Treatments
6. "OK, I'm ready" → CTA

**What This Is NOT:**
- A sales brochure
- A medical textbook
- A generic landing page
- A keyword-stuffed SEO article

---

## 2. Section Order — FINAL (FROZEN)

### Canonical Treatment Page Hierarchy

```
SECTION 1:  HERO                           [Trust + Desire]
SECTION 2:  TREATMENT OVERVIEW             [Education + Framing]
SECTION 3:  KEY BENEFITS                   [Value Reinforcement]
SECTION 4:  THE PROCEDURE                  [Confidence Building]
SECTION 5:  BEFORE / AFTER                 [Proof]
SECTION 6:  DOCTOR TRUST                   [Medical Credibility]
SECTION 7:  FAQ ACCORDION                  [Objection Handling]
SECTION 8:  RELATED TREATMENTS             [Internal Link Ecosystem]
SECTION 9:  FINAL CTA                      [Conversion]
```

---

## 3. Section-by-Section Audit

### SECTION 1 — HERO

**Purpose:** First impression — establish category authority + trigger desire

**Structure:**
```
[Breadcrumb: Home > Treatments > Hydrafacial]
[Gold decorative line]
[H1: Hydrafacial]
[Subheading: One treatment. Deep cleanse, radiant glow.]
[CTA pair: "Book Consultation" (primary) | "Learn More" (anchor)]
```

**Heading Philosophy:**
- H1 = Treatment name only (e.g., "Hydrafacial") — NOT a marketing phrase
- Subheading = One-line value proposition under 10 words
- No year/version numbers (e.g., avoid "Hydrafacial 2024")
- Luxury restraint: don't oversell in the headline

**Emotional Tone:**
- Confident, not salesy
- Clinical authority without intimidation
- Premium positioning without boasting

**CTA Placement:**
- Two CTAs in hero: primary (book) + secondary (scroll anchor)
- Primary uses `.btn-primary` (gold fill)
- Secondary uses `.btn-outline` (anchor to #treatment-overview)
- Do NOT show pricing in hero — creates anchoring anxiety before trust is built

**Image Strategy:**
- Hero uses NO background image of the procedure (no bloody faces, no suction devices)
- Hero background = dark gradient + geometric gold accent (consistent with site identity)
- No before/after in hero — too early, creates doubt before education

**NOT in Hero:**
- ❌ Pricing (too early)
- ❌ Before/After (needs context first)
- ❌ Technical jargon
- ❌ Doctor bio (needs setup)

---

### SECTION 2 — TREATMENT OVERVIEW

**Purpose:** Educate + frame the treatment — answer "what is this?"

**Structure:**
```
[2-column grid]
  Left:    [H2: What is Hydrafacial?] + description paragraphs + meta badges
  Right:   [Hero image of treatment — clean, in-clinic, aspirational]
```

**Content Philosophy:**
- 2-3 paragraphs max, written in plain English
- First sentence defines it in one line
- Second paragraph covers who it's for
- Third (optional) covers what skin types benefit
- NO medical jargon overload
- NO giant walls of text

**Meta Badges (below description):**
- Duration badge: "⏱ 45-60 min"
- Downtime badge: "⏱ Zero downtime"
- Results badge: "✨ Immediate glow"

**SEO vs Luxury Balance:**
- "Hydrafacial" appears in H2 and first paragraph (natural density)
- Avoid: "best hydrafacial treatment near me" type keywords
- Write for: the person who already knows what a hydrafacial is and is researching where to get it

---

### SECTION 3 — KEY BENEFITS

**Purpose:** Quick-scan value reinforcement — "what do I get?"

**Structure:**
```
[H2: Key Benefits]
[3-4 card grid]
  Card: [icon] + [benefit title] + [2-sentence explanation]
```

**Content Philosophy:**
- Lead with emotional benefits first, functional benefits second
- Example: "Instant Radiance" before "Exfoliates Dead Skin"
- Each card: 1 headline benefit + brief explanation (not a paragraph)
- 3 cards on desktop, 2 on tablet, 1 on mobile

**Visual Treatment:**
- Cards have gold border accent on hover
- Subtle animation on scroll entry
- Service icon (✦) in gold

**NOT in Benefits:**
- ❌ Comparison to competitors
- ❌ Technical process details (save for Procedure section)
- ❌ Pricing or packages

---

### SECTION 4 — THE PROCEDURE

**Purpose:** Build confidence by removing mystery — "what actually happens?"

**Structure:**
```
[H2: The Procedure]
[Step-by-step cards: 3 steps]
  Step: [number] + [step title] + [1-2 sentence description]
[Meta row: Duration | Downtime | Sessions]
```

**Tone Philosophy:**
- NOT clinical (no "we use a 10ml serum injected via vortex technology")
- NOT spa-speak (no "you'll experience pure bliss and renewal")
- Language: Professional, clear, reassuring

**Step Titles Should Feel:**
- Like chapter headings, not medical procedures
- Example: "Deep Cleanse & Exfoliation" not "Vortex Exfoliation at 3500 RPM"

**Duration/Aftercare Row:**
- Plain language, reassuring
- "Minimal Redness" not "Erythema"
- "Resume Normal Routine Immediately" not "Post-procedure protocol"

---

### SECTION 5 — BEFORE / AFTER

**Purpose:** Proof that works — reduce skepticism

**CRITICAL DECISION — Placement:**
- BEFORE/AFTER appears AFTER procedure section, NOT in hero
- Reasoning: User needs to understand the treatment first, THEN proof is meaningful
- Before/after in hero = "what did they do to get that result?" confusion

**Structure:**
```
[H2: Real Results]
[Large comparison slider: Before | After]
[Note: "Results vary by individual"]
[Secondary CTA: "View More Transformations" → gallery/before-after.html]
```

**Design Decisions:**
- Use interactive slider (drag to compare) for desktop
- Show static split (side-by-side) on mobile for performance
- Always show "Before" on left, "After" on right (convention)
- Labels overlay the image corners

**Image Selection:**
- Show realistic results, not extreme transformations
- 2-3 comparison pairs available (not all visible at once)
- Thumbnail strip below main slider to swap comparisons

**Emotional Note:**
- Caption text: "Results vary by individual" in muted text
- Do NOT promise specific outcomes

---

### SECTION 6 — DOCTOR TRUST

**Purpose:** Medical credibility — address "is this safe / legit?"

**Placement Philosophy:**
- Appears AFTER visual proof, NOT before
- Reasoning: Results build emotional desire → then credibility seals the decision

**Structure:**
```
[Single card, full-width]
  [Doctor avatar/photo]
  [Doctor name + credentials]
  [Expert quote block]
  [CTA: "Schedule Your Consultation"]
```

**Quote Should Be:**
- Specific to this treatment (not generic "we provide excellent care")
- 2-3 sentences, written in first person
- Address the user's unspoken concern: safety, effectiveness, or what to expect
- Example: "In my 12 years of practice, Hydrafacial remains one of the most effective treatments for patients seeking immediate results without any recovery time."

**NOT a full bio dump here.** Link to about-doctor.html for full bio.

---

### SECTION 7 — FAQ ACCORDION

**Purpose:** Objection handling — answer fears before they form

**Number of FAQs:** 4-6 per treatment page (not all FAQs, just treatment-specific ones)

**Question Order (Psychology-Based):**
1. Most common concern (pain, downtime, cost)
2. Safety/side effects
3. Who is a good candidate
4. How long until results
5. Comparison to alternatives
6. Maintenance/follow-up

**NOT Generic FAQs:**
- ❌ "Do you offer financing?" → goes in contact page
- ❌ "What are your clinic hours?" → goes in contact/FAQ page
- ❌ "How do I book?" → goes in book-appointment page

**Answer Style:**
- Concise: 2-4 sentences per answer
- Reassuring tone, not defensive
- Avoid: "Our state-of-the-art facility uses cutting-edge technology"

---

### SECTION 8 — RELATED TREATMENTS

**Purpose:** Internal link ecosystem — keep user on site

**Structure:**
```
[H2: Related Treatments]
[2-3 treatment cards]
  Card: [icon] + [treatment name] + [1-line description] + [Learn More link]
```

**Selection Logic:**
- Complementary treatments (Hydrafacial + Chemical Peel)
- Alternative treatments (Botox as alternative to fillers)
- Treatment progressions (Hydrafacial → Microneedling for deeper results)

**NOT:**
- ❌ Every treatment on the site
- ❌ Random treatments that don't connect
- ❌ Price comparisons

**Feel:** "You might also be interested in..." NOT "Buy more stuff"

---

### SECTION 9 — FINAL CTA

**Purpose:** Final conversion push — zero friction

**Structure:**
```
[Dark section with gold accents]
  [H2: Ready for Hydrafacial?]
  [Reassuring message: 1 sentence]
  [CTA pair: Primary (Book) + Secondary (Ask Question)]
```

**Message Tone:**
- Confident, not desperate
- "Transform your skin" not "Don't miss out on this limited offer"
- No countdown timers, no "only 3 spots left"

---

## 4. CTA Rhythm Strategy

**3-4 CTAs strategically placed, NOT everywhere:**

| Position | CTA Type | Text |
|----------|----------|------|
| Hero | Primary + Anchor | "Book Consultation" + "Learn More" |
| Doctor Trust card | Primary | "Schedule Your Consultation" |
| FAQ section (optional) | Ghost | "Have More Questions?" → contact |
| Final CTA | Primary + Secondary | "Book Consultation" + "Ask a Question" |

**NOT in CTA locations (avoid clutter):**
- ❌ Benefits section
- ❌ Procedure section
- ❌ Related treatments (only "Learn More" links)

**CTA Button Sizes:**
- Primary CTAs: `.btn-primary.btn-large`
- Secondary/gallery links: `.btn-outline`

---

## 5. Trust Timing Analysis

### The Trust Rhythm Model

```
SCROLL POINT          TRUST NEED                  SECTION DELIVERS
─────────────────────────────────────────────────────────
0% (Hero)             Category authority           H1 + Subheading
25% (Overview)         Treatment understanding      2-col layout + meta
50% (Before/After)     Proof it works               Comparison slider
65% (Doctor Trust)    Safety/credibility            Doctor card + quote
75% (FAQ)             Objection handling            Accordion
90% (Related)         Options/exploration            Treatment cards
100% (CTA)           Conversion                    Final CTA
```

**Key Insight:** Doctor credibility comes AFTER visual proof, not before.
The emotional sequence is: Interest → Proof → Credibility → Decision.

---

## 6. FAQ Strategy

### Objection-Mapping Framework

For each treatment, identify the TOP objections (not all questions):

**Hydrafacial Specific FAQs:**
1. "Does it hurt?" — address comfort anxiety
2. "How often do I need it?" — maintenance concern
3. "Can I wear makeup after?" — practical concern
4. "Is it safe for sensitive skin?" — safety concern
5. "How is it different from a regular facial?" — differentiation

**Answer Style Guide:**
- First sentence: direct answer (yes/no/typically)
- Second sentence: brief explanation
- Third sentence (if needed): reassurance or what to expect

---

## 7. Related Treatments Strategy

### Linking Philosophy

**The "Next Step" Mentality:**
- Each treatment page is a hub, not a dead end
- User journey: discover → learn → explore alternatives → convert

**Internal Link Grid:**
```
Treatment Page
├── Links TO: Related treatments (this page's context)
├── Links TO: Gallery before/after (proof)
├── Links TO: Condition pages (who is it for)
├── Links FROM: Condition page recommendations
└── Links FROM: Treatment index page
```

**Avoid:**
- Orphan pages with no internal connections
- Circular links (A→B→A→B)
- Upsell-heavy feel (3 CTAs per section)

---

## 8. Mobile UX Audit

### Section Pacing on Mobile

**Desktop:** Full layouts, side-by-side grids, hover effects
**Mobile:** Stacked, compressed, touch-optimized

**Key Mobile Decisions:**

| Element | Desktop | Mobile |
|---------|---------|--------|
| Overview grid | 2-column | Single column |
| Benefits grid | 3-column | 1-column stacked |
| Comparison slider | Interactive drag | Static side-by-side |
| Doctor trust card | Full width | Full width |
| Related treatments | 3-column | 1-column stacked |
| CTA buttons | Side by side | Full-width stacked |
| Hero CTA pair | Side by side | Stacked |
| FAQ items | Full width | Full width |

**Touch Targets:** All buttons minimum 44px tap target
**Image Density:** Reduce image sizes on mobile, no full-bleed before/after
**Text Rhythm:** Smaller line-height, tighter paragraph spacing on mobile

---

## 9. SEO vs Luxury Balance

### Content Strategy

**Write FOR:** A person who has already decided to research this treatment and is evaluating where to get it.

**Avoid Keyword Traps:**
- ❌ "best hydrafacial [city]" — too local, too salesy
- ❌ "hydrafacial cost near me" — price anchoring
- ❌ "hydrafacial before and after photos" — thin content
- ❌ Repeating the treatment name 15 times

**SEO-Rich Elements (naturally):**
- H1 = Treatment name (keyword)
- H2 = "What is [Treatment]?" (exact match)
- Meta description = 155 chars with keyword
- Image alt text = descriptive
- Schema markup = FAQPage + MedicalProcedure

**Luxury Presentation:**
- Short, punchy paragraphs (3-4 sentences max)
- Gold accent lines, elegant spacing
- No text walls
- No bullet-point overload (prefer prose)
- Photography over stock imagery

---

## 10. Hydrafacial — First Implementation Assessment

### Why Hydrafacial is the Right First Target

| Criterion | Score | Notes |
|-----------|-------|-------|
| Visual richness | 9/10 | Gorgeous before/after potential |
| Transformation friendliness | 9/10 | Immediate glow, instant results |
| Trust potential | 8/10 | Non-invasive, FDA-cleared |
| Before/after friendliness | 9/10 | Dramatic but realistic results |
| CTA flow | 8/10 | Low commitment, easy trial |
| Premium aesthetic alignment | 9/10 | Perfect for luxury positioning |
| FAQ material | 8/10 | Common questions well-defined |
| Procedural simplicity | 9/10 | 3 clear steps, no intimidating process |
| Content availability | 8/10 | Well-documented, easy to source |

**Overall: 9/10 — RECOMMENDED as first implementation**

### Alternative Candidates (ranked)
1. Botox — High trust potential, well-documented, but more medical anxiety
2. Chemical Peel — Good visual potential, but variable results harder to showcase
3. Laser Hair Removal — Broad appeal but long treatment timelines
4. Microneedling — Great results, but longer downtime visibility

---

## 11. Implementation Strategy (Before Building)

### Pre-Build Checklist

1. **Content gathering first:**
   - [ ] Write all copy before touching HTML
   - [ ] Source 2-3 before/after image sets
   - [ ] Get doctor quote specific to treatment
   - [ ] Draft 5 FAQ questions with answers

2. **Template refinement:**
   - [ ] Update treatment-template.html to match this spec exactly
   - [ ] Verify all CSS classes exist in components.css
   - [ ] Verify comparison slider CSS/JS works on mobile
   - [ ] Add FAQ schema markup

3. **Image requirements:**
   - [ ] Hero treatment image (aspirational, clean)
   - [ ] 2-3 before/after comparison pairs
   - [ ] Doctor photo (headshot)

4. **Link verification:**
   - [ ] All internal links point to real pages
   - [ ] Dropdown nav updated if new treatment is added
   - [ ] Related treatments links verified

### Safety Measures

- **Don't build in isolation:** Validate each section against existing live pages before finalizing
- **Mobile-first:** Test every section on mobile viewport BEFORE desktop refinement
- **No framework changes:** Use existing CSS/JS, don't introduce new libraries
- **Incremental:** Build section by section, validate each before next
- **Live page protection:** Don't overwrite existing treatment pages until new one is fully tested

---

## 12. Implementation Order (Once Approved)

### Build Sequence (Recommended)

1. **Hero + Overview** — Foundation, most copy-intensive
2. **Benefits + Procedure** — Quick wins, structure established
3. **Before/After + Doctor Trust** — Trust-building sections
4. **FAQ + Related Treatments** — Objection handling + ecosystem
5. **Final CTA** — Conversion completion
6. **Mobile testing** — Every section, every breakpoint
7. **Cross-link audit** — Internal navigation check
8. **Schema markup** — FAQ + MedicalProcedure JSON-LD

### Risk Mitigation

- **Risk:** Comparison slider breaks on mobile
  - **Fix:** Use CSS-only fallback (side-by-side) with JS enhancement
- **Risk:** Doctor quote feels generic
  - **Fix:** Write specific quote, reference Hydrafacial by name
- **Risk:** Before/after images look too dramatic
  - **Fix:** Select conservative but visible improvement
- **Risk:** FAQ answers too long
  - **Fix:** 3-sentence max per answer, inline editing

---

## 13. Spec Self-Review

- [x] All section orders documented with reasoning
- [x] Placeholder tokens defined per section
- [x] Mobile decisions explicit
- [x] SEO/luxury balance addressed
- [x] Trust rhythm explained
- [x] CTA placement justified
- [x] FAQ strategy grounded in psychology
- [x] Related treatment logic defined
- [x] Hydrafacial assessment complete
- [x] Implementation order defined
- [x] Risk mitigation planned

---

## 14. Open Questions (For User Input)

1. **Pricing strategy:** Where should price appear? (Note: spec says NOT in hero — keep pricing off-treatment pages entirely, or show only on consultation CTA?)
2. **Video content:** Should treatment videos appear? Where?
3. **Doctor quote specificity:** Should the doctor quote be completely custom per treatment, or can we use a templated quote with variable treatment names?
4. **Testimonials on treatment pages:** Should we add a mini-testimonial strip between Before/After and Doctor Trust?
5. **Before/after image selection:** Do you have real images to use, or should we use placeholder approach for now?

---

**Next Step:** Present design sections for approval. Once approved, commit to `docs/superpowers/specs/` and proceed to implementation planning.