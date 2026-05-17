(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initMobileMenu();
    initAnimations();
    initSmoothScroll();
    initFloatingBar();
    initLazyImages();
    initWhatsAppFloat();
    initContactForm();
  });

  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.navbar-nav');
    const mainPanel = document.querySelector('.panel-main');

    if (toggle && nav) {
      toggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        document.body.classList.toggle('menu-open');

        const spans = toggle.querySelectorAll('span');
        if (nav.classList.contains('active')) {
          spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
          // Reset panels to main when opening
          if (mainPanel) {
            document.querySelectorAll('.panel-sub').forEach(function(panel) {
              panel.classList.remove('active');
            });
            mainPanel.classList.remove('slid-out');
            mainPanel.classList.add('active');
          }
        } else {
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      });

      // Panel navigation - attach directly to nav container
      const panelContainer = nav;
      if (panelContainer) {
        // Handle submenu links (About, Treatments, Conditions)
        panelContainer.addEventListener('click', function(e) {
          // Check if clicked on a has-submenu anchor
          const targetLink = e.target.closest('.has-submenu > a');
          if (targetLink) {
            e.preventDefault();
            const targetId = targetLink.getAttribute('data-target');
            if (targetId) {
              const targetPanel = document.getElementById('panel-' + targetId);
              if (targetPanel && mainPanel) {
                mainPanel.classList.remove('active');
                mainPanel.classList.add('slid-out');
                targetPanel.classList.add('active');
              }
            }
          }
        });

        // Handle back button
        panelContainer.addEventListener('click', function(e) {
          const backButton = e.target.closest('.panel-back-btn');
          if (backButton) {
            const currentPanel = backButton.closest('.panel-sub');
            if (currentPanel && mainPanel) {
              currentPanel.classList.remove('active');
              mainPanel.classList.remove('slid-out');
              mainPanel.classList.add('active');
            }
          }
        });
      }

      document.addEventListener('click', function(e) {
        if (!toggle.contains(e.target) && !nav.contains(e.target)) {
          nav.classList.remove('active');
          document.body.classList.remove('menu-open');
          const spans = toggle.querySelectorAll('span');
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      });
    }
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

      console.log('Contact form submitted:', data);

      if (window.showToast) {
        showToast('Message sent successfully. We will respond within 24 hours.', 'success');
      }

      contactForm.reset();
    });
  }

  function initWhatsAppFloat() {
    // Add global floating WhatsApp button only if no existing FAB with WhatsApp
    if (document.querySelector('.whatsapp-float')) return;
    if (document.querySelector('.floating-action-bar .fab-btn.whatsapp')) return;

    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/15551234567';
    whatsappBtn.target = '_blank';
    whatsappBtn.rel = 'noopener';
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.setAttribute('aria-label', 'Chat on WhatsApp');
    whatsappBtn.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';

    document.body.appendChild(whatsappBtn);
  }

  function initFloatingBar() {
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