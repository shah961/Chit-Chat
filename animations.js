/**
 * CHIT CHAAT - PERFORMANCE-OPTIMIZED ANIMATIONS
 * Lightweight entrance & reveal animations using CSS classes and IntersectionObserver.
 * Fully respects user prefers-reduced-motion settings.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return; // Skip non-essential animation logic for accessible preference
  }

  initScrollRevealAnimations();
});

/**
 * Scroll Reveal Animation Observer
 */
function initScrollRevealAnimations() {
  const elementsToAnimate = document.querySelectorAll('.food-card, .feature-card, .menu-category-card, .info-card');

  if (!('IntersectionObserver' in window)) return;

  // Prepare initial hidden state styling via JavaScript to prevent unstyled flash if JS disabled
  elementsToAnimate.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target); // Animate once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elementsToAnimate.forEach(el => observer.observe(el));
}
