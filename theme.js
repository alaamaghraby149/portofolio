/**
 * theme.js - Theme Management System
 * Handles Dark, Light, and System preferences with persistence and smooth transitions.
 */

const THEME_STORAGE_KEY = 'alaa_portfolio_theme';
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

/**
 * Get current stored theme preference ('dark', 'light', or 'system')
 * Defaults to 'system' if not explicitly set.
 */
export function getSavedTheme() {
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  return saved === 'dark' || saved === 'light' || saved === 'system' ? saved : 'system';
}

/**
 * Resolves whether the current effective state should be dark mode
 */
export function isDarkActive() {
  const pref = getSavedTheme();
  if (pref === 'dark') return true;
  if (pref === 'light') return false;
  return mediaQuery.matches; // system preference
}

/**
 * Applies the theme classes to the document element and updates the UI toggle states
 */
export function applyTheme(preference) {
  const root = document.documentElement;
  const isDark = preference === 'dark' || (preference === 'system' && mediaQuery.matches);

  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  // Update theme toggle buttons / dropdown UI
  updateThemeToggleUI(preference);
}

/**
 * Updates active indicators on all theme toggle controls
 */
function updateThemeToggleUI(activePreference) {
  const themeButtons = document.querySelectorAll('[data-theme-value]');
  themeButtons.forEach(btn => {
    const value = btn.getAttribute('data-theme-value');
    const isSelected = value === activePreference;
    btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    
    // Toggle active class styling
    if (isSelected) {
      btn.classList.add('active-theme', 'bg-brand-cyan/20', 'text-brand-cyan', 'dark:bg-brand-cyan/25', 'dark:text-brand-cyan');
      btn.classList.remove('text-slate-600', 'dark:text-slate-400');
    } else {
      btn.classList.remove('active-theme', 'bg-brand-cyan/20', 'text-brand-cyan', 'dark:bg-brand-cyan/25', 'dark:text-brand-cyan');
      btn.classList.add('text-slate-600', 'dark:text-slate-400');
    }
  });

  // Update display label in dropdown toggle if present
  const currentThemeLabel = document.getElementById('current-theme-label');
  if (currentThemeLabel) {
    const labels = {
      light: 'Light',
      dark: 'Dark',
      system: 'System'
    };
    currentThemeLabel.textContent = labels[activePreference] || 'System';
  }

  // Update active icon in toggle trigger
  const themeIcons = {
    light: document.getElementById('theme-icon-sun'),
    dark: document.getElementById('theme-icon-moon'),
    system: document.getElementById('theme-icon-system')
  };

  Object.entries(themeIcons).forEach(([key, iconEl]) => {
    if (iconEl) {
      if (key === activePreference) {
        iconEl.classList.remove('hidden');
      } else {
        iconEl.classList.add('hidden');
      }
    }
  });
}

/**
 * Set a new theme preference, save to localStorage, and apply
 */
export function setTheme(preference) {
  if (preference !== 'dark' && preference !== 'light' && preference !== 'system') {
    preference = 'system';
  }
  localStorage.setItem(THEME_STORAGE_KEY, preference);
  applyTheme(preference);
}

/**
 * Initialize theme listener and load initial preference
 */
export function initTheme() {
  const currentPreference = getSavedTheme();
  
  // Apply initial theme immediately
  applyTheme(currentPreference);

  // Listen for OS system theme changes
  mediaQuery.addEventListener('change', () => {
    if (getSavedTheme() === 'system') {
      applyTheme('system');
    }
  });

  // Attach click listeners to all theme switcher elements
  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-theme-value]');
    if (target) {
      const selectedValue = target.getAttribute('data-theme-value');
      setTheme(selectedValue);
      
      // Close theme dropdown menu if open
      const dropdown = document.getElementById('theme-dropdown-menu');
      if (dropdown && !dropdown.classList.contains('hidden')) {
        dropdown.classList.add('hidden');
      }
    }
  });

  // Toggle theme dropdown menu button
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const dropdown = document.getElementById('theme-dropdown-menu');
  if (toggleBtn && dropdown) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = dropdown.classList.toggle('hidden');
      toggleBtn.setAttribute('aria-expanded', !isHidden ? 'true' : 'false');
    });

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
      if (!toggleBtn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.add('hidden');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close dropdown on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !dropdown.classList.contains('hidden')) {
        dropdown.classList.add('hidden');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.focus();
      }
    });
  }
}
