/**
 * navigation.js - Navigation, Scroll Spy, Mobile Drawer & Scroll Progress
 */

export function initNavigation() {
  const navbar = document.getElementById('main-navbar');
  const scrollProgress = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  // 1. Scroll Progress Bar & Sticky Header
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    if (scrollProgress) {
      scrollProgress.style.width = `${progress}%`;
    }

    // Sticky navbar backdrop styling
    if (navbar) {
      if (scrollTop > 40) {
        navbar.classList.add('shadow-lg', 'shadow-brand-navy-950/20', 'backdrop-blur-md');
      } else {
        navbar.classList.remove('shadow-lg', 'shadow-brand-navy-950/20');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollTop > 400) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
        backToTopBtn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
        backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
      }
    }
  }, { passive: true });

  // 2. Back to top button click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 3. Active Section Indicator (Scroll Spy)
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -65% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        setActiveNavLink(id);
      }
    });
  }, observerOptions);

  sections.forEach(sec => sectionObserver.observe(sec));

  function setActiveNavLink(activeId) {
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const targetId = href ? href.replace('#', '') : '';
      if (targetId === activeId) {
        link.classList.add('active-nav-item', 'text-brand-cyan', 'dark:text-brand-cyan', 'font-semibold');
        link.classList.remove('text-slate-600', 'dark:text-slate-300');
        // If link has an underline indicator
        const indicator = link.querySelector('.nav-indicator');
        if (indicator) indicator.classList.remove('scale-x-0');
      } else {
        link.classList.remove('active-nav-item', 'text-brand-cyan', 'dark:text-brand-cyan', 'font-semibold');
        link.classList.add('text-slate-600', 'dark:text-slate-300');
        const indicator = link.querySelector('.nav-indicator');
        if (indicator) indicator.classList.add('scale-x-0');
      }
    });

    mobileNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      const targetId = href ? href.replace('#', '') : '';
      if (targetId === activeId) {
        link.classList.add('bg-brand-cyan/15', 'text-brand-cyan', 'dark:text-brand-cyan', 'font-semibold');
        link.classList.remove('text-slate-700', 'dark:text-slate-200');
      } else {
        link.classList.remove('bg-brand-cyan/15', 'text-brand-cyan', 'dark:text-brand-cyan', 'font-semibold');
        link.classList.add('text-slate-700', 'dark:text-slate-200');
      }
    });
  }

  // 4. Mobile Menu Toggle
  function openMobileMenu() {
    if (!mobileMenuDrawer) return;
    mobileMenuDrawer.classList.remove('translate-x-full');
    mobileMenuDrawer.classList.add('translate-x-0');
    if (mobileMenuBackdrop) {
      mobileMenuBackdrop.classList.remove('opacity-0', 'pointer-events-none');
      mobileMenuBackdrop.classList.add('opacity-100', 'pointer-events-auto');
    }
    if (mobileMenuBtn) {
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
      const menuIcon = mobileMenuBtn.querySelector('.menu-icon-open');
      const closeIcon = mobileMenuBtn.querySelector('.menu-icon-close');
      if (menuIcon) menuIcon.classList.add('hidden');
      if (closeIcon) closeIcon.classList.remove('hidden');
    }
    document.body.classList.add('overflow-hidden');
  }

  function closeMobileMenu() {
    if (!mobileMenuDrawer) return;
    mobileMenuDrawer.classList.add('translate-x-full');
    mobileMenuDrawer.classList.remove('translate-x-0');
    if (mobileMenuBackdrop) {
      mobileMenuBackdrop.classList.add('opacity-0', 'pointer-events-none');
      mobileMenuBackdrop.classList.remove('opacity-100', 'pointer-events-auto');
    }
    if (mobileMenuBtn) {
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      const menuIcon = mobileMenuBtn.querySelector('.menu-icon-open');
      const closeIcon = mobileMenuBtn.querySelector('.menu-icon-close');
      if (menuIcon) menuIcon.classList.remove('hidden');
      if (closeIcon) closeIcon.classList.add('hidden');
    }
    document.body.classList.remove('overflow-hidden');
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileMenuBackdrop) {
    mobileMenuBackdrop.addEventListener('click', closeMobileMenu);
  }

  // Close mobile menu on clicking any navigation link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close mobile menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenuBtn && mobileMenuBtn.getAttribute('aria-expanded') === 'true') {
      closeMobileMenu();
      mobileMenuBtn.focus();
    }
  });

  // 5. Smooth Scrolling with Offset Calculation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - (navHeight + 10);
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        // Update URL hash smoothly without jump
        history.pushState(null, '', targetId);
      }
    });
  });
}
