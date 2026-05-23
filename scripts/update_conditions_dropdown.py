#!/usr/bin/env python3
"""Batch update conditions dropdown from 2-column to 3-column across all hub pages."""

import re
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# Hub pages to update (all at root level, excluding conditions.html which is already correct)
HUB_PAGES = [
    "index.html",
    "about-clinic.html",
    "about-doctor.html",
    "blog.html",
    "book-appointment.html",
    "contact.html",
    "faq.html",
    "gallery.html",
    "testimonials.html",
    "treatments.html",
]

# ============================================
# OLD DESKTOP DROPDOWN PATTERN (2 columns)
# ============================================
OLD_DESKTOP = """                        <div>
                            <div class="col-title\">Skin Concerns</div>
                            <ul>
                                <li><a href="conditions/aging-skin.html">Aging Skin</a></li>
                                <li><a href="conditions/acne-scarring.html">Acne & Scarring</a></li>
                                <li><a href="conditions/pigmentation.html">Pigmentation</a></li>
                                <li><a href="conditions/dark-circles.html">Dark Circles</a></li>
                            </ul>
                        </div>
                        <div>
                            <div class="col-title\">Body & Hair</div>
                            <ul>
                                <li><a href="conditions/hair-loss.html">Hair Loss</a></li>
                                <li><a href="conditions/stretch-marks.html">Stretch Marks</a></li>
                                <li><a href="conditions/sensitive-skin.html">Sensitive Skin</a></li>
                                <li><a href="conditions/uneven-texture.html">Uneven Texture</a></li>
                            </ul>
                        </div>"""

NEW_DESKTOP = """                        <div>
                            <div class="col-title">Skin Concerns</div>
                            <ul>
                                <li><a href="conditions/aging-skin.html">Aging Skin</a></li>
                                <li><a href="conditions/acne-scarring.html">Acne &amp; Scarring</a></li>
                                <li><a href="conditions/pigmentation.html">Pigmentation</a></li>
                            </ul>
                        </div>
                        <div>
                            <div class="col-title">Texture &amp; Tone</div>
                            <ul>
                                <li><a href="conditions/dark-circles.html">Dark Circles</a></li>
                                <li><a href="conditions/uneven-texture.html">Uneven Texture</a></li>
                                <li><a href="conditions/sensitive-skin.html">Sensitive Skin</a></li>
                            </ul>
                        </div>
                        <div>
                            <div class="col-title">Body &amp; Hair</div>
                            <ul>
                                <li><a href="conditions/hair-loss.html">Hair Loss</a></li>
                                <li><a href="conditions/stretch-marks.html">Stretch Marks</a></li>
                            </ul>
                        </div>"""

# ============================================
# OLD MOBILE NAV CONDITIONS PANEL
# ============================================
OLD_MOBILE_PANEL_HEADER = """            <div class="mobile-menu-panel" data-panel="conditions" data-parent="main">
                <div class="panel-header">
                    <button class="panel-back" data-target="main">‹</button>
                    <span class="panel-title">Conditions</span>
                </div>
                <ul class="mobile-nav-list">
                    <li><a href="#" class="has-submenu" data-target="conditions-skin">Skin Concerns ›</a></li>
                    <li><a href="#" class="has-submenu" data-target="conditions-body">Body & Hair ›</a></li>
                </ul>
            </div>"""

NEW_MOBILE_PANEL_HEADER = """            <div class="mobile-menu-panel" data-panel="conditions" data-parent="main">
                <div class="panel-header">
                    <button class="panel-back" data-target="main">‹</button>
                    <span class="panel-title">Conditions</span>
                </div>
                <ul class="mobile-nav-list">
                    <li><a href="#" class="has-submenu" data-target="conditions-skin">Skin Concerns ›</a></li>
                    <li><a href="#" class="has-submenu" data-target="conditions-texture">Texture &amp; Tone ›</a></li>
                    <li><a href="#" class="has-submenu" data-target="conditions-body">Body &amp; Hair ›</a></li>
                </ul>
            </div>"""

# ============================================
# OLD SKIN PANEL (with Dark Circles)
# ============================================
OLD_SKIN_PANEL = """            <div class="mobile-menu-panel" data-panel="conditions-skin" data-parent="conditions">
                <div class="panel-header">
                    <button class="panel-back" data-target="conditions">‹</button>
                    <span class="panel-title">Skin Concerns</span>
                </div>
                <ul class="mobile-nav-list">
                    <li><a href="conditions/aging-skin.html">Aging Skin</a></li>
                    <li><a href="conditions/acne-scarring.html">Acne & Scarring</a></li>
                    <li><a href="conditions/pigmentation.html">Pigmentation</a></li>
                    <li><a href="conditions/dark-circles.html">Dark Circles</a></li>
                </ul>
            </div>"""

NEW_SKIN_PANEL = """            <div class="mobile-menu-panel" data-panel="conditions-skin" data-parent="conditions">
                <div class="panel-header">
                    <button class="panel-back" data-target="conditions">‹</button>
                    <span class="panel-title">Skin Concerns</span>
                </div>
                <ul class="mobile-nav-list">
                    <li><a href="conditions/aging-skin.html">Aging Skin</a></li>
                    <li><a href="conditions/acne-scarring.html">Acne &amp; Scarring</a></li>
                    <li><a href="conditions/pigmentation.html">Pigmentation</a></li>
                </ul>
            </div>"""

# ============================================
# OLD BODY PANEL (with Sensitive Skin + Uneven Texture)
# ============================================
OLD_BODY_PANEL = """            <div class="mobile-menu-panel" data-panel="conditions-body" data-parent="conditions">
                <div class="panel-header">
                    <button class="panel-back" data-target="conditions">‹</button>
                    <span class="panel-title">Body & Hair</span>
                </div>
                <ul class="mobile-nav-list">
                    <li><a href="conditions/hair-loss.html">Hair Loss</a></li>
                    <li><a href="conditions/stretch-marks.html">Stretch Marks</a></li>
                    <li><a href="conditions/sensitive-skin.html">Sensitive Skin</a></li>
                    <li><a href="conditions/uneven-texture.html">Uneven Texture</a></li>
                </ul>
            </div>"""

NEW_BODY_PANEL = """            <div class="mobile-menu-panel" data-panel="conditions-body" data-parent="conditions">
                <div class="panel-header">
                    <button class="panel-back" data-target="conditions">‹</button>
                    <span class="panel-title">Body &amp; Hair</span>
                </div>
                <ul class="mobile-nav-list">
                    <li><a href="conditions/hair-loss.html">Hair Loss</a></li>
                    <li><a href="conditions/stretch-marks.html">Stretch Marks</a></li>
                </ul>
            </div>"""

# ============================================
# NEW TEXTURE & TONE PANEL (add after skin panel)
# ============================================
NEW_TEXTURE_PANEL = """            <div class="mobile-menu-panel" data-panel="conditions-texture" data-parent="conditions">
                <div class="panel-header">
                    <button class="panel-back" data-target="conditions">‹</button>
                    <span class="panel-title">Texture &amp; Tone</span>
                </div>
                <ul class="mobile-nav-list">
                    <li><a href="conditions/dark-circles.html">Dark Circles</a></li>
                    <li><a href="conditions/uneven-texture.html">Uneven Texture</a></li>
                    <li><a href="conditions/sensitive-skin.html">Sensitive Skin</a></li>
                </ul>
            </div>"""


def update_file(filepath):
    """Apply all replacements to a single file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    changes = 0

    # 1. Replace desktop dropdown
    if OLD_DESKTOP in content:
        content = content.replace(OLD_DESKTOP, NEW_DESKTOP)
        changes += 1
        print(f"  [OK] Desktop dropdown updated")
    else:
        print(f"  [MISS] Desktop dropdown NOT FOUND")

    # 2. Replace mobile panel header (add Texture & Tone link)
    if OLD_MOBILE_PANEL_HEADER in content:
        content = content.replace(OLD_MOBILE_PANEL_HEADER, NEW_MOBILE_PANEL_HEADER)
        changes += 1
        print(f"  [OK] Mobile panel header updated")
    else:
        print(f"  [MISS] Mobile panel header NOT FOUND")

    # 3. Replace skin panel
    if OLD_SKIN_PANEL in content:
        content = content.replace(OLD_SKIN_PANEL, NEW_SKIN_PANEL)
        changes += 1
        print(f"  [OK] Skin panel updated")
    else:
        print(f"  [MISS] Skin panel NOT FOUND")

    # 4. Replace body panel
    if OLD_BODY_PANEL in content:
        content = content.replace(OLD_BODY_PANEL, NEW_BODY_PANEL)
        changes += 1
        print(f"  [OK] Body panel updated")
    else:
        print(f"  [MISS] Body panel NOT FOUND")

    # 5. Add Texture & Tone panel (after skin panel)
    # Check if it already exists
    if 'data-panel="conditions-texture"' not in content:
        # Insert after the new skin panel closing `</div>`
        insert_after = NEW_SKIN_PANEL
        if insert_after in content:
            content = content.replace(insert_after, insert_after + "\n\n" + NEW_TEXTURE_PANEL)
            changes += 1
            print(f"  [OK] Texture & Tone panel added")
        else:
            print(f"  [MISS] Could not insert Texture & Tone panel (skin panel not found)")
    else:
        print(f"  - Texture & Tone panel already exists")

    if changes > 0:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  >> {changes} changes applied to {filepath.name}")
    else:
        print(f"  >> No changes needed for {filepath.name}")

    return changes > 0


def main():
    print("=" * 60)
    print("Updating Conditions Dropdown to 3 Columns")
    print("=" * 60)

    total_changed = 0
    for filename in HUB_PAGES:
        filepath = ROOT / filename
        if not filepath.exists():
            print(f"\n[{filename}] NOT FOUND")
            continue
        print(f"\n[{filename}]")
        if update_file(filepath):
            total_changed += 1

    print(f"\n{'=' * 60}")
    print(f"Done. {total_changed}/{len(HUB_PAGES)} files updated.")
    print("=" * 60)


if __name__ == "__main__":
    main()
