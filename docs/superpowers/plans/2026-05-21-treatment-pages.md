# Treatment Page Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create dedicated treatment pages for all 10 finalized treatments using the shared architecture from anti-aging-facial.html and hydrafacial.html as master blueprints.

**Architecture:** Each page uses the identical 9-section structure (Hero → Overview → Collage → Benefits → Procedure → Before/After → Doctor Trust → FAQ → Related → CTA), powered by shared `treatment-page.css`. Only content changes per treatment — structure is invariant.

**Tech Stack:** Vanilla HTML/CSS/JS, shared treatment-page.css, no frameworks.

**Key files:**
- Master: `treatments/anti-aging-facial.html`, `treatments/hydrafacial.html`
- CSS: `treatments/treatment-page.css`
- Generate: `treatments/{treatment-name}.html` (10 new files)
- Modify: `treatments.html` (card routing)

---

### Task 1: Create template generation script

**Files:**
- Create: `treatments/index.html` — Template reference
- Create: `scripts/generate-treatment-pages.ps1` — PowerShell generator

- [ ] **Step 1: Create a template file at `treatments/template.html`** that extracts the shared structure from hydrafacial.html with `%%TREATMENT%%` markers for replaceable content.

- [ ] **Step 2: Write a PowerShell script that:**
  1. Reads `treatments/template.html`
  2. Contains a hashtable of treatment data (name, slug, description, hero tagline, overview text, benefits, procedure steps, FAQs, doctor quote, related treatments, meta chips, etc.)
  3. For each treatment, replaces markers and writes to `treatments/{slug}.html`

- [ ] **Step 3: Define the treatment data** — content for all 10 treatments:
  - carbon-facial
  - dermal-fillers
  - botox
  - profhilo
  - microneedling
  - led-light-therapy
  - chemical-peels
  - laser-hair-removal
  - body-contouring
  - rf-skin-tightening

### Task 2: Generate all treatment pages

**Files:**
- Create: All 10 treatment pages in `treatments/`

- [ ] **Step 1: Run the generation script** to produce all 10 pages

- [ ] **Step 2: Spot-check 2-3 generated pages** for correctness — verify hero, overview, benefits rendering

### Task 3: Update treatments.html card routing

**Files:**
- Modify: `treatments.html` (card CTA links)

- [ ] **Step 1: Update CTA links on every treatment card** in treatments.html to point to the dedicated page

- [ ] **Step 2: Verify every card routes correctly** — 11 cards x 11 pages

### Task 4: Update related-treatment links across all pages

**Files:**
- Modify: All treatment pages (update Related Treatments section links)

- [ ] **Step 1: Sync Related Treatments links** on each page to point to actual pages

### Task 5: Verify

- [ ] **Step 1: Check all 10 pages load correctly**
- [ ] **Step 2: Verify no broken links in card routing**
- [ ] **Step 3: Verify shared CSS loads on all pages**
- [ ] **Step 4: Verify content uniqueness across pages**
