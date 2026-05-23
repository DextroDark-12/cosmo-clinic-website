#!/usr/bin/env python3
"""Compare navbar blocks across pages to find structural differences."""
import os
import re

ROOT = r"F:\ml_model_webtak\websites\cosmo-skin-clinic"

PAGES = ["index.html", "gallery.html", "blog.html", "faq.html", 
         "contact.html", "testimonials.html", "treatments.html",
         "about-doctor.html", "about-clinic.html", "conditions.html"]

def get_nav_block(filepath):
    with open(filepath, 'rb') as f:
        raw = f.read()
    # Normalize encoding for text comparison
    raw = raw.replace(b'\xc3\xa2\xc5\x93\xc2\xa6', b'\xe2\x9c\xa6')
    text = raw.decode('utf-8')
    m = re.search(r'<nav class="navbar">(.*?)</nav>', text, re.DOTALL)
    if m:
        return m.group(1)
    return None

# Compare
baseline = get_nav_block(os.path.join(ROOT, "index.html"))
if baseline:
    print(f"Index navbar content length: {len(baseline)} chars")
    print()

for page in PAGES:
    path = os.path.join(ROOT, page)
    nav = get_nav_block(path)
    if nav is None:
        print(f"{page}: NO NAVBAR FOUND")
        continue
    
    # Compare structure
    same = nav == baseline
    len_diff = len(nav) - len(baseline)
    
    # Count key elements
    logo_spans = nav.count('<span class="logo-text">')
    dropdowns = nav.count('class="dropdown')
    nav_links = len(re.findall(r'<a[^>]*>', nav))
    
    print(f"{page:25s}: structure={'OK' if same else 'DIFFERS'}, "
          f"len_diff={len_diff:+d}, logo_spans={logo_spans}, "
          f"dropdowns={dropdowns}, links={nav_links}")
