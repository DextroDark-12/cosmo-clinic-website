#!/usr/bin/env python3
import re

ROOT = r"F:\ml_model_webtak\websites\cosmo-skin-clinic"

with open(f"{ROOT}/index.html", "r", encoding="utf-8") as f:
    idx = f.read()

m = re.search(
    r'class="dropdown treatments-dropdown">.*?<a href="treatments.html".*?Treatments</a>\s*(.*?)</div>\s*</div>\s*<div class="dropdown conditions-dropdown">',
    idx, re.DOTALL
)
if m:
    print("=== INDEX.HTML TREATMENTS DROPDOWN ===")
    print(m.group(1)[:1500])
else:
    print("Pattern not found for index.html")

with open(f"{ROOT}/treatments/carbon-facial.html", "r", encoding="utf-8") as f:
    cf = f.read()

m = re.search(
    r'class="dropdown treatments-dropdown">.*?<a href="../treatments.html".*?Treatments</a>\s*(.*?)</div>\s*</div>\s*<div class="dropdown conditions-dropdown">',
    cf, re.DOTALL
)
if m:
    print("\n=== CARBON-FACIAL.HTML TREATMENTS DROPDOWN ===")
    print(m.group(1)[:1500])
else:
    print("\nPattern not found for carbon-facial.html")

with open(f"{ROOT}/treatments/anti-aging-facial.html", "r", encoding="utf-8") as f:
    aaf = f.read()

m = re.search(
    r'class="dropdown treatments-dropdown">.*?<a href="../treatments.html".*?Treatments</a>\s*(.*?)</div>\s*</div>\s*<div class="dropdown conditions-dropdown">',
    aaf, re.DOTALL
)
if m:
    print("\n=== ANTI-AGING-FACIAL.HTML TREATMENTS DROPDOWN ===")
    print(m.group(1)[:1500])
else:
    print("\nPattern not found for anti-aging-facial.html")
