(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initTestimonialSlider();
        initVideoTestimonials();
        initTestimonialFilter();
        initStarRating();
    });

    function initTestimonialSlider() {
        const slider = document.querySelector('.testimonial-slider');
        if (!slider) return;

        const cards = slider.querySelectorAll('.testimonial-card');
        if (cards.length <= 1) return;

        let currentIndex = 0;

        const prevBtn = document.createElement('button');
        prevBtn.className = 'slider-btn slider-prev';
        prevBtn.innerHTML = '‹';
        prevBtn.setAttribute('aria-label', 'Previous');

        const nextBtn = document.createElement('button');
        nextBtn.className = 'slider-btn slider-next';
        nextBtn.innerHTML = '›';
        nextBtn.setAttribute('aria-label', 'Next');

        slider.appendChild(prevBtn);
        slider.appendChild(nextBtn);

        function showCard(index) {
            cards.forEach((card, i) => {
                card.style.display = i === index ? 'block' : 'none';
            });
        }

        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            showCard(currentIndex);
        });

        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % cards.length;
            showCard(currentIndex);
        });

        setInterval(function() {
            currentIndex = (currentIndex + 1) % cards.length;
            showCard(currentIndex);
        }, 5000);
    }

    function initVideoTestimonials() {
        const videoCards = document.querySelectorAll('.video-card');
        
        videoCards.forEach(function(card) {
            card.addEventListener('click', function() {
                const title = this.querySelector('h4') ? this.querySelector('h4').textContent : 'Video';
                openVideoModal(title);
            });
        });
    }

    function openVideoModal(title) {
        const modal = document.createElement('div');
        modal.className = 'video-modal';
        modal.innerHTML = '<div class="video-modal-content"><button class="close-modal">&times;</button><div class="video-placeholder"></div><h3>' + title + '</h3></div>';
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal || e.target.classList.contains('close-modal')) {
                modal.remove();
                document.body.style.overflow = '';
            }
        });
    }

    function initTestimonialFilter() {
        const filterBtns = document.querySelectorAll('.testimonial-filter');
        
        filterBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                const filter = this.dataset.filter;
                
                filterBtns.forEach(function(b) { b.classList.remove('active'); });
                this.classList.add('active');
                
                const cards = document.querySelectorAll('.testimonial-card');
                cards.forEach(function(card) {
                    const type = card.dataset.type || 'all';
                    card.style.display = (filter === 'all' || type === filter) ? 'block' : 'none';
                });
            });
        });
    }

    function initStarRating() {
        const ratingInputs = document.querySelectorAll('.rating-input');
        
        ratingInputs.forEach(function(input) {
            input.addEventListener('change', function() {
                console.log('Rating selected:', this.value);
            });
        });
    }

    window.submitTestimonial = function(form) {
        const name = form.name ? form.name.value : '';
        const message = form.message ? form.message.value : '';
        const rating = form.rating ? form.rating.value : '';
        
        console.log('Testimonial submitted:', { name, message, rating });
        
        if (window.showToast) {
            showToast('Thank you for your testimonial!', 'success');
        }
        
        form.reset();
        return false;
    };

})();