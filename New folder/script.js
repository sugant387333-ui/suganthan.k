document.addEventListener('DOMContentLoaded', () => {

  // --- STICKY NAV & BACKGROUND SCROLL STATE ---
  const header = document.getElementById('header');
  const scrollTopBtn = document.getElementById('scroll-top');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });

  // --- SCROLL TO TOP FUNCTION ---
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // --- MOBILE NAVIGATION MENU ---
  const hamburger = document.getElementById('hamburger');
  const navLinksList = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksList.classList.toggle('active');
  });

  // Close mobile menu when a link is clicked
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinksList.classList.remove('active');
    });
  });

  // --- HERO TYPING EFFECT ---
  const typingTextSpan = document.getElementById('typing-text');
  const phrases = ["BCA 2nd Year Student", "Web Enthusiast", "Frontend Designer", "Problem Solver"];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      // Remove character
      typingTextSpan.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Deletes faster
    } else {
      // Add character
      typingTextSpan.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120; // Natural typing speed
    }

    // Handle phrase state transition
    if (!isDeleting && charIndex === currentPhrase.length) {
      // End of phrase, wait before deleting
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting, move to next phrase
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500; // brief pause before starting new typing
    }

    setTimeout(typeEffect, typingSpeed);
  }

  // Start typing loop
  if (typingTextSpan) {
    setTimeout(typeEffect, 1000);
  }

  // --- SCROLL REVEAL & DYNAMIC SKILL ANIMS ---
  const revealedElements = document.querySelectorAll('.reveal');
  const skillProgressBars = document.querySelectorAll('.skill-progress');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        
        // If the revealed element is the skills section, animate skill bars
        if (entry.target.id === 'skills' || entry.target.contains(document.querySelector('.skill-progress'))) {
          animateSkillBars();
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealedElements.forEach(element => {
    revealObserver.observe(element);
  });

  function animateSkillBars() {
    skillProgressBars.forEach(bar => {
      const targetWidth = bar.getAttribute('data-level');
      bar.style.width = targetWidth;
    });
  }

  // --- NAV LINK HIGH LIGHTER ---
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // --- CONTACT FORM HANDLER WITH TOAST MESSAGE ---
  const contactForm = document.getElementById('portfolio-form');
  const toastMsg = document.getElementById('toast-msg');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get inputs to show feedback transition
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Submit animation state
      submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
      submitBtn.disabled = true;

      // Mock network response wait (1.5 seconds)
      setTimeout(() => {
        // Reset submit button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Trigger Toast Message
        toastMsg.classList.add('show');
        
        // Reset Form
        contactForm.reset();
        
        // Blur inputs to reset floating labels properly
        contactForm.querySelectorAll('input, textarea').forEach(input => {
          input.blur();
        });

        // Hide Toast Message after 4 seconds
        setTimeout(() => {
          toastMsg.classList.remove('show');
        }, 4000);
        
      }, 1500);
    });
  }

});
