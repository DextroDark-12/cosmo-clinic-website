document.addEventListener('DOMContentLoaded', function() {
    initGalleryFilter();
    initGalleryLightbox();
    initGalleryHover();
});

function initGalleryFilter() {
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryTabs.length === 0 || galleryItems.length === 0) return;
    
    galleryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            galleryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            galleryItems.forEach(item => {
                const category = item.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h4')?.textContent || 'Gallery Image';
            const category = this.dataset.category;
            
            openLightbox(title, category);
        });
    });
}

function initGalleryHover() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.gallery-overlay').style.opacity = '1';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('.gallery-overlay').style.opacity = '0';
        });
    });
}

function openLightbox(title, category) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-modal';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <div class="lightbox-image" style="background: linear-gradient(135deg, var(--color-charcoal), var(--color-gold));"></div>
            <h3>${title}</h3>
            <p>${category}</p>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox-modal');
    if (lightbox) {
        lightbox.remove();
        document.body.style.overflow = '';
    }
}

function loadMoreGallery() {
    console.log('Loading more gallery items...');
}

function filterResults(type) {
    console.log('Filtering results by:', type);
}