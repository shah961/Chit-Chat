/**
 * CHIT CHAAT - CORE APPLICATION SCRIPT
 * Production vanilla JavaScript for navigation, form validation, accessibility, and interactive behaviors.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initContactFormValidation();
  initHeaderScrollEffect();
});

/**
 * Mobile Navigation Drawer Management
 * Fully keyboard accessible & strict tap/click toggle (NO SWIPE DRAG)
 */
function initMobileNavigation() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburgerBtn || !mobileMenu || !mobileOverlay) return;

  function openMenu() {
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background page scroll
  }

  function closeMenu() {
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    const isOpen = hamburgerBtn.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // Hamburger Click
  hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close when clicking overlay
  mobileOverlay.addEventListener('click', closeMenu);

  // Close when clicking any navigation link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburgerBtn.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      hamburgerBtn.focus();
    }
  });
}

/**
 * Sticky Header Scroll State Styling
 */
function initHeaderScrollEffect() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
    } else {
      header.style.boxShadow = 'none';
    }
  }, { passive: true });
}

/**
 * Contact Form Validation & Safe Handling
 * Frontend-only handling without pretending email was dispatched.
 */
function initContactFormValidation() {
  const contactForm = document.getElementById('contact-form');
  const feedbackMsg = document.getElementById('form-feedback');

  if (!contactForm || !feedbackMsg) return;

  const nameInput = document.getElementById('form-name');
  const contactInput = document.getElementById('form-contact');
  const messageInput = document.getElementById('form-message');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Reset error states
    document.querySelectorAll('.form-group').forEach(group => group.classList.remove('has-error'));
    feedbackMsg.className = 'form-feedback-message';
    feedbackMsg.textContent = '';

    // Validate Name
    if (!nameInput.value.trim()) {
      showError(nameInput);
      isValid = false;
    }

    // Validate Contact Info
    if (!contactInput.value.trim()) {
      showError(contactInput);
      isValid = false;
    }

    // Validate Message
    if (!messageInput.value.trim()) {
      showError(messageInput);
      isValid = false;
    }

    if (isValid) {
      // Safe, transparent output
      const sanitizedName = escapeHTML(nameInput.value.trim());
      feedbackMsg.className = 'form-feedback-message success';
      feedbackMsg.innerHTML = `Thank you, <strong>${sanitizedName}</strong>! Your enquiry draft is prepared. For immediate assistance or direct bookings, please call us directly at <strong>+92 42 111 124 228</strong>.`;
      contactForm.reset();
    }
  });

  function showError(inputElement) {
    const formGroup = inputElement.closest('.form-group');
    if (formGroup) {
      formGroup.classList.add('has-error');
    }
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
}
