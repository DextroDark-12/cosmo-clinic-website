document.addEventListener('DOMContentLoaded', function() {
    initVideoCards();
    initGalleryHover();
    initGalleryLightbox();
});

function initVideoCards() {
    const videoCards = document.querySelectorAll('.video-card');

    videoCards.forEach(function(card) {
        card.addEventListener('click', function() {
            var videoSrc = this.getAttribute('data-video-src');
            var label = this.querySelector('.video-label')?.textContent || 'Video Testimonial';
            var sub = this.querySelector('.video-sub')?.textContent || '';

            if (videoSrc) {
                openVideoPlayer(videoSrc, label);
            } else {
                openVideoPlaceholder(label, sub);
            }
        });
    });
}

function openVideoPlayer(src, label) {
    var lightbox = document.createElement('div');
    lightbox.className = 'lightbox-modal lightbox-video-player';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');

    lightbox.innerHTML = '<div class="lightbox-content">' +
        '<button class="lightbox-close" aria-label="Close">&times;</button>' +
        '<div class="video-player-container">' +
        '<video class="lightbox-video-element" controls autoplay playsinline>' +
        '<source src="' + src + '" type="video/mp4">' +
        '</video>' +
        '</div>' +
        '<h3>' + label + '</h3>' +
        '</div>';

    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';

    function closeHandler(e) {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            closeVideoPlayer(lightbox);
        }
    }

    function keyHandler(e) {
        if (e.key === 'Escape') closeVideoPlayer(lightbox);
    }

    lightbox.addEventListener('click', closeHandler);
    document.addEventListener('keydown', keyHandler);

    setTimeout(function() {
        var closeBtn = lightbox.querySelector('.lightbox-close');
        if (closeBtn) closeBtn.focus();
    }, 100);
}

function closeVideoPlayer(lightbox) {
    var video = lightbox.querySelector('.lightbox-video-element');
    if (video) {
        video.pause();
        video.removeAttribute('src');
        video.load();
    }
    lightbox.remove();
    document.body.style.overflow = '';
}

function initGalleryHover() {
    // Gallery tile hover brightness is now handled via CSS
    // .gallery-hero-tile:hover .gallery-hero-placeholder,
    // .gallery-support-tile:hover .gallery-support-placeholder
}

function initGalleryLightbox() {
    const galleryTiles = document.querySelectorAll('.gallery-hero-tile, .gallery-support-tile, .ba-featured-card');

    galleryTiles.forEach(function(tile) {
        tile.addEventListener('click', function(e) {
            // Only open lightbox on mobile/tablet (≤1024px)
            // Desktop: hover-only atmospheric experience
            if (window.innerWidth > 1024) return;

            let title, desc;
            // Check for data attributes (ba-featured-card pattern)
            if (this.dataset.title) {
                title = this.dataset.title;
                desc = this.dataset.desc || '';
            } else {
                title = this.querySelector('.tile-caption h3')?.textContent || 'Gallery Image';
                desc = this.querySelector('.tile-caption p')?.textContent || '';
            }

            const img = this.querySelector('img');
            const imgSrc = img ? img.getAttribute('src') : null;
            openLightbox(title, desc, imgSrc);
        });
    });
}

function openLightbox(title, description, imgSrc) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-modal';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');

    // Build the lightbox-image content: render actual image if src available
    var imageHtml = '';
    if (imgSrc) {
        imageHtml = '<img class="lightbox-image" src="' + imgSrc + '" alt="' + title + '">';
    } else {
        imageHtml = '<div class="lightbox-image lightbox-image-fallback" style="background: linear-gradient(135deg, var(--color-bg-secondary), var(--color-bg-card));"></div>';
    }

    lightbox.innerHTML = '<div class="lightbox-content">' +
        '<button class="lightbox-close" aria-label="Close">&times;</button>' +
        imageHtml +
        '<h3>' + title + '</h3>' +
        '<p>' + description + '</p>' +
        '</div>';

    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';

    function closeHandler(e) {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            closeLightbox();
        }
    }

    function keyHandler(e) {
        if (e.key === 'Escape') closeLightbox();
    }

    lightbox.addEventListener('click', closeHandler);
    document.addEventListener('keydown', keyHandler);

    // Focus the close button
    setTimeout(function() {
        const closeBtn = lightbox.querySelector('.lightbox-close');
        if (closeBtn) closeBtn.focus();
    }, 100);
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox-modal');
    if (lightbox) {
        lightbox.remove();
        document.body.style.overflow = '';
    }
}

function openVideoPlaceholder(label, sub) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-modal';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.innerHTML = '<div class="lightbox-content lightbox-video">' +
        '<button class="lightbox-close" aria-label="Close">&times;</button>' +
        '<div class="video-placeholder-frame">' +
        '<div class="video-placeholder-icon">✦</div>' +
        '<div class="video-placeholder-play"></div>' +
        '<span class="video-placeholder-label">' + label + '</span>' +
        '<span class="video-placeholder-sub">' + sub + '</span>' +
        '</div>' +
        '</div>';

    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';

    function closeHandler(e) {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            closeLightbox();
        }
    }

    function keyHandler(e) {
        if (e.key === 'Escape') closeLightbox();
    }

    lightbox.addEventListener('click', closeHandler);
    document.addEventListener('keydown', keyHandler);

    setTimeout(function() {
        const closeBtn = lightbox.querySelector('.lightbox-close');
        if (closeBtn) closeBtn.focus();
    }, 100);
}
