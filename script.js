/* ===================================
   Candy's Face Paint — Scripts
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- Set Current Year ---
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Navbar Scroll Effect ---
  const navbar = document.getElementById('navbar');
  const handleNavScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run on load

  // --- Mobile Nav Toggle ---
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Close nav on link click
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close nav on outside click
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !navToggle.contains(e.target)) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // --- Back to Top Button ---
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- Scroll Reveal Animation ---
  const revealElements = () => {
    // Apply reveal class to elements we want to animate
    const selectors = [
      '.about-image-wrapper',
      '.about-content',
      '.service-card',
      '.gallery-item',
      '.area-content',
      '.area-map-wrapper',
      '.booking-form-wrapper',
      '.booking-info',
      '.section-header'
    ];

    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        if (!el.classList.contains('reveal')) {
          el.classList.add('reveal');
        }
      });
    });
  };

  revealElements();

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add staggered delay for grid items
        const parent = entry.target.parentElement;
        if (parent) {
          const siblings = Array.from(parent.children).filter(c => c.classList.contains('reveal'));
          const index = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 0.1}s`;
        }
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });

  // --- Active Nav Link Tracking ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const updateActiveNav = () => {
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // --- Set minimum date for event date picker ---
  const eventDateInput = document.getElementById('eventDate');
  if (eventDateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    eventDateInput.setAttribute('min', `${yyyy}-${mm}-${dd}`);
  }

  // --- Form Validation & Submit ---
  const bookingForm = document.getElementById('bookingForm');
  const formSuccess = document.getElementById('formSuccess');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Reset errors
      bookingForm.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
      bookingForm.querySelectorAll('.form-error').forEach(el => el.classList.remove('visible'));

      let isValid = true;

      // Validate name
      const name = document.getElementById('name');
      if (!name.value.trim()) {
        showError(name, 'nameError');
        isValid = false;
      }

      // Validate email
      const email = document.getElementById('email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value)) {
        showError(email, 'emailError');
        isValid = false;
      }

      // Validate phone
      const phone = document.getElementById('phone');
      if (!phone.value.trim()) {
        showError(phone, 'phoneError');
        isValid = false;
      }

      // Validate date
      const eventDate = document.getElementById('eventDate');
      if (!eventDate.value) {
        showError(eventDate, 'eventDateError');
        isValid = false;
      }

      // Validate event type
      const eventType = document.getElementById('eventType');
      if (!eventType.value) {
        showError(eventType, 'eventTypeError');
        isValid = false;
      }

      if (isValid) {
        // Show loading state
        const submitBtn = bookingForm.querySelector('.btn-submit');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
          bookingForm.style.display = 'none';
          formSuccess.classList.add('visible');
        }, 1500);
      }
    });

    // Clear errors on input
    bookingForm.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('error');
        const errorEl = input.parentElement.querySelector('.form-error');
        if (errorEl) errorEl.classList.remove('visible');
      });
    });
  }

  function showError(input, errorId) {
    input.classList.add('error');
    const errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.classList.add('visible');
    // Scroll to first error
    input.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // --- Phone Number Formatting ---
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 10) value = value.slice(0, 10);
      
      if (value.length >= 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
      } else if (value.length >= 3) {
        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
      }
      
      e.target.value = value;
    });
  }

  // --- Smooth Scroll for All Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- Gallery Item Hover Sound/Haptic (if supported) ---
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      if ('vibrate' in navigator) {
        navigator.vibrate(10);
      }
    });
  });

  // --- Parallax Effect on Hero Blobs (desktop only) ---
  if (window.matchMedia('(min-width: 768px)').matches) {
    const blobs = document.querySelectorAll('.hero-blob');
    
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      blobs.forEach((blob, i) => {
        const speed = (i + 1) * 8;
        blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    }, { passive: true });
  }

  // --- Service Card Tilt Effect (desktop) ---
  if (window.matchMedia('(min-width: 768px)').matches) {
    document.querySelectorAll('.service-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
});
