#!/usr/bin/env python3
"""Remove ALL legacy floating action bar HTML, CSS, and JS globally.
Keep ONLY the whatsapp-float button."""

import os
import re

ROOT = r"F:\ml_model_webtak\websites\cosmo-skin-clinic"

def remove_fab_html(filepath):
    """Remove <div class="floating-action-bar">...</div> blocks from HTML."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    count_before = content.count('floating-action-bar')
    if count_before == 0:
        return False
    
    # Remove from <div class="floating-action-bar" to the matching </div>
    # Use regex: find opening div, then match balanced nested divs
    pattern = r'<div\s+class="floating-action-bar"[^>]*>.*?</div>\s*'
    new_content = re.sub(pattern, '', content, count=1, flags=re.DOTALL)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False


def remove_fab_css(filepath):
    """Remove FAB-related CSS rules from components.css."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove the floating-action-bar block + fab-btn block + all sub-rules
    # These are lines 725-787 (from .floating-action-bar to .fab-btn:hover .tooltip)
    css_block = """.floating-action-bar {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 999;
}

.fab-btn {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  cursor: pointer;
  transition: var(--transition);
  position: relative;
  border: none;
}

.fab-btn.whatsapp {
  background: var(--color-bg-secondary);
  color: var(--color-gold);
  border: 1px solid var(--color-border);
}

.fab-btn.call {
  background: var(--color-gold);
  color: var(--color-bg);
}

.fab-btn.appointment {
  background: var(--color-bg-card);
  color: var(--color-gold);
  border: 2px solid var(--color-gold);
}

.fab-btn:hover {
  transform: scale(1.1);
}

.fab-btn .tooltip {
  position: absolute;
  right: 60px;
  background: var(--color-bg-secondary);
  color: var(--color-white);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: var(--transition);
}

.fab-btn:hover .tooltip {
  opacity: 1;
  visibility: visible;
}
"""
    content = content.replace(css_block, '')
    
    # Remove mobile media query rule
    mobile_rule = """  .fab-btn .tooltip {
    display: none;
  }
"""
    content = content.replace(mobile_rule, '')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    return True


def remove_fab_js(filepath):
    """Remove FAB-related JS code from main.js."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove initFloatingBar call from DOMContentLoaded
    content = content.replace('    initFloatingBar();\n', '')
    
    # Remove the .fab-btn check in initWhatsAppFloat
    old_whatsapp_check = """    if (document.querySelector('.floating-action-bar .fab-btn.whatsapp')) return;

"""
    content = content.replace(old_whatsapp_check, '')
    
    # Remove the initFloatingBar function
    fab_func = """  function initFloatingBar() {
    const whatsappBtn = document.querySelector('.fab-btn.whatsapp');
    const callBtn = document.querySelector('.fab-btn.call');
    const appointmentBtn = document.querySelector('.fab-btn.appointment');

    if (whatsappBtn) {
      whatsappBtn.addEventListener('click', function() {
        window.open('https://wa.me/919999999999', '_blank');
      });
    }

    if (callBtn) {
      callBtn.addEventListener('click', function() {
        window.location.href = 'tel:+919999999999';
      });
    }

    if (appointmentBtn) {
      appointmentBtn.addEventListener('click', function() {
        const bookingSection = document.querySelector('#book-appointment, .booking-section, #booking');
        if (bookingSection) {
          bookingSection.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.href = 'book-appointment.html';
        }
      });
    }
  }

"""
    content = content.replace(fab_func, '')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    return True


# ── EXECUTION ──────────────────────────────────────────

print("=== Removing legacy floating action bars ===\n")

# 1. HTML — all root pages + treatment pages + templates
html_files = []
for f in os.listdir(ROOT):
    if f.endswith('.html'):
        html_files.append(os.path.join(ROOT, f))
treat_dir = os.path.join(ROOT, 'treatments')
if os.path.isdir(treat_dir):
    for f in os.listdir(treat_dir):
        if f.endswith('.html'):
            html_files.append(os.path.join(treat_dir, f))
templates_dir = os.path.join(ROOT, 'templates')
if os.path.isdir(templates_dir):
    for f in os.listdir(templates_dir):
        if f.endswith('.html'):
            html_files.append(os.path.join(templates_dir, f))

html_count = 0
for path in html_files:
    if remove_fab_html(path):
        html_count += 1
        print(f"  [HTML] {os.path.relpath(path, ROOT)}")

print(f"\nHTML files cleaned: {html_count}")

# 2. CSS
css_path = os.path.join(ROOT, 'css', 'components.css')
remove_fab_css(css_path)
print("  [CSS] components.css — FAB styles removed")

# 3. JS
js_path = os.path.join(ROOT, 'js', 'main.js')
remove_fab_js(js_path)
print("  [JS] main.js — FAB initialization removed")

print("\n=== Done ===")
