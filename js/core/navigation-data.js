/**
 * Navigation Data Structure
 * Centralized source for both desktop and mobile navigation
 * Maximum depth: 3 levels
 * 
 * Level 1: Main navigation items
 * Level 2: Category groups (not clickable pages)
 * Level 3: Final destination links (clickable pages)
 */

const navigationData = {
  main: [
    {
      id: 'home',
      label: 'Home',
      url: 'index.html',
      isPage: true
    },
    {
      id: 'about',
      label: 'About',
      hasSubmenu: true,
      submenu: [
        {
          id: 'about-doctor',
          label: 'Our Doctor',
          url: 'about-doctor.html',
          isPage: true
        },
        {
          id: 'about-clinic',
          label: 'Our Clinic',
          url: 'about-clinic.html',
          isPage: true
        },
        {
          id: 'gallery-sub',
          label: 'Gallery',
          hasSubmenu: true,
          submenu: [
            { id: 'gallery', label: 'Clinic Gallery', url: 'gallery.html#clinic-gallery', isPage: true },
            { id: 'before-after', label: 'Before & After', url: 'gallery.html#before-after', isPage: true },
            { id: 'video-testimonials', label: 'Video Testimonials', url: 'gallery.html#video-testimonials', isPage: true },
            { id: 'client-reviews', label: 'Client Reviews', url: 'gallery.html#client-reviews', isPage: true }
          ]
        },
        { id: 'blog', label: 'Blog', url: 'blog.html', isPage: true },
        { id: 'faq', label: 'FAQ', url: 'faq.html', isPage: true },
        { id: 'contact', label: 'Contact', url: 'contact.html', isPage: true }
      ]
    },
    {
      id: 'treatments',
      label: 'Treatments',
      url: 'treatments.html',
      hasSubmenu: true,
      isPage: true,
      submenu: [
        {
          id: 'skin-treatments',
          label: 'Skin Treatments',
          hasSubmenu: true,
          submenu: [
            { id: 'laser-treatments', label: 'Laser Treatments', url: 'treatments.html', isPage: true },
            { id: 'anti-aging', label: 'Anti Aging', url: 'treatments.html', isPage: true },
            { id: 'acne-solutions', label: 'Acne Solutions', url: 'treatments.html', isPage: true },
            { id: 'skin-rejuvenation', label: 'Skin Rejuvenation', url: 'treatments.html', isPage: true },
            { id: 'pigmentation', label: 'Pigmentation', url: 'treatments.html', isPage: true }
          ]
        },
        {
          id: 'body-hair',
          label: 'Body & Hair',
          hasSubmenu: true,
          submenu: [
            { id: 'hair-treatments', label: 'Hair Treatments', url: 'treatments.html', isPage: true },
            { id: 'medi-facials', label: 'Medi Facials', url: 'treatments.html', isPage: true },
            { id: 'chemical-peels', label: 'Chemical Peels', url: 'treatments.html', isPage: true },
            { id: 'body-contouring', label: 'Body Contouring', url: 'treatments.html', isPage: true },
            { id: 'bridal-skincare', label: 'Bridal Skincare', url: 'treatments.html', isPage: true }
          ]
        }
      ]
    },
    {
      id: 'conditions',
      label: 'Conditions',
      url: 'conditions.html',
      hasSubmenu: true,
      isPage: true,
      submenu: [
        {
          id: 'acne-scars',
          label: 'Acne & Scars',
          hasSubmenu: true,
          submenu: [
            { id: 'active-acne', label: 'Active Acne', url: 'conditions.html', isPage: true },
            { id: 'acne-scars', label: 'Acne Scars', url: 'conditions.html', isPage: true },
            { id: 'post-inflammatory', label: 'Post-Inflammatory Marks', url: 'conditions.html', isPage: true },
            { id: 'enlarged-pores', label: 'Enlarged Pores', url: 'conditions.html', isPage: true }
          ]
        },
        {
          id: 'pigmentation',
          label: 'Pigmentation',
          hasSubmenu: true,
          submenu: [
            { id: 'melasma', label: 'Melasma', url: 'conditions.html', isPage: true },
            { id: 'sun-spots', label: 'Sun Spots', url: 'conditions.html', isPage: true },
            { id: 'hyperpigmentation', label: 'Hyperpigmentation', url: 'conditions.html', isPage: true },
            { id: 'uneven-tone', label: 'Uneven Skin Tone', url: 'conditions.html', isPage: true }
          ]
        },
        {
          id: 'aging-skin',
          label: 'Aging Skin',
          hasSubmenu: true,
          submenu: [
            { id: 'fine-lines', label: 'Fine Lines & Wrinkles', url: 'conditions.html', isPage: true },
            { id: 'loss-elasticity', label: 'Loss of Elasticity', url: 'conditions.html', isPage: true },
            { id: 'age-spots', label: 'Age Spots', url: 'conditions.html', isPage: true },
            { id: 'sagging-skin', label: 'Sagging Skin', url: 'conditions.html', isPage: true }
          ]
        },
        {
          id: 'body-hair-concerns',
          label: 'Body & Hair',
          hasSubmenu: true,
          submenu: [
            { id: 'hair-loss', label: 'Hair Loss', url: 'conditions.html', isPage: true },
            { id: 'stretch-marks', label: 'Stretch Marks', url: 'conditions.html', isPage: true },
            { id: 'sensitive-skin', label: 'Sensitive Skin', url: 'conditions.html', isPage: true },
            { id: 'uneven-texture', label: 'Uneven Texture', url: 'conditions.html', isPage: true }
          ]
        }
      ]
    },
    {
      id: 'gallery',
      label: 'Gallery',
      hasSubmenu: true,
      submenu: [
        {
          id: 'before-after',
          label: 'Before & After',
          hasSubmenu: true,
          submenu: [
            { id: 'hydrafacial-results', label: 'Hydrafacial Results', url: 'gallery.html', isPage: true },
            { id: 'botox-fillers', label: 'Botox & Fillers', url: 'gallery.html', isPage: true },
            { id: 'laser-results', label: 'Laser Treatments', url: 'gallery.html', isPage: true },
            { id: 'rejuvenation-results', label: 'Skin Rejuvenation', url: 'gallery.html', isPage: true }
          ]
        },
        {
          id: 'video-results',
          label: 'Video Results',
          hasSubmenu: true,
          submenu: [
            { id: 'patient-stories', label: 'Patient Stories', url: 'gallery.html#video-testimonials', isPage: true },
            { id: 'treatment-videos', label: 'Treatment Videos', url: 'gallery.html#video-testimonials', isPage: true },
            { id: 'clinic-tour', label: 'Clinic Tour', url: 'gallery.html', isPage: true }
          ]
        }
      ]
    },

    {
      id: 'blog',
      label: 'Blog',
      url: 'blog.html',
      isPage: true
    },
    {
      id: 'faq',
      label: 'FAQ',
      url: 'faq.html',
      isPage: true
    },
    {
      id: 'contact',
      label: 'Contact',
      url: 'contact.html',
      isPage: true
    }
  ],
  
  // Book appointment CTA (not in main nav)
  cta: {
    label: 'Book Appointment',
    url: 'book-appointment.html'
  }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = navigationData;
} else {
  window.navigationData = navigationData;
}