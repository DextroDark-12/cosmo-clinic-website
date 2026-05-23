import os
import glob

root = r'F:\ml_model_webtak\websites\cosmo-skin-clinic'

html_files = []
for pattern in ['*.html', 'blogs/*.html', 'treatments/*.html', 'conditions/*.html']:
    html_files.extend(glob.glob(os.path.join(root, pattern)))

changed = []

for fp in html_files:
    name = os.path.basename(fp)
    if name.startswith('.'):
        continue

    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Root-level: gallery.html → gallery.html#section
    # Subdirectory: ../gallery.html → ../gallery.html#section
    for prefix in ['gallery.html', '../gallery.html']:
        content = content.replace(
            '<li><a href="' + prefix + '">Clinic Gallery</a></li>',
            '<li><a href="' + prefix + '#clinic-gallery">Clinic Gallery</a></li>'
        )
        content = content.replace(
            '<li><a href="' + prefix + '">Before & After</a></li>',
            '<li><a href="' + prefix + '#before-after">Before & After</a></li>'
        )

    if content != original:
        with open(fp, 'w', encoding='utf-8') as f:
            f.write(content)
        changed.append(name)

print("=== Changed files ===")
for name in sorted(set(changed)):
    print(name)
print(f"\nTotal changed: {len(set(changed))}")
