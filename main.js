/**
 * main.js - Application Entry Point
 * Orchestrates modules, initializes icons, and binds global events
 */

import { initTheme } from './theme.js';
import { initNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initContactForm } from './contact.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Theme (Dark / Light / System)
  initTheme();

  // 2. Initialize Sticky Navbar, Active Indicator & Mobile Drawer
  initNavigation();

  // 3. Initialize Animations, Typing Effect, 3D Tilt & Particles
  initAnimations();

  // 4. Initialize Contact Form & Formspree Validation
  initContactForm();

  // 5. Initialize Lucide Icons if available
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  // 6. Set dynamic copyright year in footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear().toString();
  }

  // 7. Prevent layout jump on external links
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    if (!link.getAttribute('rel')) {
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

  console.log('%c Alaa Ayman • Full-Stack Developer Portfolio %c Ready ', 'background: #005A9C; color: #fff; border-radius: 3px 0 0 3px; padding: 4px 8px; font-weight: bold;', 'background: #60C1E5; color: #000; border-radius: 0 3px 3px 0; padding: 4px 8px; font-weight: bold;');
});
