/**
 * Before/After Comparison Slider
 * Lightweight, touch-friendly comparison component
 */
(function() {
  'use strict';

  class ComparisonSlider {
    constructor(element) {
      this.slider = element;
      this.before = this.slider.querySelector('.comparison-before');
      this.handle = this.slider.querySelector('.comparison-handle');
      this.isDragging = false;

      this.init();
    }

    init() {
      // Mouse events
      this.slider.addEventListener('mousedown', (e) => this.startDrag(e));
      document.addEventListener('mousemove', (e) => this.drag(e));
      document.addEventListener('mouseup', () => this.stopDrag());

      // Touch events
      this.slider.addEventListener('touchstart', (e) => this.startDrag(e), { passive: true });
      document.addEventListener('touchmove', (e) => this.drag(e), { passive: true });
      document.addEventListener('touchend', () => this.stopDrag());

      // Click to jump
      this.slider.addEventListener('click', (e) => this.jumpTo(e));
    }

    startDrag(e) {
      e.preventDefault();
      this.isDragging = true;
      this.slider.classList.add('dragging');
    }

    stopDrag() {
      this.isDragging = false;
      this.slider.classList.remove('dragging');
    }

    drag(e) {
      if (!this.isDragging) return;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const rect = this.slider.getBoundingClientRect();
      let percentage = ((clientX - rect.left) / rect.width) * 100;

      // Clamp between 0 and 100
      percentage = Math.max(0, Math.min(100, percentage));

      this.updatePosition(percentage);
    }

    jumpTo(e) {
      if (e.target.closest('.comparison-handle')) return;

      const rect = this.slider.getBoundingClientRect();
      let percentage = ((e.clientX - rect.left) / rect.width) * 100;
      percentage = Math.max(0, Math.min(100, percentage));

      this.updatePosition(percentage);
    }

    updatePosition(percentage) {
      this.handle.style.left = percentage + '%';
      this.before.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    }
  }

  // Initialize all comparison sliders
  document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.comparison-slider');
    sliders.forEach(slider => new ComparisonSlider(slider));
  });
})();