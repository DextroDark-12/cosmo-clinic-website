#!/usr/bin/env python3
"""Fix logo encoding corruption and normalize navbar structure across all pages."""
import os
import re

ROOT = r"F:\ml_model_webtak\websites\cosmo-skin-clinic"

# Files with corrupted encoding
CORRUPTED = ["gallery.html", "blog.html", "faq.html", "contact.html", "testimonials.html"]

# The corrupted byte sequence (âœ¦) and the correct one (✦)
CORRUPTED_STAR = b'\xc3\xa2\xc5\x93\xc2\xa6'  # âœ¦ (double-encoded)
CORRECT_STAR = b'\xe2\x9c\xa6'                 # ✦ (correct UTF-8)

def fix_file(filepath):
    with open(filepath, 'rb') as f:
        raw = f.read()
    
    # Fix encoding
    if CORRUPTED_STAR in raw:
        raw = raw.replace(CORRUPTED_STAR, CORRECT_STAR)
        with open(filepath, 'wb') as f:
            f.write(raw)
        return True
    return False

# Fix corrupted pages
count = 0
for page in CORRUPTED:
    path = os.path.join(ROOT, page)
    if fix_file(path):
        print(f"  {page} — encoding fixed")
        count += 1
    else:
        print(f"  {page} — already correct")

print(f"\nFixed: {count}/{len(CORRUPTED)} pages")
print("Done")
