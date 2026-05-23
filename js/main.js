(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initMobileMenu();
    initAnimations();
    initSmoothScroll();
    initLazyImages();
    initWhatsAppFloat();
    initContactForm();
  });

  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let ticking = false;

    function updateNavbar() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      ticking = false;
    }

    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    });

    // Check initial scroll position
    updateNavbar();
  }

  function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const closeBtn = document.querySelector('.mobile-menu-close');
    const navContainer = document.querySelector('.mobile-menu-nav');

    if (!toggle || !menu || !overlay || !navContainer) return;

    // State
    let panelHistory = ['main'];
    let lastFocusedElement = null;

    // Get all panels
    function getAllPanels() {
      return document.querySelectorAll('.mobile-menu-panel');
    }

    // Hide all panels
    function hideAllPanels() {
      getAllPanels().forEach(function(panel) {
        panel.classList.remove('active');
      });
    }

    // Show specific panel
    function showPanel(panelId) {
      const panel = document.querySelector('[data-panel="' + panelId + '"]');
      if (!panel) return;
      hideAllPanels();
      panel.classList.add('active');
    }

    // Navigate to panel (push to history)
    function navigateToPanel(panelId) {
      panelHistory.push(panelId);
      showPanel(panelId);
    }

    // Go back one level
    function goBack() {
      if (panelHistory.length > 1) {
        panelHistory.pop();
        const previousPanel = panelHistory[panelHistory.length - 1];
        showPanel(previousPanel);
      } else {
        closeMenu();
      }
    }

    // Reset to main panel
    function resetToMainPanel() {
      panelHistory = ['main'];
      showPanel('main');
    }

    // Open menu
    function openMenu() {
      lastFocusedElement = document.activeElement;
      menu.classList.add('active');
      overlay.classList.add('active');
      document.body.classList.add('menu-open');
      toggle.setAttribute('aria-expanded', 'true');
      menu.setAttribute('aria-hidden', 'false');
      resetToMainPanel();
    }

    // Close menu
    function closeMenu() {
      menu.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
      resetToMainPanel();
      // Return focus to toggle
      if (lastFocusedElement) {
        lastFocusedElement.focus();
      }
    }

    // Toggle menu
    function toggleMenu() {
      if (menu.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    // Toggle button click
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      toggleMenu();
    });

    // Close button click
    if (closeBtn) {
      closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        closeMenu();
      });
    }

    // Overlay click to close
    overlay.addEventListener('click', function(e) {
      e.preventDefault();
      closeMenu();
    });

    // ESC key to close
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && menu.classList.contains('active')) {
        closeMenu();
      }
    });

    // Panel navigation (submenu clicks, back buttons, regular links)
    navContainer.addEventListener('click', function(e) {
      // Handle submenu links
      const submenuLink = e.target.closest('.has-submenu');
      if (submenuLink) {
        e.preventDefault();
        const targetId = submenuLink.getAttribute('data-target');
        if (targetId) {
          navigateToPanel(targetId);
        }
        return;
      }

      // Handle back buttons
      const backButton = e.target.closest('.panel-back');
      if (backButton) {
        e.preventDefault();
        goBack();
        return;
      }

      // Handle regular nav links — close menu before navigation
      const navLink = e.target.closest('.mobile-nav-list a');
      if (navLink) {
        const href = navLink.getAttribute('href');
        if (href && href !== '#') {
          e.preventDefault();

          const hasHash = href.indexOf('#') !== -1;
          const pagePart = hasHash ? href.split('#')[0] : href;
          const hashPart = hasHash ? '#' + href.split('#')[1] : '';
          const currentPage = window.location.pathname.split('/').pop() || 'index.html';

          if (hasHash && (!pagePart || pagePart === currentPage)) {
            // Same-page hash navigation
            closeMenu();
            setTimeout(function() {
              var target = document.querySelector(hashPart);
              if (target) {
                var headerHeight = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 0;
                window.scrollTo({
                  top: target.getBoundingClientRect().top + window.pageYOffset - headerHeight,
                  behavior: 'smooth'
                });
              }
            }, 360);
          } else {
            // Cross-page navigation
            closeMenu();
            setTimeout(function() {
              window.location.href = href;
            }, 300);
          }
        }
        return;
      }
    });
  }

  function initAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length === 0) return;

    // Premium scroll animations with better threshold
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Unobserve after animation for performance
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -30px 0px'
    });

    animatedElements.forEach(function(el) {
      observer.observe(el);
    });
  }

  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href === '#') return;
        
        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          
          const headerHeight = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 0;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  function initLazyImages() {
    // Native lazy loading with fade-in support
    if ('loading' in HTMLImageElement.prototype) {
      // Browser supports native lazy loading
      document.querySelectorAll('img[loading="lazy"]').forEach(function(img) {
        img.addEventListener('load', function() {
          img.classList.add('loaded');
        });
      });
    } else {
      // Fallback for older browsers - just show images
      document.querySelectorAll('img[loading="lazy"]').forEach(function(img) {
        img.classList.add('loaded');
      });
    }
  }

  function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      // Submit lead to the n8n webhook (sends WhatsApp notification via Twilio)
      if (typeof window.submitLeadWithFeedback === 'function') {
        window.submitLeadWithFeedback(data, {
          onSuccess: function () {
            contactForm.reset();
          }
        });
      } else {
        // Fallback if lead-submission.js hasn't loaded
        console.log('Contact form submitted:', data);
        if (window.showToast) {
          showToast('Message sent successfully. We will respond within 24 hours.', 'success');
        }
        contactForm.reset();
      }
    });
  }

  function initWhatsAppFloat() {
    // Add global floating WhatsApp button only if no existing FAB with WhatsApp
    if (document.querySelector('.whatsapp-float')) return;
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/15551234567';
    whatsappBtn.target = '_blank';
    whatsappBtn.rel = 'noopener';
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.setAttribute('aria-label', 'Chat on WhatsApp');
    whatsappBtn.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';

    document.body.appendChild(whatsappBtn);
  }

  window.showToast = function(message, type) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast ' + (type || 'info');
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(function() {
      toast.classList.add('show');
    }, 10);

    setTimeout(function() {
      toast.classList.remove('show');
      setTimeout(function() {
        toast.remove();
      }, 300);
    }, 3000);
  };

})();