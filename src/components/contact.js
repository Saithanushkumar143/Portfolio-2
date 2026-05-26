export function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');
  const responseMessage = document.getElementById('contact-response-message');

  if (!form || !submitBtn) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset feedback
    responseMessage.className = 'contact-response';
    responseMessage.textContent = '';
    responseMessage.classList.add('hidden');

    // Get input values
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    // Basic Validation
    if (!name || !email || !subject || !message) {
      showError('Please fill out all fields.');
      return;
    }

    if (!isValidEmail(email)) {
      showError('Please enter a valid email address.');
      return;
    }

    // Set UI to loading state
    setLoading(true);

    // Form data payload for Web3Forms
    // We get the access key from environment variables or use a default placeholder.
    // Web3Forms sends the form submissions to the registered email address of the access key.
    // If the access key is missing/placeholder, we can fallback to standard direct email link to ensure the user always has a functional backup!
    const web3formsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'YOUR_ACCESS_KEY_HERE';

    // Build form data object
    const formData = new FormData();
    formData.append('access_key', web3formsAccessKey);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('subject', `[Portfolio Contact] ${subject}`);
    formData.append('message', message);
    formData.append('from_name', 'Sai Thanush Portfolio');

    try {
      // If Web3Forms has a valid access key placeholder, we make the API request.
      // If the key is still the default template placeholder, we show a notice and trigger a fallback mailto to make it functional.
      if (web3formsAccessKey === 'YOUR_ACCESS_KEY_HERE') {
        // Fallback option so it works immediately without setup
        setTimeout(() => {
          setLoading(false);
          // Show notice
          showWarning('Web3Forms Access Key is not configured yet. Opening email client with your message...');
          
          // Trigger mailto link
          const mailtoUrl = `mailto:yegotisaithanushkumar143@gmail.com?subject=${encodeURIComponent('[Portfolio] ' + subject)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;
          window.location.href = mailtoUrl;
        }, 1000);
        return;
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      setLoading(false);

      if (data.success) {
        showSuccess('Message sent successfully! Sai will get back to you soon.');
        form.reset();
        // Trigger a satisfying subtle burst effect if canvas exists
        triggerSuccessBurst();
      } else {
        showError(data.message || 'Something went wrong. Please try again.');
      }

    } catch (err) {
      console.error('Contact Form Error:', err);
      setLoading(false);
      showError('Failed to send message due to a network error. Opening backup mail client...');
      
      // Fallback redirect
      const mailtoUrl = `mailto:yegotisaithanushkumar143@gmail.com?subject=${encodeURIComponent('[Portfolio] ' + subject)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 1500);
    }
  });

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function setLoading(isLoading) {
    if (isLoading) {
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');
      submitBtn.innerHTML = `
        <span class="btn-spinner"></span> Sending message...
      `;
    } else {
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
      submitBtn.innerHTML = `
        <span>Send Message</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      `;
    }
  }

  function showError(msg) {
    responseMessage.textContent = msg;
    responseMessage.className = 'contact-response error-msg';
    responseMessage.classList.remove('hidden');
  }

  function showWarning(msg) {
    responseMessage.textContent = msg;
    responseMessage.className = 'contact-response warning-msg';
    responseMessage.classList.remove('hidden');
  }

  function showSuccess(msg) {
    responseMessage.textContent = msg;
    responseMessage.className = 'contact-response success-msg';
    responseMessage.classList.remove('hidden');
  }

  function triggerSuccessBurst() {
    // Flash the form with a green outline border glow
    const contactContainer = document.querySelector('.contact-card');
    if (contactContainer) {
      contactContainer.classList.add('glow-success');
      setTimeout(() => {
        contactContainer.classList.remove('glow-success');
      }, 2500);
    }
  }
}
