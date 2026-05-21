#!/usr/bin/env python3
"""Update Treatments dropdown to approved 3-column global version sitewide."""

import os

ROOT = r"F:\ml_model_webtak\websites\cosmo-skin-clinic"

# ── NEW DROPDOWN HTML ──────────────────────────────────────────

ROOT_DROPDOWN = """                    <div class="dropdown-menu">
                        <div>
                            <a href="treatments.html#skin-treatments" class="col-title">Skin Treatments</a>
                            <ul>
                                <li><a href="treatments/anti-aging-facial.html">Anti-Aging Facial</a></li>
                                <li><a href="treatments/hydrafacial.html">HydraFacial</a></li>
                                <li><a href="treatments/carbon-facial.html">Carbon Facial</a></li>
                                <li><a href="treatments/microneedling.html">Microneedling</a></li>
                                <li><a href="treatments/led-light-therapy.html">LED Light Therapy</a></li>
                                <li><a href="treatments/chemical-peels.html">Chemical Peels</a></li>
                            </ul>
                        </div>
                        <div>
                            <a href="treatments.html#anti-aging-injectables" class="col-title">Anti-Aging &amp; Injectables</a>
                            <ul>
                                <li><a href="treatments/dermal-fillers.html">Dermal Fillers</a></li>
                                <li><a href="treatments/botox.html">Botox</a></li>
                                <li><a href="treatments/profhilo.html">Profhilo</a></li>
                            </ul>
                        </div>
                        <div>
                            <a href="treatments.html#body-hair" class="col-title">Body &amp; Hair</a>
                            <ul>
                                <li><a href="treatments/laser-hair-removal.html">Laser Hair Removal</a></li>
                                <li><a href="treatments/body-contouring.html">Body Contouring</a></li>
                                <li><a href="treatments/rf-skin-tightening.html">RF Skin Tightening</a></li>
                            </ul>
                        </div>
                    </div>"""

DIROPEN = """                    <div class="dropdown-menu">
                        <div>
                            <a href="../treatments.html#skin-treatments" class="col-title">Skin Treatments</a>
                            <ul>
                                <li><a href="anti-aging-facial.html">Anti-Aging Facial</a></li>
                                <li><a href="hydrafacial.html">HydraFacial</a></li>
                                <li><a href="carbon-facial.html">Carbon Facial</a></li>
                                <li><a href="microneedling.html">Microneedling</a></li>
                                <li><a href="led-light-therapy.html">LED Light Therapy</a></li>
                                <li><a href="chemical-peels.html">Chemical Peels</a></li>
                            </ul>
                        </div>
                        <div>
                            <a href="../treatments.html#anti-aging-injectables" class="col-title">Anti-Aging &amp; Injectables</a>
                            <ul>
                                <li><a href="dermal-fillers.html">Dermal Fillers</a></li>
                                <li><a href="botox.html">Botox</a></li>
                                <li><a href="profhilo.html">Profhilo</a></li>
                            </ul>
                        </div>
                        <div>
                            <a href="../treatments.html#body-hair" class="col-title">Body &amp; Hair</a>
                            <ul>
                                <li><a href="laser-hair-removal.html">Laser Hair Removal</a></li>
                                <li><a href="body-contouring.html">Body Contouring</a></li>
                                <li><a href="rf-skin-tightening.html">RF Skin Tightening</a></li>
                            </ul>
                        </div>
                    </div>"""

# ── OLD DROPDOWN PATTERNS ──────────────────────────────────────

# Root pages: current 2-column with subcategory anchors (3+1)
OLD_ROOT = """                    <div class="dropdown-menu">
                        <div>
                            <div class="col-title">Skin Treatments</div>
                            <ul>
                                <li><a href="treatments.html#facial-treatments">Facial Treatments</a></li>
                                <li><a href="treatments.html#anti-aging">Anti-Aging &amp; Injectables</a></li>
                                <li><a href="treatments.html#skin-rejuvenation">Skin Rejuvenation</a></li>
                            </ul>
                        </div>
                        <div>
                            <div class="col-title">Body &amp; Hair</div>
                            <ul>
                                <li><a href="treatments.html#body-treatments">Body Treatments</a></li>
                            </ul>
                        </div>
                    </div>"""

# Template-generated pages: 3-column static headers
OLD_TEMPLATE = """                    <div class="dropdown-menu">
                        <div>
                            <div class="col-title">Skin Treatments</div>
                            <ul>
                                <li><a href="anti-aging-facial.html">Anti-Aging Facial</a></li>
                                <li><a href="hydrafacial.html">HydraFacial</a></li>
                                <li><a href="carbon-facial.html">Carbon Facial</a></li>
                                <li><a href="microneedling.html">Microneedling</a></li>
                                <li><a href="led-light-therapy.html">LED Light Therapy</a></li>
                                <li><a href="chemical-peels.html">Chemical Peels</a></li>
                            </ul>
                        </div>
                        <div>
                            <div class="col-title">Anti-Aging & Injectables</div>
                            <ul>
                                <li><a href="dermal-fillers.html">Dermal Fillers</a></li>
                                <li><a href="botox.html">Botox</a></li>
                                <li><a href="profhilo.html">Profhilo</a></li>
                            </ul>
                        </div>
                        <div>
                            <div class="col-title">Body & Hair</div>
                            <ul>
                                <li><a href="laser-hair-removal.html">Laser Hair Removal</a></li>
                                <li><a href="body-contouring.html">Body Contouring</a></li>
                                <li><a href="rf-skin-tightening.html">RF Skin Tightening</a></li>
                            </ul>
                        </div>
                    </div>"""

# anti-aging-facial.html: very old 2-column dropdown
OLD_AAF = """                    <div class="dropdown-menu">
                        <div>
                            <div class="col-title">Skin Treatments</div>
                            <ul>
                                <li><a href="anti-aging-facial.html">Anti-Aging Facial</a></li>
                                <li><a href="#">LED Light Therapy</a></li>
                                <li><a href="#">Carbon Facial</a></li>
                            </ul>
                        </div>
                        <div>
                            <div class="col-title">Advanced</div>
                            <ul>
                                <li><a href="#">Botox</a></li>
                                <li><a href="#">Dermal Fillers</a></li>
                                <li><a href="#">Microneedling</a></li>
                            </ul>
                        </div>
                    </div>"""

# hydrafacial.html: 2-column dropdown with specific links
OLD_HF = """                    <div class="dropdown-menu">
                        <div>
                            <div class="col-title">Skin Treatments</div>
                            <ul>
                                <li><a href="hydrafacial.html">HydraFacial</a></li>
                                <li><a href="anti-aging.html">Anti Aging</a></li>
                                <li><a href="botox.html">Botox</a></li>
                                <li><a href="fillers.html">Dermal Fillers</a></li>
                            </ul>
                        </div>
                        <div>
                            <div class="col-title">Body & Hair</div>
                            <ul>
                                <li><a href="laser-hair-removal.html">Laser Hair Removal</a></li>
                                <li><a href="body-contouring.html">Body Contouring</a></li>
                            </ul>
                        </div>
                    </div>"""

# ── CONDITIONS DROPDOWN ────────────────────────────────────────

# Current conditions dropdown on root pages
OLD_CONDITIONS_ROOT = """                    <div class="dropdown-menu">
                        <div>
                            <div class="col-title">Skin Concerns</div>
                            <ul>
                                <li><a href="conditions.html">Acne & Scars</a></li>
                                <li><a href="conditions.html">Pigmentation</a></li>
                                <li><a href="conditions.html">Aging Skin</a></li>
                            </ul>
                        </div>
                    </div>"""

NEW_CONDITIONS = """                    <div class="dropdown-menu">
                        <div>
                            <div class="col-title">Skin Concerns</div>
                            <ul>
                                <li><a href="conditions.html">Acne &amp; Scars</a></li>
                                <li><a href="conditions.html">Pigmentation</a></li>
                                <li><a href="conditions.html">Aging Skin</a></li>
                            </ul>
                        </div>
                    </div>"""

# Current conditions dropdown on template pages
OLD_CONDITIONS_TREATMENT = """                    <div class="dropdown-menu">
                        <div>
                            <div class="col-title">Skin Concerns</div>
                            <ul>
                                <li><a href="../conditions.html">Acne & Scars</a></li>
                                <li><a href="../conditions.html">Pigmentation</a></li>
                                <li><a href="../conditions.html">Aging Skin</a></li>
                            </ul>
                        </div>
                    </div>"""

NEW_CONDITIONS_TREATMENT = """                    <div class="dropdown-menu">
                        <div>
                            <div class="col-title">Skin Concerns</div>
                            <ul>
                                <li><a href="../conditions.html">Acne &amp; Scars</a></li>
                                <li><a href="../conditions.html">Pigmentation</a></li>
                                <li><a href="../conditions.html">Aging Skin</a></li>
                            </ul>
                        </div>
                    </div>"""

# ── FILE LISTS ───────────────────────────────────────────────

ROOT_PAGES = [
    "index.html", "about-doctor.html", "about-clinic.html",
    "gallery.html", "testimonials.html", "blog.html",
    "faq.html", "book-appointment.html", "contact.html",
    "conditions.html",
]

# Template-generated pages (10 new ones)
TEMPLATE_PAGES = [
    "carbon-facial.html", "dermal-fillers.html", "botox.html",
    "profhilo.html", "microneedling.html", "led-light-therapy.html",
    "chemical-peels.html", "laser-hair-removal.html",
    "body-contouring.html", "rf-skin-tightening.html",
]

# ── FUNCTIONS ───────────────────────────────────────────────

def replace_in_file(filepath, old, new):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    if old in content:
        content = content.replace(old, new)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        return True
    return False

# ── EXECUTION ───────────────────────────────────────────────

print("=== Updating Treatments Dropdown ===\n")

# 1. Root pages — replace treatment dropdown
root_count = 0
for page in ROOT_PAGES:
    path = os.path.join(ROOT, page)
    if replace_in_file(path, OLD_ROOT, ROOT_DROPDOWN):
        print(f"  [ROOT] {page} — Treatments dropdown updated")
        root_count += 1
    else:
        print(f"  [ROOT] {page} — NOT FOUND (skip)")

print(f"\nRoot pages updated: {root_count}/10")

# 2. templates.html itself
treat_path = os.path.join(ROOT, "treatments.html")
if replace_in_file(treat_path, OLD_ROOT, ROOT_DROPDOWN):
    print("  [ROOT] treatments.html — Treatments dropdown updated")
else:
    print("  [ROOT] treatments.html — NOT FOUND")

# 3. Template-generated pages
template_count = 0
for page in TEMPLATE_PAGES:
    path = os.path.join(ROOT, "treatments", page)
    if replace_in_file(path, OLD_TEMPLATE, DIROPEN):
        print(f"  [TREAT] {page} — Treatments dropdown updated")
        template_count += 1
    else:
        print(f"  [TREAT] {page} — NOT FOUND (skip)")

print(f"\nTemplate pages updated: {template_count}/10")

# 4. anti-aging-facial.html
aaf_path = os.path.join(ROOT, "treatments", "anti-aging-facial.html")
if replace_in_file(aaf_path, OLD_AAF, DIROPEN):
    print("  [TREAT] anti-aging-facial.html — Treatments dropdown updated")
else:
    print("  [TREAT] anti-aging-facial.html — NOT FOUND")

# 5. hydrafacial.html
hf_path = os.path.join(ROOT, "treatments", "hydrafacial.html")
if replace_in_file(hf_path, OLD_HF, DIROPEN):
    print("  [TREAT] hydrafacial.html — Treatments dropdown updated")
else:
    print("  [TREAT] hydrafacial.html — NOT FOUND")

# ── CONDITIONS DROPDOWN ─────────────────────────────────────
print("\n=== Updating Conditions Dropdown ===")

# Root pages
cond_root_count = 0
for page in ROOT_PAGES:
    path = os.path.join(ROOT, page)
    if replace_in_file(path, OLD_CONDITIONS_ROOT, NEW_CONDITIONS):
        cond_root_count += 1

# treatments.html
replace_in_file(treat_path, OLD_CONDITIONS_ROOT, NEW_CONDITIONS)

# Template pages
cond_template_count = 0
for page in TEMPLATE_PAGES:
    path = os.path.join(ROOT, "treatments", page)
    if replace_in_file(path, OLD_CONDITIONS_TREATMENT, NEW_CONDITIONS_TREATMENT):
        cond_template_count += 1

# Master blueprints
replace_in_file(aaf_path, OLD_CONDITIONS_TREATMENT, NEW_CONDITIONS_TREATMENT)
replace_in_file(hf_path, OLD_CONDITIONS_TREATMENT, NEW_CONDITIONS_TREATMENT)

print(f"Conditions updated: {cond_root_count} root + {cond_template_count} template + masters")

print("\n=== Done ===")
