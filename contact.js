/**
 * contact.js - Contact Form Handling & Formspree Integration
 * 
 * IMPORTANT CONFIGURATION INSTRUCTIONS:
 * 1. Sign up for a free account at https://formspree.io
 * 2. Create a new form pointing to: aymalaaan11@gmail.com
 * 3. Copy your Formspree Form ID (e.g., "xpwzlkab")
 * 4. Replace 'YOUR_FORMSPREE_FORM_ID' in the FORMSPREE_ENDPOINT below with your real ID:
 *    Example: const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xpwzlkab';
 */

export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORMSPREE_FORM_ID';

export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = document.getElementById('contact-submit-btn');
  const btnText = document.getElementById('contact-btn-text');
  const btnSpinner = document.getElementById('contact-btn-spinner');
  const responseAlert = document.getElementById('contact-response-alert');
  const alertIcon = document.getElementById('alert-icon');
  const alertTitle = document.getElementById('alert-title');
  const alertMessage = document.getElementById('alert-message');

  // Input fields
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');

  // Field error elements
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const subjectError = document.getElementById('subject-error');
  const messageError = document.getElementById('message-error');

  // Real-time input validation reset
  [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        clearFieldError(input);
      });
    }
  });

  function clearFieldError(input) {
    input.classList.remove('border-red-500', 'focus:ring-red-500');
    input.classList.add('border-brand-blue/30', 'dark:border-brand-cyan/20');
    const errEl = document.getElementById(`${input.id.replace('contact-', '')}-error`);
    if (errEl) {
      errEl.textContent = '';
      errEl.classList.add('hidden');
    }
  }

  function showFieldError(input, errorElement, message) {
    input.classList.remove('border-brand-blue/30', 'dark:border-brand-cyan/20');
    input.classList.add('border-red-500', 'focus:ring-red-500');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.remove('hidden');
    }
  }

  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  }

  function validateForm() {
    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      showFieldError(nameInput, nameError, 'Please enter your full name.');
      isValid = false;
    } else if (nameInput.value.trim().length < 2) {
      showFieldError(nameInput, nameError, 'Name must be at least 2 characters.');
      isValid = false;
    } else {
      clearFieldError(nameInput);
    }

    // Validate Email
    if (!emailInput.value.trim()) {
      showFieldError(emailInput, emailError, 'Please enter your email address.');
      isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      showFieldError(emailInput, emailError, 'Please enter a valid email address (e.g. name@domain.com).');
      isValid = false;
    } else {
      clearFieldError(emailInput);
    }

    // Validate Subject
    if (!subjectInput.value.trim()) {
      showFieldError(subjectInput, subjectError, 'Please enter a subject.');
      isValid = false;
    } else if (subjectInput.value.trim().length < 3) {
      showFieldError(subjectInput, subjectError, 'Subject must be at least 3 characters.');
      isValid = false;
    } else {
      clearFieldError(subjectInput);
    }

    // Validate Message
    if (!messageInput.value.trim()) {
      showFieldError(messageInput, messageError, 'Please enter your message.');
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      showFieldError(messageInput, messageError, 'Message must be at least 10 characters.');
      isValid = false;
    } else {
      clearFieldError(messageInput);
    }

    return isValid;
  }

  function setSubmittingState(isSubmitting) {
    if (isSubmitting) {
      submitBtn.disabled = true;
      submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
      if (btnSpinner) btnSpinner.classList.remove('hidden');
      if (btnText) btnText.textContent = 'Sending Message...';
    } else {
      submitBtn.disabled = false;
      submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
      if (btnSpinner) btnSpinner.classList.add('hidden');
      if (btnText) btnText.textContent = 'Send Message';
    }
  }

  function displayFeedback(type, title, message) {
    if (!responseAlert) return;
    responseAlert.classList.remove('hidden', 'bg-emerald-500/10', 'border-emerald-500/30', 'text-emerald-400', 'bg-amber-500/10', 'border-amber-500/30', 'text-amber-400', 'bg-red-500/10', 'border-red-500/30', 'text-red-400');

    if (type === 'success') {
      responseAlert.classList.add('bg-emerald-500/10', 'border-emerald-500/40', 'text-emerald-300');
      if (alertIcon) alertIcon.innerHTML = `<svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
    } else if (type === 'warning') {
      responseAlert.classList.add('bg-amber-500/10', 'border-amber-500/40', 'text-amber-300');
      if (alertIcon) alertIcon.innerHTML = `<svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`;
    } else {
      responseAlert.classList.add('bg-red-500/10', 'border-red-500/40', 'text-red-300');
      if (alertIcon) alertIcon.innerHTML = `<svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;
    }

    if (alertTitle) alertTitle.textContent = title;
    if (alertMessage) alertMessage.textContent = message;

    responseAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Check if the Formspree endpoint placeholder is still present
    const isPlaceholderEndpoint = FORMSPREE_ENDPOINT.includes('YOUR_FORMSPREE_FORM_ID');

    if (isPlaceholderEndpoint) {
      // In accordance with instructions:
      // "Never claim that the form works before its real endpoint is configured.
      // If Formspree requires account verification or configuration, document the exact setup steps."
      displayFeedback(
        'warning',
        'Formspree Endpoint Configuration Required',
        'Your message is valid! To deliver emails directly to aymalaaan11@gmail.com, please replace YOUR_FORMSPREE_FORM_ID in src/js/contact.js with your verified Formspree form ID. See the setup instructions below or in README.md.'
      );
      return;
    }

    // Prepare payload
    const formData = new FormData(form);
    setSubmittingState(true);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Confirmation received from Formspree
        displayFeedback(
          'success',
          'Message Sent Successfully!',
          'Thank you for reaching out, Alaa will review your message and get back to you shortly at ' + emailInput.value + '.'
        );
        form.reset();
      } else {
        const data = await response.json().catch(() => null);
        const errorDetail = data && data.errors ? data.errors.map(err => err.message).join(', ') : 'Failed to send message. Please try again or email directly at aymalaaan11@gmail.com.';
        displayFeedback('error', 'Delivery Error', errorDetail);
      }
    } catch (err) {
      displayFeedback(
        'error',
        'Network Connection Error',
        'Unable to connect to the email delivery service. Please check your network or send your message directly to aymalaaan11@gmail.com.'
      );
    } finally {
      setSubmittingState(false);
    }
  });
}
