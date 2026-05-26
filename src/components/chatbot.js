import { resumeData } from '../resume-data.js';

export function initChatbot() {
  const container = document.createElement('div');
  container.id = 'naina-chatbot-container';
  document.body.appendChild(container);

  // HTML Structure for Chatbot
  container.innerHTML = `
    <!-- Floating Chat Trigger Button -->
    <button id="chatbot-trigger" class="chatbot-trigger" aria-label="Chat with Naina">
      <div class="chatbot-pulse"></div>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      <span class="trigger-label">Chat with Naina</span>
    </button>

    <!-- Chat Drawer -->
    <div id="chatbot-drawer" class="chatbot-drawer hidden">
      <div class="chatbot-header">
        <div class="header-info">
          <div class="avatar-pulsing"></div>
          <div>
            <h3>Naina AI</h3>
            <p>Portfolio Assistant • Online</p>
          </div>
        </div>
        <button id="chatbot-close" class="chatbot-close" aria-label="Close Chat">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div id="chatbot-messages" class="chatbot-messages">
        <div class="message bot-message">
          <div class="message-content">
            Hi! I am <strong>Naina</strong>, YEGOTI SAI THANUSH KUMAR's AI assistant. 🤖✨
            <br><br>
            I can tell you about Sai's AI-IoT solutions, **n8n automation workflows**, college leadership roles, and technical skills. How can I help you today?
          </div>
        </div>
      </div>

      <div class="chatbot-suggestions">
        <button class="suggest-btn" data-query="who">Who is Sai?</button>
        <button class="suggest-btn" data-query="n8n">n8n & Naina Agent</button>
        <button class="suggest-btn" data-query="sih">Smart Pilgrimage System</button>
        <button class="suggest-btn" data-query="bank">BankEye 360</button>
        <button class="suggest-btn" data-query="president">Student Club Leadership</button>
      </div>

      <form id="chatbot-form" class="chatbot-input-area">
        <input type="text" id="chatbot-input" placeholder="Ask Naina something..." autocomplete="off" required>
        <button type="submit" class="send-btn" aria-label="Send message">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  `;

  const trigger = document.getElementById('chatbot-trigger');
  const drawer = document.getElementById('chatbot-drawer');
  const closeBtn = document.getElementById('chatbot-close');
  const form = document.getElementById('chatbot-form');
  const input = document.getElementById('chatbot-input');
  const messagesContainer = document.getElementById('chatbot-messages');
  const suggestions = document.querySelectorAll('.suggest-btn');

  // Toggle Drawer Open/Close
  trigger.addEventListener('click', () => {
    drawer.classList.toggle('hidden');
    drawer.classList.toggle('active');
    if (!drawer.classList.contains('hidden')) {
      input.focus();
      trigger.classList.add('drawer-open');
    } else {
      trigger.classList.remove('drawer-open');
    }
  });

  closeBtn.addEventListener('click', () => {
    drawer.classList.add('hidden');
    drawer.classList.remove('active');
    trigger.classList.remove('drawer-open');
  });

  // Handle Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    addUserMessage(query);
    input.value = '';
    
    // Simulate thinking/typing animation
    showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();
      const response = generateAIResponse(query);
      addBotMessage(response);
    }, 850);
  });

  // Handle Quick Suggestions
  suggestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const query = btn.textContent;
      addUserMessage(query);
      showTypingIndicator();
      
      setTimeout(() => {
        removeTypingIndicator();
        const response = generateAIResponse(btn.getAttribute('data-query'));
        addBotMessage(response);
      }, 700);
    });
  });

  function addUserMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'message user-message';
    msg.innerHTML = `<div class="message-content">${escapeHTML(text)}</div>`;
    messagesContainer.appendChild(msg);
    scrollToBottom();
  }

  function addBotMessage(htmlContent) {
    const msg = document.createElement('div');
    msg.className = 'message bot-message';
    msg.innerHTML = `<div class="message-content">${htmlContent}</div>`;
    messagesContainer.appendChild(msg);
    scrollToBottom();
  }

  function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'chatbot-typing-indicator';
    indicator.className = 'message bot-message typing-indicator';
    indicator.innerHTML = `
      <div class="message-content">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    `;
    messagesContainer.appendChild(indicator);
    scrollToBottom();
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById('chatbot-typing-indicator');
    if (indicator) indicator.remove();
  }

  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  // Response Generation based on local NLP rules
  function generateAIResponse(query) {
    const q = query.toLowerCase();

    // 1. Who is Sai?
    if (q.includes('who') || q.includes('about') || q.includes('profile') || q === 'who is sai?') {
      return `
        <strong>YEGOTI SAI THANUSH KUMAR</strong> is a highly motivated B.Tech Computer Science student (2023 - 2027) majoring in <strong>IoT</strong> at Seshadri Rao Gudlavalleru Engineering College. 
        <br><br>
        He is an AI/ML and IoT enthusiast skilled in <strong>Python</strong>, **n8n automation workflows**, and **Computer Vision**. He currently serves as the **President** of PATRIOT student club!
      `;
    }

    // 2. n8n and NAINA Assistant project
    if (q.includes('n8n') || q.includes('naina') || q.includes('automation') || q.includes('agent')) {
      const nainaProj = resumeData.projects.find(p => p.title.includes('NAINA'));
      return `
        🤖 <strong>${nainaProj.title} (${nainaProj.highlight})</strong>:
        <br><br>
        ${nainaProj.desc}
        <br><br>
        <strong>Tech Stack:</strong> ${nainaProj.tags.map(t => `<span class="badge">${t}</span>`).join(' ')}
      `;
    }

    // 3. Smart Pilgrimage System
    if (q.includes('pilgrimage') || q.includes('sih') || q.includes('crowd') || q.includes('management') || q.includes('smart pilgrimage')) {
      const sihProj = resumeData.projects.find(p => p.title.includes('Pilgrimage'));
      return `
        🚀 <strong>${sihProj.title} (${sihProj.highlight})</strong>:
        <br><br>
        ${sihProj.desc}
        <br><br>
        <strong>Tech Stack:</strong> ${sihProj.tags.map(t => `<span class="badge">${t}</span>`).join(' ')}
      `;
    }

    // 4. BankEye 360
    if (q.includes('bank') || q.includes('bankeye') || q.includes('security') || q.includes('msme') || q.includes('lockdown')) {
      const bankProj = resumeData.projects.find(p => p.title.includes('BankEye'));
      return `
        🛡️ <strong>${bankProj.title} (${bankProj.highlight})</strong>:
        <br><br>
        ${bankProj.desc}
        <br><br>
        <strong>Tech Stack:</strong> ${bankProj.tags.map(t => `<span class="badge">${t}</span>`).join(' ')}
      `;
    }

    // 5. Leadership: Patriot President & IETE VP
    if (q.includes('president') || q.includes('leadership') || q.includes('club') || q.includes('patriot') || q.includes('iete') || q.includes('gdsc')) {
      return `
        👑 <strong>Sai's Student Leadership Roles:</strong>
        <ul>
          <li><strong>President (PATRIOT – SRGEC)</strong> [Apr 2026 – Present]: Leading the IoT student association, organizing smart hackathons, and technical bootcamps.</li>
          <li><strong>Vice President (IETE Forum)</strong> [Mar 2025 – Mar 2026]: Led departmental workshops and student integration programs.</li>
          <li><strong>AI/ML Member (GDSC – SRGEC)</strong> [Dec 2024 – Sept 2025]: Worked on machine learning workflows.</li>
          <li><strong>Executive Member (IETE Forum)</strong> [Aug 2024 – Mar 2025]: Managed study groups and event coordination.</li>
        </ul>
      `;
    }

    // 6. KurukshetraMind
    if (q.includes('kurukshetra') || q.includes('mahabharata') || q.includes('wisdom') || q.includes('philosophy')) {
      const kProj = resumeData.projects.find(p => p.title.includes('Kurukshetra'));
      return `
        🕉️ <strong>${kProj.title}</strong>:
        <br><br>
        ${kProj.desc}
        <br><br>
        🌐 <a href="${kProj.link}" target="_blank" class="chat-link">Explore KurukshetraMind Site</a>
      `;
    }

    // 7. Skills & Python
    if (q.includes('skill') || q.includes('python') || q.includes('prompt') || q.includes('languages') || q.includes('coding') || q.includes('tech')) {
      return `
        💻 <strong>Sai's Technical Arsenal:</strong>
        <ul>
          <li><strong>Python:</strong> Scripting, data analysis, app development (90%)</li>
          <li><strong>n8n Automation:</strong> API workflows, conversational triggers (92%)</li>
          <li><strong>Prompt Engineering:</strong> SOTA LLM inputs optimization (95%)</li>
          <li><strong>Web Dev:</strong> HTML, CSS, JavaScript, Flask, MongoDB (90%)</li>
          <li><strong>C Programming:</strong> Core memory management & algorithms (85%)</li>
          <li><strong>Machine Learning:</strong> YOLOv8 Computer Vision, TensorFlow (80%)</li>
        </ul>
      `;
    }

    // 8. Education
    if (q.includes('education') || q.includes('college') || q.includes('btech') || q.includes('gudlavalleru') || q.includes('cgpa') || q.includes('school')) {
      const btech = resumeData.education[0];
      return `
        🎓 <strong>Sai's Academic Foundation:</strong>
        <br><br>
        🏫 <strong>B.Tech in IoT (2023 - 2027):</strong><br>
        ${btech.institution} | Current Grade: <strong>${btech.score}</strong>
        <br><br>
        🏫 <strong>Intermediate Narrayana College (2021 - 2023):</strong> Grade: <strong>94%</strong>
        <br><br>
        🏫 <strong>SSC Class X (2021):</strong> Holy Cross School | Grade: <strong>99%</strong>
      `;
    }

    // 9. Contact / Hire
    if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('message') || q.includes('instagram') || q.includes('linkedin') || q.includes('social')) {
      return `
        🤝 <strong>Let's connect!</strong>
        <br><br>
        📧 <strong>Email:</strong> <a href="mailto:${resumeData.personalInfo.email}" class="chat-link">${resumeData.personalInfo.email}</a>
        <br>
        📞 <strong>Phone:</strong> ${resumeData.personalInfo.phone}
        <br><br>
        💼 <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/sai-thanush-kumar-yegoti-58220b299" target="_blank" class="chat-link">View Professional Profile</a>
        <br>
        📸 <strong>Instagram:</strong> <a href="https://www.instagram.com/user_thanush/" target="_blank" class="chat-link">@user_thanush</a>
        <br><br>
        📍 You can also leave a message using the <strong>Contact Form</strong> on the page!
      `;
    }

    // 10. Greeting
    if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('greetings') || q.includes('hola')) {
      return `
        Hello there! 😊 How can I help you explore YEGOTI SAI THANUSH KUMAR's portfolio today?
      `;
    }

    // 11. Default / Fallback
    return `
      I'm not fully sure about "${escapeHTML(query)}", but here are a few things you can ask me:
      <br><br>
      • "What is his **B.Tech CGPA**?"
      <br>
      • "Tell me about his **n8n automation** skills"
      <br>
      • "What is the **Smart Pilgrimage System**?"
      <br>
      • "Tell me about his **President** leadership role"
      <br>
      • "How can I **contact** him?"
    `;
  }
}
