#!/usr/bin/env python3
"""Globalize Conditions dropdown across ALL treatment detail pages."""

import os

ROOT = r"F:\ml_model_webtak\websites\cosmo-skin-clinic"

# ── NEW 4+4 CONDITIONS DROPDOWN ──────────────────────────────

NEW_CONDITIONS_T = """                <div class="dropdown conditions-dropdown">
                    <a href="../conditions.html">Conditions</a>
                    <div class="dropdown-menu">
                        <div>
                            <div class="col-title">Skin Concerns</div>
                            <ul>
                                <li><a href="../conditions.html">Acne & Scars</a></li>
                                <li><a href="../conditions.html">Pigmentation</a></li>
                                <li><a href="../conditions.html">Aging Skin</a></li>
                                <li><a href="../conditions.html">Dark Circles</a></li>
                            </ul>
                        </div>
                        <div>
                            <div class="col-title">Body & Hair</div>
                            <ul>
                                <li><a href="../conditions.html">Hair Loss</a></li>
                                <li><a href="../conditions.html">Stretch Marks</a></li>
                                <li><a href="../conditions.html">Sensitive Skin</a></li>
                                <li><a href="../conditions.html">Uneven Texture</a></li>
                            </ul>
                        </div>
                    </div>
                </div>"""

# ── OLD PATTERNS ─────────────────────────────────────────────

# Pattern A: 11 files — ../conditions.html with &amp; (template pages + anti-aging-facial)
OLD_A = """                <div class="dropdown conditions-dropdown">
                    <a href="../conditions.html">Conditions</a>
                    <div class="dropdown-menu">
                        <div>
                            <div class="col-title">Skin Concerns</div>
                            <ul>
                                <li><a href="../conditions.html">Acne &amp; Scars</a></li>
                                <li><a href="../conditions.html">Pigmentation</a></li>
                                <li><a href="../conditions.html">Aging Skin</a></li>
                            </ul>
                        </div>
                    </div>
                </div>"""

# Pattern B: hydrafacial.html — ../conditions/index.html with raw & and individual pages
OLD_B = """                <div class="dropdown conditions-dropdown">
                    <a href="../conditions/index.html">Conditions</a>
                    <div class="dropdown-menu">
                        <div>
                            <div class="col-title">Skin Concerns</div>
                            <ul>
                                <li><a href="../conditions/acne.html">Acne & Scars</a></li>
                                <li><a href="../conditions/pigmentation.html">Pigmentation</a></li>
                                <li><a href="../conditions/aging-skin.html">Aging Skin</a></li>
                            </ul>
                        </div>
                    </div>
                </div>"""

# ── FILES ──────────────────────────────────────────────────

# Template-generated pages (10) + anti-aging-facial (1) = 11 files for Pattern A
PATTERN_A_FILES = [
    "carbon-facial.html", "dermal-fillers.html", "botox.html",
    "profhilo.html", "microneedling.html", "led-light-therapy.html",
    "chemical-peels.html", "laser-hair-removal.html",
    "body-contouring.html", "rf-skin-tightening.html",
    "anti-aging-facial.html",
]

# Pattern B: hydrafacial.html
PATTERN_B_FILES = ["hydrafacial.html"]

# Template files to update
TEMPLATES = [
    "treatments/template.html",
]

# ── FUNCTIONS ──────────────────────────────────────────────

def replace_in_file(filepath, old, new):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    if old in content:
        content = content.replace(old, new)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        return True
    return False

# ── EXECUTION ──────────────────────────────────────────────

print("=== Globalizing Conditions Dropdown ===\n")

# Pattern A files
count_a = 0
for page in PATTERN_A_FILES:
    path = os.path.join(ROOT, "treatments", page)
    if replace_in_file(path, OLD_A, NEW_CONDITIONS_T):
        print(f"  [A] {page} — updated")
        count_a += 1
    else:
        print(f"  [A] {page} — NOT FOUND")

print(f"\nPattern A: {count_a}/{len(PATTERN_A_FILES)}")

# Pattern B files
count_b = 0
for page in PATTERN_B_FILES:
    path = os.path.join(ROOT, "treatments", page)
    if replace_in_file(path, OLD_B, NEW_CONDITIONS_T):
        print(f"  [B] {page} — updated")
        count_b += 1
    else:
        print(f"  [B] {page} — NOT FOUND")

print(f"\nPattern B: {count_b}/{len(PATTERN_B_FILES)}")

# Templates
for tmpl in TEMPLATES:
    path = os.path.join(ROOT, tmpl)
    if replace_in_file(path, OLD_A, NEW_CONDITIONS_T):
        print(f"  [TMPL] {tmpl} — updated")
    else:
        print(f"  [TMPL] {tmpl} — NOT FOUND (may already be correct)")

print("\n=== Done ===")
