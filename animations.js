/**
 * animations.js - Creative Animations, Interactive Canvas, Typing Effect, 3D Tilt & Magnetic CTAs
 */

export function initAnimations() {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  initTypingEffect(isReducedMotion);
  initParticleCanvas(isReducedMotion);
  initScrollReveal(isReducedMotion);

  if (!isReducedMotion) {
    initCustomCursor();
    init3DTilt();
    initMagneticButtons();
  }
}

/**
 * 1. Typing effect for hero title
 * Cycles between "Full-Stack Developer", "Node.js Developer", "Angular Developer"
 */
function initTypingEffect(isReducedMotion) {
  const typingEl = document.getElementById('typing-text');
  if (!typingEl) return;

  const roles = [
    'Full-Stack Developer',
    'Node.js Developer',
    'Angular Developer'
  ];

  if (isReducedMotion) {
    typingEl.textContent = roles[0];
    return;
  }

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeStep() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
      typingEl.textContent = currentRole.substring(0, charIndex);
      typingSpeed = 45; // faster deletion
    } else {
      charIndex++;
      typingEl.textContent = currentRole.substring(0, charIndex);
      typingSpeed = 85 + Math.random() * 35; // natural variance
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Finished typing current word - pause at end
      typingSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting - move to next word
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500;
    }

    setTimeout(typeStep, typingSpeed);
  }

  // Start initial typing
  setTimeout(typeStep, 600);
}

/**
 * 2. Interactive Constellation / Particle Background Canvas
 */
function initParticleCanvas(isReducedMotion) {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || isReducedMotion) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = canvas.parentElement.offsetWidth);
  let height = (canvas.height = canvas.parentElement.offsetHeight);

  let mouse = { x: -1000, y: -1000, radius: 120 };
  let isVisible = true;

  // Track visibility to pause animation loop when hero is not visible
  const observer = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
  }, { threshold: 0.1 });
  observer.observe(canvas);

  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 16000), 45);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1;
      this.baseAlpha = Math.random() * 0.45 + 0.25;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse repulsion
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        const angle = Math.atan2(dy, dx);
        this.x -= Math.cos(angle) * force * 3;
        this.y -= Math.sin(angle) * force * 3;
      }
    }
    draw(isDark) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = isDark
        ? `rgba(96, 193, 229, ${this.baseAlpha})`
        : `rgba(0, 90, 156, ${this.baseAlpha * 0.8})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function handleResize() {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }
  window.addEventListener('resize', handleResize);

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  function animate() {
    if (isVisible) {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.classList.contains('dark');

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * (isDark ? 0.22 : 0.12);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isDark
              ? `rgba(96, 193, 229, ${alpha})`
              : `rgba(0, 90, 156, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach((p) => {
        p.update();
        p.draw(isDark);
      });
    }
    requestAnimationFrame(animate);
  }

  animate();
}

/**
 * 3. Scroll Reveal for Elements
 */
function initScrollReveal(isReducedMotion) {
  const revealElements = document.querySelectorAll('[data-reveal]');
  if (revealElements.length === 0) return;

  if (isReducedMotion) {
    revealElements.forEach(el => {
      el.classList.remove('opacity-0', 'translate-y-8');
      el.classList.add('opacity-100', 'translate-y-0');
    });
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.getAttribute('data-reveal-delay') || '0';
        
        setTimeout(() => {
          el.classList.remove('opacity-0', 'translate-y-8');
          el.classList.add('opacity-100', 'translate-y-0');
        }, parseInt(delay, 10));

        observer.unobserve(el);
      }
    });
  }, {
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  });

  revealElements.forEach(el => {
    el.classList.add('transition-all', 'duration-700', 'ease-out');
    revealObserver.observe(el);
  });
}

/**
 * 4. 3D Tilt Effect on Desktop for Cards
 */
function init3DTilt() {
  const tiltCards = document.querySelectorAll('[data-tilt]');
  if (tiltCards.length === 0) return;

  // Only enable on desktop fine pointers
  if (!window.matchMedia('(pointer: fine)').matches) return;

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  });
}

/**
 * 5. Magnetic Hover Effects on Buttons
 */
function initMagneticButtons() {
  const magneticElements = document.querySelectorAll('[data-magnetic]');
  if (magneticElements.length === 0) return;

  if (!window.matchMedia('(pointer: fine)').matches) return;

  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0px, 0px)';
    });
  });
}

/**
 * 6. Subtle Custom Cursor Follower for Desktop
 */
function initCustomCursor() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const cursor = document.getElementById('custom-cursor');
  const follower = document.getElementById('custom-cursor-follower');
  if (!cursor || !follower) return;

  let mouseX = -100;
  let mouseY = -100;
  let followerX = -100;
  let followerY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  function renderFollower() {
    followerX += (mouseX - followerX) * 0.18;
    followerY += (mouseY - followerY) * 0.18;
    follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
    requestAnimationFrame(renderFollower);
  }
  renderFollower();

  // Hover state detection
  const interactiveTargets = document.querySelectorAll('a, button, input, textarea, select, [role="button"], .interactive-hover');
  interactiveTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    follower.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    follower.style.opacity = '1';
  });
}
