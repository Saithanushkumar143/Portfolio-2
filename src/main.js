import { gsap } from 'gsap';
import { initThreeScene } from './components/three-scene.js';
import { initChatbot } from './components/chatbot.js';
import { initContactForm } from './components/contact.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Submodules
  initThreeScene();
  initChatbot();
  initContactForm();

  // 2. Mobile Navigation Toggle Drawer
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-active');
      mobileToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking nav link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-active');
        mobileToggle.classList.remove('active');
      });
    });
  }

  // Add CSS styles dynamically for mobile navbar drawer transition
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @media (max-width: 768px) {
      .nav-links {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 76px;
        left: 0;
        width: 100%;
        background: rgba(8, 8, 15, 0.95);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-bottom: 1px solid var(--border-glow);
        padding: 30px 24px;
        gap: 20px;
        transform: translateY(-110%);
        opacity: 0;
        pointer-events: none;
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
      }
      .nav-links.mobile-active {
        transform: translateY(0);
        opacity: 1;
        pointer-events: all;
      }
      #mobile-menu-toggle.active svg {
        transform: rotate(90deg);
        color: var(--cyan);
      }
      #mobile-menu-toggle svg {
        transition: transform 0.3s ease;
      }
    }
  `;
  document.head.appendChild(styleSheet);

  // 3. Navigation Link Highlight on Scroll (ScrollSpy)
  const sections = document.querySelectorAll('section, header');
  const navAnchorLinks = document.querySelectorAll('.nav-links a');

  function scrollSpy() {
    let currentId = 'home';
    const scrollPosition = window.scrollY + 120; // offset for nav height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navAnchorLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', scrollSpy);
  scrollSpy(); // run on load

  // 4. Cinematic Intro Video Controller & GSAP Stagger Sync
  document.body.classList.add('intro-active');

  const introOverlay = document.getElementById('intro-overlay');
  const introVideo = document.getElementById('intro-video');
  const skipIntroBtn = document.getElementById('skip-intro-btn');
  
  let introFinished = false;

  function finishIntro() {
    if (introFinished) return;
    introFinished = true;

    if (introOverlay) {
      // Cinematic transition out: scale overlay up (zoom-out feeling) and blur away
      introOverlay.classList.add('fade-out');
      
      // Unlock body scrollbars
      document.body.classList.remove('intro-active');

      // Trigger hero entrance stagger exactly in-sync with video end/zoom
      playHeroGSAP();

      // Complete removal from DOM after transition completes to save resources
      setTimeout(() => {
        introOverlay.remove();
      }, 1600);
    }
  }

  // Bind video events
  if (introVideo) {
    introVideo.addEventListener('ended', finishIntro);
    
    // Autoplay safety: check if playing is blocked, if so force skip after timeout
    introVideo.play().catch(err => {
      console.warn("Autoplay blocked or video loading failed:", err);
      // Let it wait for click or fallback
    });
  }

  if (skipIntroBtn) {
    skipIntroBtn.addEventListener('click', finishIntro);
  }

  // Failsafe timer (35 seconds fallback, ensures full completion without early skips)
  setTimeout(finishIntro, 35000);

  function playHeroGSAP() {
    const tlHero = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
    
    tlHero.fromTo('.hero-badge', 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, delay: 0.3 }
    )
    .fromTo('.hero-title .name', 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0 }, 
      '-=0.7'
    )
    .fromTo('.hero-title .grad', 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0 }, 
      '-=0.8'
    )
    .fromTo('.hero-desc', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0 }, 
      '-=0.7'
    )
    .fromTo('.hero-actions .btn', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, stagger: 0.15 }, 
      '-=0.8'
    )
    .fromTo('.hero-visual', 
      { opacity: 0, scale: 0.8 }, 
      { opacity: 1, scale: 1, ease: 'back.out(1.2)', duration: 1.2 }, 
      '-=1'
    );
  }

  // 5. Scroll-Triggered Layout Staggers using IntersectionObserver
  const animObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;

        // A. Stats Cards
        if (target.classList.contains('stats')) {
          gsap.fromTo('.stat-card', 
            { opacity: 0, y: 40 }, 
            { opacity: 1, y: 0, stagger: 0.2, ease: 'power3.out', duration: 0.8 }
          );
        }

        // B. Projects Section Entrance
        if (target.id === 'projects') {
          gsap.fromTo('.project-card', 
            { opacity: 0, scale: 0.9, y: 50 }, 
            { opacity: 1, scale: 1, y: 0, stagger: 0.15, ease: 'power3.out', duration: 0.8 }
          );
        }

        // C. Skill bars and timeline cards
        if (target.id === 'skills') {
          // Stagger timeline
          gsap.fromTo('.timeline-item', 
            { opacity: 0, x: -30 }, 
            { opacity: 1, x: 0, stagger: 0.25, ease: 'power3.out', duration: 0.8 }
          );

          // Fill up skill progress bars
          const progressFills = target.querySelectorAll('.progress-bar-fill');
          progressFills.forEach(fill => {
            const targetWidth = fill.getAttribute('data-width');
            fill.style.width = targetWidth;
          });

          // Stagger tool badges
          gsap.fromTo('.tool-badge', 
            { opacity: 0, scale: 0.8 }, 
            { opacity: 1, scale: 1, stagger: 0.05, ease: 'back.out(1.5)', duration: 0.6 }
          );
        }

        // D. Contact Section
        if (target.id === 'contact') {
          gsap.fromTo('.contact-info-card', 
            { opacity: 0, x: -40 }, 
            { opacity: 1, x: 0, ease: 'power3.out', duration: 0.8 }
          );
          gsap.fromTo('.contact-card', 
            { opacity: 0, x: 40 }, 
            { opacity: 1, x: 0, ease: 'power3.out', duration: 0.8 },
            '-=0.6'
          );
        }

        // Stop observing once animated
        observer.unobserve(target);
      }
    });
  }, {
    threshold: 0.12
  });

  // Attach observer to layout blocks
  const observedSections = [
    document.querySelector('.stats'),
    document.getElementById('projects'),
    document.getElementById('skills'),
    document.getElementById('contact')
  ];

  observedSections.forEach(section => {
    if (section) animObserver.observe(section);
  });

  // 6. Interactive 3D Card Tilt Effect
  // Applies standard 3D depth tilt transformation to cards on mouse hover coordinates
  function init3DTiltEffect() {
    const targetCards = document.querySelectorAll('.timeline-card, .project-card, .stat-card, .contact-card, .contact-info-card');

    targetCards.forEach(card => {
      // Add smooth transform transition behavior
      card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease';
      card.style.transformStyle = 'preserve-3d';

      card.addEventListener('mousemove', (e) => {
        const bounds = card.getBoundingClientRect();
        
        // Retrieve mouse coordinates relative to element center
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;
        
        const centerX = bounds.width / 2;
        const centerY = bounds.height / 2;
        
        // Calculate rotational values (tilt scale: +/- 8 degrees)
        const rotX = (centerY - mouseY) / 10;
        const rotY = (mouseX - centerX) / 10;

        // Apply interactive 3D scaling transformations
        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        // Reset element rotation smoothly
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  init3DTiltEffect();
});
