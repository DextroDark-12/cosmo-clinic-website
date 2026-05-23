#!/usr/bin/env python3
"""
Clean UI elements from home-page.png - FINAL VERSION

Removes fake navbar, hero text, CTAs, icons, and UI panels
from the homepage screenshot, transforming it into a pure
editorial clinic environmental scene.

Uses OpenCV Telea inpainting with targeted masking.
Color refinement is blended ONLY into inpainted areas.
"""

import cv2
import numpy as np
import os
import sys

INPUT_PATH = 'assets/images/home-page.png'
OUTPUT_PATH = 'assets/images/home-page-cleaned.png'

# ============================================================
# STEP 1: Load image
# ============================================================
print("STEP 1: Loading image...")

img = cv2.imread(INPUT_PATH)
if img is None:
    print("ERROR: Could not read image")
    sys.exit(1)

h, w = img.shape[:2]
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
print(f"Image: {w}x{h} | Luma mean={np.mean(gray):.1f} std={np.std(gray):.1f}")

# ============================================================
# STEP 2: Create UI element mask
# ============================================================
print("\nSTEP 2: Creating UI mask...")

mask = np.zeros((h, w), dtype=np.uint8)

# --- Detection: brightness threshold for text/buttons ---
luma_mean = np.mean(gray)
luma_std = np.std(gray)
threshold = int(luma_mean + luma_std * 0.35)
_, bright = cv2.threshold(gray, threshold, 255, cv2.THRESH_BINARY)
print(f"  Bright threshold ({threshold}): capture {100*np.sum(bright>0)/(h*w):.1f}%")

# --- Edge detection for UI boundaries ---
edges = cv2.Canny(gray, 25, 70)
detected = cv2.bitwise_or(bright, edges)

# Clean
detected = cv2.morphologyEx(detected, cv2.MORPH_OPEN, np.ones((2,2), np.uint8))
detected = cv2.dilate(detected, np.ones((4,4), np.uint8), iterations=1)

# --- Manual targeted regions ---
manual = np.zeros((h, w), dtype=np.uint8)
# Navbar
cv2.rectangle(manual, (0, 0), (w, 60), 255, -1)
# Right nav icons
cv2.rectangle(manual, (w-150, 60), (w, 130), 255, -1)
# Hero headline
cv2.rectangle(manual, (40, 245), (620, 355), 255, -1)
# Subheadline
cv2.rectangle(manual, (40, 365), (500, 430), 255, -1)
# Lower cards/CTAs
cv2.rectangle(manual, (25, 555), (w-25, 690), 255, -1)
# Footer
cv2.rectangle(manual, (0, h-65), (w, h), 255, -1)

print(f"  Manual regions: {100*np.sum(manual>0)/(h*w):.1f}%")

# Combine
mask = cv2.bitwise_or(detected, manual)
total_pct = 100 * np.sum(mask>0) / (h*w)
print(f"  TOTAL masked: {total_pct:.1f}%")

# Soften edges
mask = cv2.GaussianBlur(mask, (3,3), 0.5)
mask = cv2.threshold(mask, 128, 255, cv2.THRESH_BINARY)[1]

cv2.imwrite('assets/images/debug_mask.png', mask)

# ============================================================
# STEP 3: Apply inpainting (radius 3 - conservative)
# ============================================================
print("\nSTEP 3: Inpainting...")
inpainted = cv2.inpaint(img, mask, 3, cv2.INPAINT_TELEA)
print("  Telea inpainting done")

# ============================================================
# STEP 4: Color refinement (applied ONLY to inpainted areas)
# ============================================================
print("\nSTEP 4: Color refinement...")

# Work on inpainting result
result = inpainted.copy()

# HSV adjustment
hsv = cv2.cvtColor(result, cv2.COLOR_BGR2HSV)
h_ch, s, v = cv2.split(hsv)

# Reduce saturation by 15%
s = cv2.addWeighted(s, 0.85, np.zeros_like(s), 0, 0)

# Slightly lift brightness in dark areas
v = cv2.addWeighted(v, 1.05, np.zeros_like(v), 0, 3)

hsv_adjusted = cv2.merge([h_ch, s, v])
color_adjusted = cv2.cvtColor(hsv_adjusted, cv2.COLOR_HSV2BGR)

# Feather the mask for smooth transition
mask_float = mask.astype(np.float32) / 255.0
mask_float = cv2.GaussianBlur(mask_float, (7, 7), 2)
mask_float = np.clip(mask_float, 0, 1)

# Blend: use color-adjusted version in masked areas, original elsewhere
for c in range(3):
    result[:,:,c] = (color_adjusted[:,:,c] * mask_float + 
                     img[:,:,c] * (1 - mask_float))

# ============================================================
# STEP 5: STATS CHECK - verify saturation/brightness
# ============================================================
print("\nSTEP 5: Quality verification...")

orig_hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
result_hsv = cv2.cvtColor(result, cv2.COLOR_BGR2HSV)

orig_s_mean = np.mean(orig_hsv[:,:,1])
result_s_mean = np.mean(result_hsv[:,:,1])
orig_v_mean = np.mean(orig_hsv[:,:,2])
result_v_mean = np.mean(result_hsv[:,:,2])

print(f"  Saturation: {orig_s_mean:.1f} -> {result_s_mean:.1f}")
print(f"  Brightness: {orig_v_mean:.1f} -> {result_v_mean:.1f}")

# Check unmasked areas are preserved
unmasked = (mask == 0)
if np.any(unmasked):
    diff = cv2.absdiff(result, img)
    diff_gray = cv2.cvtColor(diff, cv2.COLOR_BGR2GRAY)
    unmasked_diff = np.mean(diff_gray[unmasked])
    masked_diff = np.mean(diff_gray[mask > 0])
    print(f"  Unmasked areas change: {unmasked_diff:.2f}")
    print(f"  Masked areas change:   {masked_diff:.2f}")
    
    if unmasked_diff < 3:
        print("  QUALITY: PASS - background preserved")
    else:
        print(f"  QUALITY: WARN - background changed by {unmasked_diff:.1f}")

# ============================================================
# STEP 6: Save
# ============================================================
print("\nSTEP 6: Saving...")
cv2.imwrite(OUTPUT_PATH, result)
print(f"  Saved: {OUTPUT_PATH} ({os.path.getsize(OUTPUT_PATH)} bytes)")
print(f"  Original:    {os.path.getsize(INPUT_PATH)} bytes")
print("Done")
