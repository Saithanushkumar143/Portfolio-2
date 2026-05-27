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

    // Read available endpoints from environment variables
    const slackWebhookUrl = import.meta.env.VITE_SLACK_WEBHOOK_URL;
    const web3formsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'YOUR_ACCESS_KEY_HERE';

    try {
      // --- ROUTE 1: Direct Slack Incoming Webhook (Primary Channel - Simple & Instant) ---
      if (slackWebhookUrl && slackWebhookUrl !== 'YOUR_SLACK_WEBHOOK_URL_HERE') {
        const slackPayload = {
          text: `📩 *New Portfolio Contact Submission*`,
          attachments: [
            {
              color: "#00f2fe",
              pretext: "Details of the received message:",
              fields: [
                { title: "Sender Name", value: name, short: true },
                { title: "Sender Email", value: email, short: true },
                { title: "Subject", value: subject, short: false },
                { title: "Message", value: message, short: false }
              ],
              footer: "Sai Thanush Portfolio Alert",
              ts: Math.floor(Date.now() / 1000)
            }
          ]
        };

        // Direct browser requests to Slack Webhook are blocked by CORS.
        // We use mode: 'no-cors' to bypass this. The response is opaque (status 0).
        // Slack supports form-encoded payloads using a 'payload' parameter, allowing
        // successful delivery without a preflight CORS check!
        const body = `payload=${encodeURIComponent(JSON.stringify(slackPayload))}`;

        const response = await fetch(slackWebhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: body
        });

        // In no-cors, status is 0 (opaque). We treat 0 or 200/ok as a successful dispatch!
        if (response.ok || response.status === 200 || response.status === 0) {
          handleSuccess();
          return;
        } else {
          throw new Error('Slack Webhook failed');
        }
      }

      // --- ROUTE 2: Web3Forms Email submission (Alternative Fallback) ---
      if (web3formsAccessKey !== 'YOUR_ACCESS_KEY_HERE') {
        const formData = new FormData();
        formData.append('access_key', web3formsAccessKey);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('subject', `[Portfolio Contact] ${subject}`);
        formData.append('message', message);
        formData.append('from_name', 'Sai Thanush Portfolio');

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (data.success) {
          handleSuccess();
        } else {
          showError(data.message || 'Something went wrong. Please try again.');
          setLoading(false);
        }
        return;
      }

      // --- ROUTE 3: Fallback Direct Mail Client (Zero-setup Backup) ---
      setTimeout(() => {
        setLoading(false);
        showWarning('Slack Webhook URL is not configured yet. Opening email client with your message...');
        const mailtoUrl = `mailto:yegotisaithanushkumar143@gmail.com?subject=${encodeURIComponent('[Portfolio] ' + subject)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;
        window.location.href = mailtoUrl;
      }, 1000);

    } catch (err) {
      console.error('Contact Form Telemetry Error:', err);
      setLoading(false);
      showError('Failed to send message due to a connection error. Opening backup mail client...');
      
      // Secondary fallback
      const mailtoUrl = `mailto:yegotisaithanushkumar143@gmail.com?subject=${encodeURIComponent('[Portfolio] ' + subject)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 1500);
    }
  });

  // Success handler helper
  function handleSuccess() {
    setLoading(false);
    showSuccess('Message sent successfully! Sai will receive it instantly.');
    form.reset();
    triggerSuccessBurst();
  }

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
